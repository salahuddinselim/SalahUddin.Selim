"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { GitHubStats } from "@/components/ui/github-stats"
import type { SocialLinkData, EducationData } from "@/lib/sanity/fetch"
import { getSocialIcon } from "@/lib/sanity/icon-map"
import { personaSectionCopy, personaStats, githubUsername, gitHubChartUrl } from "@/data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
}

export function PersonaSection({
  socials,
  education,
}: {
  socials: SocialLinkData[]
  education: EducationData[]
}) {
  const ongoingEducation = education.find((edu) => edu.status === "ongoing")

  const stats = personaStats.map((stat) => {
    if (stat.label === "CGPA / 4.0" && ongoingEducation?.gpa) {
      return {
        ...stat,
        value: ongoingEducation.gpa,
        label: `CGPA / ${ongoingEducation.gpaScale ?? "4.0"}`,
      }
    }
    if (stat.label === "Credits Earned" && ongoingEducation?.completedCredits != null) {
      return { ...stat, value: `${ongoingEducation.completedCredits}+` }
    }
    return stat
  })

  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="text-center mb-14"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400/50 mb-3">
          {personaSectionCopy.eyecatch}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          {personaSectionCopy.heading}
        </h1>
      </motion.div>

      {/* Two-column: Bio + Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
      >
        {/* Bio */}
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white mb-4">
            {personaSectionCopy.greeting}
          </h2>
          <div className="space-y-3 text-base text-white/50 leading-relaxed max-w-prose">
            <p>
              CSE student at <span className="text-cyan-400">United International University</span>
              {ongoingEducation?.gpa && (
                <>
                  {" "}
                  &mdash; CGPA{" "}
                  <span className="text-amber-400 font-bold">
                    {ongoingEducation.gpa} / {ongoingEducation.gpaScale ?? "4.0"}
                  </span>
                </>
              )}
              , graduating 2026. I build at the intersection of full-stack development, IoT systems,
              and algorithm design.
            </p>
            <p>
              My current focus: full-stack engineering with JavaFX and PHP, IoT systems with Arduino
              sensors, and AI-driven applications. Award-winning project at UIU Spring 2025 Software
              Project Competition.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-[11px] font-mono text-white/50 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
              {personaSectionCopy.location}
            </span>
            <span className="text-[11px] font-mono text-white/50 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
              {personaSectionCopy.graduation}
            </span>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white mb-4">
            {personaSectionCopy.educationHeading}
          </h2>
          <div className="space-y-3">
            {education.length === 0 ? (
              <p className="text-xs font-mono text-white/20">No education data yet</p>
            ) : (
              education.map((edu) => (
                <div
                  key={edu.institution}
                  className="relative rounded-2xl border p-5 transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(0,217,255,0.15)",
                    boxShadow:
                      "0 0 0 1px rgba(0,217,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
                      style={{
                        background: "rgba(0,217,255,0.08)",
                        borderColor: "rgba(0,217,255,0.20)",
                      }}
                    >
                      <span className="text-cyan-400 font-black text-xs">
                        {edu.abbreviation ?? "EDU"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-sm">{edu.institution}</h3>
                      </div>
                      <p className="text-cyan-400 text-xs mt-0.5">
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        {edu.startYear ?? ""}
                        {edu.startYear && edu.endYear ? " – " : ""}
                        {edu.endYear ?? ""}
                      </p>
                      {edu.gpa && (
                        <div className="flex items-center gap-3 mt-2.5">
                          <span className="text-[10px] text-white/50 font-mono uppercase tracking-wider">
                            CGPA
                          </span>
                          <span className="text-amber-400 font-black text-base leading-none">
                            {edu.gpa}
                          </span>
                          {edu.gpaScale && (
                            <span className="text-white/40 text-xs">/{edu.gpaScale}</span>
                          )}
                          {edu.status === "ongoing" && (
                            <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/20 text-cyan-400/60">
                              Ongoing
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{
              y: -4,
              borderColor: `${stat.color}50`,
              boxShadow: `0 0 30px ${stat.color}15`,
            }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center transition-all duration-300"
          >
            <p
              className="text-2xl sm:text-3xl font-bold tabular-nums drop-shadow-[0_0_12px_rgba(0,0,0,0.3)]"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.15em] text-white/35">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* GitHub Stats */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-10">
        <h2 className="text-lg font-semibold text-white/80 mb-4">
          {personaSectionCopy.gitHubStatsHeading}
        </h2>
        <GitHubStats />
      </motion.div>

      {/* Contribution Chart */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-10">
        <div
          className="rounded-2xl border overflow-hidden transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(34,197,94,0.20)",
            boxShadow:
              "0 0 0 1px rgba(34,197,94,0.05), 0 8px 40px rgba(34,197,94,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="px-5 pt-4 pb-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.10)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E" }}
              />
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                {personaSectionCopy.dailyContributions}
              </span>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono text-white/40 hover:text-green-400 transition-colors"
              href={`https://github.com/${githubUsername}`}
            >
              {githubUsername} <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <div className="px-5 py-4">
            {/* Plain <img>, not next/image: this is a third-party SVG chart
                (ghchart.rshah.org isn't in next.config.ts remotePatterns, and
                Next's image optimizer blocks SVG by default anyway) that was
                silently failing to render. w-full h-auto lets the browser
                scale it using the SVG's own intrinsic aspect ratio instead of
                a hardcoded width/height that doesn't match the real chart. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gitHubChartUrl}
              alt="GitHub contribution chart"
              loading="lazy"
              className="w-full h-auto rounded-lg opacity-90"
              style={{ filter: "brightness(1.1) contrast(1.05)" }}
            />
            <div className="flex items-center justify-end gap-2 mt-2">
              <span className="text-[10px] font-mono text-white/30">Less</span>
              {[
                "rgba(34,197,94,0.15)",
                "rgba(34,197,94,0.35)",
                "rgba(34,197,94,0.60)",
                "rgba(34,197,94,0.85)",
                "#22C55E",
              ].map((c) => (
                <span key={c} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
              ))}
              <span className="text-[10px] font-mono text-white/30">More</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Find Me On */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <h2 className="text-lg font-semibold text-white/80 mb-4">{personaSectionCopy.findMeOn}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {socials.map((s) => {
            const Icon = getSocialIcon(s.icon)
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col gap-2 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]",
                  "border-white/[0.06] bg-white/[0.02]",
                  "hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]",
                )}
              >
                <Icon className="w-4 h-4 text-white/70" />
                <div>
                  <div className="text-white/60 group-hover:text-white text-xs font-semibold transition-colors">
                    {s.name}
                  </div>
                  <div className="hidden sm:block text-white/30 text-[10px] font-mono mt-0.5 truncate">
                    {s.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
