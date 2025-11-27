import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  SECTION_TAG_SLUGS,
  STRAPI_CACHE_POST_PREFIX,
  STRAPI_CACHE_TAG_PREFIX,
  STRAPI_CACHE_TAGS,
} from "@/lib/strapi";

const WEBHOOK_SECRET = process.env.STRAPI_REVALIDATE_SECRET;
const SECTION_SET = new Set(SECTION_TAG_SLUGS);

type StrapiTagPayload = { slug?: string | null };

type StrapiEntryPayload = {
  slug?: string | null;
  tags?: StrapiTagPayload[] | null;
};

type WebhookPayload = {
  secret?: string;
  event?: string;
  model?: string;
  collection?: string;
  apiId?: string;
  entry?: StrapiEntryPayload;
  tags?: string[];
  paths?: string[];
};

function normalizeModel(payload: WebhookPayload): string {
  return (
    payload.model ||
    payload.collection ||
    payload.apiId ||
    ""
  ).toLowerCase();
}

function addSectionPaths(
  sections: (string | null | undefined)[],
  slug: string | null | undefined,
  paths: Set<string>,
) {
  sections
    .filter((section): section is string => Boolean(section) && SECTION_SET.has(section))
    .forEach((section) => {
      paths.add(`/${section}`);
      if (slug) {
        paths.add(`/${section}/${slug}`);
      }
    });
}

export async function POST(req: NextRequest) {
  const payload = (await req.json().catch(() => null)) as WebhookPayload | null;

  const providedSecret =
    req.nextUrl.searchParams.get("secret") ?? payload?.secret ?? "";

  if (!WEBHOOK_SECRET || providedSecret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!payload) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const tagsToRevalidate = new Set<string>(payload.tags ?? []);
  const pathsToRevalidate = new Set<string>(payload.paths ?? []);

  const model = normalizeModel(payload);

  if (model.includes("post")) {
    tagsToRevalidate.add(STRAPI_CACHE_TAGS.posts);

    const slug = payload.entry?.slug ?? null;
    if (slug) {
      tagsToRevalidate.add(`${STRAPI_CACHE_POST_PREFIX}${slug}`);
    }

    const entryTags = payload.entry?.tags ?? [];
    const sectionSlugs = entryTags
      .map((tag) => tag?.slug ?? null)
      .filter((slug): slug is string => Boolean(slug));

    sectionSlugs.forEach((tagSlug) => {
      tagsToRevalidate.add(`${STRAPI_CACHE_TAG_PREFIX}${tagSlug}`);
    });

    addSectionPaths(sectionSlugs, slug, pathsToRevalidate);
  }

  if (model.includes("tag")) {
    tagsToRevalidate.add(STRAPI_CACHE_TAGS.tags);
    const tagSlug = payload.entry?.slug;
    if (tagSlug) {
      tagsToRevalidate.add(`${STRAPI_CACHE_TAG_PREFIX}${tagSlug}`);
      addSectionPaths([tagSlug], null, pathsToRevalidate);
    }
  }

  const uniqueTags = Array.from(tagsToRevalidate);
  const uniquePaths = Array.from(pathsToRevalidate);

  await Promise.all(uniqueTags.map((tag) => revalidateTag(tag)));
  await Promise.all(uniquePaths.map((path) => revalidatePath(path)));

  return NextResponse.json({
    success: true,
    revalidatedTags: uniqueTags,
    revalidatedPaths: uniquePaths,
  });
}

