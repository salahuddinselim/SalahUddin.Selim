import { getProjects } from "@/lib/sanity/fetch"
import type { Metadata } from "next"
import { ProjectsSection } from "@/components/sections/projects-section"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore 5+ production-quality projects by Salah Uddin Selim across Java, Python, PHP, Arduino, and full-stack web development.",
  openGraph: {
    title: "Projects | Salah Uddin Selim",
    description:
      "Explore 5+ production-quality projects by Salah Uddin Selim across Java, Python, PHP, Arduino, and full-stack web development.",
  },
}

export const revalidate = 3600

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen pt-28">
      <ProjectsSection projects={projects} />
    </main>
  )
}
