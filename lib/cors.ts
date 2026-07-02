import { NextResponse } from "next/server"

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  "https://salah-uddin-selim.vercel.app",
].filter(Boolean) as string[]

const ALLOWED_METHODS = ["GET", "POST", "OPTIONS"]
const ALLOWED_HEADERS = ["Content-Type", "Authorization", "x-nonce"]

function getOrigin(request: Request): string | null {
  return request.headers.get("origin")
}

export function isSameOrigin(request: Request): boolean {
  const origin = getOrigin(request)
  if (!origin) return true
  return ALLOWED_ORIGINS.some((allowed) => origin === allowed)
}

// Stricter check for state-changing (POST) endpoints: browsers always send
// Origin on same-origin POST/fetch requests, so a missing Origin here means
// the request didn't come from a browser page on this site (e.g. a script
// hitting the API directly) and should be rejected rather than allowed.
export function requireSameOrigin(request: Request): boolean {
  const origin = getOrigin(request)
  if (!origin) return false
  return ALLOWED_ORIGINS.some((allowed) => origin === allowed)
}

export function corsResponse(request: Request, status = 204) {
  const origin = getOrigin(request)
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, {
      status,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": ALLOWED_METHODS.join(", "),
        "Access-Control-Allow-Headers": ALLOWED_HEADERS.join(", "),
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      },
    })
  }
  return new NextResponse(null, { status })
}

export function addCorsHeaders(request: Request, response: NextResponse): NextResponse {
  const origin = getOrigin(request)
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin)
    response.headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS.join(", "))
    response.headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS.join(", "))
    response.headers.set("Access-Control-Max-Age", "86400")
    response.headers.set("Vary", "Origin")
  }
  return response
}
