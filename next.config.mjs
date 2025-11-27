const remotePatterns = []

if (process.env.NEXT_PUBLIC_STRAPI_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_STRAPI_URL)
    // Allow both http/https so local + production Strapi assets stay optimized
    const port = url.port ? Number(url.port) : undefined
    const hostname = url.hostname
    remotePatterns.push(
      { protocol: "https", hostname, port, pathname: "/**" },
      { protocol: "http", hostname, port, pathname: "/**" },
    )
  } catch {
    // ignore malformed env value – fall back to defaults
  }
}

// Strapi's managed media domains (e.g., *.media.strapiapp.com)
remotePatterns.push({
  protocol: "https",
  hostname: "*.strapiapp.com",
  pathname: "/**",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    ...(remotePatterns.length ? { remotePatterns } : {}),
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
