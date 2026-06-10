import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

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

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "salahuddin@example.com",
      subject: `[Portfolio] ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
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
