import { NextResponse } from "next/server"
import { z } from "zod"
import { checkRateLimit } from "@/lib/rate-limit"
import { corsResponse, addCorsHeaders, requireSameOrigin } from "@/lib/cors"

export const runtime = "nodejs"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be under 100 characters").trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be under 254 characters")
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be under 200 characters")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be under 5000 characters")
    .trim(),
})

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!requireSameOrigin(request)) {
    return addCorsHeaders(request, NextResponse.json({ error: "Forbidden" }, { status: 403 }))
  }

  if (request.method === "OPTIONS") {
    return corsResponse(request)
  }

  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported media type" }, { status: 415 })
  }

  const { success: allowed, remaining } = await checkRateLimit(request, "contact", {
    max: 5,
    windowMs: 3600_000,
  })
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": "3600",
          "X-RateLimit-Remaining": String(remaining),
        },
      },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const website = body.website as string | undefined
  if (website) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    const firstError = Object.values(fieldErrors).flat()[0] ?? "Validation failed"
    return NextResponse.json({ error: firstError }, { status: 422 })
  }

  const { name, email, subject, message } = result.data

  const turnstileToken = body.turnstileToken as string | undefined
  if (!turnstileToken) {
    return NextResponse.json({ error: "Please complete the security check" }, { status: 400 })
  }

  const isValid = await verifyTurnstile(turnstileToken)
  if (!isValid) {
    return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log("[Contact] Fallback — email not configured. Logging:", { name, email, subject })
    const response = NextResponse.json(
      { success: true, message: "Message received" },
      { status: 200 },
    )
    return addCorsHeaders(request, response)
  }

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "selimsalahuddin19@gmail.com",
      subject: `[Portfolio] ${esc(subject)}`,
      html: [
        "<h3>New Contact Message</h3>",
        `<p><strong>Name:</strong> ${esc(name)}</p>`,
        `<p><strong>Email:</strong> ${esc(email)}</p>`,
        `<p><strong>Subject:</strong> ${esc(subject)}</p>`,
        "<p><strong>Turnstile:</strong> Passed</p>",
        `<p><strong>Message:</strong></p><p>${esc(message)}</p>`,
      ].join("\n"),
    })

    if (error) {
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    const response = NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 },
    )
    return addCorsHeaders(request, response)
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
