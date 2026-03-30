import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/errorHandler.js";

const listQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(),
});

export function productsPublicRouter() {
  const r = Router();

  r.get("/", async (req, res, next) => {
    try {
      const q = listQuery.parse(req.query);
      const where = {
        status: "ACTIVE" as const,
        ...(q.q
          ? {
              OR: [
                { title: { contains: q.q, mode: "insensitive" as const } },
                { description: { contains: q.q, mode: "insensitive" as const } },
              ],
            }
          : {}),
      };
      const [items, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, category: true },
          orderBy: { updatedAt: "desc" },
          skip: (q.page - 1) * q.limit,
          take: q.limit,
        }),
        prisma.product.count({ where }),
      ]);
      res.json({
        data: items,
        meta: { page: q.page, limit: q.limit, total, totalPages: Math.ceil(total / q.limit) },
      });
    } catch (e) {
      next(e);
    }
  });

  r.get("/:slug", async (req, res, next) => {
    try {
      const product = await prisma.product.findFirst({
        where: { slug: req.params.slug, status: "ACTIVE" },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          variants: true,
          category: true,
        },
      });
      if (!product) {
        throw new AppError(404, "NOT_FOUND", "Product not found");
      }
      res.json(product);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
