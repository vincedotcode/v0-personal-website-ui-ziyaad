// lib/strapi.ts
export type StrapiTag = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type StrapiMedia = {
  id: number;
  name: string;
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string | null;
  size?: number | null;
};

export type StrapiPost = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  format?: "article" | "video" | "podcast" | string;
  youtubeUrl?: string | null;
  externalUrl?: string | null;
  subtitle?: string | null;
  readingTimeMinutes?: number | null;
  isFeatured?: boolean | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  durationSeconds?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags?: StrapiTag[];
  featuredImage?: StrapiMedia | null;
};

export type StrapiListResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const STRAPI_CACHE_TAGS = {
  posts: "strapi:posts",
  tags: "strapi:tags",
} as const;

export const STRAPI_CACHE_TAG_PREFIX = "strapi:tag:";
export const STRAPI_CACHE_POST_PREFIX = "strapi:post:";

type StrapiFetchOptions = {
  cacheTags?: string[];
  init?: RequestInit;
};

/**
 * Helper to get an absolute media URL from Strapi.
 */
export function getMediaUrl(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

/**
 * Universal Strapi fetcher with auth + cache tagging for ISR/on-demand revalidation.
 */
async function strapiFetch<T>(
  path: string,
  { cacheTags = [], init }: StrapiFetchOptions = {},
): Promise<StrapiListResponse<T>> {
  if (!STRAPI_URL) {
    throw new Error("❌ NEXT_PUBLIC_STRAPI_URL is not defined");
  }

  const url = `${STRAPI_URL}${path}`;
  console.log("[Strapi] GET", url);

  const normalizedTags = Array.from(
    new Set(cacheTags.filter((tag): tag is string => Boolean(tag))),
  );
  const shouldUseCache = normalizedTags.length > 0;

  const res = await fetch(url, {
    ...init,
    cache: shouldUseCache ? "force-cache" : "no-store",
    next: shouldUseCache ? { tags: normalizedTags } : undefined,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[Strapi] Error", res.status, text);
    throw new Error(`Strapi request failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Get posts filtered by tag slug (product, cook, write, dataprotection, etc.)
 *
 * Populates: tags and featuredImage
 */
export async function getPostsByTag(
  tagSlug: string,
  page = 1,
  pageSize = 20,
) {
  const params = new URLSearchParams({
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    "sort[0]": "publishedAt:desc",
    "filters[tags][slug][$eq]": tagSlug,
    "populate[0]": "tags",
    "populate[1]": "featuredImage",
  });

  return strapiFetch<StrapiPost>(`/api/posts?${params.toString()}`, {
    cacheTags: [
      STRAPI_CACHE_TAGS.posts,
      `${STRAPI_CACHE_TAG_PREFIX}${tagSlug}`,
    ],
  });
}

/**
 * Get a single portfolio entry (tagged "portfolio")
 */
export async function getPortfolioEntry() {
  const res = await getPostsByTag("portfolio", 1, 1);
  return res.data[0] ?? null;
}

/**
 * Get any single post by its slug
 *
 * Populates: tags and featuredImage
 */
export async function getPostBySlug(slug: string | undefined | null) {
  // Guard against invalid slugs
  if (!slug || slug === "undefined" || slug === "null") {
    return null;
  }

  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[0]": "tags",
    "populate[1]": "featuredImage",
  });

  const res = await strapiFetch<StrapiPost>(`/api/posts?${params.toString()}`, {
    cacheTags: [
      STRAPI_CACHE_TAGS.posts,
      `${STRAPI_CACHE_POST_PREFIX}${slug}`,
    ],
  });

  return res.data[0] ?? null;
}

/**
 * List all tags (optional, if needed for UI)
 */
export async function getAllTags() {
  return strapiFetch<StrapiTag>(`/api/tags`, {
    cacheTags: [STRAPI_CACHE_TAGS.tags],
  });
}

// Top-level section tags that have their own directories in /app
export const SECTION_TAG_SLUGS = [
  "articles",
  "books",
  "cook",
  "cookies",
  "dataprotection",
  "help",
  "media",
  "podcasts",
  "portfolio",
  "privacy",
  "product",
  "terms",
  "touchbase",
  "write",
]

// Utility: pick the first tag that maps to a top-level section
export function getPrimarySectionTagSlug(post: StrapiPost): string | null {
  if (!post.tags?.length) return null
  const tag = post.tags.find((t) => SECTION_TAG_SLUGS.includes(t.slug))
  return tag?.slug ?? null
}

/**
 * Full-text-ish search across posts
 * Searches title, excerpt, and content (case-insensitive)
 * Populates tags + featuredImage so we can build correct URLs.
 */
export async function searchPostsAdvanced(options: {
  query: string;
  tagSlug?: string | null;
  page?: number;
  pageSize?: number;
}) {
  const { query, tagSlug, page = 1, pageSize = 20 } = options;

  const params = new URLSearchParams({
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    "sort[0]": "publishedAt:desc",
    "populate[0]": "tags",
    "populate[1]": "featuredImage",
  });

  const trimmed = query.trim();

  if (trimmed) {
    params.set("filters[$or][0][title][$containsi]", trimmed);
    params.set("filters[$or][1][excerpt][$containsi]", trimmed);
    params.set("filters[$or][2][content][$containsi]", trimmed);
  }

  if (tagSlug) {
    params.set("filters[tags][slug][$eq]", tagSlug);
  }

  return strapiFetch<StrapiPost>(`/api/posts?${params.toString()}`, {
    cacheTags: [STRAPI_CACHE_TAGS.posts],
  });
}

/**
 * Backwards-compatible wrapper (no tag filter).
 * Used anywhere you already call searchPosts(q, page, pageSize).
 */
export async function searchPosts(
  query: string,
  page = 1,
  pageSize = 20,
) {
  return searchPostsAdvanced({ query, page, pageSize });
}
