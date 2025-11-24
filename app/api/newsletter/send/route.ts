// app/api/newsletter/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { Resend } from "resend";
import { assertAdmin } from "../_utils";

const resend = new Resend(process.env.RESEND_API_KEY!);
const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://ziyaadbeneydatoula.com";

export async function POST(req: NextRequest) {
  try {
    assertAdmin(req);

    const body = await req.json().catch(() => null);
    const { campaignId } = body || {};

    if (!campaignId) {
      return NextResponse.json(
        { error: "campaignId is required." },
        { status: 400 }
      );
    }

    const campaignRows = await sql`
      SELECT id, subject, html, status
      FROM newsletter_campaigns
      WHERE id = ${campaignId}::uuid;
    `;

    if (campaignRows.length === 0) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    const campaign = campaignRows[0];

    if (campaign.status === "sent") {
      return NextResponse.json(
        { error: "Campaign already sent." },
        { status: 400 }
      );
    }

    await sql`
      UPDATE newsletter_campaigns
      SET status = 'sending'
      WHERE id = ${campaignId}::uuid;
    `;

    const subscribers = await sql`
      SELECT email, unsubscribe_token
      FROM subscribers
      WHERE is_subscribed = TRUE;
    `;

    const fromEmail =
      process.env.NEWSLETTER_FROM_EMAIL ||
      "Zi Newsletter <no-reply@ziyaadbeneydatoula.com>";

    let sentCount = 0;
    let failCount = 0;

    for (const sub of subscribers) {
      const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${sub.unsubscribe_token}`;

      const html = `
        ${campaign.html}
        <hr style="margin-top:32px;margin-bottom:16px;border:none;border-top:1px solid #e5e5e5;" />
        <p style="font-size:12px;color:#6b7280;">
          Don’t want these emails anymore?
          <a href="${unsubscribeUrl}" style="color:#2563eb;">Unsubscribe</a>.
        </p>
      `;

      try {
        await resend.emails.send({
          from: fromEmail,
          to: sub.email,
          subject: campaign.subject,
          html,
        });

        sentCount++;
      } catch (err) {
        console.error("Error sending to", sub.email, err);
        failCount++;
      }
    }

    await sql`
      UPDATE newsletter_campaigns
      SET status = 'sent', sent_at = NOW()
      WHERE id = ${campaignId}::uuid;
    `;

    return NextResponse.json({
      success: true,
      sentCount,
      failCount,
      total: subscribers.length,
    });
  } catch (e: any) {
    if (e?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
