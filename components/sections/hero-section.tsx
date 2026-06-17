import { OrbitalSystem } from "@/components/effects/orbital-system"
import { TechOrbit } from "@/components/effects/tech-orbit"
import { HeroContent } from "@/components/hero/hero-content"
import { HeroActions } from "@/components/hero/hero-actions"
import { getProfile } from "@/lib/sanity/fetch"

export async function HeroSection() {
  let profile = null
  try {
    profile = await getProfile()
  } catch (error) {
    console.error("Failed to load profile for HeroSection:", error)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <OrbitalSystem />
      <TechOrbit />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <HeroContent profile={profile} />
        <HeroActions />
      </div>
    </section>
  )
}
