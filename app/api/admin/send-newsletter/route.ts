import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { Resend } from "resend";
import { newsletterEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
  if (!token || token !== process.env.NEWSLETTER_ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.subject || !body.htmlContent) {
    return NextResponse.json(
      { error: "subject and htmlContent are required" },
      { status: 400 }
    );
  }

  const subscribers = await sql`
    SELECT email, unsubscribe_token
    FROM subscribers
    WHERE is_subscribed = TRUE;
  `;

  for (const s of subscribers) {
    await resend.emails.send({
      from:
        process.env.NEWSLETTER_FROM_EMAIL ||
        "Zi Newsletter <no-reply@ziyaadbeneydatoula.com>",
      to: s.email,
      subject: body.subject,
      html: newsletterEmailHtml(body.htmlContent, s.unsubscribe_token),
    });
  }

  return NextResponse.json({ success: true, sent: subscribers.length });
}
