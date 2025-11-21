// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"

// Rate limiting config
const CONTACT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 5 // per IP per window

const contactRateLimitMap = new Map<
    string,
    { count: number; firstRequestTs: number }
>()

const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

// XSS & SQL injection patterns from the brief
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

function checkContactRateLimit(ip: string): boolean {
    const now = Date.now()
    const entry = contactRateLimitMap.get(ip)

    if (!entry) {
        contactRateLimitMap.set(ip, { count: 1, firstRequestTs: now })
        return true
    }

    if (now - entry.firstRequestTs > CONTACT_RATE_LIMIT_WINDOW_MS) {
        contactRateLimitMap.set(ip, { count: 1, firstRequestTs: now })
        return true
    }

    if (entry.count >= CONTACT_RATE_LIMIT_MAX_REQUESTS) {
        return false
    }

    entry.count += 1
    contactRateLimitMap.set(ip, entry)
    return true
}

function containsMaliciousPatterns(value: string): boolean {
    const text = value || ""
    for (const pattern of xssPatterns) {
        if (pattern.test(text)) return true
    }
    for (const pattern of sqlPatterns) {
        if (pattern.test(text)) return true
    }
    return false
}

type ContactPayload = {
    name: string
    email: string
    enquiryType: string
    company?: string
    message: string
    meetingScheduled: boolean
    // Optional extras if you want to pass Calendly metadata
    meetingDateTime?: string
    calendlyEventId?: string
}

function validateContactBody(body: any): {
    valid: boolean
    errors: string[]
    payload?: ContactPayload
} {
    const errors: string[] = []

    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const enquiryType = String(body?.enquiryType ?? "").trim()
    const company = String(body?.company ?? "").trim()
    const message = String(body?.message ?? "").trim()
    const meetingScheduled = Boolean(body?.meetingScheduled)
    const meetingDateTime = body?.meetingDateTime
        ? String(body.meetingDateTime).trim()
        : undefined
    const calendlyEventId = body?.calendlyEventId
        ? String(body.calendlyEventId).trim()
        : undefined

    // Name
    if (!name || name.length < 2) {
        errors.push("Name must be at least 2 characters.")
    }
    if (name.length > 100) {
        errors.push("Name must be at most 100 characters.")
    }

    // Email
    if (!email || !isValidEmail(email)) {
        errors.push("Please provide a valid email address.")
    }
    if (email.length > 256) {
        errors.push("Email must be at most 256 characters.")
    }

    // Enquiry Type
    if (!enquiryType) {
        errors.push("Enquiry type is required.")
    }

    // Company (optional)
    if (company && company.length > 100) {
        errors.push("Company name must be at most 100 characters.")
    }

    // Message
    if (!message || message.length < 10) {
        errors.push("Message must be at least 10 characters.")
    }
    if (message.length > 5000) {
        errors.push("Message must be at most 5000 characters.")
    }

    // XSS / SQL pattern blocking on all text fields
    const fieldsToScan = [name, email, enquiryType, company, message]
    for (const f of fieldsToScan) {
        if (!f) continue
        if (containsMaliciousPatterns(f)) {
            errors.push("Input contains disallowed patterns.")
            break
        }
    }

    if (errors.length > 0) {
        return { valid: false, errors }
    }

    const payload: ContactPayload = {
        name,
        email: email.toLowerCase(),
        enquiryType,
        company: company || undefined,
        message,
        meetingScheduled,
        meetingDateTime,
        calendlyEventId,
    }

    return { valid: true, errors: [], payload }
}

/**
 * Email to Zi (admin side).
 * This matches the brief: includes enquiry type, company, etc.
 */
