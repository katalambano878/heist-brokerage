import { Router } from "express";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";

export function adminAnalyticsRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/summary", ...staff, async (_req, res, next) => {
    try {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const [orderAgg, revenue, topProducts] = await Promise.all([
        prisma.order.groupBy({
          by: ["status"],
          _count: { id: true },
          where: { createdAt: { gte: since } },
        }),
        prisma.order.aggregate({
          where: { createdAt: { gte: since }, status: { not: "CANCELLED" } },
          _sum: { total: true },
        }),
        prisma.orderItem.groupBy({
          by: ["productId"],
          _sum: { quantity: true },
          orderBy: { _sum: { quantity: "desc" } },
          take: 5,
        }),
      ]);

      const productIds = topProducts.map((t: { productId: string }) => t.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, title: true, slug: true },
      });
      const top = topProducts.map((t: (typeof topProducts)[number]) => ({
        ...t,
        product: products.find((p: { id: string }) => p.id === t.productId),
      }));

      res.json({
        periodDays: 30,
        ordersByStatus: orderAgg,
        revenue30d: revenue._sum.total?.toString() ?? "0",
        topProducts: top,
      });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
