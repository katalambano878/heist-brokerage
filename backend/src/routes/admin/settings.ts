import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";

const settingsSchema = z.object({
  phones: z.array(z.string()).optional(),
  whatsapp: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  email: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  facebook: z.string().optional(),
  aboutImage: z.string().optional(),
  trustStats: z
    .array(
      z.object({
        label: z.string(),
        target: z.number(),
        suffix: z.string().optional(),
      }),
    )
    .optional(),
});

export function adminSettingsRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (_req, res, next) => {
    try {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: "default" },
      });
      res.json(settings ?? {});
    } catch (e) {
      next(e);
    }
  });

  r.put("/", ...staff, async (req, res, next) => {
    try {
      const body = settingsSchema.parse(req.body);
      const settings = await prisma.siteSettings.upsert({
        where: { id: "default" },
        update: body,
        create: { id: "default", ...body },
      });
      res.json(settings);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
