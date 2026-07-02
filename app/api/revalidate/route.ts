import { NextResponse, type NextRequest } from "next/server"
import { revalidateTag } from "next/cache"
import { parseBody } from "next-sanity/webhook"

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return NextResponse.json({ error: "Revalidation not configured" }, { status: 503 })
    }

    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret)

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ error: "Missing _type in payload" }, { status: 400 })
    }

    revalidateTag("sanity", "max")

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() })
  } catch (error) {
    console.error("[revalidate] Failed:", error)
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 })
  }
}
