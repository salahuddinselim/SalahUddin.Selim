"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { SanityProfile } from "@/types"

const roles = [
  "CSE Student & Software Engineer",
  "Full Stack Developer",
  "JavaFX & IoT Developer",
]

const largeRoles = [
  { text: "DEVELOPER", width: "100%" },
  { text: "ENGINEER", width: "100%" },
  { text: "CREATOR", width: "88%" },
  { text: "INNOVATOR", width: "100%" },
]

const staggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

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
    <motion.section
      variants={staggerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center text-center w-full max-w-[900px] mx-auto px-4"
    >
      <motion.span
        variants={fadeUp}
        className="text-sm font-medium tracking-[0.2em] text-muted mb-6 font-body"
      >
        HELLO I&apos;M
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="font-heading font-bold text-foreground leading-none mb-4"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 90px)",
        }}
      >
        {profile?.name ?? "Salah Uddin Selim"}
      </motion.h1>

      <motion.div
        variants={fadeUp}
        className="relative h-8 mb-10"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[roleIndex]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-base sm:text-lg text-accent font-medium font-body absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            {roles[roleIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="relative h-[clamp(3rem,12vw,140px)] mb-8"
        style={{ width: "100%" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={largeRoles[largeIndex].text}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-heading font-black leading-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{
              fontSize: "clamp(2.5rem, 12vw, 140px)",
              background:
                "linear-gradient(135deg, #00D9FF 0%, #8B5CF6 40%, #00D9FF 70%, #8B5CF6 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 4s ease infinite",
            }}
          >
            {largeRoles[largeIndex].text}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="text-base sm:text-lg text-muted leading-relaxed font-body max-w-[700px]"
      >
        {profile?.bio ?? "CSE student at UIU · Building intelligent systems with full-stack engineering, IoT, and AI."}
      </motion.p>

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.section>
  )
}
