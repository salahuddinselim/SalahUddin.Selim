"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { GraduationCap, BookOpen, School } from "lucide-react"
import type { EducationData } from "@/lib/sanity/fetch"
import { relevantCoursework } from "@/data"

// Documented glass-panel token (same recipe as about-preview.tsx's card grid) —
// content cards use this, not the lighter nav-chrome glass.
const GLASS_CLASS =
  "bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
const GLASS_STYLE = { WebkitBackdropFilter: "blur(10px)" }

const NODE_ICONS = [GraduationCap, School, BookOpen]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

interface EducationCardProps {
  item: EducationData
  align: "left" | "right"
}

function EducationCard({ item, align }: EducationCardProps) {
  const isOngoing = item.status === "ongoing"
  const alignClass = align === "right" ? "md:ml-auto md:text-right" : ""
  const metaJustify = align === "right" ? "md:justify-end" : ""
  const years = [item.startYear, item.endYear].filter(Boolean).join(" — ")
  const gpaLabel = item.gpa ? `${item.gpa}${item.gpaScale ? ` / ${item.gpaScale}` : ""}` : undefined

  const stats: { label: string; value: string }[] = []
  if (item.abbreviation) stats.push({ label: "Program", value: item.abbreviation })
  if (item.completedCredits && item.totalCredits) {
    stats.push({ label: "Credits", value: `${item.completedCredits} / ${item.totalCredits}` })
  }
  if (item.location) stats.push({ label: "Campus", value: item.location })
  if (item.status) {
    stats.push({ label: "Status", value: isOngoing ? "Ongoing" : item.status })
  }

  const abbr = (item.abbreviation ?? item.institution ?? "").slice(0, 3).toUpperCase()

  return (
    <div
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl w-full max-w-md ${alignClass} transition-[border-color,box-shadow] duration-300 hover:border-accent/20 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.12)] ${GLASS_CLASS}`}
    >
      {/* Amber accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[rgba(245,158,11,0.8)] via-[rgba(245,158,11,0.4)] to-transparent" />
      <div className="p-5">
        {/* Institution header row */}
        <div
          className={`mb-3 flex items-start gap-3 ${align === "right" ? "md:flex-row-reverse" : ""}`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
            <span className="font-heading font-bold text-xs text-accent">{abbr}</span>
          </div>
          <div className={`min-w-0 flex-1 ${align === "right" ? "md:text-right" : ""}`}>
            <div className={`mb-0.5 flex flex-wrap items-center gap-2 ${metaJustify}`}>
              <h3 className="font-heading text-base font-bold text-white">{item.institution}</h3>
              {isOngoing && (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
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
          <p className="mb-3 text-sm leading-relaxed text-[rgba(255,255,255,0.65)]">
            {item.description}
          </p>
        )}

        {gpaLabel && (
          <div className={`mb-3 flex flex-wrap items-center gap-2 ${metaJustify}`}>
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

        {isOngoing && (
          <div className="mb-3">
            <p
              className={`mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[rgba(255,255,255,0.35)] ${metaJustify}`}
            >
              <BookOpen size={11} aria-hidden />
              Relevant Coursework
            </p>
            <div
              className={`flex flex-wrap gap-1.5 ${align === "right" ? "md:justify-end" : ""}`}
              role="list"
              aria-label="Relevant coursework"
            >
              {relevantCoursework.map((course) => (
                <span
                  key={course}
                  role="listitem"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[rgba(255,255,255,0.55)]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {stats.length > 0 && (
          <dl
            className={`grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-3 ${
              stats.length >= 4
                ? "sm:grid-cols-4"
                : stats.length === 3
                  ? "sm:grid-cols-3"
                  : "sm:grid-cols-2"
            } ${metaJustify}`}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`min-w-0 ${align === "right" ? "md:text-right" : ""}`}
              >
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.35)]">
                  {stat.label}
                </dt>
                <dd className="mt-0.5 truncate text-xs font-medium text-[rgba(255,255,255,0.65)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}

function NodeIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span
      aria-hidden
      style={GLASS_STYLE}
      className={`flex h-10 w-10 items-center justify-center rounded-xl ${GLASS_CLASS}`}
    >
      <Icon size={16} className="text-accent" />
    </span>
  )
}

export function AcademicJourney({ education }: { education: EducationData[] }) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 70%"],
  })

  const sortedEducation = [...education].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0))

  if (sortedEducation.length === 0) return null

  return (
    <section id="academic-journey" className="relative w-full py-28 px-6">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-accent/60">
            Academic Journey
          </p>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
          >
            Education
          </h2>
          <p className="mt-3 max-w-md text-sm text-[rgba(255,255,255,0.5)]">
            Formal education shaping my analytical approach to software engineering.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Static center line (desktop) / left line (mobile) */}
          <div
            aria-hidden
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent to-accent/20"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            aria-label="Academic journey, most recent first"
            className="space-y-8 md:space-y-10"
          >
            {sortedEducation.map((item, i) => {
              const Icon = NODE_ICONS[i % NODE_ICONS.length]
              const onLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.institution + (item.degree ?? "")}
                  variants={itemVariants}
                  className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_2.5rem_1fr] items-start gap-3 md:gap-6"
                >
                  <div className="col-start-1 md:col-start-2 flex justify-center pt-1">
                    <NodeIcon icon={Icon} />
                  </div>
                  <div className={`col-start-2 ${onLeft ? "md:col-start-1" : "md:col-start-3"}`}>
                    <EducationCard item={item} align={onLeft ? "right" : "left"} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
