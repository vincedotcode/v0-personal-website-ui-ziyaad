// app/api/newsletter/subscribers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { assertAdmin } from "../_utils";

export async function GET(req: NextRequest) {
  try {
    assertAdmin(req);

    const rows = await sql`
      SELECT
        id,
        email,
        is_subscribed,
        created_at
      FROM subscribers
      ORDER BY created_at DESC
      LIMIT 500;
    `;

    return NextResponse.json({ subscribers: rows });
  } catch (e: any) {
    if (e?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
