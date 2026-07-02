"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { CheckCircle2, Sparkles, BookOpen, Radar } from "lucide-react"
import type { SanityExperience } from "@/types"
import type { EducationData } from "@/lib/sanity/fetch"
import { currentFocusCopy, currentFocusTags, relevantCoursework } from "@/data"

// Same glass recipe used for the hero badges / CHAT button / nav pill —
// keep this section visually identical to the rest of the site's glass.
const GLASS_CLASS =
  "bg-white/[0.06] backdrop-blur-[18px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
const GLASS_STYLE = { WebkitBackdropFilter: "blur(18px)" }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

interface TimelineEntryProps {
  dotColor: string
  glowColor: string
  active?: boolean
  children: React.ReactNode
}

function TimelineEntry({ dotColor, glowColor, active, children }: TimelineEntryProps) {
  return (
    <motion.li variants={itemVariants} className="relative list-none pl-12 sm:pl-16">
      <span
        aria-hidden
        className="absolute left-[13px] sm:left-[21px] top-2 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center"
      >
        {active && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ background: dotColor }}
          />
        )}
        <span
          className="relative inline-flex h-3 w-3 rounded-full ring-4 ring-[#050816]"
          style={{ background: dotColor, boxShadow: `0 0 12px ${glowColor}` }}
        />
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
      className={`group relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.15)] ${GLASS_CLASS}`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-cyan-300/90 mb-3">
        <Radar size={10} />
        {currentFocusCopy.eyebrow}
      </span>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5">
        {currentFocusCopy.heading}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed max-w-prose mb-4">
        {currentFocusCopy.description}
      </p>
      <div className="flex flex-wrap gap-2" role="list" aria-label="Current focus areas">
        {currentFocusTags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            style={GLASS_STYLE}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-cyan-100/90 transition-colors group-hover:border-cyan-400/20 ${GLASS_CLASS}`}
          >
            <Sparkles size={11} className="text-cyan-300/80" />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

interface ExperienceEntryProps {
  item: SanityExperience
}

function ExperienceEntry({ item }: ExperienceEntryProps) {
  return (
    <div
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl p-5 transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/20 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.08)] ${GLASS_CLASS}`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-cyan-300/90 mb-3">
        <Sparkles size={10} />
        {item.period}
      </span>
      <h3 className="text-base font-semibold text-white mb-0.5">{item.role}</h3>
      <p className="text-sm text-cyan-400/70 font-medium mb-3">{item.company}</p>
      <p className="text-base text-white/50 leading-relaxed max-w-prose mb-3">{item.description}</p>
      {item.achievements && item.achievements.length > 0 && (
        <ul className="space-y-1.5 mb-3">
          {item.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/50">
              <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-cyan-400/50" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      )}
      {item.technologies && item.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-white/50 transition-colors group-hover:border-cyan-400/10 group-hover:text-cyan-300/60"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface EducationEntryProps {
  item: EducationData
}

function EducationEntry({ item }: EducationEntryProps) {
  const isOngoing = item.status === "ongoing"
  return (
    <div
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl p-5 transition-[border-color,box-shadow] duration-300 hover:border-purple-400/20 hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.1)] ${GLASS_CLASS}`}
    >
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-purple-300/70 mb-2">
        {item.startYear ?? ""}
        {item.startYear && item.endYear ? " — " : ""}
        {item.endYear ?? ""}
      </span>
      <h3 className="text-base font-semibold text-white mb-0.5">
        {item.degree}
        {item.field ? ` in ${item.field}` : ""}
      </h3>
      <p className="text-sm text-purple-300/70 font-medium mb-3">{item.institution}</p>
      {item.description && (
        <p className="text-base text-white/60 leading-relaxed max-w-prose mb-3">
          {item.description}
        </p>
      )}
      {item.gpa && (
        <div className="flex items-center gap-2 rounded-lg bg-purple-400/5 border border-purple-400/10 px-3 py-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">CGPA</span>
          <span className="text-purple-300 font-bold text-sm leading-none">{item.gpa}</span>
          {item.gpaScale && <span className="text-white/30 text-xs">/{item.gpaScale}</span>}
          {isOngoing && (
            <span className="ml-auto rounded-full border border-purple-400/20 px-2 py-0.5 text-[10px] font-mono text-purple-300/60">
              Ongoing
            </span>
          )}
        </div>
      )}
      {isOngoing && (
        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/30 mb-2">
            <BookOpen size={11} />
            Relevant Coursework
          </p>
          <div className="flex flex-wrap gap-1.5" role="list" aria-label="Relevant coursework">
            {relevantCoursework.map((course) => (
              <span
                key={course}
                role="listitem"
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-white/50 transition-colors group-hover:border-purple-400/10 group-hover:text-purple-300/60"
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

  const sortedEducation = [...education].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0))

  return (
    <section id="experience" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400/50 mb-3">
            CAREER & ACADEMIC
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Experience <span className="text-cyan-400/60">&</span> Education
          </h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Static track line */}
          <div
            aria-hidden
            className="absolute left-[19px] sm:left-[27px] top-2 bottom-2 w-px bg-white/10"
          />
          {/* Scroll-filled progress line — GPU-friendly (scaleY transform only) */}
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-[19px] sm:left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400 via-purple-400 to-purple-400/20"
          />

          <motion.ol
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            aria-label="Experience and education timeline, most recent first"
            className="space-y-6"
          >
            <TimelineEntry dotColor="#00D9FF" glowColor="rgba(0,217,255,0.6)" active>
              <CurrentFocusPanel />
            </TimelineEntry>

            {experience.map((item, i) => (
              <TimelineEntry key={item._id ?? i} dotColor="#00D9FF" glowColor="rgba(0,217,255,0.5)">
                <ExperienceEntry item={item} />
              </TimelineEntry>
            ))}

            {sortedEducation.map((item) => (
              <TimelineEntry
                key={item.institution + (item.degree ?? "")}
                dotColor="#A855F7"
                glowColor="rgba(168,85,247,0.5)"
              >
                <EducationEntry item={item} />
              </TimelineEntry>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
