import { HeroContent } from "@/components/hero/hero-content"
import { HeroActions } from "@/components/hero/hero-actions"
import { HeroVisualsShell } from "@/components/sections/hero-visuals-shell"
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
      <HeroVisualsShell />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 sm:pt-0">
        <HeroContent profile={profile} />
        <HeroActions />
      </div>
    </section>
  )
}
