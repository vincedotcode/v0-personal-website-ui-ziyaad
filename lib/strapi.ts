// lib/strapi.ts
export type StrapiTag = {
    id: number;
    attributes: {
      name: string;
      slug: string;
      description?: string | null;
    };
  };
  
  export type StrapiPost = {
    id: number;
    attributes: {
      title: string;
      slug: string;
      excerpt?: string | null;
      content?: string | null;
      format?: "article" | "video" | "podcast" | "link" | string;
      youtubeUrl?: string | null;
      publishedAt?: string;
      tags: {
        data: StrapiTag[];
      };
    };
  };
  
  type StrapiResponse<T> = {
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
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
  
  if (!STRAPI_URL) {
    console.warn("⚠️ NEXT_PUBLIC_STRAPI_URL is not set. Strapi calls will fail.");
  }
  
  async function strapiFetch<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<StrapiResponse<T>> {
    if (!STRAPI_URL) {
      throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined");
    }
  
    const url = `${STRAPI_URL}${path}`;
    console.log("Strapi request URL:", url);
  
    const res = await fetch(url, {
      ...options,
      cache: "no-store", // or "force-cache" + revalidate if you want
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
        ...(options.headers || {}),
      },
    });
  
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Strapi error:", res.status, text);
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
    pageSize = 10,
  ) {
    const params = new URLSearchParams({
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
      "sort[0]": "publishedAt:desc",
      "filters[tags][slug][$eq]": tagSlug,
      "populate[tags]": "*",
    });
  
    // IMPORTANT: if your Strapi endpoint is different, change /api/posts here
    const res = await strapiFetch<StrapiPost>(`/api/posts?${params.toString()}`);
    return res;
  }
  