import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";

const patchSchema = z.object({
  storeName: z.string().min(1).optional(),
  contactEmail: z.string().email().optional(),
  currency: z.string().min(3).max(3).optional(),
  taxRate: z.string().or(z.number()).optional(),
  logoUrl: z.string().url().optional().nullable(),
});

export function adminSettingsRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN")];

  r.get("/", ...staff, async (_req, res, next) => {
    try {
      const settings = await prisma.storeSettings.findUnique({
        where: { id: "default" },
      });
      res.json(settings);
    } catch (e) {
      next(e);
    }
  });

  r.patch("/", ...staff, async (req, res, next) => {
    try {
      const body = patchSchema.parse(req.body);
      const data: Record<string, unknown> = { ...body };
      if (body.taxRate != null) data.taxRate = String(body.taxRate);
      const settings = await prisma.storeSettings.upsert({
        where: { id: "default" },
        create: {
          id: "default",
          storeName: (body.storeName as string) ?? "Luxury Estate Store",
          contactEmail: (body.contactEmail as string) ?? "admin@example.com",
          currency: body.currency ?? "GHS",
          taxRate: body.taxRate != null ? String(body.taxRate) : "0",
          logoUrl: body.logoUrl ?? undefined,
        },
        update: data as object,
      });
      res.json(settings);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
