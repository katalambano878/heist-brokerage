import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

const STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "VIEWING",
  "NEGOTIATING",
  "WON",
  "LOST",
] as const;

const updateSchema = z.object({
  status: z.enum(STATUSES).optional(),
});

const noteSchema = z.object({
  body: z.string().min(1).max(4000),
});

export function adminLeadsRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (req, res, next) => {
    try {
      const status = String(req.query.status ?? "");
      const q = String(req.query.q ?? "").trim();
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
      const where = {
        ...(STATUSES.includes(status as (typeof STATUSES)[number])
          ? { status: status as (typeof STATUSES)[number] }
          : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" as const } },
                { email: { contains: q, mode: "insensitive" as const } },
                { phone: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {}),
      };
      const [items, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          include: {
            property: { select: { id: true, title: true, slug: true } },
          },
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.lead.count({ where }),
      ]);
      res.json({
        data: items,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
      });
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id", ...staff, async (req, res, next) => {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id: String(req.params.id) },
        include: {
          property: { select: { id: true, title: true, slug: true } },
          notes: {
            include: { author: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
      });
      if (!lead) throw new AppError(404, "NOT_FOUND", "Lead not found");
      res.json(lead);
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id", ...staff, async (req, res, next) => {
    try {
      const body = updateSchema.parse(req.body);
      const lead = await prisma.lead.update({
        where: { id: String(req.params.id) },
        data: body,
      });
      res.json(lead);
    } catch (e) {
      next(e);
    }
  });

  r.post("/:id/notes", ...staff, async (req, res, next) => {
    try {
      const body = noteSchema.parse(req.body);
      const note = await prisma.leadNote.create({
        data: {
          leadId: String(req.params.id),
          authorId: req.user!.sub,
          body: body.body,
        },
        include: { author: { select: { id: true, name: true, email: true } } },
      });
      res.status(201).json(note);
    } catch (e) {
      next(e);
    }
  });

  r.delete("/:id", ...staff, async (req, res, next) => {
    try {
      await prisma.lead.delete({ where: { id: String(req.params.id) } });
      res.status(204).send();
    } catch {
      next(new AppError(404, "NOT_FOUND", "Lead not found"));
    }
  });

  return r;
}
