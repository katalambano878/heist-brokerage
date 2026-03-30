import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  sku: z.string().optional(),
  price: z.string().or(z.number()),
  compareAtPrice: z.string().or(z.number()).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  categoryId: z.string().uuid().optional().nullable(),
  trackInventory: z.boolean().optional(),
});

export function adminProductsRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (req, res, next) => {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
      const [items, total] = await Promise.all([
        prisma.product.findMany({
          include: { category: true, images: { take: 1 } },
          orderBy: { updatedAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.product.count(),
      ]);
      res.json({
        data: items,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
      });
    } catch (e) {
      next(e);
    }
  });

  r.post("/", ...staff, async (req, res, next) => {
    try {
      const body = createSchema.parse(req.body);
      const price = String(body.price);
      const product = await prisma.product.create({
        data: {
          title: body.title,
          slug: body.slug,
          description: body.description,
          sku: body.sku,
          price,
          compareAtPrice: body.compareAtPrice != null ? String(body.compareAtPrice) : undefined,
          status: body.status ?? "DRAFT",
          categoryId: body.categoryId ?? undefined,
          trackInventory: body.trackInventory ?? true,
        },
      });
      res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id", ...staff, async (req, res, next) => {
    try {
      const partial = createSchema.partial().parse(req.body);
      const data: Record<string, unknown> = { ...partial };
      if (partial.price != null) data.price = String(partial.price);
      if (partial.compareAtPrice != null) data.compareAtPrice = String(partial.compareAtPrice);
      const product = await prisma.product.update({
        where: { id: String(req.params.id) },
        data: data as object,
      });
      res.json(product);
    } catch (e) {
      next(e);
    }
  });

  r.delete("/:id", ...staff, async (req, res, next) => {
    try {
      await prisma.product.delete({ where: { id: String(req.params.id) } });
      res.status(204).send();
    } catch {
      next(new AppError(404, "NOT_FOUND", "Product not found"));
    }
  });

  return r;
}
