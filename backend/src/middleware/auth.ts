import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import type { Env } from "../config/env.js";
import { verifyAccessToken, type AccessPayload } from "../lib/jwt.js";
import { AppError } from "./errorHandler.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: AccessPayload;
  }
}

export function authMiddleware(env: Env) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      next(new AppError(401, "UNAUTHORIZED", "Missing bearer token"));
      return;
    }
    const token = header.slice(7);
    try {
      req.user = verifyAccessToken(env, token);
      next();
    } catch {
      next(new AppError(401, "UNAUTHORIZED", "Invalid or expired token"));
    }
  };
}

export function requireRole(...allowed: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "UNAUTHORIZED", "Not authenticated"));
      return;
    }
    if (!allowed.includes(req.user.role)) {
      next(new AppError(403, "FORBIDDEN", "Insufficient permissions"));
      return;
    }
    next();
  };
}
