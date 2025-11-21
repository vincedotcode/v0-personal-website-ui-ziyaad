// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server"

// Rate limiting config
const SUB_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const SUB_RATE_LIMIT_MAX_REQUESTS = 20 // per IP per window

// In-memory rate limiter (per runtime instance)
// For multi-region / multi-instance, swap this for Redis/Upstash, etc.
const subscribeRateLimitMap = new Map<
  string,
  { count: number; firstRequestTs: number }
>()

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function checkSubscribeRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = subscribeRateLimitMap.get(ip)

  if (!entry) {
    subscribeRateLimitMap.set(ip, { count: 1, firstRequestTs: now })
    return true
  }

  // Reset window
  if (now - entry.firstRequestTs > SUB_RATE_LIMIT_WINDOW_MS) {
    subscribeRateLimitMap.set(ip, { count: 1, firstRequestTs: now })
    return true
  }

  if (entry.count >= SUB_RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  entry.count += 1
  subscribeRateLimitMap.set(ip, entry)
  return true
}

/**
 * Persistence hook – plug this into your DB / ESP.
 *
 * Examples:
 * - Prisma: await prisma.subscriber.upsert(...)
 * - External service: await fetch(process.env.SUBSCRIBE_WEBHOOK_URL!, ...)
 */
async function persistSubscriber(email: string) {
  // Implement real persistence here.
  // This log ensures nothing is silently swallowed in the meantime.
  console.log("[subscribe] Persisting subscriber:", { email })
}

/**
 * Notification hook – email admin about new subscriber.
 *
 * Examples:
 * - Resend
 * - Sendgrid
 * - SES
 * - SMTP via Nodemailer
 */
async function notifyAdminOfNewSubscriber(email: string) {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || "admin@ziyaadbeneydatoula.com"

  console.log("[subscribe] Notifying admin of new subscriber:", {
    adminEmail,
    email,
  })

  // TODO: integrate your email provider here.
  // Example shape:
  //
  // await emailClient.send({
  //   to: adminEmail,
  //   subject: `New subscriber: ${email}`,
  //   text: `A new subscriber has joined the list: ${email}`,
  // })
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"

  if (!checkSubscribeRateLimit(ip)) {
    return NextResponse.json(
      {
        error: "Too many subscribe requests from this IP. Please try again later.",
      },
      { status: 429 },
    )
  }

  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      )
    }

    const rawEmail = String(body.email ?? "").trim()

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      )
    }

    // Optional: normalize email (lowercase etc.)
    const email = rawEmail.toLowerCase()

    // Persist subscriber
    await persistSubscriber(email)

    // Notify admin
    await notifyAdminOfNewSubscriber(email)

    // Minimal logging for observability
    console.log("[subscribe] Successfully processed subscriber:", {
      ip,
      email,
      ts: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: "Subscribed successfully." },
      { status: 200 },
    )
  } catch (error) {
    console.error("[subscribe] Unexpected error:", error)

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    )
  }
}
