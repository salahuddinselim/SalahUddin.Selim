"use client"

import dynamic from "next/dynamic"

const OrbitalSystem = dynamic(
  () => import("@/components/effects/orbital-system").then((mod) => mod.OrbitalSystem),
  { ssr: false, loading: () => null },
)

const TechOrbit = dynamic(
  () => import("@/components/effects/tech-orbit").then((mod) => mod.TechOrbit),
  { ssr: false, loading: () => null },
)

export function HeroVisualsShell() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {/* Lightweight immediate paint while heavy visual effects load on client */}
      <div className="absolute inset-0 bg-[radial-gradient(72%_60%_at_50%_38%,rgba(0,217,255,0.14),transparent_72%),radial-gradient(54%_46%_at_84%_18%,rgba(59,130,246,0.12),transparent_70%),linear-gradient(180deg,#050816_0%,#070d1d_100%)]" />
      <div className="absolute inset-0 opacity-70 bg-[length:200%_200%] animate-[gradientShift_12s_ease_infinite]" />
      <div className="absolute -top-24 left-[12%] h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="absolute -bottom-24 right-[8%] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <OrbitalSystem />
      <TechOrbit />
    </div>
  )
}
