import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

const STATUSES = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "HIRED",
  "REJECTED",
] as const;

const updateSchema = z.object({
  status: z.enum(STATUSES).optional(),
});

export function adminApplicationsRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (req, res, next) => {
    try {
      const status = String(req.query.status ?? "");
      const q = String(req.query.q ?? "").trim();
      const where = {
        ...(STATUSES.includes(status as (typeof STATUSES)[number])
          ? { status: status as (typeof STATUSES)[number] }
          : {}),
        ...(q
          ? {
              OR: [
                { fullName: { contains: q, mode: "insensitive" as const } },
                { email: { contains: q, mode: "insensitive" as const } },
                { phone: { contains: q, mode: "insensitive" as const } },
                { position: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {}),
      };
      const items = await prisma.application.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id", ...staff, async (req, res, next) => {
    try {
      const item = await prisma.application.findUnique({
        where: { id: String(req.params.id) },
      });
      if (!item) throw new AppError(404, "NOT_FOUND", "Application not found");
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id", ...staff, async (req, res, next) => {
    try {
      const body = updateSchema.parse(req.body);
      const item = await prisma.application.update({
        where: { id: String(req.params.id) },
        data: body,
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.delete("/:id", ...staff, async (req, res, next) => {
    try {
      await prisma.application.delete({ where: { id: String(req.params.id) } });
      res.status(204).send();
    } catch {
      next(new AppError(404, "NOT_FOUND", "Application not found"));
    }
  });

  return r;
}
