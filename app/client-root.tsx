// app/client-root.tsx
"use client"

import { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CookieConsent } from "@/components/cookie-consent"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { NewsletterPopup } from "@/components/newsletter-popup"

type ClientRootProps = {
  children: ReactNode
}

export function ClientRoot({ children }: ClientRootProps) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  return (
    <ThemeProvider defaultTheme="dark" storageKey="zi-portfolio-theme">
      {/* Popup */}
      <NewsletterPopup mode="once" />

      {/* Layout chrome */}
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
      <CookieConsent />

      {/* GA wrapper */}
      {GA_ID ? <AnalyticsProvider gaId={GA_ID} /> : null}
    </ThemeProvider>
  )
}
