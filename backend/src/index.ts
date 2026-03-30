import cors from "cors";
import express from "express";
import helmet from "helmet";
import { loadEnv } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { adminAnalyticsRouter } from "./routes/admin/analytics.js";
import { adminOrdersRouter } from "./routes/admin/orders.js";
import { adminProductsRouter } from "./routes/admin/products.js";
import { adminSettingsRouter } from "./routes/admin/settings.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";
import { ordersPublicRouter } from "./routes/ordersPublic.js";
import { productsPublicRouter } from "./routes/productsPublic.js";

const env = loadEnv();
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGINS.split(",").map((o) => o.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use("/api/v1", apiLimiter);

app.use("/api/v1", healthRouter());
app.use("/api/v1/auth", authRouter(env));
app.use("/api/v1/products", productsPublicRouter());
app.use("/api/v1/orders", ordersPublicRouter());
app.use("/api/v1/admin/products", adminProductsRouter(env));
app.use("/api/v1/admin/orders", adminOrdersRouter(env));
app.use("/api/v1/admin/analytics", adminAnalyticsRouter(env));
app.use("/api/v1/admin/settings", adminSettingsRouter(env));

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`[api] http://localhost:${env.PORT}/api/v1/health`);
});
