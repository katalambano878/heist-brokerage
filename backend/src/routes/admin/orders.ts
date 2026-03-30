import type { OrderStatus } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

const STATUSES: OrderStatus[] = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const statusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export function adminOrdersRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (req, res, next) => {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
      const status = req.query.status as string | undefined;
      const where =
        status && STATUSES.includes(status as OrderStatus)
          ? { status: status as OrderStatus }
          : {};
      const [items, total] = await Promise.all([
        prisma.order.findMany({
          where,
          include: { items: { include: { product: true } }, user: true },
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.order.count({ where }),
      ]);
      res.json({
        data: items,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
      });
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id/status", ...staff, async (req, res, next) => {
    try {
      const body = statusSchema.parse(req.body);
      const order = await prisma.order.update({
        where: { id: String(req.params.id) },
        data: { status: body.status },
      });
      res.json(order);
    } catch {
      next(new AppError(404, "NOT_FOUND", "Order not found"));
    }
  });

  return r;
}
