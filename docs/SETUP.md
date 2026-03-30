# Full-stack setup (marketing site + API + admin)

## What you have now

| Part | Path | Role |
|------|------|------|
| Marketing site | repo root (`next dev` / static `out/`) | Public Luxury Estate site |
| REST API | `backend/` | Auth, products, orders, analytics, settings |
| Admin UI | `admin/` | Vite + React dashboard |

The marketing site remains **`output: "export"`** and does **not** embed the API. Point forms and future storefront features at `VITE_API_URL` / `NEXT_PUBLIC_API_URL` when you integrate.

---

## 1. Database

```bash
cd backend
docker compose up -d postgres
```

Copy `backend/.env.example` → `backend/.env` and set **JWT_ACCESS_SECRET** and **JWT_REFRESH_SECRET** to random strings **≥ 32 characters** each.

---

## 2. API

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
# or for quick local prototyping without migration files:
# npx prisma db push

npm run db:seed
npm run dev
```

- API: http://localhost:4000  
- Health: http://localhost:4000/api/v1/health  

**Seed admin:** `admin@luxuryestate.local` / `ChangeMe123!` — change immediately.

---

## 3. Admin dashboard

```bash
cd admin
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:5173 — sign in with the seeded admin.

Ensure `CORS_ORIGINS` in `backend/.env` includes `http://localhost:5173`.

---

## 4. Tests (API)

```bash
cd backend
npm test
```

---

## 5. Production notes

- Run `npx prisma migrate deploy` against production Postgres.
- Serve API behind HTTPS; rotate JWT secrets; restrict CORS to real admin origins.
- Use managed Postgres (Neon, RDS, Supabase) and optionally Redis for queues.
- Payment webhooks (Stripe / Paystack / Flutterwave) should be implemented in `backend/src` with idempotent handlers and provider signature verification.

---

## Documentation index

- [CODEBASE-ANALYSIS.md](./CODEBASE-ANALYSIS.md) — Phase 1 findings  
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Phase 2 design  
- [API.md](./API.md) — REST reference  
- `backend/README.md` — API scripts & Docker  
