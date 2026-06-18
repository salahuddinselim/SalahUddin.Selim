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
      {/* Mobile ambient background - gradient orbs that work on all devices */}
      <div className="absolute inset-0 pointer-events-none md:hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/10 blur-[120px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[100px] animate-pulse [animation-delay:4s]" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <HeroContent profile={profile} />
        <HeroActions />
      </div>
    </section>
  )
}
