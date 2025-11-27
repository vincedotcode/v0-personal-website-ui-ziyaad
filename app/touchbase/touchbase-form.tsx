"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Twitter } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

// ---------- Types & constants ----------

type EnquiryTypeValue = "critique" | "building" | "gtm" | "coaching" | "other"

interface EnquiryOption {
  value: EnquiryTypeValue
  label: string
}

const ENQUIRY_OPTIONS: EnquiryOption[] = [
  {
    value: "critique",
    label: "Product Critique (Pre-Release Reality Check)",
  },
  {
    value: "building",
    label: "Product Building (Discovery → Delivery)",
  },
  {
    value: "gtm",
    label: "Go-To-Market Strategy (Launch With Clarity)",
  },
  {
    value: "coaching",
    label: "Product Coaching & Team Education",
  },
  {
    value: "other",
    label: "Other",
  },
]

// Payload expected by /api/contact
interface ContactRequest {
  name: string
  email: string
  enquiryType: string // send the human-readable label
  company?: string
  message: string
  meetingScheduled: boolean
  calendlyEventUri?: string | null
}

interface FieldErrors {
  name?: string
  email?: string
  enquiryType?: string
  company?: string
  message?: string
  general?: string
}

type SuccessVariant = "meeting" | "no-meeting" | null
const ENQUIRY_TEMPLATES: Record<EnquiryTypeValue, string> = {
  critique: "I'm interested in a product critique. ",
  building: "I'm interested in help with product building. ",
  gtm: "I'm interested in GTM strategy help. ",
  coaching: "I'm interested in coaching for my product team. ",
  other: "",
}

// XSS / SQL patterns (must match what you use on the backend)
const xssPatterns = [
  /<script[^>]*>.*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /data:text\/html/gi,
]

