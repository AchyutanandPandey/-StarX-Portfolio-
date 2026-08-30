# StarX Portfolio

A polished, responsive React + Vite portfolio with a Django contact API, local demo project screenshots, resume download, working navigation, project filters, detail modals, blog modals, theme switcher and mobile navigation.

## Reference-style layout

The UI is designed to closely follow the supplied StarX reference:

```text
┌─────────────────────────────────────────────────────────────┐
│ StarX      Home About Projects Skills ... Contact     ◐    │
├──────────────────────────────┬──────────────────────────────┤
│ Hi, I'm AN Pandey            │                              │
│ Full Stack Developer         │         Profile photo        │
│ tagline                      │     React / JS / TS / etc.   │
│ India / Email                │                              │
│ social icons                 │                              │
│ [Download Resume] [Contact]  │                              │
├──────────────────────────────┴──────────────────────────────┤
│                         Projects                             │
│                 [All] [Web] [AI] [Search]                    │
│   ┌────────────┐     ┌────────────┐     ┌────────────┐      │
│   │ StarX      │     │ NextGen    │     │ AI Study   │      │
│   │ Store      │     │ Mock Test  │     │ Assistant  │      │
│   │ demo image │     │ demo image │     │ demo image │      │
│   └────────────┘     └────────────┘     └────────────┘      │
├─────────────────────────────────────────────────────────────┤
│              Project Demo Previews                          │
│          [fake UI]      [fake UI]      [fake UI]             │
├─────────────────────────────────────────────────────────────┤
│ About / Skills / Experience / Education / Certificates      │
│ Services / Blog / Contact                                   │
├─────────────────────────────────────────────────────────────┤
│ Footer: Profile | Quick Links | Connect | Let's Build...    │
└─────────────────────────────────────────────────────────────┘
```

## Features

- Responsive desktop, tablet and mobile layout
- Dark/light theme
- Single-source portfolio content in `frontend/src/data/portfolio.js`
- Project category filters: All / Web / AI
- Project search
- Project detail modal
- Local demo preview images for all three projects
- Resume download from `/AN-Pandey-Resume.pdf`
- Working smooth-scroll navigation and mobile bottom nav
- Footer with profile image, quick links, GitHub, LinkedIn and email
- Contact form connected to `POST /api/contact/`
- Django validation, honeypot and simple rate limiting
- Contact messages saved in SQLite
- Django Admin for saved enquiries
- Gmail SMTP owner notification and visitor acknowledgement when SMTP is configured
- Health endpoint: `GET /api/health/`
- `.env` is ignored from Git

## Project structure

```text
StarX_Portfoliocomplete/
├── frontend/
│   ├── public/
│   │   ├── profile.jpg
│   │   ├── AN-Pandey-Resume.pdf
│   │   └── projects/
│   │       ├── starx-store-demo.png
│   │       ├── nextgen-mock-test-demo.png
│   │       └── ai-study-assistant-demo.png
│   └── src/
│       ├── data/portfolio.js
│       ├── main.jsx
│       └── styles.css
├── backend/
│   ├── config/
│   └── contact/
│       ├── models.py
│       ├── admin.py
│       ├── views.py
│       ├── urls.py
│       └── migrations/
├── docs/
│   ├── ARCHITECTURE.md
│   └── FLOWCHART.md
└── README.md
```

## Frontend run

```powershell
cd "C:\path\to\StarX_Portfoliocomplete\frontend"
npm install
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173
```

**Important:** run these commands from the `frontend` folder because that folder contains `package.json`.

## Backend run

Open a second terminal:

```powershell
cd "C:\path\to\StarX_Portfoliocomplete\backend"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/api/health/
```

## Gmail setup

Copy:

```text
backend/.env.example → backend/.env
```

Fill in a Gmail address and a Google App Password:

```env
EMAIL_HOST_USER=yourgmail@gmail.com
EMAIL_HOST_PASSWORD=your-16-character-google-app-password
DEFAULT_FROM_EMAIL=yourgmail@gmail.com
CONTACT_RECEIVER_EMAIL=yourgmail@gmail.com
```

Never commit `backend/.env`.

## Admin

```powershell
python manage.py createsuperuser
```

Then open:

```text
http://127.0.0.1:8000/admin/
```

Saved contact enquiries appear under `Contact messages`.

## Edit website content

Edit only:

```text
frontend/src/data/portfolio.js
```

This controls:

- name
- role
- tagline
- location
- email
- resume path
- social URLs
- skills
- projects
- experience
- education
- certificates
- services
- blog posts

After editing while Vite is running, the browser should hot-reload. If it does not, verify that Vite is running from this project's `frontend` directory and hard-refresh with `Ctrl+F5`.

For a deployed website, rebuild and redeploy after source changes.

## Replace fake project images

Keep the filenames and replace the files:

```text
frontend/public/projects/starx-store-demo.png
frontend/public/projects/nextgen-mock-test-demo.png
frontend/public/projects/ai-study-assistant-demo.png
```

The cards and the Project Demo Previews section will automatically use the new images.

## Add real project links

Edit `projects` inside `portfolio.js`:

```js
demo: "https://your-real-demo.com",
github: "https://github.com/your-user/your-repo",
```

Use an empty `demo` string until a real demo exists; the UI will show a disabled demo icon rather than a broken `#` link.

## Notes

SQLite is used for the included contact-message storage because it makes local setup simple. PostgreSQL can be introduced for production without changing the React UI.

See `docs/FLOWCHART.md` for the complete user, project, contact, admin and deployment flow.
