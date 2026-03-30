import { Router } from "express";
import { z } from "zod";
import type { Env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt.js";
import { hashToken } from "../lib/tokenHash.js";
import { AppError } from "../middleware/errorHandler.js";
import { authLimiter } from "../middleware/rateLimit.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
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
      const user = await prisma.user.findUnique({ where: { email: body.email } });
      if (!user) {
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

      const user = await prisma.user.findUniqueOrThrow({ where: { id: sub } });
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

  r.post("/register", authLimiter, async (req, res, next) => {
    try {
      const body = registerSchema.parse(req.body);
      const exists = await prisma.user.findUnique({ where: { email: body.email } });
      if (exists) {
        throw new AppError(409, "EMAIL_EXISTS", "Email already registered");
      }
      const passwordHash = await hashPassword(body.password);
      const user = await prisma.user.create({
        data: {
          email: body.email,
          passwordHash,
          name: body.name,
          role: "CUSTOMER",
        },
      });
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
      res.status(201).json({
        accessToken,
        refreshToken: refreshRaw,
        user: { id: user.id, email: user.email, role: user.role, name: user.name },
      });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
