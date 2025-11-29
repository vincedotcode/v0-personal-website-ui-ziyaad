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
    console.log("[AnalyticsProvider] mount, gaId =", gaId)

    if (!gaId) {
      console.log("[AnalyticsProvider] No GA ID, abort")
      return
    }

    if (typeof window === "undefined") {
      console.log("[AnalyticsProvider] Running on server, abort")
      return
    }

    const consent = getCookie("analytics_consent")
    console.log("[AnalyticsProvider] analytics_consent cookie =", consent)

    if (consent !== "true") {
      console.log("[AnalyticsProvider] Consent not granted, abort")
      return
    }

    if (window.__ziGaInitialized__) {
      console.log("[AnalyticsProvider] GA already initialized, abort")
      return
    }

    console.log("[AnalyticsProvider] Initializing GA…")
    window.__ziGaInitialized__ = true

    const scriptTag = document.createElement("script")
    scriptTag.async = true
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    scriptTag.onload = () => {
      console.log("[AnalyticsProvider] gtag.js loaded")
    }
    scriptTag.onerror = () => {
      console.log("[AnalyticsProvider] gtag.js failed to load")
    }
    document.head.appendChild(scriptTag)

    const configScript = document.createElement("script")
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    `
    document.head.appendChild(configScript)
    console.log("[AnalyticsProvider] Config script injected")
  }, [gaId])

  return null
}

