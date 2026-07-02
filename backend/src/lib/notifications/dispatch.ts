import type { Application, Lead } from "@prisma/client";
import { sendEmail } from "../email/resend.js";
import { sendSms } from "../sms/moolre.js";
import {
  adminEmailApplication,
  adminEmailLead,
  adminEmailRecipients,
  adminSmsApplication,
  adminSmsLead,
  adminSmsRecipients,
  classifyLeadEvent,
  customerEmailApplication,
  customerEmailLead,
  customerSmsApplication,
  customerSmsLead,
  type NotificationEvent,
} from "./templates.js";

/** Fire-and-forget wrapper — never throws to callers. */
function runAsync(label: string, fn: () => Promise<void>): void {
  void fn().catch((err) => {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[notify] ${label} failed:`, msg);
  });
}

async function notifyCustomerLead(
  event: NotificationEvent,
  lead: Pick<Lead, "name" | "email" | "phone" | "message">,
): Promise<void> {
  if (lead.phone?.trim()) {
    await sendSms(lead.phone, customerSmsLead(event, lead));
  }

  const mail = customerEmailLead(event, lead);
  if (mail && lead.email?.trim()) {
    await sendEmail({
      to: lead.email.trim(),
      subject: mail.subject,
      html: mail.html,
    });
  }
}

async function notifyAdminLead(
  event: NotificationEvent,
  lead: Pick<Lead, "id" | "name" | "email" | "phone" | "message" | "source">,
): Promise<void> {
  const emails = adminEmailRecipients(event);
  const adminMail = adminEmailLead(event, lead);

  if (emails.length > 0) {
    await sendEmail({
      to: emails,
      subject: adminMail.subject,
      html: adminMail.html,
      replyTo: lead.email?.trim() || undefined,
    });
  }

  const phones = adminSmsRecipients(event);
  const smsBody = adminSmsLead(event, lead);
  await Promise.all(phones.map((phone) => sendSms(phone, smsBody)));
}

async function notifyCustomerApplication(
  app: Pick<Application, "fullName" | "email" | "phone" | "position">,
): Promise<void> {
  if (app.phone?.trim()) {
    await sendSms(app.phone, customerSmsApplication(app));
  }

  const mail = customerEmailApplication(app);
  if (mail && app.email?.trim()) {
    await sendEmail({
      to: app.email.trim(),
      subject: mail.subject,
      html: mail.html,
    });
  }
}

async function notifyAdminApplication(
  app: Pick<
    Application,
    "id" | "fullName" | "email" | "phone" | "position" | "experience" | "portfolio" | "message"
  >,
): Promise<void> {
  const emails = adminEmailRecipients("APPLICATION");
  const adminMail = adminEmailApplication(app);

  if (emails.length > 0) {
    await sendEmail({
      to: emails,
      subject: adminMail.subject,
      html: adminMail.html,
      replyTo: app.email?.trim() || undefined,
    });
  }

  const phones = adminSmsRecipients("APPLICATION");
  const smsBody = adminSmsApplication(app);
  await Promise.all(phones.map((phone) => sendSms(phone, smsBody)));
}

/** Send SMS + email after a new lead is saved. Does not block the HTTP response. */
export function notifyLeadCreated(lead: Lead): void {
  const event = classifyLeadEvent(lead);
  runAsync(`lead:${lead.id}`, async () => {
    await Promise.all([
      notifyCustomerLead(event, lead),
      notifyAdminLead(event, lead),
    ]);
  });
}

/** Send SMS + email after a new careers application is saved. */
export function notifyApplicationCreated(application: Application): void {
  runAsync(`application:${application.id}`, async () => {
    await Promise.all([
      notifyCustomerApplication(application),
      notifyAdminApplication(application),
    ]);
  });
}
