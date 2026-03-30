# Phase 2 — Target architecture (backend + admin)

## Goals

- **Keep** the existing Next.js static site as-is for marketing (`WEBSITE` root).
- **Add** a stateful **REST API** and **admin dashboard** for catalog, orders, settings, and future integrations.
- **Ghana-friendly** payment hooks (Paystack / Flutterwave / Stripe) via provider abstraction.

## Stack decision

| Concern | Choice | Rationale |
|---------|--------|-----------|
| API runtime | **Node.js + Express 4** | Same language as frontend team; faster to ship than Nest for this scaffold; easy to migrate to Nest later. |
| Database | **PostgreSQL** | Relational fits orders, payments, inventory, coupons. |
| ORM | **Prisma** | Type-safe, migrations, great DX. |
| Validation | **Zod** | Runtime validation at API boundary. |
| Auth | **JWT access** + **refresh token** (hashed in DB) | Stateless API; RBAC via `Role` enum. |
| Caching / queues | **Optional Redis** + **BullMQ** | Docker Compose includes Redis; workers can be added without blocking v1. |
| File storage | **Local disk** in v1 (`uploads/`); swap to **S3/Cloudinary** via env | Production should set `STORAGE_DRIVER=s3` when implemented. |
| Admin UI | **Vite + React + TypeScript** | Fast dev, easy code-splitting; separate origin from static site (CORS). |

## Repository layout

```
WEBSITE/                    # existing Next static site (unchanged export)
├── docs/                   # analysis + architecture + API
├── backend/                # Express + Prisma API
│   ├── prisma/
│   ├── src/
│   └── docker-compose.yml
└── admin/                  # Vite admin SPA
```

## API style

- **REST**, versioned: `/api/v1/...`
- **JSON** everywhere; errors: `{ "error": { "code", "message", "details?" } }`
- **Pagination**: `?page=1&limit=20` for list endpoints

## Security baseline

- **Helmet** (headers), **CORS** allowlist, **express-rate-limit** on `/api/v1/auth/*`
- **bcrypt** password hashing; JWT short TTL; refresh rotation
- **Prisma** parameterized queries (SQL injection mitigation)
- **Zod** on all inputs
- **No stack traces** in production JSON errors

## Deployment (recommended)

| Service | Role |
|---------|------|
| **PostgreSQL** | Managed (RDS, Supabase, Neon, etc.) |
| **API** | Container (Fly.io, Railway, ECS, Render) |
| **Redis** | Managed or container (optional v1) |
| **Static site** | CDN (existing `out/`) |
| **Admin** | Static host or same CDN under `/admin` subdomain |

## Environment

- **`backend/.env`**: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGINS`, optional payment keys
- **`admin/.env`**: `VITE_API_URL=http://localhost:4000`

## Roadmap (remaining enterprise features)

Implemented as **stubs or follow-up PRs**: Stripe/Paystack webhooks, email (Resend/SendGrid), CSV bulk import worker, full CMS editor, invoice PDFs, comprehensive test suite.
