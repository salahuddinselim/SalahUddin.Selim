import { NextResponse } from "next/server"
import { getProjects, getCredentials, getSkills } from "@/lib/sanity/fetch"
import { corsResponse, addCorsHeaders, isSameOrigin } from "@/lib/cors"
import { checkRateLimit } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  if (!isSameOrigin(request)) {
    return addCorsHeaders(request, NextResponse.json({ error: "Forbidden" }, { status: 403 }))
  }

  const { success: allowed } = await checkRateLimit(request, "monitor", {
    max: 60,
    windowMs: 3600_000,
  })
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const start = Date.now()

  const [projects, credentials, skills] = await Promise.all([
    getProjects().catch(() => []),
    getCredentials().catch(() => []),
    getSkills().catch(() => []),
  ])

  const response = NextResponse.json({
    status: "ok",
    dbLatency: Date.now() - start,
    contentMetrics: {
      projects: projects.length,
      credentials: credentials.length,
      skills: skills.length,
    },
  })

  return addCorsHeaders(request, response)
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
