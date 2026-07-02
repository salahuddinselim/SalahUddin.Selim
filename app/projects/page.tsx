import { getProjects } from "@/lib/sanity/fetch"
import type { Metadata } from "next"
import nextDynamic from "next/dynamic"
import type { SanityProject } from "@/types"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.projects

export const dynamic = "force-static"
export const revalidate = 3600

const ProjectsSection = nextDynamic(
  () => import("@/components/sections/projects-section").then((mod) => mod.ProjectsSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

export default async function ProjectsPage() {
  let projects: SanityProject[] = []
  try {
    projects = await getProjects()
  } catch (error) {
    console.error("Failed to load projects for projects page:", error)
  }

  return (
    <main className="min-h-screen pt-28">
      <ProjectsSection projects={projects} />
    </main>
  )
}
