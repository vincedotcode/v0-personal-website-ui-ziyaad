"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    __ziGaInitialized__?: boolean
  }
}

type AnalyticsProviderProps = {
  gaId?: string | null
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null
  return null
}

export function AnalyticsProvider({ gaId }: AnalyticsProviderProps) {
  useEffect(() => {
    if (!gaId) return
    if (typeof window === "undefined") return

    const consent = getCookie("analytics_consent")
    if (consent !== "true") {
      return
    }

    if (window.__ziGaInitialized__) {
      return
    }

    window.__ziGaInitialized__ = true

    // gtag.js
    const scriptTag = document.createElement("script")
    scriptTag.async = true
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(scriptTag)

    // config script
    const configScript = document.createElement("script")
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        anonymize_ip: true
      });
    `
    document.head.appendChild(configScript)
  }, [gaId])

  return null
}
