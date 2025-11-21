const STRAPI_URL = process.env.STRAPI_API_URL
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

if (!STRAPI_URL || !STRAPI_TOKEN) {
  throw new Error("STRAPI_API_URL and STRAPI_API_TOKEN must be set")
}

type StrapiResponse<T> = {
  data: T[]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export async function strapiFetch<T>(
  path: string,
  { searchParams }: { searchParams?: Record<string, string | number | undefined> } = {},
) {
  const url = new URL(`/api${path}`, STRAPI_URL)

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value))
    })
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    // server-side only, no caching for now (you can tune later)
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("Strapi error", res.status, await res.text())
    throw new Error("Failed to fetch from Strapi")
  }

  return (await res.json()) as T
}

// Helpers

export async function getPostsByTag(tagSlug: string, page = 1, pageSize = 10) {
  return strapiFetch<StrapiResponse<any>>("/posts", {
    searchParams: {
      "filters[tags][slug][$eq]": tagSlug,
      "sort[0]": "publishedAt:desc",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      "populate[0]": "tags",
    },
  })
}

export async function getPostBySlug(slug: string) {
  const res = await strapiFetch<StrapiResponse<any>>("/posts", {
    searchParams: {
      "filters[slug][$eq]": slug,
      "populate[0]": "tags",
    },
  })

  return res.data[0] ?? null
}

export async function searchPosts(query: string, page = 1, pageSize = 10) {
  return strapiFetch<StrapiResponse<any>>("/posts", {
    searchParams: {
      "filters[$or][0][title][$containsi]": query,
      "filters[$or][1][excerpt][$containsi]": query,
      "filters[$or][2][content][$containsi]": query,
      "sort[0]": "publishedAt:desc",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      "populate[0]": "tags",
    },
  })
}

export async function getPortfolioPage() {
  const res = await strapiFetch<{ data: any }>("/portfolio-page", {
    searchParams: { "populate[0]": "seo" },
  })
  return res.data
}
