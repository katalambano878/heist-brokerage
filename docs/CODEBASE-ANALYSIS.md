# Phase 1 — Codebase analysis (Luxury Estate / WEBSITE)

## 1. Tech stack

| Layer | Current state |
|--------|----------------|
| Framework | **Next.js 16.2** (App Router) |
| React | **19.2** |
| Styling | **CSS Modules** (no Tailwind) |
| Build | **`output: "export"`** → **fully static** HTML/CSS/JS in `out/` |
| TypeScript | Yes |
| Package manager | npm (inferred) |

## 2. Frontend architecture

- **App Router** under `app/`: `/`, `/about`, `/properties`, `/agents`, `/contact`, `not-found`.
- **Presentation components** under `components/` (Hero, Navbar, Footer, modals, etc.).
- **Data**: **`lib/data.ts`** — hard-coded TypeScript arrays (`featuredProperties`, `testimonials`, `agents`). No fetch, no React Query.
- **Client islands**: `"use client"` where needed (forms, modals, animations).
- **Images**: `next/image` with `unoptimized: true` (required for static export) and remote patterns for `picsum.photos`, `i.pinimg.com`; local assets under `public/`.

## 3. APIs & backend

- **No Route Handlers** (`app/api/**`) present.
- **Static export** means **no server-side Next.js API routes** in the static deployment artifact; any future API must be a **separate service** or you must **remove** `output: 'export'` for a Node-hosted Next app.
- **Contact / lead flows**: `ContactForm` and `LeadModal` validate on the client only; submissions are not persisted server-side in this repo.

## 4. Database

- **None.** No Prisma, SQL, or external DB clients.

## 5. Authentication

- **None.** No sessions, JWT, or OAuth in code.

## 6. Hosting assumptions

- Suited for **static hosting** (S3 + CloudFront, Netlify, Vercel static, GitHub Pages, etc.).
- **No Node runtime** required for the marketing site as built today.

---

## 7. Product reality check (important)

This repository implements a **luxury real estate marketing site** (listings, contact, brand pages), **not** a shopping cart / checkout eCommerce flow. Your requested **eCommerce admin + payments + orders** is **new capability**, not an extension of existing cart code — it belongs in a **dedicated API + admin app** (and optionally future Next.js pages that consume the API).

---

## 8. Gaps vs enterprise eCommerce goals

| Area | Gap |
|------|-----|
| Backend | Missing entirely |
| Database | Missing |
| Auth & RBAC | Missing |
| Orders / payments | Missing |
| Admin UI | Missing |
| Observability | Missing (logging/metrics TBD in API) |

## 9. Scalability & security (current site)

- **Scalability**: Static assets scale horizontally trivially; **business data** does not scale until a DB + API exist.
- **Security**: Client-only validation on forms; **no server-side validation** or CSRF tokens for submissions. **XSS**: React defaults help; no user-generated HTML rendering observed.
- **Performance**: Static pages are fast; heavy media (video, images) should stay optimized (already using `next/image` patterns).

## 10. Risks if “full eCommerce” is bolted onto this repo without architecture

- Mixing **static export** with **server APIs** in the same Next app requires **dropping static export** or **splitting apps**.
- Payment secrets must **never** ship to the browser; require a **trusted backend**.

---

## Conclusion

**Phase 1 finding:** The codebase is a **well-structured static marketing site**. A **production eCommerce platform** requires a **separate backend** (recommended: Node + Express or NestJS + PostgreSQL + Prisma), **admin SPA**, and clear **environment** and **deployment** boundaries. The deliverable in this repo adds **`backend/`** and **`admin/`** as that foundation, without breaking the existing static site.
