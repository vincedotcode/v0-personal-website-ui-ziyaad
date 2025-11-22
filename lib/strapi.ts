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

/**
 * Helper to get an absolute media URL from Strapi.
 */
export function getMediaUrl(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

/**
 * Universal Strapi fetcher with auth + no-store caching + logging
 */
async function strapiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<StrapiListResponse<T>> {
  if (!STRAPI_URL) {
    throw new Error("❌ NEXT_PUBLIC_STRAPI_URL is not defined");
  }

  const url = `${STRAPI_URL}${path}`;
  console.log("[Strapi] GET", url);

  const res = await fetch(url, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
      ...(options.headers || {}),
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

  return strapiFetch<StrapiPost>(`/api/posts?${params.toString()}`);
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

  const res = await strapiFetch<StrapiPost>(`/api/posts?${params.toString()}`);

  return res.data[0] ?? null;
}

/**
 * List all tags (optional, if needed for UI)
 */
export async function getAllTags() {
  return strapiFetch<StrapiTag>(`/api/tags`);
}