"use server";

import { Resend } from "resend";
import { estimateSchema } from "@/lib/estimate-schema";

export type EstimateState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitEstimate(
  _prev: EstimateState,
  formData: FormData,
): Promise<EstimateState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    address: String(formData.get("address") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    services: formData.getAll("services").map(String),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = estimateSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the fields below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot — silently succeed if filled
  if (parsed.data.website) return { status: "success" };

  const key = process.env.RESEND_API_KEY;
  const to =
    process.env.ESTIMATE_TO_EMAIL ?? "Kvalandscaping@gmail.com";
  const ccOmni =
    process.env.ESTIMATE_CC_EMAIL ?? "aliareeb62@gmail.com";
  const from =
    process.env.ESTIMATE_FROM_EMAIL ?? "KVA Estimates <onboarding@resend.dev>";

  if (!key) {
    console.warn("[KVA] RESEND_API_KEY not set; estimate not actually emailed.");
    console.log("[KVA] Estimate payload:", parsed.data);
    return {
      status: "success",
      message:
        "Thanks — we got it. (Dev mode: email not actually sent.)",
    };
  }

  const { name, address, phone, email, services, message } = parsed.data;
  const html = `
    <h2 style="font-family:Georgia,serif;color:#1e3a2a;margin:0 0 12px">New estimate request — KVA Landscaping</h2>
    <p style="margin:4px 0"><strong>From:</strong> ${escape(name)}</p>
    <p style="margin:4px 0"><strong>Property:</strong> ${escape(address)}</p>
    <p style="margin:4px 0"><strong>Phone:</strong> <a href="tel:${escape(phone)}">${escape(phone)}</a></p>
    ${email ? `<p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${escape(email)}">${escape(email)}</a></p>` : ""}
    <p style="margin:12px 0 4px"><strong>What they need:</strong></p>
    <ul style="margin:0 0 12px 0;padding-left:18px">${services.map((s) => `<li>${escape(s)}</li>`).join("")}</ul>
    ${
      message
        ? `<p style="margin:12px 0 4px"><strong>Notes:</strong></p>
           <pre style="white-space:pre-wrap;font-family:inherit;background:#f7f4ec;padding:12px;border-radius:8px;border:1px solid #e5e2d8">${escape(message)}</pre>`
        : ""
    }
    <p style="font-size:12px;color:#6b7460;margin-top:24px">Reply directly to this email to respond to the customer.</p>
  `;

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from,
      to: [to, ccOmni],
      replyTo: email || undefined,
      subject: `New estimate — ${name} · ${services[0]}${services.length > 1 ? ` +${services.length - 1}` : ""}`,
      html,
    });
    return { status: "success" };
  } catch (err) {
    console.error("[KVA] Resend send failed", err);
    return {
      status: "error",
      message:
        "Couldn't send right now. Try us directly at (571) 308-3932 or Kvalandscaping@gmail.com.",
    };
  }
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
