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

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-28">
      <ProjectsSection />
    </main>
  )
}
