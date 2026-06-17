import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function middleware(request: NextRequest) {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://va.vercel-scripts.com https://*.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https: https://cdn.sanity.io",
    "font-src 'self' data:",
    "connect-src 'self' https: wss: https://id5e9a8v.apicdn.sanity.io https://cdn.sanity.io https://api.resend.com https://va.vercel-scripts.com",
    "frame-src https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "report-uri /api/csp-report",
  ].join("; ")

  const response = NextResponse.next()
  response.headers.set("Content-Security-Policy", csp)
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|robots.txt|sitemap.xml|opengraph-image|manifest.webmanifest|google08db23e23b4fc7df.html).*)"],
}
