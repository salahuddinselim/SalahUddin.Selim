"use client"

import { useCallback, useState } from "react"
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
  const ongoingEducation =
    education.find((edu) => edu.status === "ongoing") ??
    education.find((edu) => edu.status === "completed") ??
    education[0]
  const [repoCount, setRepoCount] = useState<number | null>(null)

  const handleGitHubStatsLoaded = useCallback((githubStats: { public_repos: number }) => {
    setRepoCount(githubStats.public_repos)
  }, [])

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
    if (stat.label === "GitHub Repos" && repoCount != null) {
      return { ...stat, value: `${repoCount}` }
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
        className="mb-14"
      >
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent/60 mb-2">
          {personaSectionCopy.eyecatch}
        </p>
        <h1
          className="font-heading font-bold text-white"
          style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
        >
          {personaSectionCopy.heading}
        </h1>
        <p className="mt-3 max-w-md text-sm text-[rgba(255,255,255,0.5)]">
          A snapshot of who I am, where I studied, and what I&apos;m building.
        </p>
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
          <h2 className="font-heading text-lg font-bold text-white mb-4">
            {personaSectionCopy.greeting}
          </h2>
          <div className="space-y-3 text-sm text-[rgba(255,255,255,0.65)] leading-relaxed max-w-prose">
            <p>
              BSc graduate in CSE from{" "}
              <span className="text-accent">United International University</span>
              {ongoingEducation?.gpa && (
                <>
                  {" "}
                  — CGPA{" "}
                  <span className="text-amber-400 font-bold">
                    {ongoingEducation.gpa} / {ongoingEducation.gpaScale ?? "4.0"}
                  </span>
                </>
              )}{" "}
              (graduated Nov 2026). I build at the intersection of full-stack development, IoT
              systems, and algorithm design.
            </p>
            <p>
              My current focus: full-stack engineering with JavaFX and PHP, IoT systems with Arduino
              sensors, and AI-driven applications. Award-winning project at UIU Spring 2025 Software
              Project Competition.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="font-mono text-xs text-[rgba(255,255,255,0.45)] px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              {personaSectionCopy.location}
            </span>
            <span className="font-mono text-xs text-[rgba(255,255,255,0.45)] px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              {personaSectionCopy.graduation}
            </span>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-heading text-lg font-bold text-white mb-4">
            {personaSectionCopy.educationHeading}
          </h2>
          <div className="space-y-3">
            {education.length === 0 ? (
              <p className="text-xs font-mono text-white/20">No education data yet</p>
            ) : (
              education.map((edu) => (
                <div
                  key={edu.institution}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] transition-[border-color] duration-300 hover:border-accent/20"
                  style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                >
                  <div className="h-0.5 w-full bg-gradient-to-r from-[rgba(245,158,11,0.8)] via-[rgba(245,158,11,0.4)] to-transparent" />
                  <div className="p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-accent/20 bg-accent/10">
                      <span className="text-accent font-heading font-black text-[11px]">
                        {edu.abbreviation ?? "EDU"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-white font-bold text-sm">{edu.institution}</h3>
                        {edu.status === "ongoing" && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10 text-accent">
                            Ongoing
                          </span>
                        )}
                      </div>
                      {edu.degree && (
                        <p className="text-accent/80 text-xs mt-0.5">
                          {edu.degree}
                          {edu.field ? ` in ${edu.field}` : ""}
                        </p>
                      )}
                      <p className="text-[rgba(255,255,255,0.35)] font-mono text-[11px] mt-1">
                        {edu.startYear ?? ""}
                        {edu.startYear && edu.endYear ? " – " : ""}
                        {edu.endYear ?? ""}
                      </p>
                      {edu.gpa && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                            GPA
                          </span>
                          <span className="font-heading font-bold text-sm text-amber-400">
                            {edu.gpa}
                          </span>
                          {edu.gpaScale && (
                            <span className="text-[rgba(255,255,255,0.35)] text-xs">
                              /{edu.gpaScale}
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
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center"
            style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          >
            <div
              className="absolute inset-x-0 top-0 h-0.5"
              style={{
                background: `linear-gradient(to right, ${stat.color}cc, ${stat.color}60, transparent)`,
              }}
            />
            <p
              className="text-2xl sm:text-3xl font-heading font-bold tabular-nums"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="mt-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-[rgba(255,255,255,0.35)]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* GitHub Stats */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-10">
        <h2 className="font-heading font-bold text-white mb-4">
          {personaSectionCopy.gitHubStatsHeading}
        </h2>
        <GitHubStats onLoaded={handleGitHubStatsLoaded} />
      </motion.div>

      {/* Contribution Chart */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-10">
        <div
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]"
          style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
        >
          {/* Green accent bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-[rgba(34,197,94,0.8)] via-[rgba(34,197,94,0.4)] to-transparent" />
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E" }}
              />
              <span className="font-mono text-[10px] text-[rgba(255,255,255,0.5)] tracking-widest uppercase">
                {personaSectionCopy.dailyContributions}
              </span>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[10px] text-[rgba(255,255,255,0.35)] hover:text-green-400 transition-colors"
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
              <span className="font-mono text-[10px] text-[rgba(255,255,255,0.3)]">Less</span>
              {[
                "rgba(34,197,94,0.15)",
                "rgba(34,197,94,0.35)",
                "rgba(34,197,94,0.60)",
                "rgba(34,197,94,0.85)",
                "#22C55E",
              ].map((c) => (
                <span key={c} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
              ))}
              <span className="font-mono text-[10px] text-[rgba(255,255,255,0.3)]">More</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Find Me On */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <h2 className="font-heading font-bold text-white mb-4">{personaSectionCopy.findMeOn}</h2>
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
                  "group relative overflow-hidden flex flex-col gap-2.5 p-4 rounded-2xl border transition-all duration-200",
                  "border-white/10 bg-white/[0.05]",
                  "hover:border-accent/30 hover:bg-accent/[0.05] hover:-translate-y-0.5",
                )}
                style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <Icon className="w-4 h-4 text-[rgba(255,255,255,0.65)] group-hover:text-accent transition-colors" />
                <div>
                  <div className="text-[rgba(255,255,255,0.75)] group-hover:text-white text-xs font-semibold transition-colors">
                    {s.name}
                  </div>
                  <div className="hidden sm:block text-[rgba(255,255,255,0.3)] text-[10px] font-mono mt-0.5 truncate">
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