const sqlPatterns = [
  /(\s|^)(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)(\s|$)/gi,
  /(--|\/\*|\*\/)/g,
  /('|")(\s*)(OR|AND)(\s*)/gi,
]

// ---------- Page component ----------

export function TouchBaseForm() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({
    name: "",
    email: "",
    enquiryType: "",
    company: "",
    message: "",
    scheduleMeeting: false,
  })

  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successVariant, setSuccessVariant] = useState<SuccessVariant>(null)
  const [calendlyVisible, setCalendlyVisible] = useState(false)
  const [calendlyBooked, setCalendlyBooked] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [preAppliedQuery, setPreAppliedQuery] = useState(false)

  const messageLength = form.message.length

  // Fire "form_start" once when user first interacts
  const markFormStarted = () => {
    if (!hasStarted) {
      setHasStarted(true)
      trackEvent("form_start", {
        event_category: "contact",
        event_label: "Touch Base Form",
      })
    }
  }

  // Listen to Calendly postMessage events
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!e.data || typeof e.data !== "object") return
      const data = e.data as { event?: string; payload?: any }
      if (data.event === "calendly.event_scheduled") {
        setCalendlyBooked(true)
        trackEvent("appointment_booked", {
          event_category: "conversion",
          event_label: "Calendly",
        })
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Auto-dismiss success banner after 10 seconds
  useEffect(() => {
    if (!successVariant) return
    const timer = setTimeout(() => setSuccessVariant(null), 10000)
    return () => clearTimeout(timer)
  }, [successVariant])

  // Apply prefilled enquiry/message from URL once
  useEffect(() => {
    if (preAppliedQuery) return
    const enquiry = (searchParams.get("enquiry") || "").toLowerCase()
    const match = ENQUIRY_OPTIONS.find((opt) => opt.value === enquiry)
    if (match) {
      setForm((prev) => ({
        ...prev,
        enquiryType: match.value,
        message:
          prev.message || ENQUIRY_TEMPLATES[match.value] + " My Message - ",
      }))
      setPreAppliedQuery(true)
    } else {
      setPreAppliedQuery(true)
    }
  }, [preAppliedQuery, searchParams])

  const validate = (): boolean => {
    const newErrors: FieldErrors = {}

    const name = form.name.trim()
    const email = form.email.trim()
    const enquiryType = form.enquiryType
    const company = form.company.trim()
    const message = form.message.trim()

    // Name
    if (!name) {
      newErrors.name = "Please enter your name."
    } else if (name.length < 2) {
      newErrors.name = "Please enter at least 2 characters."
    } else if (name.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters."
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      newErrors.email = "Please enter your email address."
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address."
    } else if (email.length > 256) {
      newErrors.email = "Email cannot exceed 256 characters."
    }

    // Enquiry Type
    if (!enquiryType) {
      newErrors.enquiryType = "Please select what you need help with."
    }

    // Company (optional)
    if (company && company.length > 100) {
      newErrors.company = "Company name cannot exceed 100 characters."
    }

    // Message
    if (!message) {
      newErrors.message = "Please enter a message (minimum 10 characters)."
    } else if (message.length < 10) {
      newErrors.message = "Please enter a message (minimum 10 characters)."
    } else if (message.length > 5000) {
      newErrors.message = "Message cannot exceed 5000 characters."
    } else {
      for (const pattern of xssPatterns) {
        if (pattern.test(message)) {
          newErrors.message = "Your message contains disallowed script content."
          break
        }
      }
      if (!newErrors.message) {
        for (const pattern of sqlPatterns) {
          if (pattern.test(message)) {
            newErrors.message = "Your message contains disallowed SQL-like content."
            break
          }
        }
      }
    }

    if (form.scheduleMeeting && !calendlyBooked) {
      newErrors.general =
        "Please book a meeting using the calendar below, or uncheck the meeting option if you only want to send a message."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    markFormStarted()

    const target = e.target
    const { name, value } = target

    // Clear field-specific errors eagerly
    setErrors((prev) => ({ ...prev, [name]: undefined }))

    if (name === "scheduleMeeting") {
      const isChecked =
        target instanceof HTMLInputElement ? target.checked : false

      setForm((prev) => ({
        ...prev,
        scheduleMeeting: isChecked,
      }))

      trackEvent(`meeting_checkbox_${isChecked ? "checked" : "unchecked"}`, {
        event_category: "contact",
        event_label: "Schedule Meeting",
      })

      setCalendlyVisible(isChecked)
      if (isChecked) {
        trackEvent("calendly_revealed", {
          event_category: "engagement",
          event_label: "Progressive Disclosure",
        })
      } else {
        setCalendlyBooked(false)
      }

      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "enquiryType") {
      const option = ENQUIRY_OPTIONS.find((opt) => opt.value === value)
      if (option) {
        trackEvent("service_selected", {
          event_category: "contact",
          event_label: option.label,
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccessVariant(null)

    if (!validate()) {
      const firstErrorFieldId =
        (errors.name && "name") ||
        (errors.email && "email") ||
        (errors.enquiryType && "enquiryType") ||
        (errors.message && "message") ||
        null

      if (firstErrorFieldId) {
        const el = document.getElementById(firstErrorFieldId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsSubmitting(true)

    const selectedOption = ENQUIRY_OPTIONS.find(
      (opt) => opt.value === form.enquiryType
    )

    const payload: ContactRequest = {
      name: form.name.trim(),
      email: form.email.trim(),
      enquiryType: selectedOption ? selectedOption.label : "Other",
      company: form.company.trim() || undefined,
      message: form.message.trim(),
      meetingScheduled: form.scheduleMeeting && calendlyBooked,
      calendlyEventUri: undefined,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const errMsg =
          (data && data.error) ||
          "Something went wrong while sending your message. Please try again."
        setErrors({ general: errMsg })
        trackEvent("form_submit", {
          event_category: "conversion",
          event_label: "Contact Form",
          value: 0,
        })
        return
      }

      trackEvent("form_submit", {
        event_category: "conversion",
        event_label: "Contact Form",
        value: payload.meetingScheduled ? 1 : 0,
      })

      setSuccessVariant(payload.meetingScheduled ? "meeting" : "no-meeting")

      setForm({
        name: "",
        email: "",
        enquiryType: "",
        company: "",
        message: "",
        scheduleMeeting: false,
      })
      setCalendlyVisible(false)
      setCalendlyBooked(false)
      setHasStarted(false)
    } catch (error) {
      console.error("Error submitting contact form", error)
      setErrors({
        general:
          "A network error occurred while sending your message. Please check your connection and try again.",
      })
      trackEvent("form_submit", {
        event_category: "conversion",
        event_label: "Contact Form",
        value: 0,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialClick = (platform: "LinkedIn" | "Twitter" | "Email") => {
    trackEvent("social_click", {
      event_category: "engagement",
      event_label: platform,
    })
  }

  return (
    <div className="relative">
      <RippleGridBackground />

      <div className="container mx-auto max-w-5xl px-4 py-16 md:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Hero */}
          <div className="space-y-4 text-center">
            <Badge>Touch Base</Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Let’s Chat About Your Product Challenges
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
              Tell me what you're working on, and I&apos;ll respond within 24 hours.
              Want to jump on a call? Check the box below to schedule a time that
              works for you.
            </p>
          </div>

          <Card className="relative">
            <CardHeader className="space-y-2">
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>
                Share a bit about your product, where you&apos;re stuck, and what
                success would look like. I&apos;ll take it from there.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Success banner */}
              {successVariant && (
                <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {successVariant === "meeting" ? (
                    <>
                      <p className="font-medium">
                        ✓ Your message has been sent successfully!
                      </p>
                      <p className="mt-1">
                        I&apos;ve received your message and I&apos;m looking
                        forward to our meeting!
                      </p>
                      <p className="mt-1">
                        You should have received a calendar invite with the
                        meeting details and Google Meet link. If you don&apos;t see
                        it, check your spam folder.
                      </p>
                      <p className="mt-1">Talk soon!</p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium">
                        ✓ Your message has been sent successfully!
                      </p>
                      <p className="mt-1">
                        I&apos;ve received your message and will respond within 24
                        hours. Keep an eye on your inbox (and spam folder, just in
                        case).
                      </p>
                      <p className="mt-1">
                        If you change your mind and want to schedule a call, you can
                        book a time directly on my calendar anytime.
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* General error */}
              {errors.general && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name + Email */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={markFormStarted}
                      placeholder="John Doe"
                      maxLength={100}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={markFormStarted}
                      placeholder="yourname@company.com"
                      maxLength={256}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Enquiry + Company */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="enquiryType">
                      What can I help you with? *
                    </Label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={handleChange}
                      onBlur={markFormStarted}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-invalid={!!errors.enquiryType}
                      aria-describedby={
                        errors.enquiryType ? "enquiryType-error" : undefined
                      }
                    >
                      <option value="">Select a service...</option>
                      {ENQUIRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType && (
                      <p
                        id="enquiryType-error"
                        className="text-xs text-destructive"
                      >
                        {errors.enquiryType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      onBlur={markFormStarted}
                      placeholder="Acme Inc."
                      maxLength={100}
                      aria-invalid={!!errors.company}
                      aria-describedby={
                        errors.company ? "company-error" : undefined
                      }
                    />
                    {errors.company && (
                      <p id="company-error" className="text-xs text-destructive">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Tell me about your product challenge *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={markFormStarted}
                    placeholder="What are you working on? Where are you stuck? What would success look like?"
                    rows={6}
                    maxLength={5000}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : "message-help"
                    }
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span id="message-help">
                      Minimum 10 characters. Maximum 5000 characters.
                    </span>
                    <span>{messageLength} / 5000 characters</span>
                  </div>
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Meeting checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      id="scheduleMeeting"
                      name="scheduleMeeting"
                      type="checkbox"
                      checked={form.scheduleMeeting}
                      onChange={handleChange}
                      onBlur={markFormStarted}
                      className="mt-1 h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    <Label
                      htmlFor="scheduleMeeting"
                      className="text-sm font-medium"
                    >
                      I&apos;d like to schedule a meeting to discuss this
                    </Label>
                  </div>
                </div>

                {/* Calendly (progressive disclosure, responsive) */}
                <div
                  className={`transition-all duration-300 ${
                    calendlyVisible
                      ? "mt-4 opacity-100 translate-y-0"
                      : "pointer-events-none h-0 opacity-0 -translate-y-1"
                  }`}
                >
                  {calendlyVisible && (
                    <div className="space-y-3 rounded-lg border bg-muted/40 p-3 sm:p-4 -mx-3 sm:mx-0">
                      <p className="text-sm text-muted-foreground">
                        Great! Select a time that works for you below. You&apos;ll
                        receive a calendar invite and Google Meet link immediately
                        after booking.
                      </p>
                      <div className="relative w-full max-w-full overflow-hidden">
                        {/* Aspect-ratio box to keep iframe responsive */}
                        <div className="absolute inset-0">
                          <div
                            className="calendly-inline-widget w-full h-full rounded-md overflow-hidden"
                            data-url="https://calendly.com/ziyaad-b-eydatoula/30min"
                            style={{
                              minWidth: "0",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                        <div className="invisible pt-[150%] sm:pt-[120%] lg:pt-[90%]" />
                      </div>
                      {/* Calendly script */}
                      <script
                        type="text/javascript"
                        src="https://assets.calendly.com/assets/external/widget.js"
                        async
                      />
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[160px]"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>

              {/* Social section */}
              <div className="mt-8 border-t pt-6">
                <h2 className="text-sm font-semibold">
                  Or Connect on Social Media
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Let&apos;s stay connected. Follow me for product insights,
                  frameworks, and the occasional rant about bad UX.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="https://www.linkedin.com/in/ziyaadbeneydatoula/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick("LinkedIn")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform transition-colors hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com/The_Zi"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick("Twitter")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform transition-colors hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <a
                    href="mailto:zi@ziyaadbeneydatoula.com"
                    onClick={() => handleSocialClick("Email")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform transition-colors hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
