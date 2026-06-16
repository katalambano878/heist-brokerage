import path from "node:path";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("7d"),
  CORS_ORIGINS: z.string().default("http://localhost:3000,http://localhost:5173"),
  /** Directory where uploaded images are stored (served at /uploads) */
  UPLOAD_DIR: z.string().default(path.resolve(process.cwd(), "uploads")),
  /** Public base URL of this API, used to build absolute upload URLs */
  PUBLIC_API_URL: z.string().default("http://localhost:4000"),
  /** Coolify deploy endpoint for the public site (triggers a rebuild on Publish) */
  COOLIFY_DEPLOY_URL: z.string().default(""),
  /** Bearer token for the Coolify deploy endpoint */
  COOLIFY_DEPLOY_TOKEN: z.string().default(""),
});

export type Env = z.infer<typeof schema>;

export function loadEnv(): Env {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Copy backend/.env.example to backend/.env");
  }
  return parsed.data;
}
