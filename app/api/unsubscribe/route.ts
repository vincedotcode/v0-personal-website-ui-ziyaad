import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return new NextResponse("Invalid unsubscribe link.", { status: 400 });
  }

  const result = await sql`
    UPDATE subscribers
    SET is_subscribed = FALSE
    WHERE unsubscribe_token = ${token}
    RETURNING email;
  `;

  if (result.length === 0) {
    return new NextResponse("Invalid unsubscribe token.", { status: 404 });
  }

  return new NextResponse("You have been unsubscribed.");
}
