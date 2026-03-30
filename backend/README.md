# Luxury Estate API

Express + Prisma + PostgreSQL. Powers admin dashboard and future storefront integrations.

## Prerequisites

- Node 20+
- Docker (optional, for Postgres + Redis)

## Quick start

```bash
cd backend
cp .env.example .env
# Edit .env — JWT secrets must be ≥32 characters

docker compose up -d postgres
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

- Health: http://localhost:4000/api/v1/health  
- Login: `POST /api/v1/auth/login` with seed user `admin@luxuryestate.local` / `ChangeMe123!`

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server with reload |
| `npm run build` | Compile TypeScript |
| `npm run db:migrate` | Prisma migrate |
| `npm run db:seed` | Seed admin + demo product |
| `npm test` | Vitest |

## Security

- Change default admin password immediately.
- Use strong `JWT_*_SECRET` values in production.
- Place payment provider secrets only in server env (never in Next.js `NEXT_PUBLIC_*`).

## Production

- Run migrations: `npx prisma migrate deploy`
- Set `NODE_ENV=production`
- Put API behind HTTPS termination (reverse proxy)
- Add Redis-backed rate limits + BullMQ workers as traffic grows
