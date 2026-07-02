/**
 * Moolre SMS (VAS) — same integration used across our other projects.
 * Docs: https://docs.moolre.com/#/send-sms
 */

const MOOLRE_SMS_URL = "https://api.moolre.com/open/sms/send";
const DEFAULT_COUNTRY_CODE = process.env.DEFAULT_COUNTRY_CODE ?? "233";

export function isSmsConfigured(): boolean {
  return Boolean(process.env.MOOLRE_SMS_API_KEY || process.env.MOOLRE_API_KEY);
}

function getSmsVasKey(): string | null {
  return process.env.MOOLRE_SMS_API_KEY || process.env.MOOLRE_API_KEY || null;
}

function maskPhone(phone: string): string {
  if (!phone || phone.length < 6) return "***";
  return `${phone.slice(0, 4)}****${phone.slice(-2)}`;
}

/** Format a local or international number to E.164 (+233…). */
export function formatPhoneNumber(phone: string): string | null {
  const raw = phone.trim();
  if (!raw) return null;

  let cleaned = raw.replace(/\D/g, "");
  if (!cleaned) return null;

  if (
    cleaned.startsWith(DEFAULT_COUNTRY_CODE) &&
    cleaned.length >= DEFAULT_COUNTRY_CODE.length + 9
  ) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith("0") && cleaned.length >= 10) {
    cleaned = DEFAULT_COUNTRY_CODE + cleaned.slice(1);
  } else if (cleaned.length === 9) {
    cleaned = DEFAULT_COUNTRY_CODE + cleaned;
  }

  return `+${cleaned}`;
}

export type SmsResult = {
  ok: boolean;
  status?: number;
  code?: string | number;
  message?: string;
};

export async function sendSms(to: string, message: string): Promise<SmsResult> {
  const vasKey = getSmsVasKey();
  if (!vasKey) {
    console.warn("[sms] MOOLRE_SMS_API_KEY not configured — skipping");
    return { ok: false, message: "SMS not configured" };
  }

  const recipient = formatPhoneNumber(to);
  if (!recipient) {
    console.warn("[sms] Invalid recipient phone");
    return { ok: false, message: "Invalid phone" };
  }

  const senderId =
    process.env.SMS_SENDER_ID ||
    process.env.MOOLRE_SMS_SENDER_ID ||
    "Heist";

  try {
    const res = await fetch(MOOLRE_SMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-VASKEY": vasKey,
      },
      body: JSON.stringify({
        type: 1,
        senderid: senderId,
        messages: [{ recipient, message }],
      }),
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error("[sms] Non-JSON response:", text.slice(0, 200));
      return { ok: false, message: text.slice(0, 200) };
    }

    const json = (await res.json()) as {
      status?: number;
      code?: string | number;
      message?: string;
    };

    const ok = json.status === 1;
    console.log(
      `[sms] ${ok ? "Sent" : "Failed"} to ${maskPhone(recipient)} | code:`,
      json.code,
    );
    if (!ok) {
      console.log("[sms] Response:", JSON.stringify(json));
    }

    return {
      ok,
      status: json.status,
      code: json.code,
      message: json.message,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "SMS send failed";
    console.error("[sms] Error:", msg);
    return { ok: false, message: msg };
  }
}
