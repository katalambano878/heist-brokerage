# Luxury Estate — Admin

Vite + React admin for the API in `../backend/`.

## Setup

```bash
cd admin
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:5173 — ensure the API is running on `VITE_API_URL` (default http://localhost:4000) and `CORS_ORIGINS` in `backend/.env` includes `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host; configure `VITE_API_URL` to your production API origin.
