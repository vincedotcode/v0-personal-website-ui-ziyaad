// app/api/search-posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const posts = await getAllPosts(120);
    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error("[/api/search-posts] error", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 },
    );
  }
}
