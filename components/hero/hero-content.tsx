"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { SanityProfile } from "@/types"

const roles = ["DATA ANALYST", "DEVELOPER", "RESEARCHER", "BUILDER"]

export function HeroContent({ profile }: { profile: SanityProfile | null }) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-start text-left w-full">
      {/* Role identifier */}
      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/60 mb-5">
        CSE &nbsp;·&nbsp; DATA ANALYTICS &nbsp;·&nbsp; ENGINEERING
      </p>

      {/* Name — split across two lines like the reference */}
      <h1 className="font-heading font-bold mb-3 leading-[1.0]">
        <span className="block text-foreground" style={{ fontSize: "clamp(3rem, 8vw, 76px)" }}>
          Salah Uddin
        </span>
        <span className="block text-accent" style={{ fontSize: "clamp(3rem, 8vw, 76px)" }}>
          Selim
        </span>
      </h1>

      {/* Bio */}
      <p className="text-[rgba(255,255,255,0.65)] font-body leading-relaxed max-w-md text-base mb-5">
        {profile?.bio ??
          "Aspiring data analyst turning data into insight — available for internships and research roles."}
      </p>

      {/* Cycling role word */}
      <div className="h-14 sm:h-16 overflow-hidden flex items-center mb-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={roleIndex}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -28, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="font-heading font-bold tracking-[0.12em]"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 46px)",
              color: "#f59e0b",
            }}
          >
            {roles[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Role progress dots */}
      <div className="flex items-center gap-1.5 mb-1">
        {roles.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === roleIndex ? "1.5rem" : "0.375rem",
              height: "0.25rem",
              background: i === roleIndex ? "#00d9ff" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
