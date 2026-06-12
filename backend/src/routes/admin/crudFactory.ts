import { Router } from "express";
import type { z } from "zod";
import type { Env } from "../../config/env.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

/** Minimal Prisma-delegate surface needed for simple CRUD entities.
 *  Method-style signatures keep parameter checking bivariant so the
 *  generated Prisma delegates remain assignable. */
type Delegate = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findMany(args?: any): Promise<unknown[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findUnique(args: any): Promise<unknown | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(args: any): Promise<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(args: any): Promise<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(args: any): Promise<unknown>;
};

type CrudOptions = {
  delegate: Delegate;
  createSchema: z.ZodTypeAny;
  updateSchema: z.ZodTypeAny;
  orderBy?: object[];
};

/**
 * Standard admin CRUD router: list, get, create, patch, delete, and a
 * bulk reorder endpoint (PUT /reorder with { ids: [...] }).
 */
export function crudRouter(env: Env, opts: CrudOptions) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (_req, res, next) => {
    try {
      const items = await opts.delegate.findMany({
        orderBy: opts.orderBy ?? [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      res.json({ data: items });
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id", ...staff, async (req, res, next) => {
    try {
      const item = await opts.delegate.findUnique({
        where: { id: String(req.params.id) },
      });
      if (!item) throw new AppError(404, "NOT_FOUND", "Not found");
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

  r.post("/", ...staff, async (req, res, next) => {
    try {
      const body = opts.createSchema.parse(req.body);
      const item = await opts.delegate.create({ data: body });
      res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  });

  r.put("/reorder", ...staff, async (req, res, next) => {
    try {
      const ids: string[] = Array.isArray(req.body?.ids) ? req.body.ids : [];
      await Promise.all(
        ids.map((id, i) =>
          opts.delegate.update({ where: { id }, data: { sortOrder: i } }),
        ),
      );
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  });

  r.patch("/:id", ...staff, async (req, res, next) => {
    try {
      const body = opts.updateSchema.parse(req.body);
      const item = await opts.delegate.update({
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
      await opts.delegate.delete({ where: { id: String(req.params.id) } });
      res.status(204).send();
    } catch {
      next(new AppError(404, "NOT_FOUND", "Not found"));
    }
  });

  return r;
}
