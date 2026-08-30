# StarX Portfolio — Run Guide

## Frontend
Open a terminal in `frontend` and run:

```bash
npm run dev
```

Then open the Vite URL shown in the terminal (normally http://localhost:5173).

## Backend (contact form)
Open a second terminal in `backend` and run:

```bash
python manage.py runserver
```

The frontend already points to `http://127.0.0.1:8000` by default and can be changed with `frontend/.env` / `VITE_API_BASE_URL`.
