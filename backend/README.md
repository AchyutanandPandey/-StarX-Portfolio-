# StarX Django Backend

## Included

- `POST /api/contact/` — validates and stores contact messages
- `GET /api/health/` — backend health check
- Django Admin at `/admin/`
- SQLite contact-message storage
- Gmail SMTP notification when configured
- Rate limiting and honeypot protection

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Copy `.env.example` to `.env` for email configuration.
