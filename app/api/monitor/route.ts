import { NextResponse } from "next/server"
import { getProjects, getCredentials, getSkills } from "@/lib/sanity/fetch"
import { corsResponse, addCorsHeaders, isSameOrigin } from "@/lib/cors"
import { checkRateLimit } from "@/lib/rate-limit"
import { s as siteUrl } from "@/data/site"
import nextPkg from "next/package.json"
import reactPkg from "react/package.json"

export const dynamic = "force-dynamic"

// Captured once when this serverless function instance is initialized, not
// per-request -- since Vercel spins up fresh instances on every deploy, this
// is a reliable proxy for "when this deployment went live" without needing a
// dedicated deploy-timestamp API.
const INSTANCE_STARTED_AT = new Date().toISOString()

async function checkEndpoint(
  path: string,
): Promise<{ label: string; status: "Online" | "Offline" }> {
  try {
    const res = await fetch(`${siteUrl}${path}`, { cache: "no-store" })
    return { label: path, status: res.ok ? "Online" : "Offline" }
  } catch {
    return { label: path, status: "Offline" }
  }
}

// System health reflects infrastructure state: is the CMS reachable, and how
// fast. This is independent of the SEO checks below (a slow-but-correct SEO
// file shouldn't drag down "is the system healthy").
function computeSystemHealth(dbOk: boolean, dbLatencyMs: number): number {
  if (!dbOk) return 40
  if (dbLatencyMs > 1500) return 75
  if (dbLatencyMs > 800) return 90
  if (dbLatencyMs > 300) return 97
  return 100
}

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

  const [projectsResult, credentialsResult, skillsResult] = await Promise.allSettled([
    getProjects(),
    getCredentials(),
    getSkills(),
  ])
  const dbOk =
    projectsResult.status === "fulfilled" ||
    credentialsResult.status === "fulfilled" ||
    skillsResult.status === "fulfilled"
  const dbLatency = Date.now() - start

  const seoChecks = await Promise.all([
    checkEndpoint("/robots.txt"),
    checkEndpoint("/sitemap.xml"),
    checkEndpoint("/manifest.webmanifest"),
    checkEndpoint("/opengraph-image"),
  ])
  const seoOnlineCount = seoChecks.filter((c) => c.status === "Online").length

  const response = NextResponse.json({
    status: dbOk ? "ok" : "degraded",
    dbLatency,
    contentMetrics: {
      projects: projectsResult.status === "fulfilled" ? projectsResult.value.length : 0,
      credentials: credentialsResult.status === "fulfilled" ? credentialsResult.value.length : 0,
      skills: skillsResult.status === "fulfilled" ? skillsResult.value.length : 0,
    },
    techStack: {
      next: nextPkg.version,
      react: reactPkg.version,
      node: process.version,
      env: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
    },
    uptime: Math.floor(process.uptime()),
    lastDeployedAt: INSTANCE_STARTED_AT,
    deployCommit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    seo: {
      score: Math.round((seoOnlineCount / seoChecks.length) * 100),
      items: seoChecks.map((c) => ({ label: c.label, status: c.status })),
    },
    health: computeSystemHealth(dbOk, dbLatency),
  })

  return addCorsHeaders(request, response)
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
