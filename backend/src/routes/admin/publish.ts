import { Router } from "express";
import type { Env } from "../../config/env.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

/**
 * Triggers a rebuild of the public static site so the latest database content
 * is regenerated into the deployed HTML. Wired to a Coolify deploy endpoint.
 */
export function adminPublishRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN")];

  r.post("/", ...staff, async (_req, res, next) => {
    try {
      if (!env.COOLIFY_DEPLOY_URL) {
        throw new AppError(
          503,
          "NOT_CONFIGURED",
          "Publishing is not configured. Set COOLIFY_DEPLOY_URL.",
        );
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (env.COOLIFY_DEPLOY_TOKEN) {
        headers["Authorization"] = `Bearer ${env.COOLIFY_DEPLOY_TOKEN}`;
      }

      // Force a no-cache rebuild. The site fetches admin content at build time,
      // so a cached Docker build would reuse stale content and publish nothing.
      // Coolify only accepts POST on this endpoint; GET returns 405 and the
      // phone browser surfaces that failed request as "Load failed".
      const deployUrl = new URL(env.COOLIFY_DEPLOY_URL);
      deployUrl.searchParams.set("force", "true");

      let resp: Response;
      try {
        resp = await fetch(deployUrl.toString(), {
          method: "POST",
          headers,
          signal: AbortSignal.timeout(20_000),
        });
      } catch (err) {
        console.error("[publish] could not reach deploy service", err);
        throw new AppError(
          502,
          "DEPLOY_FAILED",
          "Could not reach the hosting service. Try again in a moment.",
        );
      }
      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        console.error(`[publish] deploy trigger failed status=${resp.status}`);
        throw new AppError(
          502,
          "DEPLOY_FAILED",
          `Deploy trigger failed (${resp.status}). ${text.slice(0, 200)}`,
        );
      }

      res.json({ ok: true, message: "Publish started. The live site rebuilds in 1-2 minutes." });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
