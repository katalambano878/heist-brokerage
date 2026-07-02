import { Resend } from "resend";

const BRAND = {
  name: "Heist Brokerage & Construction",
  color: "#2d6a5e",
  colorDark: "#1a4038",
  colorLight: "#e8f5f0",
};

let client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getEmailFrom(): string {
  return (
    process.env.EMAIL_FROM ??
    "Heist Brokerage <noreply@heistbrokerage.com>"
  );
}

export function getSiteUrl(): string {
  return (process.env.SITE_URL ?? "https://www.heistbrokerage.com").replace(
    /\/+$/,
    "",
  );
}

export function getAdminUrl(): string {
  return (process.env.ADMIN_URL ?? "https://heistbrokerage.com/admin").replace(
    /\/+$/,
    "",
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function emailLayout(body: string, preheader?: string): string {
  const siteUrl = getSiteUrl();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${BRAND.name}</title>
${preheader ? `<span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>` : ""}
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;">
<tr><td align="center" style="padding:24px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
<tr><td style="background:linear-gradient(135deg,${BRAND.color},${BRAND.colorDark});padding:28px 36px;text-align:center;">
<h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">${BRAND.name}</h1>
<p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:11px;letter-spacing:1.4px;text-transform:uppercase;">Real Estate, Reimagined</p>
</td></tr>
<tr><td style="padding:36px 36px 28px;">${body}</td></tr>
<tr><td style="background:#f9fafb;padding:20px 36px;border-top:1px solid #e5e7eb;text-align:center;">
<p style="margin:0 0 8px;font-size:13px;"><a href="${siteUrl}" style="color:${BRAND.color};text-decoration:none;">Visit website</a></p>
<p style="margin:0;color:#9ca3af;font-size:11px;">&copy; ${new Date().getFullYear()} ${BRAND.name}</p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

export function emailInfoRow(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 14px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;width:38%;">${escapeHtml(label)}</td>
<td style="padding:10px 14px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #f3f4f6;">${value}</td>
</tr>`;
}

export function emailButton(text: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px auto;"><tr>
<td style="background:${BRAND.color};border-radius:8px;"><a href="${href}" target="_blank" style="display:inline-block;padding:13px 28px;color:#fff;font-size:14px;font-weight:600;text-decoration:none;">${escapeHtml(text)}</a></td>
</tr></table>`;
}

export type EmailResult = { ok: boolean; id?: string; error?: string };

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<EmailResult> {
  const resend = getClient();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not configured — skipping");
    return { ok: false, error: "Email not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getEmailFrom(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });

    if (error) {
      console.error("[email] Failed:", error.message);
      return { ok: false, error: error.message };
    }

    console.log("[email] Sent:", opts.subject);
    return { ok: true, id: data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Email send failed";
    console.error("[email] Error:", msg);
    return { ok: false, error: msg };
  }
}