async function sendEmailToZi(payload: ContactPayload) {
    const adminEmail = "zi@ziyaadbeneydatoula.com"
    const subject = `[Website Contact] ${payload.enquiryType || "General"} - ${payload.name
        }${payload.company ? ` from ${payload.company}` : ""}`

    const meetingPart = payload.meetingScheduled
        ? `The user indicated they want to schedule a meeting.${payload.meetingDateTime
            ? ` Proposed/Booked time: ${payload.meetingDateTime}.`
            : ""
        }`
        : "The user did not request a meeting."

    const textBody = `
New contact form submission from the website.

Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company || "-"}
Enquiry Type: ${payload.enquiryType}
Meeting Scheduled: ${payload.meetingScheduled ? "Yes" : "No"}
${payload.meetingDateTime ? `Meeting Date/Time: ${payload.meetingDateTime}` : ""}
${payload.calendlyEventId ? `Calendly Event ID: ${payload.calendlyEventId}` : ""}

Message:
${payload.message}

---
${meetingPart}
  `.trim()

    console.log("[contact] Sending email to Zi:", {
        to: adminEmail,
        subject,
    })

    // TODO: integrate your email provider here.
    // Example:
    //
    // await emailClient.send({
    //   to: adminEmail,
    //   subject,
    //   text: textBody,
    // })
}

/**
 * Auto-reply to the user, as per the brief.
 */
async function sendAutoReplyToUser(payload: ContactPayload) {
    const fromEmail =
        process.env.CONTACT_AUTOREPLY_FROM || "noreply@ziyaadbeneydatoula.com"

    const subject = `Thanks for reaching out, ${payload.name}`

    const bodyNoMeeting = `
Hi ${payload.name},

Thanks for getting in touch about "${payload.enquiryType}"!

I've received your message and will respond within 24 hours.

In the meantime, feel free to:
- Check out my case studies on the site
- Read my latest articles
- Connect with me on LinkedIn

Talk soon,
Zi

---
This is an automated message. Please don't reply to this email.
  `.trim()

    const bodyWithMeeting = `
Hi ${payload.name},

Thanks for getting in touch about "${payload.enquiryType}"!

I've received your message and I'm looking forward to our meeting${payload.meetingDateTime ? ` on ${payload.meetingDateTime}` : ""
        }.

You should have received a calendar invite with the meeting details and Google Meet link. 
If you don't see it, please check your spam folder.

In the meantime, feel free to:
- Check out my case studies on the site
- Read my latest articles
- Connect with me on LinkedIn

Talk soon,
Zi

---
This is an automated message. Please don't reply to this email.
  `.trim()

    const textBody = payload.meetingScheduled ? bodyWithMeeting : bodyNoMeeting

    console.log("[contact] Sending auto-reply to user:", {
        to: payload.email,
        from: fromEmail,
        subject,
    })

    // TODO: integrate your email provider here.
    // Example:
    //
    // await emailClient.send({
    //   to: payload.email,
    //   from: fromEmail,
    //   subject,
    //   text: textBody,
    // })
}

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip")?.trim() ||
        "unknown";

    if (!checkContactRateLimit(ip)) {
        return NextResponse.json(
            {
                error: "Too many contact requests from this IP. Please try again later.",
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

        const { valid, errors, payload } = validateContactBody(body)

        if (!valid || !payload) {
            console.warn("[contact] Validation failed:", { ip, errors })
            // Return only the first error to the client
            return NextResponse.json(
                { error: errors[0] ?? "Invalid input." },
                { status: 400 },
            )
        }

        // Server-side logging for observability / audit
        console.log("[contact] New contact submission:", {
            ip,
            name: payload.name,
            email: payload.email,
            enquiryType: payload.enquiryType,
            meetingScheduled: payload.meetingScheduled,
            ts: new Date().toISOString(),
            userAgent: req.headers.get("user-agent") || "unknown",
        })

        // Email to Zi
        await sendEmailToZi(payload)

        // Auto-reply to user
        await sendAutoReplyToUser(payload)

        // Optionally: log to an external logging service here

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("[contact] Unexpected error:", error)

        // Here you could also send an alert to admin@... for ops
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 },
        )
    }
}
