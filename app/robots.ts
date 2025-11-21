import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/error", // internal error page, no need to index
        ],
      },
    ],
    sitemap: "https://ziyaadbeneydatoula.com/sitemap.xml",
  }
}
