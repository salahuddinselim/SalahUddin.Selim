"use client"

import Image from "next/image"
import type { SanityProfile } from "@/types"

export function HeroContent({ profile }: { profile: SanityProfile | null }) {
  return (
    <section className="flex flex-col items-center text-center w-full max-w-[900px] mx-auto px-4">
      <div className="relative mb-6 h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-full border-2 border-white/10 shadow-[0_0_30px_rgba(0,217,255,0.1)]">
        <Image
          src="/hero.webp"
          alt={profile?.name ?? "Salah Uddin Selim"}
          fill
          priority
          sizes="128px"
          quality={75}
          className="object-cover"
        />
      </div>

      <h1
        className="hero-title font-heading text-foreground mb-4 text-4xl leading-[1.1]"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 56px)",
        }}
      >
        {profile?.name ?? "Salah Uddin Selim"}
      </h1>

      <p className="text-base sm:text-xl text-foreground font-semibold font-body leading-snug max-w-prose mx-auto mb-4 sm:mb-6">
        Aspiring Data Analyst turning data into insight &mdash; available for internships &amp;
        research roles.
      </p>

      <p className="text-base text-muted/70 font-body leading-relaxed max-w-prose mx-auto">
        {profile?.bio ??
          "CSE student at UIU building intelligent systems with full-stack engineering, IoT, and AI."}
      </p>
    </section>
  )
}
