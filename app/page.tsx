import { HeroSection } from "@/components/sections/hero-section"
import { AwardBadge } from "@/components/sections/award-badge"
import dynamic from "next/dynamic"
import { getProjects } from "@/lib/sanity/fetch"
import type { SanityProject } from "@/types"

const ProjectsPreview = dynamic(
  () => import("@/components/sections/projects-preview").then((mod) => mod.ProjectsPreview),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> }
)

const AboutPreview = dynamic(
  () => import("@/components/sections/about-preview").then((mod) => mod.AboutPreview),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> }
)

const ExperienceSection = dynamic(
  () => import("@/components/sections/experience-section").then((mod) => mod.ExperienceSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> }
)

const ContactSection = dynamic(
  () => import("@/components/sections/contact-section").then((mod) => mod.ContactSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> }
)

export default async function Home() {
  let allProjects: SanityProject[] = []
  try {
    allProjects = await getProjects()
  } catch (error) {
    console.error("Failed to load projects for home page:", error)
  }

  return (
    <main>
      <HeroSection />
      <AwardBadge />
      <ProjectsPreview projects={allProjects} />
      <AboutPreview />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}
