// app/api/newsletter/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const token = body?.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const result = await sql`
      UPDATE subscribers
      SET is_subscribed = FALSE
      WHERE unsubscribe_token = ${token}
      RETURNING email;
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, email: result[0].email });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
