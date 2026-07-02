import type { Metadata } from "next"
import { HeroSection } from "@/components/sections/hero-section"
import { AwardBadge } from "@/components/sections/award-badge"
import nextDynamic from "next/dynamic"
import {
  getProjects,
  getExperience,
  getEducation,
  getSocialLinks,
  getProfile,
} from "@/lib/sanity/fetch"
import { fallbackSocials } from "@/data"
import type { SanityProject, SanityExperience } from "@/types"
import type { EducationData, SocialLinkData } from "@/lib/sanity/fetch"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export const dynamic = "force-static"

const ProjectsPreview = nextDynamic(
  () => import("@/components/sections/projects-preview").then((mod) => mod.ProjectsPreview),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

const AboutPreview = nextDynamic(
  () => import("@/components/sections/about-preview").then((mod) => mod.AboutPreview),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

const ExperienceSection = nextDynamic(
  () => import("@/components/sections/experience-section").then((mod) => mod.ExperienceSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

const ContactSection = nextDynamic(
  () => import("@/components/sections/contact-section").then((mod) => mod.ContactSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

export default async function Home() {
  let allProjects: SanityProject[] = []
  let experience: SanityExperience[] = []
  let education: EducationData[] = []
  let socials: SocialLinkData[] = fallbackSocials
  let email: string | undefined

  try {
    const [projectsResult, experienceResult, educationResult, socialsResult, profileResult] =
      await Promise.allSettled([
        getProjects(),
        getExperience(),
        getEducation(),
        getSocialLinks(),
        getProfile(),
      ])
    if (projectsResult.status === "fulfilled") allProjects = projectsResult.value
    if (experienceResult.status === "fulfilled") experience = experienceResult.value
    if (educationResult.status === "fulfilled") education = educationResult.value
    if (socialsResult.status === "fulfilled") socials = socialsResult.value
    if (profileResult.status === "fulfilled") email = profileResult.value?.email
  } catch (error) {
    console.error("Failed to load home page data:", error)
  }

  return (
    <main>
      <HeroSection />
      <AwardBadge />
      <ProjectsPreview projects={allProjects} />
      <AboutPreview />
      <ExperienceSection experience={experience} education={education} />
      <ContactSection socials={socials} email={email} />
    </main>
  )
}
