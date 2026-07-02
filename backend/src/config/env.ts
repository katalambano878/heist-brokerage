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
  /** Resend — transactional email (https://resend.com) */
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  SITE_URL: z.string().optional(),
  ADMIN_URL: z.string().optional(),
  /** Team inboxes for admin alerts */
  NOTIFY_EMAIL_CORPORATE: z.string().optional(),
  NOTIFY_EMAIL_HR: z.string().optional(),
  NOTIFY_EMAIL_GENERAL: z.string().optional(),
  /** Staff mobiles for SMS alerts (Ghana format ok) */
  NOTIFY_PHONE_CORPORATE: z.string().optional(),
  NOTIFY_PHONE_HR: z.string().optional(),
  NOTIFY_PHONE_GENERAL: z.string().optional(),
  /** Moolre SMS VAS key — https://docs.moolre.com/#/send-sms */
  MOOLRE_SMS_API_KEY: z.string().optional(),
  MOOLRE_API_KEY: z.string().optional(),
  SMS_SENDER_ID: z.string().optional(),
  MOOLRE_SMS_SENDER_ID: z.string().optional(),
  DEFAULT_COUNTRY_CODE: z.string().optional(),
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
