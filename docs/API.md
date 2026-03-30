# REST API reference (v1)

Base URL: `http://localhost:4000` (development)

All authenticated admin routes require header: `Authorization: Bearer <access_token>`

---

## Health

### `GET /api/v1/health`

Returns `{ "ok": true, "time": "ISO-8601" }`

---

## Auth

### `POST /api/v1/auth/login`

Body (JSON):

```json
{ "email": "admin@example.com", "password": "string" }
```

Response:

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": { "id": "uuid", "email": "...", "role": "SUPER_ADMIN" }
}
```

### `POST /api/v1/auth/refresh`

Body: `{ "refreshToken": "..." }` → new access + refresh tokens.

### `POST /api/v1/auth/register` *(public signup — optional in production)*

Body: `{ "email", "password", "name?" }`

---

## Products (public read)

### `GET /api/v1/products?page=1&limit=20&categorySlug=&q=`

Paginated active products.

### `GET /api/v1/products/:slug`

Single product with variants and images.

---

## Products (admin)

Requires role `ADMIN`, `SUPER_ADMIN`, or `STAFF` (where implemented).

### `POST /api/v1/admin/products`

Create product (Zod-validated body — see `backend/src/routes/admin/products.ts`).

### `PATCH /api/v1/admin/products/:id`

### `DELETE /api/v1/admin/products/:id`

---

## Orders

### `POST /api/v1/orders` *(checkout stub)*

Creates order from cart-like payload.

### `GET /api/v1/admin/orders?page=&limit=&status=`

Admin list.

### `PATCH /api/v1/admin/orders/:id/status`

Body: `{ "status": "PROCESSING" | "SHIPPED" | ... }`

---

## Analytics (admin)

### `GET /api/v1/admin/analytics/summary`

Aggregates: revenue, order counts, top SKUs (implementation in `analytics.ts`).

---

## Store settings (admin)

### `GET /api/v1/admin/settings`

### `PATCH /api/v1/admin/settings`

---

## Error format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": { "field": "..." }
  }
}
```

---

*Extend this file as new routes ship.*
