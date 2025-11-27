// app/api/search-posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchPostsAdvanced } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const q = searchParams.get("q") ?? "";
  const tag = searchParams.get("tag") || null;
  const pageParam = searchParams.get("page") ?? "1";
  const page = Number(pageParam) > 0 ? Number(pageParam) : 1;

  try {
    const results = await searchPostsAdvanced({
      query: q,
      tagSlug: tag,
      page,
      pageSize: 20,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("[/api/search-posts] error", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 },
    );
  }
}
