// app/api/resume/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

type ResumeRow = {
  id: number;
  label: string;
  url: string;
  created_at: string;
};

export const revalidate = 60; // cache for a minute, still easy to update via DB

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, label, url, created_at
      FROM resume_resources
      ORDER BY created_at DESC
      LIMIT 1;
    ` as ResumeRow[];

    const latest = rows[0] ?? null;
    return NextResponse.json({ resource: latest });
  } catch (e) {
    console.error("[resume] fetch error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
