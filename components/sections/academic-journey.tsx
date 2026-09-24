"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Building2, Calendar, MapPin, GraduationCap, BookOpen, School } from "lucide-react"
import type { EducationData } from "@/lib/sanity/fetch"
import { relevantCoursework } from "@/data"

// Documented glass-panel token (same recipe as about-preview.tsx's card grid) —
// content cards use this, not the lighter nav-chrome glass.
const GLASS_CLASS =
  "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
const GLASS_STYLE = { WebkitBackdropFilter: "blur(16px)" }

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

  return (
    <div
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl p-5 w-full max-w-md ${alignClass} transition-[border-color,box-shadow] duration-300 hover:border-accent/20 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.12)] ${GLASS_CLASS}`}
    >
      <h3 className="text-base font-semibold text-white mb-2">
        {item.degree}
        {item.field ? ` in ${item.field}` : ""}
      </h3>

      <div className={`space-y-1 mb-3 ${metaJustify}`}>
        <p className={`flex items-center gap-1.5 text-xs text-white/50 ${metaJustify}`}>
          <Building2 size={12} className="text-accent/70 shrink-0" />
          {item.institution}
        </p>
        {item.location && (
          <p className={`flex items-center gap-1.5 text-xs text-white/50 ${metaJustify}`}>
            <MapPin size={12} className="text-accent/70 shrink-0" />
            {item.location}
          </p>
        )}
        <p className={`flex items-center gap-1.5 text-xs text-white/50 ${metaJustify}`}>
          <Calendar size={12} className="text-accent/70 shrink-0" />
          {item.startYear ?? ""}
          {item.startYear && item.endYear ? " — " : ""}
          {item.endYear ?? ""}
        </p>
      </div>

      {item.description && (
        <p className="text-sm text-white/60 leading-relaxed mb-3">{item.description}</p>
      )}

      {item.gpa && (
        <p className={`flex items-center gap-2 text-xs text-white/40 mb-3 ${metaJustify}`}>
          GPA:
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono font-semibold text-accent">
            {item.gpa}
            {item.gpaScale ? ` / ${item.gpaScale}` : ""}
          </span>
          {isOngoing && (
            <span className="rounded-full border border-accent/20 px-2 py-0.5 text-[10px] font-mono text-accent/60">
              Ongoing
            </span>
          )}
        </p>
      )}

      {isOngoing && (
        <div>
          <p
            className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/30 mb-2 ${metaJustify}`}
          >
            <BookOpen size={11} />
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
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-white/50 transition-colors group-hover:border-accent/10 group-hover:text-accent/60"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
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
    <section id="academic-journey" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Academic <span className="text-accent/70">Journey</span>
          </h2>
          <div className="mx-auto h-1 w-14 rounded-full bg-gradient-to-r from-accent/30 to-accent mb-4" />
          <p className="text-sm text-white/50 max-w-md mx-auto">
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
