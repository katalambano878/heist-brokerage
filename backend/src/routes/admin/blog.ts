import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

const postCreate = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens"),
  title: z.string().min(1),
  excerpt: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  coverAlt: z.string().optional().default(""),
  body: z.string().optional().default(""),
  author: z.string().optional().default(""),
  category: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("DRAFT"),
});

const postUpdate = postCreate.partial();

/**
 * Admin CRUD for blog posts. `publishedAt` is managed automatically: it is set
 * the first time a post becomes PUBLISHED and cleared when reverted to DRAFT.
 */
export function adminBlogRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (_req, res, next) => {
    try {
      const items = await prisma.post.findMany({
        orderBy: [{ createdAt: "desc" }],
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id", ...staff, async (req, res, next) => {
    try {
      const item = await prisma.post.findUnique({
        where: { id: String(req.params.id) },
      });
      if (!item) throw new AppError(404, "NOT_FOUND", "Post not found");
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.post("/", ...staff, async (req, res, next) => {
    try {
      const body = postCreate.parse(req.body);
      const item = await prisma.post.create({
        data: {
          ...body,
          publishedAt: body.status === "PUBLISHED" ? new Date() : null,
        },
      });
      res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id", ...staff, async (req, res, next) => {
    try {
      const body = postUpdate.parse(req.body);
      const existing = await prisma.post.findUnique({
        where: { id: String(req.params.id) },
      });
      if (!existing) throw new AppError(404, "NOT_FOUND", "Post not found");

      let publishedAt = existing.publishedAt;
      if (body.status === "PUBLISHED" && !existing.publishedAt) {
        publishedAt = new Date();
      } else if (body.status === "DRAFT") {
        publishedAt = null;
      }

      const item = await prisma.post.update({
        where: { id: String(req.params.id) },
        data: { ...body, publishedAt },
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.delete("/:id", ...staff, async (req, res, next) => {
    try {
      await prisma.post.delete({ where: { id: String(req.params.id) } });
      res.status(204).send();
    } catch {
      next(new AppError(404, "NOT_FOUND", "Post not found"));
    }
  });

  return r;
}
