import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CookieConsent } from "@/components/cookie-consent"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://ziyaadbeneydatoula.com"),
  title: {
    default: "Ziyaad Ben Eydatoula | Product Management Consultant",
    template: "%s | Ziyaad Ben Eydatoula",
  },
  description:
    "Product management consultant based in London. I help product teams cut through the noise, ship faster, and build products customers actually want—securely and at scale.",
  keywords: [
    "Ziyaad Ben Eydatoula",
    "Ziyaad Beneydatoula",
    "Zi",
    "product management consultant",
    "product manager London",
    "product leadership",
    "product strategy",
    "go-to-market",
    "B2B SaaS product",
  ],
  authors: [{ name: "Ziyaad Ben Eydatoula", url: "https://ziyaadbeneydatoula.com" }],
  creator: "Ziyaad Ben Eydatoula",
  publisher: "Ziyaad Ben Eydatoula",
  openGraph: {
    type: "website",
    url: "https://ziyaadbeneydatoula.com",
    title: "Ziyaad Ben Eydatoula | Product Management Consultant",
    description:
      "Product management consultant based in London. I help product teams cut through the noise, ship faster, and build products customers actually want—securely and at scale.",
    siteName: "Ziyaad Ben Eydatoula",
    locale: "en_GB",
    images: [
      {
        url: "/images/og-image.jpg", // make sure this file exists
        width: 1200,
        height: 630,
        alt: "Ziyaad Ben Eydatoula – Product Management Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@The_Zi",
    creator: "@The_Zi",
    title: "Ziyaad Ben Eydatoula | Product Management Consultant",
    description:
      "Product management consultant based in London. I help product teams cut through the noise, ship faster, and build products customers actually want—securely and at scale.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://ziyaadbeneydatoula.com",
  },
  icons: {
    icon: [
      {
        url: "/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
      },
      {
        url: "/images/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        url: "/images/apple-icon.png",
      },
    ],
    shortcut: ["/favicon.ico"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="zi-portfolio-theme">
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <CookieConsent />
        </ThemeProvider>

        <AnalyticsProvider gaId={gaId} />
        <Analytics />
      </body>
    </html>
  )
}
