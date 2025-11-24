"use client"

import { useEffect, useState } from "react"
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

  useEffect(() => {
    if (typeof window === "undefined") return

    if (mode === "always") {
      const timer = setTimeout(() => setOpen(true), delayMs)
      return () => clearTimeout(timer)
    }

    // mode === "once"
    const hasSeen = window.localStorage.getItem(STORAGE_KEY)
    if (!hasSeen) {
      const timer = setTimeout(() => setOpen(true), delayMs)
      return () => clearTimeout(timer)
    }
  }, [mode, delayMs])

  const handleClose = (nextOpen: boolean) => {
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

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        return
      }

      setSuccess("You’re in. Check your inbox.")
      setEmail("")

      // Mark as seen + close after a short delay
      if (typeof window !== "undefined" && mode === "once") {
        window.localStorage.setItem(STORAGE_KEY, "1")
      }
      setTimeout(() => setOpen(false), 800)
    } catch (err) {
      console.error(err)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
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
                    onChange={(e) => setEmail(e.target.value)}
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
