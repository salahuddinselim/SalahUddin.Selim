import Image from "next/image"
import { HeroContent } from "@/components/hero/hero-content"
import { HeroActions } from "@/components/hero/hero-actions"
import { HeroVisualsShell } from "@/components/sections/hero-visuals-shell"
import { HeroTechRing } from "@/components/effects/hero-tech-ring"
import { getProfile, getSocialLinks } from "@/lib/sanity/fetch"
import { getSocialIcon } from "@/lib/sanity/icon-map"
import type { SanityProfile } from "@/types"
import type { SocialLinkData } from "@/lib/sanity/fetch"

function HeroPhotoCard({
  profile,
  socials,
}: {
  profile: SanityProfile | null
  socials: SocialLinkData[]
}) {
  const name = profile?.name?.trim() || "Salah Uddin Selim"

  return (
    <div className="flex flex-col items-center lg:items-end gap-4">
      {/* Photo card */}
      <div
        className="relative w-52 sm:w-64 lg:w-80 rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] shrink-0"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Available badge at top */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available
          </span>
        </div>

        <Image
          src={profile?.avatar?.trim() || "/hero.webp"}
          alt={name}
          fill
          priority
          sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
          quality={80}
          className="object-cover"
        />

        {/* Bottom overlay — name + location */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 pt-14">
          <p className="text-base font-heading font-bold text-white leading-tight">{name}</p>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/70 mt-0.5">
            CSE @ UIU &nbsp;·&nbsp; 2022–2026
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-foreground/50 font-mono">📍</span>
            <p className="text-xs text-foreground/50 font-mono">Dhaka · 23.81°N 90.41°E</p>
          </div>
        </div>
      </div>

      {/* Social links row below photo */}
      {socials.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end">
          {socials.slice(0, 6).map((social) => {
            const Icon = getSocialIcon(social.icon)
            return (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name ?? social.url}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/50 transition-all duration-200 hover:border-accent/30 hover:bg-accent/10 hover:text-accent hover:scale-110"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export async function HeroSection() {
  let profile = null
  let socials: SocialLinkData[] = []
  try {
    ;[profile, socials] = await Promise.all([getProfile(), getSocialLinks()])
  } catch (error) {
    console.error("Failed to load profile for HeroSection:", error)
  }

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden">
      <HeroVisualsShell />
      <HeroTechRing />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center min-h-screen pt-28 pb-16">
        {/* Left column — text content */}
        <div className="flex flex-col items-start">
          <HeroContent profile={profile} />
          <HeroActions />
        </div>
        {/* Right column — photo card + social links */}
        <HeroPhotoCard profile={profile} socials={socials} />
      </div>
    </section>
  )
}
