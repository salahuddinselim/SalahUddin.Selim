import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID()

  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://id5e9a8v.apicdn.sanity.io https://id5e9a8v.api.sanity.io https://cdn.sanity.io https://api.resend.com https://va.vercel-scripts.com https://challenges.cloudflare.com https://ghchart.rshah.org https://api.github.com",
    "frame-src 'self' https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "report-uri /api/csp-report",
  ]

  const csp = cspDirectives.join("; ")

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set("Content-Security-Policy", csp)
  response.headers.set("x-nonce", nonce)
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  )
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin")
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin")

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.svg|robots.txt|sitemap.xml|opengraph-image|manifest.webmanifest|google08db23e23b4fc7df.html|monitor).*)",
  ],
}
