"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { getSkills } from "@/lib/sanity/fetch"
import { getSkillIcon } from "@/lib/sanity/icon-map"
import type { SanitySkill } from "@/types"

const SkillCloud = dynamic(
  () => import("./skill-cloud").then((mod) => mod.SkillCloud),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full rounded-2xl border border-cyan-300/20 bg-black/20 animate-pulse" />
    ),
  },
)

const categoryDefaults: Record<string, { heading: string; description: string; color: string }> = {
  languages: { heading: "Languages", description: "Proficient in multiple programming languages across systems, web, and application development.", color: "#00D9FF" },
  frontend: { heading: "Frontend", description: "Web and desktop GUI frameworks for building user interfaces.", color: "#8B5CF6" },
  backend: { heading: "Backend", description: "Server-side, databases, and API development.", color: "#22C55E" },
  iot: { heading: "Hardware & IoT", description: "Embedded systems, sensor integration, and motor control for automated physical systems.", color: "#F97316" },
  tools: { heading: "Tools & Concepts", description: "Version control, IDEs, and software engineering concepts used across projects.", color: "#EAB308" },
  design: { heading: "Design", description: "UI/UX design and prototyping tools.", color: "#EC4899" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function ForgeSection() {
  const [skills, setSkills] = useState<SanitySkill[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    getSkills().then(setSkills).catch(() => {})
  }, [])

  const grouped: Record<string, SanitySkill[]> = {}
  for (const skill of skills) {
    const cat = skill.category ?? "tools"
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(skill)
  }

  const categoryIds = Object.keys(grouped)
  const handleCategoryClick = (id: string) => {
    setActiveCategory((prev) => (prev === id ? null : id))
  }

  return (
    <section className="relative min-h-screen pb-24">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-[#00d9ff] text-sm font-semibold tracking-widest mb-3">
            EXPERTISE
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Technical Expertise
          </h1>
        </motion.div>

        {/* Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="relative w-full h-[440px] sm:h-[600px] md:h-[680px] mb-12 sm:mb-16"
        >
          <SkillCloud activeCategory={activeCategory} onCategorySelect={handleCategoryClick} />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            style={
              activeCategory === null
                ? {
                    background: "rgba(0,217,255,0.10)",
                    borderColor: "rgba(0,217,255,0.45)",
                    color: "#00D9FF",
                    boxShadow: "0 0 12px rgba(0,217,255,0.15)",
                  }
                : {
                    background: "transparent",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                  }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all"
              style={
                activeCategory === null
                  ? { background: "#00D9FF", boxShadow: "0 0 6px #00D9FF" }
                  : { background: "rgba(255,255,255,0.06)", boxShadow: "none" }
              }
            />
            All
          </button>
          {categoryIds.map((catId) => {
            const cat = categoryDefaults[catId] ?? { heading: catId, description: "", color: "#00D9FF" }
            const isActive = activeCategory === catId
            return (
              <button
                key={catId}
                onClick={() => handleCategoryClick(catId)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                style={
                  isActive
                    ? {
                        background: `${cat.color}18`,
                        borderColor: `${cat.color}70`,
                        color: cat.color,
                        boxShadow: `0 0 12px ${cat.color}20`,
                      }
                    : {
                        background: "transparent",
                        borderColor: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                      }
                }
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all"
                  style={
                    isActive
                      ? { background: cat.color, boxShadow: `0 0 6px ${cat.color}` }
                      : { background: "rgba(255,255,255,0.06)", boxShadow: "none" }
                  }
                />
                {cat.heading}
              </button>
            )
          })}
        </motion.div>

        {/* Skill Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {categoryIds.map((catId) => {
            const cat = categoryDefaults[catId] ?? { heading: catId, description: "", color: "#00D9FF" }
            const catSkills = grouped[catId]
            const isHighlighted = activeCategory === null || activeCategory === catId
            return (
              <motion.div
                key={catId}
                variants={itemVariants}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isHighlighted ? "opacity-100" : "opacity-30"
                }`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderColor: "rgba(0,217,255,0.20)",
                  boxShadow: "0 0 0 1px rgba(0,217,255,0.06), 0 8px 40px rgba(0,217,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="px-6 pt-5 pb-4"
                  style={{ borderBottom: "1px solid rgba(0,217,255,0.08)" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: cat.color,
                        boxShadow: `0 0 6px ${cat.color}, 0 0 12px ${cat.color}55`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        {cat.heading}
                      </h2>
                      {cat.description && (
                        <p className="text-white/50 text-[11px] font-mono leading-relaxed mt-0.5">
                          {cat.description}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full flex-shrink-0 border"
                      style={{
                        color: cat.color,
                        borderColor: `${cat.color}40`,
                        background: `${cat.color}12`,
                      }}
                    >
                      {catSkills.length} skills
                    </span>
                  </div>
                </div>
                <div className="px-6 py-5 flex flex-wrap gap-2">
                  {catSkills.map((skill) => {
                    const Icon = getSkillIcon(skill.icon)
                    return (
                      <div
                        key={skill.name}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-default"
                        style={{
                          borderColor: "rgba(255,255,255,0.06)",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${cat.color}99`
                          e.currentTarget.style.background = `${cat.color}0C`
                          e.currentTarget.style.boxShadow = `0 0 12px ${cat.color}20`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.boxShadow = "none"
                        }}
                      >
                        <Icon
                          className="w-3.5 h-3.5 transition-colors duration-200"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = cat.color }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)" }}
                        />
                        <span
                          className="text-xs font-mono transition-colors duration-200"
                          style={{
                            color: "rgba(255,255,255,0.6)",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = cat.color }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)" }}
                        >
                          {skill.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
