"use client"

import { motion } from "framer-motion"
import { GitBranch, Link2, Code2, BarChart3, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { value: "11+", label: "Projects Built" },
  { value: "20+", label: "GitHub Stars" },
  { value: "83+", label: "GitHub Streak days" },
  { value: "402+", label: "LeetCode Solved" },
  { value: "1+", label: "Kaggle Notebooks" },
]

const socials = [
  { platform: "GitHub", handle: "salahuddin", icon: GitBranch, href: "https://github.com/salahuddin" },
  { platform: "LinkedIn", handle: "salahuddin", icon: Link2, href: "https://linkedin.com/in/salahuddin" },
  { platform: "LeetCode", handle: "salahuddin", icon: Code2, href: "https://leetcode.com/salahuddin" },
  { platform: "Kaggle", handle: "salahuddin", icon: BarChart3, href: "https://kaggle.com/salahuddin" },
  { platform: "HackerRank", handle: "salahuddin", icon: Trophy, href: "https://hackerrank.com/salahuddin" },
]

const weeks = Array.from({ length: 52 }, (_, i) => i)
const contributionLevels = [0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 1, 2, 0, 3, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 1, 0, 0] as const
const levelColors = ["bg-white/[0.04]", "bg-cyan-400/20", "bg-cyan-400/40", "bg-cyan-400/70"]

const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
}

export function PersonaSection() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1200px] mx-auto">
      {/* 1. Main Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-14"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,217,255,0.2)]">
            Salah Uddin
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/60 leading-relaxed">
          Senior Full-Stack Engineer with 8+ years of experience building scalable web applications, AI systems, and
          cross-platform solutions. I build at the intersection of full-stack engineering and applied ML.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-white/40 leading-relaxed">
          My current focus: real-time data pipelines (WebSockets + Redis), RAG systems with pgvector + Groq, and agentic
          workflows with LangGraph. Everything I build targets ₹0 deployment cost — Vercel, Fly.io, Upstash, Supabase.
        </p>
        <p className="mt-4 text-[11px] font-mono tracking-[0.2em] text-white/25">
          BANGLADESH · IIT PATNA · 2028
        </p>
      </motion.div>

      {/* 2. Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-14"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{
              y: -4,
              borderColor: "rgba(0, 217, 255, 0.3)",
              boxShadow: "0 0 30px rgba(0, 217, 255, 0.08)",
            }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center transition-all duration-300"
          >
            <p className="text-2xl sm:text-3xl font-bold text-cyan-300 tabular-nums drop-shadow-[0_0_12px_rgba(0,217,255,0.15)]">
              {stat.value}
            </p>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.15em] text-white/35">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* 3. GitHub Contributions */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mb-14"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
              GITHUB CONTRIBUTIONS
            </span>
          </div>
          <a
            href="https://github.com/salahuddin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-cyan-400/60 hover:text-cyan-300 transition-colors"
          >
            @salahuddin
          </a>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
          {/* Month labels */}
          <div className="flex mb-2 ml-7">
            {months.map((m) => (
              <span key={m} className="text-[8px] font-mono text-white/20 tracking-wider flex-1">
                {m}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-1 pt-[1px]">
              {["Mon", "", "Wed", "", "Fri", "", ""].map((d, i) => (
                <span key={i} className="text-[8px] font-mono text-white/20 leading-[11px] h-[11px]">
                  {d}
                </span>
              ))}
            </div>
            {/* Grid */}
            <div className="flex gap-[3px] flex-1 overflow-x-auto">
              {weeks.map((w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }, (_, d) => {
                    const idx = (w * 7 + d) % contributionLevels.length
                    const level = contributionLevels[idx]
                    return (
                      <div
                        key={d}
                        className={cn(
                          "w-[11px] h-[11px] rounded-sm transition-colors duration-200",
                          levelColors[level],
                        )}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[8px] font-mono text-white/20 mr-1">Less</span>
            {levelColors.map((c, i) => (
              <div key={i} className={cn("w-3 h-3 rounded-sm", c)} />
            ))}
            <span className="text-[8px] font-mono text-white/20 ml-1">More</span>
          </div>
        </div>
      </motion.div>

      {/* 4. Find Me On */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-sm font-semibold text-white/80 mb-4 tracking-wide">
          Find me on
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center",
                  "transition-all duration-300",
                  "hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:shadow-[0_0_25px_rgba(0,217,255,0.06)]",
                )}
              >
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:scale-105">
                  <Icon size={18} />
                </div>
                <p className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
                  {s.platform}
                </p>
                <p className="mt-0.5 text-[10px] font-mono text-white/30 truncate">
                  {s.handle}
                </p>
              </a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
