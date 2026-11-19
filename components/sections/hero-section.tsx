import Image from "next/image"
import { HeroContent } from "@/components/hero/hero-content"
import { HeroActions } from "@/components/hero/hero-actions"
import { HeroVisualsShell } from "@/components/sections/hero-visuals-shell"
import { HeroTechRing } from "@/components/effects/hero-tech-ring"
import { getProfile } from "@/lib/sanity/fetch"
import type { SanityProfile } from "@/types"

function HeroPhotoCard({ profile }: { profile: SanityProfile | null }) {
  return (
    <div className="flex justify-center lg:justify-end">
      <div
        className="relative w-52 sm:w-64 lg:w-80 rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] shrink-0"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={profile?.avatar?.trim() || "/hero.webp"}
          alt={profile?.name ?? "Salah Uddin Selim"}
          fill
          priority
          sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
          quality={80}
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-16">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent/70 mb-1">
            CSE @ UIU &nbsp;·&nbsp; 2021–2026
          </p>
          <p className="text-sm font-semibold text-foreground/90">Dhaka, Bangladesh</p>
          <p className="text-xs text-foreground/40 font-mono mt-0.5">23.8103° N, 90.4125° E</p>
        </div>
      </div>
    </div>
  )
}

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
      <HeroTechRing />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center min-h-screen pt-28 pb-16">
        {/* Left column — text content */}
        <div className="flex flex-col items-start">
          <HeroContent profile={profile} />
          <HeroActions />
        </div>
        {/* Right column — photo card (all screen sizes, centered on mobile) */}
        <HeroPhotoCard profile={profile} />
      </div>
    </section>
  )
}
