import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsPreview } from "@/components/sections/projects-preview"
import { AboutPreview } from "@/components/sections/about-preview"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsPreview />
      <AboutPreview />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}
