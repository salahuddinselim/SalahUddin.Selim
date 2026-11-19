"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { CheckCircle2, Sparkles, Radar, Briefcase, GraduationCap } from "lucide-react"
import type { SanityExperience } from "@/types"
import type { EducationData } from "@/lib/sanity/fetch"
import { currentFocusCopy, currentFocusTags } from "@/data"

// Documented glass-panel token (same recipe as about-preview.tsx's card grid) —
// content cards use this, not the lighter nav-chrome glass.
const GLASS_CLASS =
  "bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
const GLASS_STYLE = { WebkitBackdropFilter: "blur(10px)" }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

interface TimelineEntryProps {
  icon: React.ElementType
  active?: boolean
  children: React.ReactNode
}

function TimelineEntry({ icon: Icon, active, children }: TimelineEntryProps) {
  return (
    <motion.li variants={itemVariants} className="relative list-none pl-16 sm:pl-20">
      <span
        aria-hidden
        style={GLASS_STYLE}
        className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl ${GLASS_CLASS} ${
          active ? "border-accent/30 shadow-[0_0_20px_-4px_rgba(0,217,255,0.4)]" : ""
        }`}
      >
        <Icon size={16} className="text-accent" />
      </span>
      {children}
    </motion.li>
  )
}

function CurrentFocusPanel() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.15)] ${GLASS_CLASS}`}
    >
      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-accent/90">
        <Radar size={10} />
        {currentFocusCopy.eyebrow}
      </span>
      <h3 className="mb-1.5 font-heading text-base font-bold text-[var(--text-primary)] sm:text-lg">
        {currentFocusCopy.heading}
      </h3>
      <p className="mb-4 max-w-prose text-sm leading-relaxed text-secondary">
        {currentFocusCopy.description}
      </p>
      <div className="flex flex-wrap gap-2" role="list" aria-label="Current focus areas">
        {currentFocusTags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            style={GLASS_STYLE}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-accent/80 transition-colors group-hover:border-accent/20 ${GLASS_CLASS}`}
          >
            <Sparkles size={11} className="text-accent/80" />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

interface EducationEntryProps {
  item: EducationData
}

function EducationEntry({ item }: EducationEntryProps) {
  const years = [item.startYear, item.endYear].filter(Boolean).join(" – ")
  const gpaLabel = item.gpa ? `${item.gpa}${item.gpaScale ? ` / ${item.gpaScale}` : ""}` : undefined
  const abbr = (item.abbreviation ?? item.institution ?? "").slice(0, 3).toUpperCase()

  return (
    <div
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-300 hover:border-accent/20 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.08)] ${GLASS_CLASS}`}
    >
      {/* Amber accent bar for education entries */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[rgba(245,158,11,0.8)] via-[rgba(245,158,11,0.4)] to-transparent" />
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
            <span className="font-heading font-bold text-xs text-accent">{abbr}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-base font-bold text-white sm:text-lg">
                {item.institution}
              </h3>
              {item.status === "ongoing" && (
                <span className="inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                  Ongoing
                </span>
              )}
            </div>
            {item.degree && (
              <p className="text-sm font-medium text-accent/80">
                {item.degree}
                {item.field ? ` in ${item.field}` : ""}
              </p>
            )}
            {years && (
              <p className="mt-1 font-mono text-[11px] text-[rgba(255,255,255,0.35)]">{years}</p>
            )}
          </div>
        </div>
        {item.description && (
          <p className="mb-3 max-w-prose text-sm leading-relaxed text-[rgba(255,255,255,0.65)]">
            {item.description}
          </p>
        )}
        {gpaLabel && (
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-accent">
              GPA {gpaLabel}
            </span>
            {item.completedCredits && item.totalCredits && (
              <span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)]">
                {item.completedCredits} / {item.totalCredits} credits
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface ExperienceEntryProps {
  item: SanityExperience
}

function ExperienceEntry({ item }: ExperienceEntryProps) {
  return (
    <div
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-300 hover:border-accent/20 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.08)] ${GLASS_CLASS}`}
    >
      {/* Cyan accent bar at top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[rgba(0,217,255,0.8)] via-[rgba(0,217,255,0.4)] to-transparent" />
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="mb-0.5 font-heading text-base font-bold text-white sm:text-lg">
              {item.role}
            </h3>
            <p className="text-sm font-medium text-accent/80">{item.company}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[rgba(255,255,255,0.5)]">
            {item.period}
          </span>
        </div>
        <p className="mb-3 max-w-prose text-sm leading-relaxed text-[rgba(255,255,255,0.65)]">
          {item.description}
        </p>
        {item.achievements && item.achievements.length > 0 && (
          <ul
            className="mb-3 space-y-1.5"
            role="list"
            aria-label={`Achievements at ${item.company}`}
          >
            {item.achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[rgba(255,255,255,0.55)]">
                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-accent/50" aria-hidden />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
        {item.technologies && item.technologies.length > 0 && (
          <>
            <div className="my-3 h-px bg-white/[0.06]" />
            <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  role="listitem"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-[rgba(255,255,255,0.55)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function ExperienceSection({
  experience,
  education,
}: {
  experience: SanityExperience[]
  education: EducationData[]
}) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 70%"],
  })

  const featuredEducation =
    education.find((edu) => edu.status === "ongoing") ??
    [...education].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0))[0]

  return (
    <section id="experience" className="relative w-full py-28 px-6">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-accent/60">
            Education &amp; Work
          </p>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
          >
            Experience
          </h2>
          <p className="mt-3 max-w-md text-sm text-[rgba(255,255,255,0.5)]">
            Leadership roles bridging technical execution and team collaboration.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Static track line */}
          <div aria-hidden className="absolute bottom-2 left-5 top-2 w-px bg-white/10" />
          {/* Scroll-filled progress line — GPU-friendly (scaleY transform only) */}
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute bottom-2 left-5 top-2 w-px bg-gradient-to-b from-accent via-accent to-accent/20"
          />

          <motion.ol
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            aria-label="Education and professional experience timeline, most recent first"
            className="space-y-6"
          >
            <TimelineEntry icon={GraduationCap} active>
              {featuredEducation ? (
                <EducationEntry item={featuredEducation} />
              ) : (
                <CurrentFocusPanel />
              )}
            </TimelineEntry>

            {featuredEducation && (
              <TimelineEntry icon={Radar}>
                <CurrentFocusPanel />
              </TimelineEntry>
            )}

            {experience.map((item, i) => (
              <TimelineEntry key={item._id ?? i} icon={Briefcase}>
                <ExperienceEntry item={item} />
              </TimelineEntry>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
