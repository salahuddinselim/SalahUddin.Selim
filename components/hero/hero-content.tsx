"use client"

import { useState, useEffect, useCallback } from "react"
import type { SanityProfile } from "@/types"

const roles = ["CSE Student & Software Engineer", "Full Stack Developer", "JavaFX & IoT Developer"]

const largeRoles = [
  { text: "DEVELOPER", width: "100%" },
  { text: "ENGINEER", width: "100%" },
  { text: "CREATOR", width: "88%" },
  { text: "INNOVATOR", width: "100%" },
]

export function HeroContent({ profile }: { profile: SanityProfile | null }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [largeIndex, setLargeIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setReducedMotion(media.matches)
    handleChange()
    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])

  const tick = useCallback(() => {
    setRoleIndex((prev) => (prev + 1) % roles.length)
  }, [])

  const tickLarge = useCallback(() => {
    setLargeIndex((prev) => (prev + 1) % largeRoles.length)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(tick, 2500)
    return () => clearInterval(interval)
  }, [tick, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(tickLarge, 3000)
    return () => clearInterval(interval)
  }, [tickLarge, reducedMotion])

  return (
    <section
      className={`hero-content flex flex-col items-center text-center w-full max-w-[900px] mx-auto px-4 ${reducedMotion ? "" : "hero-stagger"}`}
    >
      <span className="hero-subtitle stagger-item text-sm font-medium tracking-[0.2em] text-muted mb-6 font-body">
        HELLO I&apos;M
      </span>

      <h1
        className="hero-title stagger-item font-heading font-bold text-foreground leading-none mb-4"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 90px)",
        }}
      >
        {profile?.name ?? "Salah Uddin Selim"}
      </h1>

      <div className="hero-role-wrapper stagger-item relative h-8 mb-4">
        <span
          key={roleIndex}
          className={`hero-role text-base sm:text-lg text-accent font-medium font-body absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${reducedMotion ? "" : "animate-role-in"}`}
        >
          {roles[roleIndex]}
        </span>
      </div>

      {/* Value proposition tagline */}
      <p className="stagger-item text-sm sm:text-base text-muted/80 font-body mb-8 max-w-[600px] leading-relaxed italic">
        Building intelligent systems — from full-stack web apps to IoT &amp; AI
      </p>

      <div
        className="hero-large-role-wrapper stagger-item relative h-[clamp(3rem,12vw,140px)] mb-8"
        style={{ width: "100%" }}
      >
        <span
          key={largeIndex}
          className={`hero-large-role font-heading font-black leading-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${reducedMotion ? "" : "animate-large-role-in"}`}
          style={{
            fontSize: "clamp(2.5rem, 12vw, 140px)",
            background:
              "linear-gradient(135deg, #00D9FF 0%, #8B5CF6 40%, #00D9FF 70%, #8B5CF6 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: reducedMotion ? "none" : "gradientShift 4s ease infinite",
          }}
        >
          {largeRoles[largeIndex].text}
        </span>
      </div>

      <p className="hero-copy stagger-item text-base sm:text-lg text-muted leading-relaxed font-body max-w-[700px]">
        {profile?.bio ??
          "CSE student at UIU \u00B7 Building intelligent systems with full-stack engineering, IoT, and AI."}
      </p>
    </section>
  )
}
