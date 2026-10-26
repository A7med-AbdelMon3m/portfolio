import { z } from "zod";
import { CONTACT_ENDPOINT } from "@/config/site";
import { profile } from "@/content/profile";
import { storage } from "./storage";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type SendOutcome = "sent" | "mailto" | "cooldown" | "failed";

const COOLDOWN_MS = 60_000;
const TIMEOUT_MS = 10_000;
const LAST_SENT_KEY = "contact:last";

export function cooldownActive(): boolean {
  const last = Number(storage.get(LAST_SENT_KEY) ?? 0);
  return Date.now() - last < COOLDOWN_MS;
}

export async function sendContact(data: ContactInput): Promise<SendOutcome> {
  if (cooldownActive()) return "cooldown";

  if (!CONTACT_ENDPOINT) {
    const subject = encodeURIComponent(data.subject.replace(/[\r\n]+/g, " "));
    const body = encodeURIComponent(`${data.message}\n\n${data.name}\n${data.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    return "mailto";
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
      referrerPolicy: "no-referrer",
      credentials: "omit",
    });
    if (!response.ok) return "failed";
    storage.set(LAST_SENT_KEY, String(Date.now()));
    return "sent";
  } catch {
    return "failed";
  } finally {
    window.clearTimeout(timer);
  }
}
