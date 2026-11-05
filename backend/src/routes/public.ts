import { Router } from "express";
import { z } from "zod";
import type { Env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { createUploader, uploadUrl } from "../lib/uploads.js";
import {
  notifyApplicationCreated,
  notifyLeadCreated,
} from "../lib/notifications/index.js";
import { AppError } from "../middleware/errorHandler.js";
import { portraitLimiter } from "../middleware/rateLimit.js";

const emailField = z.string().trim().email("Enter a valid email address.");
const phoneField = z
  .string()
  .trim()
  .min(1, "Phone number is required.")
  .max(40)
  .refine(
    (value) => value.replace(/\D/g, "").length >= 9,
    "Enter a valid phone number.",
  );

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(200),
  email: emailField,
  phone: phoneField,
  message: z.string().max(4000).optional().or(z.literal("")),
  source: z
    .enum(["CONTACT_FORM", "LEAD_MODAL", "PROPERTY", "WHATSAPP", "OTHER"])
    .optional(),
  propertyId: z.string().uuid().optional().nullable(),
});

const applicationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(200),
  email: emailField,
  phone: phoneField,
  position: z.string().trim().min(1, "Please select a position.").max(200),
  experience: z.string().trim().min(1, "Years of experience is required.").max(100),
  portfolio: z.string().max(500).optional().or(z.literal("")),
  portraitUrl: z
    .string()
    .trim()
    .min(1, "A portrait photo is required.")
    .max(500)
    .refine((url) => url.includes("/uploads/"), "Upload a portrait photo."),
  message: z.string().trim().min(12, "Tell us a little about yourself.").max(4000),
});

export function publicRouter(env: Env) {
  const uploader = createUploader(env);
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

  r.get("/jobs", async (_req, res, next) => {
    try {
      const items = await prisma.jobOpening.findMany({
        where: { active: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      res.json({ data: items });
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

  r.get("/posts", async (_req, res, next) => {
    try {
      const items = await prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/posts/:slug", async (req, res, next) => {
    try {
      const item = await prisma.post.findFirst({
        where: { slug: String(req.params.slug), status: "PUBLISHED" },
      });
      if (!item) throw new AppError(404, "NOT_FOUND", "Post not found");
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

  r.post("/uploads/portrait", portraitLimiter, uploader.single("file"), (req, res, next) => {
    if (!req.file) {
      next(new AppError(400, "NO_FILE", "Choose a portrait photo."));
      return;
    }
    res.status(201).json({ url: uploadUrl(env, req.file.filename) });
  });

  r.post("/applications", async (req, res, next) => {
    try {
      const body = applicationSchema.parse(req.body);
      const application = await prisma.application.create({
        data: {
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          position: body.position,
          experience: body.experience,
          portfolio: body.portfolio ?? "",
          portraitUrl: body.portraitUrl,
          message: body.message,
        },
      });
      notifyApplicationCreated(application);
      res.status(201).json({ id: application.id, ok: true });
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
          email: body.email,
          phone: body.phone,
          message: body.message ?? "",
          source: body.source ?? "CONTACT_FORM",
          propertyId: body.propertyId ?? undefined,
        },
      });
      notifyLeadCreated(lead);
      res.status(201).json({ id: lead.id, ok: true });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
