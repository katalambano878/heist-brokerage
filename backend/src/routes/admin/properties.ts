import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

const propertySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  location: z.string().min(1),
  price: z.string().min(1),
  beds: z.number().int().min(0).optional().default(0),
  baths: z.number().int().min(0).optional().default(0),
  sqft: z.string().optional().default(""),
  tag: z.string().optional().default(""),
  type: z.string().optional().default(""),
  category: z.enum(["sale", "rent", "land"]).optional().default("sale"),
  region: z.string().optional().default(""),
  description: z.string().optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

const imageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().optional().default(""),
});

export function adminPropertiesRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (req, res, next) => {
    try {
      const q = String(req.query.q ?? "").trim();
      const status = String(req.query.status ?? "");
      const where = {
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" as const } },
                { location: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {}),
        ...(status && ["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)
          ? { status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
          : {}),
      };
      const items = await prisma.property.findMany({
        where,
        include: { images: { orderBy: { sortOrder: "asc" } } },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id", ...staff, async (req, res, next) => {
    try {
      const item = await prisma.property.findUnique({
        where: { id: String(req.params.id) },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      });
      if (!item) throw new AppError(404, "NOT_FOUND", "Property not found");
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.post("/", ...staff, async (req, res, next) => {
    try {
      const body = propertySchema.parse(req.body);
      const item = await prisma.property.create({
        data: body,
        include: { images: true },
      });
      res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id", ...staff, async (req, res, next) => {
    try {
      const body = propertySchema.partial().parse(req.body);
      const item = await prisma.property.update({
        where: { id: String(req.params.id) },
        data: body,
        include: { images: { orderBy: { sortOrder: "asc" } } },
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.delete("/:id", ...staff, async (req, res, next) => {
    try {
      await prisma.property.delete({ where: { id: String(req.params.id) } });
      res.status(204).send();
    } catch {
      next(new AppError(404, "NOT_FOUND", "Property not found"));
    }
  });

  // ----- Images -----

  r.post("/:id/images", ...staff, async (req, res, next) => {
    try {
      const body = imageSchema.parse(req.body);
      const propertyId = String(req.params.id);
      const count = await prisma.propertyImage.count({ where: { propertyId } });
      const image = await prisma.propertyImage.create({
        data: { propertyId, url: body.url, alt: body.alt, sortOrder: count },
      });
      res.status(201).json(image);
    } catch (e) {
      next(e);
    }
  });

  r.put("/:id/images/reorder", ...staff, async (req, res, next) => {
    try {
      const ids: string[] = Array.isArray(req.body?.ids) ? req.body.ids : [];
      await Promise.all(
        ids.map((imageId, i) =>
          prisma.propertyImage.update({
            where: { id: imageId },
            data: { sortOrder: i },
          }),
        ),
      );
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  });

  r.delete("/:id/images/:imageId", ...staff, async (req, res, next) => {
    try {
      await prisma.propertyImage.delete({
        where: { id: String(req.params.imageId) },
      });
      res.status(204).send();
    } catch {
      next(new AppError(404, "NOT_FOUND", "Image not found"));
    }
  });

  return r;
}
