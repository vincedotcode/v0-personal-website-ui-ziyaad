// lib/strapi.ts

export type StrapiTag = {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string | null;
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
  
    // ✅ Match the actual Strapi response: tags is a plain array, NOT { data: [...] }
    tags?: StrapiTag[];
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
  
  // For now, don't use token in dev – rely on Public permissions.
  // If you later add a Content API token, put it in STRAPI_API_TOKEN.
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
  
  if (!STRAPI_URL) {
    console.warn("⚠️ NEXT_PUBLIC_STRAPI_URL is not set. Strapi calls will fail.");
  }
  
  async function strapiFetch<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<StrapiListResponse<T>> {
    if (!STRAPI_URL) {
      throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined");
    }
  
    const url = `${STRAPI_URL}${path}`;
    console.log("[Strapi] GET", url);
  
    const res = await fetch(url, {
      ...options,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
          : {}),
        ...(options.headers || {}),
      },
    });
  
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[Strapi] error", res.status, text);
      throw new Error(`Strapi request failed: ${res.status}`);
    }
  
    return res.json();
  }
  
  /**
   * Get posts by tag slug (product, cook, etc.)
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
      // ✅ This matches the URL that works in your browser:
      // http://localhost:1337/api/posts?filters[tags][slug][$eq]=product&populate=tags
      "populate": "tags",
    });
  
    return strapiFetch<StrapiPost>(`/api/posts?${params.toString()}`);
  }
  