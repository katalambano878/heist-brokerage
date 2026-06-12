import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/errorHandler.js";

const leadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  source: z
    .enum(["CONTACT_FORM", "LEAD_MODAL", "PROPERTY", "WHATSAPP", "OTHER"])
    .optional(),
  propertyId: z.string().uuid().optional().nullable(),
});

export function publicRouter() {
  const r = Router();

  r.get("/properties", async (req, res, next) => {
    try {
      const featured = req.query.featured === "true" ? { featured: true } : {};
      const items = await prisma.property.findMany({
        where: { status: "PUBLISHED", ...featured },
        include: { images: { orderBy: { sortOrder: "asc" } } },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/properties/:slug", async (req, res, next) => {
    try {
      const item = await prisma.property.findFirst({
        where: { slug: String(req.params.slug), status: "PUBLISHED" },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      });
      if (!item) throw new AppError(404, "NOT_FOUND", "Property not found");
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.get("/team", async (_req, res, next) => {
    try {
      const items = await prisma.teamMember.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/services", async (_req, res, next) => {
    try {
      const items = await prisma.service.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/testimonials", async (_req, res, next) => {
    try {
      const items = await prisma.testimonial.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/exclusive", async (_req, res, next) => {
    try {
      const items = await prisma.exclusiveListing.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/exclusive/:slug", async (req, res, next) => {
    try {
      const item = await prisma.exclusiveListing.findFirst({
        where: { slug: String(req.params.slug), active: true },
      });
      if (!item) throw new AppError(404, "NOT_FOUND", "Listing not found");
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.get("/settings", async (_req, res, next) => {
    try {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: "default" },
      });
      res.json(settings ?? {});
    } catch (e) {
      next(e);
    }
  });

  r.post("/leads", async (req, res, next) => {
    try {
      const body = leadSchema.parse(req.body);
      const lead = await prisma.lead.create({
        data: {
          name: body.name,
          email: body.email ?? "",
          phone: body.phone ?? "",
          message: body.message ?? "",
          source: body.source ?? "CONTACT_FORM",
          propertyId: body.propertyId ?? undefined,
        },
      });
      res.status(201).json({ id: lead.id, ok: true });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
