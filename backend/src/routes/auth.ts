import { Router } from "express";
import { z } from "zod";
import type { Env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { verifyPassword } from "../lib/password.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt.js";
import { hashToken } from "../lib/tokenHash.js";
import { AppError } from "../middleware/errorHandler.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { authMiddleware } from "../middleware/auth.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

function refreshExpiryDate(): Date {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}

export function authRouter(env: Env) {
  const r = Router();

  r.post("/login", authLimiter, async (req, res, next) => {
    try {
      const body = loginSchema.parse(req.body);
      const user = await prisma.adminUser.findUnique({ where: { email: body.email } });
      if (!user || !user.active) {
        throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
      }
      const ok = await verifyPassword(body.password, user.passwordHash);
      if (!ok) {
        throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
      }

      const accessToken = signAccessToken(env, {
        sub: user.id,
        email: user.email,
        role: user.role,
      });
      const refreshRaw = signRefreshToken(env, user.id);
      await prisma.refreshToken.create({
        data: {
          tokenHash: hashToken(refreshRaw),
          userId: user.id,
          expiresAt: refreshExpiryDate(),
        },
      });

      res.json({
        accessToken,
        refreshToken: refreshRaw,
        user: { id: user.id, email: user.email, role: user.role, name: user.name },
      });
    } catch (e) {
      next(e);
    }
  });

  r.post("/refresh", authLimiter, async (req, res, next) => {
    try {
      const body = refreshSchema.parse(req.body);
      const { sub } = verifyRefreshToken(env, body.refreshToken);
      const tokenHash = hashToken(body.refreshToken);
      const existing = await prisma.refreshToken.findFirst({
        where: { tokenHash, userId: sub },
      });
      if (!existing || existing.expiresAt < new Date()) {
        throw new AppError(401, "INVALID_REFRESH", "Refresh token invalid or expired");
      }

      await prisma.refreshToken.delete({ where: { id: existing.id } });

      const user = await prisma.adminUser.findUniqueOrThrow({ where: { id: sub } });
      if (!user.active) {
        throw new AppError(401, "INVALID_REFRESH", "Account disabled");
      }
      const accessToken = signAccessToken(env, {
        sub: user.id,
        email: user.email,
        role: user.role,
      });
      const refreshRaw = signRefreshToken(env, user.id);
      await prisma.refreshToken.create({
        data: {
          tokenHash: hashToken(refreshRaw),
          userId: user.id,
          expiresAt: refreshExpiryDate(),
        },
      });

      res.json({
        accessToken,
        refreshToken: refreshRaw,
        user: { id: user.id, email: user.email, role: user.role, name: user.name },
      });
    } catch (e) {
      next(e);
    }
  });

  r.get("/me", authMiddleware(env), async (req, res, next) => {
    try {
      const user = await prisma.adminUser.findUniqueOrThrow({
        where: { id: req.user!.sub },
        select: { id: true, email: true, name: true, role: true },
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
