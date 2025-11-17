import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CookieConsent } from "@/components/cookie-consent"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zi's Portfolio - Lead Product Manager",
  description:
    "Personal portfolio",
  icons: {
    // main favicons
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
      // theme-aware app icon
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="zi-portfolio-theme">
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
