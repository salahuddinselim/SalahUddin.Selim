"use client"

import { useState, useMemo, memo, useCallback, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { getSkillIcon } from "@/lib/sanity/icon-map"
import type { SanitySkill } from "@/types"
import { categoryDefaults, forgeSectionCopy } from "@/data"

const SkillCloud = dynamic(() => import("./skill-cloud").then((mod) => mod.SkillCloud), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl border border-cyan-300/20 bg-black/20 animate-pulse" />
  ),
})

interface FilterButtonProps {
  isActive: boolean
  label: string
  color: string
  onClick: () => void
}

const FilterButton = memo(function FilterButton({
  isActive,
  label,
  color,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      style={
        isActive
          ? {
              background: `${color}18`,
              borderColor: `${color}70`,
              color,
              boxShadow: `0 0 12px ${color}20`,
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
            ? { background: color, boxShadow: `0 0 6px ${color}` }
            : { background: "rgba(255,255,255,0.06)", boxShadow: "none" }
        }
      />
      {label}
    </button>
  )
})

interface ForgeSectionProps {
  skills: SanitySkill[]
}

export function ForgeSection({ skills }: ForgeSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const grouped = useMemo(() => {
    const map: Record<string, SanitySkill[]> = {}
    for (const skill of skills) {
      const cat = skill.category ?? "tools"
      if (!map[cat]) map[cat] = []
      map[cat].push(skill)
    }
    return map
  }, [skills])

  const categoryIds = useMemo(() => Object.keys(grouped), [grouped])

  const handleCategoryClick = useCallback((id: string) => {
    setActiveCategory((prev) => (prev === id ? null : id))
  }, [])

  const handleClearCategory = useCallback(() => {
    setActiveCategory(null)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen pb-24">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-[#00d9ff] text-sm font-semibold tracking-widest mb-3">
            {forgeSectionCopy.eyecatch}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            {forgeSectionCopy.heading}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="relative w-full h-[440px] sm:h-[600px] md:h-[680px] mb-12 sm:mb-16"
        >
          <SkillCloud activeCategory={activeCategory} onCategorySelect={handleCategoryClick} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <FilterButton
            isActive={activeCategory === null}
            label={forgeSectionCopy.allLabel}
            color="#00D9FF"
            onClick={handleClearCategory}
          />
          {categoryIds.map((catId) => {
            const cat = categoryDefaults[catId] ?? {
              heading: catId,
              description: "",
              color: "#00D9FF",
            }
            return (
              <FilterButton
                key={catId}
                isActive={activeCategory === catId}
                label={cat.heading}
                color={cat.color}
                onClick={() => handleCategoryClick(catId)}
              />
            )
          })}
        </motion.div>

        <div ref={sectionRef} className="space-y-4">
          {visible ? (
            <AnimatePresence mode="popLayout">
              {categoryIds.map((catId) => {
                const cat = categoryDefaults[catId] ?? {
                  heading: catId,
                  description: "",
                  color: "#00D9FF",
                }
                const catSkills = grouped[catId]
                const show = activeCategory === null || activeCategory === catId

                return (
                  <motion.div
                    key={catId}
                    initial={{ opacity: 0, y: 24 }}
                    animate={show ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      show ? "" : "hidden"
                    }`}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      borderColor: "rgba(0,217,255,0.20)",
                      boxShadow:
                        "0 0 0 1px rgba(0,217,255,0.06), 0 8px 40px rgba(0,217,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
                      ["--cat-color" as string]: cat.color,
                      ["--cat-color-20" as string]: `${cat.color}20`,
                      ["--cat-color-40" as string]: `${cat.color}40`,
                      ["--cat-color-99" as string]: `${cat.color}99`,
                      ["--cat-color-0C" as string]: `${cat.color}0C`,
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
                            className="skill-pill group flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-default"
                            style={{
                              borderColor: "rgba(255,255,255,0.06)",
                              background: "transparent",
                            }}
                          >
                            <Icon
                              className="skill-pill-icon w-3.5 h-3.5 transition-colors duration-200"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            />
                            <span
                              className="skill-pill-label text-xs font-mono transition-colors duration-200"
                              style={{ color: "rgba(255,255,255,0.6)" }}
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
            </AnimatePresence>
          ) : (
            <div className="space-y-4">
              {categoryIds.map((catId) => (
                <div
                  key={catId}
                  className="rounded-2xl border border-white/5 bg-white/[0.01] h-28 animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
