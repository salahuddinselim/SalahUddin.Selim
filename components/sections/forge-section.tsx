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
  count: number
  color: string
  onClick: () => void
}

const FilterButton = memo(function FilterButton({
  isActive,
  label,
  count,
  color,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:text-sm ${
        isActive
          ? "border-cyan-400 bg-cyan-400 text-black"
          : "border-border text-secondary hover:bg-cyan-400/10 hover:text-foreground"
      }`}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: isActive ? "rgba(0,0,0,0.55)" : color }}
      />
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none ${
          isActive ? "bg-black/10 text-black" : "bg-white/5 text-muted"
        }`}
      >
        {count}
      </span>
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

  const visibleCategoryIds = useMemo(
    () =>
      activeCategory === null ? categoryIds : categoryIds.filter((id) => id === activeCategory),
    [activeCategory, categoryIds],
  )

  const visibleSkillsCount = useMemo(
    () => (activeCategory === null ? skills.length : (grouped[activeCategory]?.length ?? 0)),
    [activeCategory, grouped, skills.length],
  )

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
    <section className="relative min-h-screen bg-bg pb-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {forgeSectionCopy.eyecatch}
          </p>
          <h1 className="font-heading text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {forgeSectionCopy.heading}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-secondary sm:text-base">
            A living map of the languages, frameworks, platforms, and tools I reach for when turning
            ideas into working systems.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="mb-7 rounded-2xl border border-border bg-bg-card p-4 sm:p-5"
        >
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter skills by category"
          >
            <FilterButton
              isActive={activeCategory === null}
              label={forgeSectionCopy.allLabel}
              count={skills.length}
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
                  count={grouped[catId]?.length ?? 0}
                  color={cat.color}
                  onClick={() => handleCategoryClick(catId)}
                />
              )
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p aria-live="polite" className="font-mono text-xs text-muted">
              Showing {visibleSkillsCount} of {skills.length} skills
            </p>
            {activeCategory !== null && (
              <button
                type="button"
                onClick={handleClearCategory}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-secondary transition-colors hover:border-cyan-400/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              >
                Clear filter
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="relative mb-12 h-[420px] overflow-hidden rounded-2xl border border-cyan-400/20 bg-bg-card/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_60px_rgba(0,0,0,0.25)] sm:mb-16 sm:h-[560px] md:h-[640px]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,217,255,0.08),transparent_60%)]" />
          <SkillCloud onCategorySelect={handleCategoryClick} />
        </motion.div>

        <div ref={sectionRef}>
          {visible ? (
            visibleCategoryIds.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleCategoryIds.map((catId) => {
                    const cat = categoryDefaults[catId] ?? {
                      heading: catId,
                      description: "",
                      color: "#00D9FF",
                    }
                    const catSkills = grouped[catId] ?? []
                    const CategoryIcon = getSkillIcon(catSkills[0]?.icon)

                    return (
                      <motion.article
                        key={catId}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card transition-colors duration-300 hover:border-cyan-500/60"
                      >
                        <div
                          className="absolute inset-x-0 top-0 h-px"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${cat.color}80, transparent)`,
                          }}
                        />
                        <div className="flex flex-1 flex-col p-5">
                          <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                                style={{
                                  borderColor: `${cat.color}40`,
                                  backgroundColor: `${cat.color}14`,
                                  color: cat.color,
                                }}
                              >
                                <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              <div className="min-w-0">
                                <h2 className="truncate font-heading text-lg font-bold tracking-tight text-foreground">
                                  {cat.heading}
                                </h2>
                                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                  Skill set
                                </p>
                              </div>
                            </div>
                            <span className="shrink-0 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-md">
                              {catSkills.length} {catSkills.length === 1 ? "skill" : "skills"}
                            </span>
                          </div>

                          {cat.description && (
                            <p className="mb-5 text-sm leading-relaxed text-secondary">
                              {cat.description}
                            </p>
                          )}

                          <div className="mt-auto flex flex-wrap gap-2">
                            {catSkills.map((skill) => {
                              const Icon = getSkillIcon(skill.icon)
                              return (
                                <span
                                  key={skill._id || skill.name}
                                  className="group/pill inline-flex items-center gap-1.5 rounded-lg border border-border bg-black/20 px-2.5 py-1.5 text-xs text-secondary transition-colors duration-200 hover:border-cyan-400/60 hover:text-foreground"
                                >
                                  <Icon
                                    className="h-3.5 w-3.5 text-muted transition-colors duration-200 group-hover/pill:text-cyan-300"
                                    aria-hidden="true"
                                  />
                                  {skill.name}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-bg-card/50 px-6 py-14 text-center">
                <p className="font-heading text-lg font-semibold text-foreground">
                  No skills here yet
                </p>
                <p className="mt-2 text-sm text-secondary">
                  Try another category or clear the filter to see the full stack.
                </p>
                <button
                  type="button"
                  onClick={handleClearCategory}
                  className="mt-5 rounded-full border border-cyan-400/60 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                >
                  Show all skills
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: Math.max(categoryIds.length, 3) }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-2xl border border-border bg-bg-card/50"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
