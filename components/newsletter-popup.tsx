"use client"

import { useEffect, useRef, useState } from "react"
import { trackEvent } from "@/lib/analytics"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type NewsletterPopupMode = "once" | "always"
type NewsletterCloseReason =
  | "user_dismiss"
  | "submit_success"
  | "submit_error"
  | "auto_hide"
  | "programmatic"

type NewsletterPopupProps = {
  /**
   * "once"  -> show only the first time (per browser) until user closes or subscribes
   * "always" -> show on every page load
   */
  mode?: NewsletterPopupMode
  /**
   * Optional delay before showing (ms)
   */
  delayMs?: number
}

const STORAGE_KEY = "zi_newsletter_seen"

export function NewsletterPopup({
  mode = "once",
  delayMs = 1500,
}: NewsletterPopupProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [closeReason, setCloseReason] =
    useState<NewsletterCloseReason | null>(null)
  const openTimestampRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // If we've already shown it once, log suppression and bail
    const hasSeen = window.localStorage.getItem(STORAGE_KEY)
    if (mode === "once" && hasSeen) {
      trackEvent("newsletter_popup_suppressed", {
        event_category: "newsletter",
        event_label: "already_seen",
        mode,
      })
      return
    }

    const timer = setTimeout(() => {
      setOpen(true)
      trackEvent("newsletter_popup_triggered", {
        event_category: "newsletter",
        event_label: mode,
        delay_ms: delayMs,
      })
    }, delayMs)

    return () => clearTimeout(timer)
  }, [mode, delayMs])

  const handleClose = (
    nextOpen: boolean,
    reason: NewsletterCloseReason = "user_dismiss"
  ) => {
    // Capture close reason for analytics when we transition from open -> closed
    if (!nextOpen && open) {
      setCloseReason(reason)
    }

    setOpen(nextOpen)

    if (!nextOpen && typeof window !== "undefined" && mode === "once") {
      window.localStorage.setItem(STORAGE_KEY, "1")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    trackEvent("newsletter_submit_attempt", {
      event_category: "newsletter",
      event_label: "popup",
      has_email: Boolean(email),
    })

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorReason = data?.error ? "backend_error" : "unknown_error"
        setError(data.error || "Something went wrong. Please try again.")
        trackEvent("newsletter_submit_error", {
          event_category: "newsletter",
          event_label: "popup",
          status: res.status,
          error_reason: errorReason,
        })
        setCloseReason("submit_error")
        return
      }

      setSuccess("You’re in. Check your inbox.")
      setEmail("")
      trackEvent("newsletter_submit_success", {
        event_category: "newsletter",
        event_label: "popup",
      })

      // Mark as seen + close after a short delay
      if (typeof window !== "undefined" && mode === "once") {
        window.localStorage.setItem(STORAGE_KEY, "1")
      }
      setTimeout(() => handleClose(false, "submit_success"), 800)
    } catch (err) {
      console.error(err)
      setError("Network error. Please try again.")
      trackEvent("newsletter_submit_error", {
        event_category: "newsletter",
        event_label: "popup",
        error_reason: "network_error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Log open + close with dwell time
  useEffect(() => {
    if (open) {
      openTimestampRef.current = performance.now()
      trackEvent("newsletter_popup_open", {
        event_category: "newsletter",
        event_label: mode,
      })
      return
    }

    if (openTimestampRef.current !== null) {
      const dwell = Math.round(performance.now() - openTimestampRef.current)
      trackEvent("newsletter_popup_close", {
        event_category: "newsletter",
        event_label: closeReason ?? "programmatic",
        dwell_ms: dwell,
      })
      openTimestampRef.current = null
      setCloseReason(null)
    }
  }, [open, closeReason, mode])

  const handleEmailFocus = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      trackEvent("newsletter_email_focus", {
        event_category: "newsletter",
        event_label: mode,
      })
    }
  }

  const handleEmailChange = (value: string) => {
    if (!hasInteracted) {
      setHasInteracted(true)
      trackEvent("newsletter_typing_started", {
        event_category: "newsletter",
        event_label: mode,
      })
    }
    setEmail(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-border/70 bg-gradient-to-b from-background via-background/95 to-muted/60 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold tracking-[0.22em] uppercase text-muted-foreground">
            Newsletter
          </DialogTitle>
          <DialogDescription className="sr-only">
            Join the newsletter to get updates.
          </DialogDescription>
        </DialogHeader>

        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0 pb-3">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Steal my thinking, not just my outputs.
            </CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              Get occasional, dense emails on product, strategy, and execution.
              No fluff, no spam, just signal.
            </p>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="newsletter-email"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Email address
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onFocus={handleEmailFocus}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 text-sm"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="whitespace-nowrap"
                  >
                    {loading ? "Subscribing…" : "Get the signal"}
                  </Button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-destructive font-medium">{error}</p>
              )}
              {success && (
                <p className="text-xs text-emerald-600 font-medium">{success}</p>
              )}

              <p className="text-[11px] leading-relaxed text-muted-foreground/80">
                I’ll only email when there’s something genuinely useful to say.
                One click to unsubscribe, no drama.
              </p>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
