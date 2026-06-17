import cors from "cors";
import express from "express";
import helmet from "helmet";
import { loadEnv } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { adminDashboardRouter } from "./routes/admin/dashboard.js";
import { adminLeadsRouter } from "./routes/admin/leads.js";
import { adminPropertiesRouter } from "./routes/admin/properties.js";
import { adminSettingsRouter } from "./routes/admin/settings.js";
import { adminApplicationsRouter } from "./routes/admin/applications.js";
import { adminPublishRouter } from "./routes/admin/publish.js";
import { adminUploadsRouter } from "./routes/admin/uploads.js";
import { adminUsersRouter } from "./routes/admin/users.js";
import {
  adminExclusiveRouter,
  adminServicesRouter,
  adminTeamRouter,
  adminTestimonialsRouter,
} from "./routes/admin/content.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";
import { publicRouter } from "./routes/public.js";

const env = loadEnv();
const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: env.CORS_ORIGINS.split(",").map((o) => o.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));

// Uploaded images (long cache; filenames are content-unique)
app.use(
  "/uploads",
  express.static(env.UPLOAD_DIR, { maxAge: "30d", immutable: true }),
);

app.use("/api/v1", apiLimiter);

app.use("/api/v1", healthRouter());
app.use("/api/v1/auth", authRouter(env));
app.use("/api/v1", publicRouter());

app.use("/api/v1/admin/dashboard", adminDashboardRouter(env));
app.use("/api/v1/admin/properties", adminPropertiesRouter(env));
app.use("/api/v1/admin/leads", adminLeadsRouter(env));
app.use("/api/v1/admin/team", adminTeamRouter(env));
app.use("/api/v1/admin/services", adminServicesRouter(env));
app.use("/api/v1/admin/testimonials", adminTestimonialsRouter(env));
app.use("/api/v1/admin/exclusive", adminExclusiveRouter(env));
app.use("/api/v1/admin/settings", adminSettingsRouter(env));
app.use("/api/v1/admin/users", adminUsersRouter(env));
app.use("/api/v1/admin/uploads", adminUploadsRouter(env));
app.use("/api/v1/admin/publish", adminPublishRouter(env));
app.use("/api/v1/admin/applications", adminApplicationsRouter(env));

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`[api] http://localhost:${env.PORT}/api/v1/health`);
});
