"use client"

import type { SanityProfile } from "@/types"

export function HeroContent({ profile }: { profile: SanityProfile | null }) {
  return (
    <section className="flex flex-col items-center text-center w-full max-w-[900px] mx-auto px-4">
      <h1
        className="hero-title font-heading text-foreground mb-4 text-4xl leading-[1.1]"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 56px)",
        }}
      >
        {profile?.name ?? "Salah Uddin Selim"}
      </h1>

      <p className="text-base sm:text-xl text-foreground font-semibold font-body leading-snug max-w-prose mx-auto mb-4 sm:mb-6">
        I build full-stack systems, IoT tools, and AI-powered apps &mdash; available for internships
        &amp; research roles.
      </p>

      <p className="text-base text-muted/70 font-body leading-relaxed max-w-prose mx-auto">
        {profile?.bio ??
          "CSE student at UIU building intelligent systems with full-stack engineering, IoT, and AI."}
      </p>
    </section>
  )
}
