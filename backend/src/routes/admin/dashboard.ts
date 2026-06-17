import { Router } from "express";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";

export function adminDashboardRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];

  r.get("/", ...staff, async (_req, res, next) => {
    try {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const [
        propertiesTotal,
        propertiesPublished,
        leadsTotal,
        leadsNew,
        leadsLast30,
        teamCount,
        exclusiveCount,
        applicationsTotal,
        applicationsNew,
        recentLeads,
      ] = await Promise.all([
        prisma.property.count(),
        prisma.property.count({ where: { status: "PUBLISHED" } }),
        prisma.lead.count(),
        prisma.lead.count({ where: { status: "NEW" } }),
        prisma.lead.count({ where: { createdAt: { gte: since } } }),
        prisma.teamMember.count({ where: { active: true } }),
        prisma.exclusiveListing.count({ where: { active: true } }),
        prisma.application.count(),
        prisma.application.count({ where: { status: "NEW" } }),
        prisma.lead.findMany({
          include: {
            property: { select: { id: true, title: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 8,
        }),
      ]);

      res.json({
        propertiesTotal,
        propertiesPublished,
        leadsTotal,
        leadsNew,
        leadsLast30,
        teamCount,
        exclusiveCount,
        applicationsTotal,
        applicationsNew,
        recentLeads,
      });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
