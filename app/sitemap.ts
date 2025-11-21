import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ziyaadbeneydatoula.com"
  const lastModified = new Date()

  const staticRoutes: string[] = [
    "", // home
    "/product",
    "/portfolio",
    "/dataprotection",
    "/cook",
    "/write",
    "/help",
    "/books",
    "/articles",
    "/podcasts",
    "/media",
    "/touchbase",
    "/privacy",
    "/cookies",
    "/terms",
  ]

  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))
}
