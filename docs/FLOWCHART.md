# StarX Portfolio — Complete Flowchart

## 1. Website navigation flow

```text
START
  ↓
Home
  ├── About
  ├── Projects
  │     ├── All
  │     ├── Web
  │     │    ├── StarX Store
  │     │    └── NextGen Mock Test
  │     └── AI
  │          └── AI Study Assistant
  │
  ├── Skills
  ├── Experience
  ├── Education
  ├── Certificates
  ├── Services
  ├── Blog
  └── Contact
          ↓
      Django API
          ↓
  Validate + Rate Limit
          ↓
   Save ContactMessage
          ↓
   Gmail SMTP (optional)
          ↓
   Owner notification
          ↓
 Visitor acknowledgement
          ↓
        END
```

## 2. Project card flow

```text
Projects section
    ↓
Search / Filter
    ↓
Project card
    ├── Preview image
    ├── Details
    │     ↓
    │   Modal
    ├── GitHub
    └── Live Demo
          ↓
    Real URL when added
```

The three preview images are intentionally fake/demo UI images. Replace these files later:

- `frontend/public/projects/starx-store-demo.png`
- `frontend/public/projects/nextgen-mock-test-demo.png`
- `frontend/public/projects/ai-study-assistant-demo.png`

## 3. Frontend flow

```text
Browser
  ↓
Vite
  ↓
React App
  ↓
portfolio.js (single content source)
  ├── Profile
  ├── Skills
  ├── Projects
  ├── Experience
  ├── Education
  ├── Certificates
  ├── Services
  └── Blog

Static assets:
  ├── profile.jpg
  ├── project demo images
  └── AN-Pandey-Resume.pdf
```

## 4. Contact backend flow

```text
React Contact Form
       ↓ POST /api/contact/
Django
       ↓
JSON validation
       ↓
Honeypot check
       ↓
IP rate limit (5/min)
       ↓
ContactMessage → SQLite
       ↓
Gmail SMTP configured?
   ┌───────────┴───────────┐
  YES                      NO
   ↓                        ↓
Send owner email        Keep message saved
   ↓                        ↓
Send acknowledgement   Show saved/config message
```

## 5. Admin flow

```text
/admin/
   ↓
Django Admin Login
   ↓
ContactMessage
   ├── Search
   ├── Filter
   ├── Read message
   └── See email_sent status
```

Create an admin user:

```powershell
python manage.py createsuperuser
```

## 6. Development flow

```text
Terminal 1
frontend/
   ↓
npm install
   ↓
npm run dev
   ↓
http://localhost:5173

Terminal 2
backend/
   ↓
python -m venv .venv
   ↓
.\.venv\Scripts\Activate.ps1
   ↓
pip install -r requirements.txt
   ↓
python manage.py migrate
   ↓
python manage.py runserver
   ↓
http://127.0.0.1:8000
```

## 7. Deployment flow

```text
GitHub
  ├── Frontend build → Static hosting
  │                     ↓
  │               HTTPS website
  │
  └── Backend → Python hosting
                 ↓
             Django + DB
                 ↓
             HTTPS API
                 ↓
             Gmail SMTP
```

### Important production settings

```text
DEBUG=False
SECRET_KEY=<strong-secret>
ALLOWED_HOSTS=<your-api-domain>
CORS_ALLOWED_ORIGINS=<your-frontend-domain>
VITE_API_BASE_URL=https://<your-api-domain>
```

Never upload `.env` or SMTP passwords to GitHub.
