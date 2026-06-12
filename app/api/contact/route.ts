import { NextResponse } from "next/server"

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW = 60_000

function getIP(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  entry.count++
  if (entry.count > RATE_LIMIT) return true
  return false
}

export async function POST(request: Request) {
  try {
    const ip = getIP(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      )
    }

    const { name, email, subject, message, website } = await request.json()

    if (website) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 400 },
      )
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.log("[Contact] No RESEND_API_KEY configured. Logging message instead.")
      console.log({ name, email, subject, message })
      return NextResponse.json(
        { success: true, message: "Message received! (Email sending not configured)" },
        { status: 200 },
      )
    }

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "salahuddin@example.com",
      subject: `[Portfolio] ${esc(subject)}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Subject:</strong> ${esc(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${esc(message)}</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", data },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
