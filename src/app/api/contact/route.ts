import { NextResponse } from "next/server";

const REQUIRED = ["name", "email", "subject", "message"] as const;

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Coerce to string map — rejects non-string values for required fields
  const body: Record<string, string> = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? v : ""])
  );

  // Basic validation
  for (const field of REQUIRED) {
    if (!body[field] || body[field].trim().length === 0) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(body["email"] ?? "")) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if ((body["message"] ?? "").trim().length < 20) {
    return NextResponse.json(
      { error: "Message must be at least 20 characters" },
      { status: 400 }
    );
  }

  // Honeypot — bots fill the hidden field
  if (body["_hp"] && body["_hp"].trim().length > 0) {
    return NextResponse.json({ success: true }); // silently drop
  }

  const submission = {
    name: (body["name"] ?? "").trim(),
    email: (body["email"] ?? "").trim().toLowerCase(),
    category: (body["category"] ?? "").trim() || "General",
    subject: (body["subject"] ?? "").trim(),
    message: (body["message"] ?? "").trim(),
    receivedAt: new Date().toISOString(),
  };

  // Log in development
  if (process.env.NODE_ENV !== "production") {
    console.log("[contact]", submission);
  }

  // ── Email sending (configure SMTP_HOST / SMTP_USER / SMTP_PASS / SMTP_TO) ──
  // Uncomment and install nodemailer when SMTP credentials are available:
  //
  // if (process.env.SMTP_HOST) {
  //   const nodemailer = await import("nodemailer");
  //   const transporter = nodemailer.createTransport({
  //     host: process.env.SMTP_HOST,
  //     port: Number(process.env.SMTP_PORT ?? 587),
  //     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  //   });
  //   await transporter.sendMail({
  //     from: `"AbdOfPhysics Contact" <${process.env.SMTP_USER}>`,
  //     to: process.env.SMTP_TO ?? "support@abdofphysics.in",
  //     replyTo: submission.email,
  //     subject: `[Contact] ${submission.category}: ${submission.subject}`,
  //     text: `Name: ${submission.name}\nEmail: ${submission.email}\nCategory: ${submission.category}\n\n${submission.message}`,
  //   });
  // }

  return NextResponse.json({ success: true });
}
