import jwt, { type SignOptions } from "jsonwebtoken";
import type { Role } from "@prisma/client";
import type { Env } from "../config/env.js";

export type AccessPayload = { sub: string; email: string; role: Role };

const signOpts = (expiresIn: string): SignOptions => ({ expiresIn: expiresIn as SignOptions["expiresIn"] });

export function signAccessToken(
  env: Env,
  payload: AccessPayload,
): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, signOpts(env.JWT_ACCESS_EXPIRES));
}

export function verifyAccessToken(env: Env, token: string): AccessPayload {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
  if (typeof decoded !== "object" || decoded === null || !("sub" in decoded)) {
    throw new Error("Invalid token");
  }
  return decoded as AccessPayload;
}

export function signRefreshToken(env: Env, sub: string): string {
  return jwt.sign({ sub }, env.JWT_REFRESH_SECRET, signOpts(env.JWT_REFRESH_EXPIRES));
}

export function verifyRefreshToken(env: Env, token: string): { sub: string } {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
  if (typeof decoded !== "object" || decoded === null || !("sub" in decoded)) {
    throw new Error("Invalid refresh token");
  }
  return { sub: (decoded as { sub: string }).sub };
}
