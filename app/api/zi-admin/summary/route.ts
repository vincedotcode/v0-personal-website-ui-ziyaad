// app/api/zi-admin/summary/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { assertAdmin } from "../_utils";

export async function GET(req: NextRequest) {
  try {
    assertAdmin(req);

    const rows = await sql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE is_subscribed = TRUE)::int AS active,
        COUNT(*) FILTER (WHERE is_subscribed = FALSE)::int AS unsubscribed
      FROM subscribers;
    ` as {
      total: number;
      active: number;
      unsubscribed: number;
    }[];

    const stats = rows[0] || { total: 0, active: 0, unsubscribed: 0 };

    return NextResponse.json({ stats });
  } catch (e: any) {
    if (e?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
