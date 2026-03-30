import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/errorHandler.js";

const lineSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional().nullable(),
  quantity: z.number().int().min(1).max(999),
});

const checkoutSchema = z.object({
  currency: z.string().length(3).default("GHS"),
  items: z.array(lineSchema).min(1),
  shippingAddress: z.record(z.unknown()).optional(),
  billingAddress: z.record(z.unknown()).optional(),
  userId: z.string().uuid().optional(),
});

/** Minimal checkout: creates order + pending payment (gateway integration later) */
export function ordersPublicRouter() {
  const r = Router();

  r.post("/", async (req, res, next) => {
    try {
      const body = checkoutSchema.parse(req.body);
      const products = await prisma.product.findMany({
        where: { id: { in: body.items.map((i) => i.productId) }, status: "ACTIVE" },
        include: { variants: true },
      });
      if (products.length !== body.items.length) {
        throw new AppError(400, "INVALID_ITEMS", "One or more products invalid");
      }

      let subtotal = 0;
      const lines: { productId: string; variantId: string | null; quantity: number; unit: number }[] =
        [];
      for (const line of body.items) {
        const p = products.find((x) => x.id === line.productId);
        if (!p) throw new AppError(400, "INVALID_ITEMS", "Product mismatch");
        let unit = Number(p.price);
        if (line.variantId) {
          const v = p.variants.find((x) => x.id === line.variantId);
          if (!v) throw new AppError(400, "INVALID_VARIANT", "Invalid variant");
          if (v.price != null) unit = Number(v.price);
        }
        subtotal += unit * line.quantity;
        lines.push({
          productId: p.id,
          variantId: line.variantId ?? null,
          quantity: line.quantity,
          unit,
        });
      }

      const tax = 0;
      const shipping = 0;
      const total = subtotal + tax + shipping;

      const order = await prisma.order.create({
        data: {
          userId: body.userId,
          currency: body.currency,
          subtotal: String(subtotal),
          taxTotal: String(tax),
          shippingTotal: String(shipping),
          discountTotal: "0",
          total: String(total),
          shippingAddress: body.shippingAddress as object,
          billingAddress: body.billingAddress as object,
          status: "PENDING",
          items: {
            create: lines.map((l) => ({
              productId: l.productId,
              variantId: l.variantId,
              quantity: l.quantity,
              unitPrice: String(l.unit),
            })),
          },
          payments: {
            create: [
              {
                provider: "manual",
                status: "PENDING",
                amount: String(total),
                currency: body.currency,
              },
            ],
          },
        },
      });

      res.status(201).json({ orderId: order.id, total: String(total), currency: body.currency });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
