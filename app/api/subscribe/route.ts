import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { welcomeEmailHtml } from "@/lib/email-templates";
import { Resend } from "resend";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Rate limiting window
const LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const LIMIT_MAX = 20;
const rateMap = new Map<string, { count: number; ts: number }>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function allow(ip: string) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry) {
    rateMap.set(ip, { count: 1, ts: now });
    return true;
  }

  if (now - entry.ts > LIMIT_WINDOW) {
    rateMap.set(ip, { count: 1, ts: now });
    return true;
  }

  if (entry.count >= LIMIT_MAX) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!allow(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.email) {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }

    const email = String(body.email).trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const token = randomUUID();

    // Insert/update subscriber
    const result = await sql`
      INSERT INTO subscribers (email, unsubscribe_token, is_subscribed)
      VALUES (${email}, ${token}, TRUE)
      ON CONFLICT (email)
      DO UPDATE SET is_subscribed = TRUE, unsubscribe_token = ${token}
      RETURNING email, unsubscribe_token;
    `;

    const subscriber = result[0];

    // Send Welcome Email
    await resend.emails.send({
      from:
        process.env.NEWSLETTER_FROM_EMAIL ||
        "Zi Newsletter <no-reply@ziyaadbeneydatoula.com>",
      to: email,
      subject: "Welcome to Zi’s Newsletter",
      html: welcomeEmailHtml(email, subscriber.unsubscribe_token),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
