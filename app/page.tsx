import { HeroSection } from "@/components/sections/hero-section"
import { AwardBadge } from "@/components/sections/award-badge"
import { ProjectsPreview } from "@/components/sections/projects-preview"
import { AboutPreview } from "@/components/sections/about-preview"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ContactSection } from "@/components/sections/contact-section"
import { getProjects } from "@/lib/sanity/fetch"

export default async function Home() {
  const allProjects = await getProjects()

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
