import { getProjects } from "@/lib/sanity/fetch"
import type { Metadata } from "next"
import { ProjectsSection } from "@/components/sections/projects-section"
import type { SanityProject } from "@/types"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.projects

export const dynamic = "force-static"
export const revalidate = 3600

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
