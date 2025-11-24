// app/api/newsletter/campaigns/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { assertAdmin } from "../_utils";

export async function GET(req: NextRequest) {
  try {
    assertAdmin(req);

    const campaigns = await sql`
      SELECT
        id,
        slug,
        subject,
        status,
        created_at,
        sent_at
      FROM newsletter_campaigns
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ campaigns });
  } catch (e: any) {
    if (e?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    assertAdmin(req);

    const body = await req.json().catch(() => null);
    const { slug, subject, html } = body || {};

    if (!slug || !subject || !html) {
      return NextResponse.json(
        { error: "slug, subject and html are required." },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO newsletter_campaigns (slug, subject, html)
      VALUES (${slug}, ${subject}, ${html})
      RETURNING id, slug, subject, status, created_at;
    `;

    return NextResponse.json({ campaign: result[0] });
  } catch (e: any) {
    if (e?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
