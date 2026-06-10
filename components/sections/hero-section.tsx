"use client"

import { SpaceBackground } from "@/components/effects/space-background"
import { OrbitalSystem } from "@/components/effects/orbital-system"
import { TechOrbit } from "@/components/effects/tech-orbit"
import { HeroContent } from "@/components/hero/hero-content"
import { HeroActions } from "@/components/hero/hero-actions"

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <SpaceBackground />
      <OrbitalSystem />
      <TechOrbit />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <HeroContent />
        <HeroActions />
      </div>
    </section>
  )
}
