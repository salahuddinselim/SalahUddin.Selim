"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Award, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCredentials, type CredentialData } from "@/lib/sanity/fetch"
import { credentialsSectionCopy, categoryColors } from "@/data"

function getCategoryColor(cat: string): string {
  return categoryColors[cat] ?? "#00D9FF"
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

function CardDetail({ cert }: { cert: CredentialData }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" as const }}
      className="overflow-hidden"
    >
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="mt-3 pt-3 border-t border-white/[0.06] text-sm text-white/40 leading-relaxed"
      >
        {cert.description}
      </motion.p>
    </motion.div>
  )
}

export function CredentialsSection() {
  const [credentials, setCredentials] = useState<CredentialData[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    getCredentials().then(setCredentials).catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? credentials
      : credentials.filter((c) => c.category === activeCategory)
  }, [credentials, activeCategory])

  const categories = useMemo(() => {
    return [
      { id: "All", count: credentials.length },
      ...Array.from(new Set(credentials.map((c) => c.category))).map((cat) => ({
        id: cat,
        count: credentials.filter((c) => c.category === cat).length,
      })),
    ]
  }, [credentials])

  const years = useMemo(() => {
    return [...new Set(filtered.map((c) => c.year))].sort((a, b) => b - a)
  }, [filtered])

  const certsByYear = useMemo(() => {
    const groups: Record<number, CredentialData[]> = {}
    for (const cert of filtered) {
      if (!groups[cert.year]) {
        groups[cert.year] = []
      }
      groups[cert.year].push(cert)
    }
    return groups
  }, [filtered])

  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1000px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-8"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400/50 mb-3">
          {credentialsSectionCopy.eyecatch}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,217,255,0.2)]">
            {credentialsSectionCopy.heading}
          </span>
        </h1>
        <p className="mt-2 text-xs font-mono tracking-[0.15em] text-white/30">
          {credentials.length} achievement{credentials.length !== 1 ? "s" : ""} · click any entry to expand
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center gap-2 mb-10"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          const color = cat.id === "All" ? "#00D9FF" : getCategoryColor(cat.id)
          return (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              type="button"
              onClick={() => { setActiveCategory(cat.id); setExpandedId(null) }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-[0.15em] transition-all duration-200",
                isActive
                  ? "border shadow-[0_0_15px_rgba(0,217,255,0.06)]"
                  : "border border-white/[0.06] text-white/35 hover:text-white/70 hover:border-white/10",
              )}
              style={
                isActive
                  ? { borderColor: `${color}40`, backgroundColor: `${color}10`, color }
                  : undefined
              }
            >
              {cat.id}
              <span className={cn("tabular-nums", isActive ? "opacity-80" : "text-white/20")}>
                {cat.count}
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-white/[0.06] to-transparent" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {years.map((year) => {
            const yearCerts = certsByYear[year] || []
            return (
              <motion.div key={year} variants={itemVariants}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-[10px] w-[10px]">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/60" />
                      <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/20">
                      {year}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.15em] text-white/20">
                    {yearCerts.length} cert{yearCerts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-3 pl-8">
                  {yearCerts.map((cert) => {
                    const id = cert.title + cert.year
                    const isExpanded = expandedId === id
                    return (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" as const }}
                        className={cn(
                          "rounded-xl border bg-white/[0.02] p-4 cursor-pointer transition-all duration-200",
                          "hover:border-cyan-400/20 hover:shadow-[0_0_25px_rgba(0,217,255,0.04)]",
                          isExpanded ? "border-cyan-400/20" : "border-white/[0.06]",
                        )}
                        onClick={() => setExpandedId(isExpanded ? null : id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                            <Award size={16} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white">
                              {cert.title}
                            </h3>
                            <p
                              className="mt-0.5 text-xs font-mono"
                              style={{ color: getCategoryColor(cert.category) }}
                            >
                              {cert.issuer}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {cert.tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.1em] text-white/35"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="text-[10px] font-mono whitespace-nowrap text-white/25">
                              {cert.date}
                            </span>
                            <ChevronDown
                              size={14}
                              className={cn(
                                "text-white/20 transition-transform duration-200",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && <CardDetail cert={cert} />}
                        </AnimatePresence>
                      </motion.div>
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
