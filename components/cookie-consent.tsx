"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null
  return null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [decisionLoaded, setDecisionLoaded] = useState(false)

  useEffect(() => {
    const consent = getCookie("analytics_consent")
    if (!consent) {
      setVisible(true)
      trackEvent("cookie_banner_impression", {
        event_category: "consent",
        event_label: "analytics",
      })
    }
    setDecisionLoaded(true)
  }, [])

  const handleChoice = (allowAnalytics: boolean) => {
    setCookie("analytics_consent", allowAnalytics ? "true" : "false", 365)
    trackEvent("cookie_banner_choice", {
      event_category: "consent",
      event_label: allowAnalytics ? "accept" : "decline",
    })
    setVisible(false)
    // Reload so AnalyticsProvider can pick up the new cookie and (if allowed) init GA
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  if (!decisionLoaded || !visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">
            Cookies & analytics
          </p>
          <p className="text-xs leading-relaxed md:text-sm">
            This site uses essential cookies and an optional Google Analytics pixel to
            understand how the site is used. You can accept or decline analytics. You can
            change your choice later by clearing cookies for this site.
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs md:text-sm"
            onClick={() => handleChoice(false)}
          >
            Decline analytics
          </Button>
          <Button
            size="sm"
            className="text-xs md:text-sm"
            onClick={() => handleChoice(true)}
          >
            Accept analytics
          </Button>
        </div>
      </div>
    </div>
  )
}
