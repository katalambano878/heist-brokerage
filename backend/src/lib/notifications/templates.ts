import type { Application, Lead } from "@prisma/client";
import {
  emailButton,
  emailInfoRow,
  emailLayout,
  getAdminUrl,
  getSiteUrl,
} from "../email/resend.js";

/** Normalized event type used for template selection. */
export type NotificationEvent =
  | "CONTACT_FORM"
  | "LEAD_MODAL"
  | "SAVE_BUY"
  | "BROCHURE"
  | "PROPERTY"
  | "APPLICATION";

export function classifyLeadEvent(lead: Pick<Lead, "source" | "message">): NotificationEvent {
  const msg = lead.message ?? "";
  if (msg.startsWith("Brochure request:")) return "BROCHURE";
  if (msg.includes("Save & Buy Program")) return "SAVE_BUY";
  if (lead.source === "LEAD_MODAL") return "LEAD_MODAL";
  if (lead.source === "PROPERTY") return "PROPERTY";
  return "CONTACT_FORM";
}

function firstName(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safe(value: string | null | undefined): string {
  return (value ?? "").trim();
}

function brochureTitle(message: string): string {
  return message.replace(/^Brochure request:\s*/i, "").trim() || "Exclusive listing";
}

function intentFromMessage(message: string): string {
  const match = message.match(/looking to:\s*(.+?)(?:\n|$)/i);
  return match?.[1]?.trim() ?? "";
}

// ---------------------------------------------------------------------------
// Customer SMS templates
// ---------------------------------------------------------------------------

export function customerSmsLead(
  event: NotificationEvent,
  lead: Pick<Lead, "name" | "message">,
): string {
  const name = firstName(lead.name);
  const site = getSiteUrl();

  switch (event) {
    case "CONTACT_FORM":
      return `Hi ${name}, thank you for contacting Heist Brokerage & Construction. We received your message and a specialist will reply within 1 business day. ${site}`;

    case "LEAD_MODAL": {
      const intent = intentFromMessage(lead.message ?? "");
      const intentPart = intent ? ` re: ${intent}` : "";
      return `Hi ${name}, your strategy call request${intentPart} is confirmed. A Heist specialist will contact you within 1 business day. ${site}`;
    }

    case "SAVE_BUY":
      return `Hi ${name}, your Save & Buy registration with Heist is received. Our team will call you within 24 hours to discuss your ownership plan. ${site}`;

    case "BROCHURE": {
      const title = brochureTitle(lead.message ?? "");
      return `Hi ${name}, thanks for your interest in ${title}. Your brochure access is ready on our website. A Heist advisor will follow up shortly. ${site}`;
    }

    case "PROPERTY":
      return `Hi ${name}, we received your property enquiry at Heist. A listing specialist will contact you shortly. ${site}`;

    default:
      return `Hi ${name}, thank you for reaching out to Heist Brokerage & Construction. We will be in touch soon. ${site}`;
  }
}

export function customerSmsApplication(
  app: Pick<Application, "fullName" | "position">,
): string {
  const name = firstName(app.fullName);
  const role = safe(app.position) || "the open role";
  return `Hi ${name}, your application for ${role} at Heist Brokerage & Construction is received. Our HR team will review it and contact you if shortlisted. Good luck!`;
}

// ---------------------------------------------------------------------------
// Admin / team SMS templates (short alerts to staff phones)
// ---------------------------------------------------------------------------

export function adminSmsLead(
  event: NotificationEvent,
  lead: Pick<Lead, "name" | "email" | "phone" | "message">,
): string {
  const phone = safe(lead.phone) || "no phone";
  const email = safe(lead.email) || "no email";

  switch (event) {
    case "CONTACT_FORM":
      return `[Heist] New contact: ${lead.name} | ${phone} | ${email}. Check admin Leads.`;

    case "LEAD_MODAL": {
      const intent = intentFromMessage(lead.message ?? "");
      return `[Heist] Strategy call: ${lead.name} | ${intent || "general"} | ${phone}. Check admin Leads.`;
    }

    case "SAVE_BUY":
      return `[Heist] Save & Buy signup: ${lead.name} | ${phone} | ${email}. Check admin Leads.`;

    case "BROCHURE": {
      const title = brochureTitle(lead.message ?? "");
      return `[Heist] Brochure lead: ${lead.name} wants "${title}" | ${phone} | ${email}.`;
    }

    case "PROPERTY":
      return `[Heist] Property enquiry: ${lead.name} | ${phone} | ${email}. Check admin Leads.`;

    default:
      return `[Heist] New lead: ${lead.name} | ${phone}. Check admin.`;
  }
}

export function adminSmsApplication(
  app: Pick<Application, "fullName" | "position" | "phone" | "email">,
): string {
  const role = safe(app.position) || "unspecified role";
  return `[Heist HR] New application: ${app.fullName} for ${role} | ${safe(app.phone) || "no phone"} | ${safe(app.email) || "no email"}. Check admin Applications.`;
}

// ---------------------------------------------------------------------------
// Customer email templates
// ---------------------------------------------------------------------------

export function customerEmailLead(
  event: NotificationEvent,
  lead: Pick<Lead, "name" | "email" | "message">,
): { subject: string; html: string } | null {
  const email = safe(lead.email);
  if (!email) return null;

  const name = escapeHtml(firstName(lead.name));
  const site = getSiteUrl();

  switch (event) {
    case "CONTACT_FORM":
      return {
        subject: "We received your message — Heist Brokerage",
        html: emailLayout(
          `<div style="text-align:center;margin-bottom:20px;">
  <div style="width:56px;height:56px;background:#e8f5f0;border-radius:50%;margin:0 auto 14px;line-height:56px;font-size:24px;">&#128172;</div>
  <h2 style="margin:0;font-size:22px;color:#111827;">Message received</h2>
</div>
<p style="color:#374151;font-size:14px;line-height:1.7;">Hi ${name}, thank you for contacting Heist Brokerage &amp; Construction. A specialist will reply within one business day.</p>
${emailButton("Visit our website", site)}`,
          "We received your message",
        ),
      };

    case "LEAD_MODAL": {
      const intent = escapeHtml(intentFromMessage(lead.message ?? "") || "your enquiry");
      return {
        subject: "Strategy call request confirmed — Heist Brokerage",
        html: emailLayout(
          `<div style="text-align:center;margin-bottom:20px;">
  <div style="width:56px;height:56px;background:#e8f5f0;border-radius:50%;margin:0 auto 14px;line-height:56px;font-size:24px;">&#128197;</div>
  <h2 style="margin:0;font-size:22px;color:#111827;">Request confirmed</h2>
</div>
<p style="color:#374151;font-size:14px;line-height:1.7;">Hi ${name}, we received your request to book a strategy call regarding <strong>${intent}</strong>. Expect a reply within one business day.</p>
${emailButton("Browse listings", `${site}/properties`)}`,
          "Your strategy call request is confirmed",
        ),
      };
    }

    case "SAVE_BUY":
      return {
        subject: "Save & Buy registration received — Heist Brokerage",
        html: emailLayout(
          `<div style="text-align:center;margin-bottom:20px;">
  <div style="width:56px;height:56px;background:#e8f5f0;border-radius:50%;margin:0 auto 14px;line-height:56px;font-size:24px;">&#127968;</div>
  <h2 style="margin:0;font-size:22px;color:#111827;">Registration received</h2>
</div>
<p style="color:#374151;font-size:14px;line-height:1.7;">Hi ${name}, thank you for registering for our Save &amp; Buy programme. A team member will contact you within 24 hours to discuss next steps.</p>
${emailButton("Learn about Save & Buy", `${site}/save-and-buy`)}`,
          "Save & Buy registration received",
        ),
      };

    case "BROCHURE": {
      const title = escapeHtml(brochureTitle(lead.message ?? ""));
      return {
        subject: `Your brochure request — ${title}`,
        html: emailLayout(
          `<div style="text-align:center;margin-bottom:20px;">
  <div style="width:56px;height:56px;background:#e8f5f0;border-radius:50%;margin:0 auto 14px;line-height:56px;font-size:24px;">&#128196;</div>
  <h2 style="margin:0;font-size:22px;color:#111827;">Brochure access</h2>
</div>
<p style="color:#374151;font-size:14px;line-height:1.7;">Hi ${name}, thank you for your interest in <strong>${title}</strong>. Your download is available on our website, and an advisor will follow up with more details.</p>
${emailButton("View exclusive listings", `${site}/exclusive`)}`,
          `Brochure request for ${title}`,
        ),
      };
    }

    case "PROPERTY":
      return {
        subject: "Property enquiry received — Heist Brokerage",
        html: emailLayout(
          `<p style="color:#374151;font-size:14px;line-height:1.7;">Hi ${name}, we received your property enquiry. A listing specialist will be in touch shortly.</p>
${emailButton("Browse properties", `${site}/properties`)}`,
          "Property enquiry received",
        ),
      };

    default:
      return null;
  }
}

export function customerEmailApplication(
  app: Pick<Application, "fullName" | "email" | "position">,
): { subject: string; html: string } | null {
  const email = safe(app.email);
  if (!email) return null;

  const name = escapeHtml(firstName(app.fullName));
  const role = escapeHtml(safe(app.position) || "the open position");

  return {
    subject: "Application received — Heist Brokerage Careers",
    html: emailLayout(
      `<div style="text-align:center;margin-bottom:20px;">
  <div style="width:56px;height:56px;background:#e8f5f0;border-radius:50%;margin:0 auto 14px;line-height:56px;font-size:24px;">&#128188;</div>
  <h2 style="margin:0;font-size:22px;color:#111827;">Application received</h2>
</div>
<p style="color:#374151;font-size:14px;line-height:1.7;">Hi ${name}, thank you for applying for <strong>${role}</strong> at Heist Brokerage &amp; Construction. Our HR team will review your application and contact you if you are shortlisted.</p>`,
      "Your job application was received",
    ),
  };
}

// ---------------------------------------------------------------------------
// Admin email templates
// ---------------------------------------------------------------------------

function eventLabel(event: NotificationEvent): string {
  const labels: Record<NotificationEvent, string> = {
    CONTACT_FORM: "Contact form",
    LEAD_MODAL: "Strategy call",
    SAVE_BUY: "Save & Buy registration",
    BROCHURE: "Brochure download",
    PROPERTY: "Property enquiry",
    APPLICATION: "Job application",
  };
  return labels[event];
}

export function adminEmailLead(
  event: NotificationEvent,
  lead: Pick<Lead, "id" | "name" | "email" | "phone" | "message" | "source">,
): { subject: string; html: string } {
  const adminUrl = `${getAdminUrl()}/leads`;
  const label = eventLabel(event);
  const msg = escapeHtml(lead.message ?? "").replace(/\n/g, "<br>");

  return {
    subject: `[Heist] ${label}: ${lead.name}`,
    html: emailLayout(
      `<h2 style="margin:0 0 16px;font-size:20px;color:#111827;">&#128233; ${escapeHtml(label)}</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;overflow:hidden;margin:12px 0;">
  ${emailInfoRow("Name", escapeHtml(lead.name))}
  ${emailInfoRow("Email", lead.email ? `<a href="mailto:${escapeHtml(lead.email)}" style="color:#2d6a5e;">${escapeHtml(lead.email)}</a>` : "—")}
  ${emailInfoRow("Phone", escapeHtml(safe(lead.phone) || "—"))}
  ${emailInfoRow("Source", escapeHtml(lead.source))}
</table>
<div style="background:#f9fafb;border-left:4px solid #2d6a5e;border-radius:0 8px 8px 0;padding:14px 16px;margin:16px 0;">
  <p style="margin:0 0 6px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Details</p>
  <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${msg || "—"}</p>
</div>
${emailButton("View in admin", adminUrl)}`,
      `New ${label} from ${lead.name}`,
    ),
  };
}

export function adminEmailApplication(
  app: Pick<
    Application,
    "id" | "fullName" | "email" | "phone" | "position" | "experience" | "portfolio" | "message"
  >,
): { subject: string; html: string } {
  const adminUrl = `${getAdminUrl()}/applications`;
  const msg = escapeHtml(app.message ?? "").replace(/\n/g, "<br>");

  return {
    subject: `[Heist HR] Application: ${app.fullName} — ${safe(app.position) || "Role TBD"}`,
    html: emailLayout(
      `<h2 style="margin:0 0 16px;font-size:20px;color:#111827;">&#128188; New job application</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;overflow:hidden;margin:12px 0;">
  ${emailInfoRow("Applicant", escapeHtml(app.fullName))}
  ${emailInfoRow("Position", escapeHtml(safe(app.position) || "—"))}
  ${emailInfoRow("Email", app.email ? `<a href="mailto:${escapeHtml(app.email)}" style="color:#2d6a5e;">${escapeHtml(app.email)}</a>` : "—")}
  ${emailInfoRow("Phone", escapeHtml(safe(app.phone) || "—"))}
  ${emailInfoRow("Experience", escapeHtml(safe(app.experience) || "—"))}
  ${emailInfoRow("Portfolio", app.portfolio ? `<a href="${escapeHtml(app.portfolio)}" style="color:#2d6a5e;">${escapeHtml(app.portfolio)}</a>` : "—")}
</table>
${msg ? `<div style="background:#f9fafb;border-left:4px solid #2d6a5e;padding:14px 16px;margin:16px 0;"><p style="margin:0;font-size:14px;color:#374151;">${msg}</p></div>` : ""}
${emailButton("Review application", adminUrl)}`,
      `New application from ${app.fullName}`,
    ),
  };
}

/** Which team inbox receives admin alerts for each event. */
export function adminEmailRecipients(event: NotificationEvent): string[] {
  const corporate =
    process.env.NOTIFY_EMAIL_CORPORATE ?? "corporate@heistbrokerage.com";
  const hr = process.env.NOTIFY_EMAIL_HR ?? "hr@heistbrokerage.com";
  const general =
    process.env.NOTIFY_EMAIL_GENERAL ?? "ssamirah@heistbrokerage.com";

  if (event === "APPLICATION") {
    return uniqueEmails([hr, general]);
  }

  return uniqueEmails([corporate, general]);
}

/** Staff phone numbers that receive SMS alerts (Moolre). */
export function adminSmsRecipients(event: NotificationEvent): string[] {
  const corporate = process.env.NOTIFY_PHONE_CORPORATE ?? "";
  const hr = process.env.NOTIFY_PHONE_HR ?? "";
  const general = process.env.NOTIFY_PHONE_GENERAL ?? "";

  if (event === "APPLICATION") {
    return uniquePhones([hr, general]);
  }

  return uniquePhones([corporate, general]);
}

function uniqueEmails(list: string[]): string[] {
  return [...new Set(list.map((e) => e.trim().toLowerCase()).filter(Boolean))];
}

function uniquePhones(list: string[]): string[] {
  return [...new Set(list.map((p) => p.trim()).filter(Boolean))];
}
