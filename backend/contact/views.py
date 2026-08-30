import json
import re
import time
from email.utils import parseaddr

from django.conf import settings
from django.core.mail import EmailMessage, send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import ContactMessage

RATE_LIMIT = {}
WINDOW_SECONDS = 60
MAX_REQUESTS_PER_WINDOW = 5


def _client_ip(request):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    return forwarded.split(",")[0].strip() if forwarded else request.META.get("REMOTE_ADDR", "unknown")


def _allowed_request(ip):
    now = time.time()
    timestamps = [t for t in RATE_LIMIT.get(ip, []) if now - t < WINDOW_SECONDS]
    if len(timestamps) >= MAX_REQUESTS_PER_WINDOW:
        RATE_LIMIT[ip] = timestamps
        return False
    timestamps.append(now)
    RATE_LIMIT[ip] = timestamps
    return True


def _valid_email(value):
    value = value.strip()
    _, address = parseaddr(value)
    return bool(address and re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", address))


@csrf_exempt
def health_api(request):
    if request.method != "GET":
        return JsonResponse({"ok": False, "message": "Only GET is allowed."}, status=405)
    return JsonResponse({"ok": True, "service": "StarX contact API"})


@csrf_exempt
def contact_api(request):
    if request.method != "POST":
        return JsonResponse({"ok": False, "message": "Only POST is allowed."}, status=405)

    if not _allowed_request(_client_ip(request)):
        return JsonResponse({"ok": False, "message": "Too many enquiries. Try again in a minute."}, status=429)

    if request.content_type != "application/json":
        return JsonResponse({"ok": False, "message": "Send data as application/json."}, status=415)

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"ok": False, "message": "Invalid JSON request."}, status=400)

    if str(payload.get("website", "")).strip():
        return JsonResponse({"ok": True, "message": "Message received."})

    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    subject = str(payload.get("subject", "")).strip() or "New portfolio enquiry"
    message = str(payload.get("message", "")).strip()

    if not 2 <= len(name) <= 100:
        return JsonResponse({"ok": False, "message": "Please enter a valid name."}, status=400)
    if not _valid_email(email):
        return JsonResponse({"ok": False, "message": "Please enter a valid email address."}, status=400)
    if len(subject) > 150:
        return JsonResponse({"ok": False, "message": "Subject is too long."}, status=400)
    if not 5 <= len(message) <= 5000:
        return JsonResponse({"ok": False, "message": "Message must be between 5 and 5000 characters."}, status=400)

    saved = ContactMessage.objects.create(name=name, email=email, subject=subject, message=message)

    receiver = settings.CONTACT_RECEIVER_EMAIL
    if not receiver or not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
        return JsonResponse({
            "ok": True,
            "message": "Message saved successfully. Email service is not configured yet."
        })

    body = (
        f"You received a new enquiry on {settings.SITE_NAME}.\\n\\n"
        f"Name: {name}\\nEmail: {email}\\nSubject: {subject}\\n\\nMessage:\\n{message}\\n"
    )

    try:
        EmailMessage(
            subject=f"[Portfolio Enquiry] {subject}",
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[receiver],
            reply_to=[email],
        ).send(fail_silently=False)

        send_mail(
            f"Thanks for contacting {settings.SITE_NAME}",
            f"Hi {name},\\n\\nThanks for reaching out. I received your enquiry and will get back to you soon.\\n\\nRegards,\\nAN Pandey",
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=True,
        )

        saved.email_sent = True
        saved.save(update_fields=["email_sent"])
        return JsonResponse({"ok": True, "message": "Your message has been sent successfully."})
    except Exception:
        return JsonResponse({
            "ok": True,
            "message": "Your message was saved, but email delivery is temporarily unavailable."
        })
