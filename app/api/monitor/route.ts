import { NextResponse } from "next/server"
import { getProjects, getCredentials, getSkills } from "@/lib/sanity/fetch"
import pkg from "@/package.json"

export const dynamic = "force-dynamic"

export async function GET() {
  const start = Date.now()

  const [projects, credentials, skills] = await Promise.all([
    getProjects().catch(() => []),
    getCredentials().catch(() => []),
    getSkills().catch(() => []),
  ])

  const dbLatency = Date.now() - start

  const deps = pkg.dependencies ?? {}
  const devDeps = pkg.devDependencies ?? {}

  return NextResponse.json({
    dbLatency,
    contentMetrics: {
      projects: projects.length,
      credentials: credentials.length,
      skills: skills.length,
    },
    techStack: {
      next: deps.next ?? "—",
      react: deps.react ?? "—",
      node: process.version,
      env: process.env.VERCEL_ENV ?? "development",
    },
    seo: {
      score: 100,
      items: [
        { label: "Robots", status: "ACTIVE" as const },
        { label: "Sitemap", status: "ACTIVE" as const },
        { label: "Favicon", status: "ACTIVE" as const },
        { label: "OG Image", status: "ACTIVE" as const },
      ],
    },
  })
}
