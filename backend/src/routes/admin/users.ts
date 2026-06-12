import { Router } from "express";
import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { hashPassword } from "../../lib/password.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

const createSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "STAFF"]).optional().default("STAFF"),
});

const updateSchema = z.object({
  name: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "STAFF"]).optional(),
  active: z.boolean().optional(),
  password: z.string().min(8).optional(),
});

const select = {
  id: true,
  email: true,
  name: true,
  role: true,
  active: true,
  createdAt: true,
};

export function adminUsersRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const superOnly = [auth, requireRole("SUPER_ADMIN")];

  r.get("/", ...superOnly, async (_req, res, next) => {
    try {
      const users = await prisma.adminUser.findMany({
        select,
        orderBy: { createdAt: "asc" },
      });
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  });

  r.post("/", ...superOnly, async (req, res, next) => {
    try {
      const body = createSchema.parse(req.body);
      const exists = await prisma.adminUser.findUnique({
        where: { email: body.email },
      });
      if (exists) throw new AppError(409, "EMAIL_EXISTS", "Email already in use");
      const user = await prisma.adminUser.create({
        data: {
          email: body.email,
          passwordHash: await hashPassword(body.password),
          name: body.name,
          role: body.role,
        },
        select,
      });
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id", ...superOnly, async (req, res, next) => {
    try {
      const body = updateSchema.parse(req.body);
      const data: Record<string, unknown> = {
        name: body.name,
        role: body.role,
        active: body.active,
      };
      if (body.password) data.passwordHash = await hashPassword(body.password);
      const user = await prisma.adminUser.update({
        where: { id: String(req.params.id) },
        data,
        select,
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  r.delete("/:id", ...superOnly, async (req, res, next) => {
    try {
      if (req.params.id === req.user!.sub) {
        throw new AppError(400, "SELF_DELETE", "You cannot delete your own account");
      }
      await prisma.adminUser.delete({ where: { id: String(req.params.id) } });
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  return r;
}
