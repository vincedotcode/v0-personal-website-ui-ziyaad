// app/api/zi-admin/resume-resources/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { assertAdmin } from "../_utils";

export async function GET(req: NextRequest) {
  try {
    assertAdmin(req);

    const rows = await sql`
      SELECT id, label, url, created_at
      FROM resume_resources
      ORDER BY created_at DESC;
    ` as {
      id: number;
      label: string;
      url: string;
      created_at: string;
    }[];

    return NextResponse.json({ resources: rows });
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
    const { label, url } = body || {};

    if (!label || !url) {
      return NextResponse.json(
        { error: "label and url are required." },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO resume_resources (label, url)
      VALUES (${label}, ${url})
      RETURNING id, label, url, created_at;
    ` as {
      id: number;
      label: string;
      url: string;
      created_at: string;
    }[];

    return NextResponse.json({ resource: rows[0] });
  } catch (e: any) {
    if (e?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    assertAdmin(req);
    const body = await req.json().catch(() => null);
    const { id } = body || {};

    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    await sql`DELETE FROM resume_resources WHERE id = ${id};`;

    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
