"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { CheckCircle2, Sparkles, Radar, Briefcase } from "lucide-react"
import type { SanityExperience } from "@/types"
import { currentFocusCopy, currentFocusTags } from "@/data"

// Documented glass-panel token (same recipe as about-preview.tsx's card grid) —
// content cards use this, not the lighter nav-chrome glass.
const GLASS_CLASS =
  "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
const GLASS_STYLE = { WebkitBackdropFilter: "blur(16px)" }

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
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-accent/90 mb-3">
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

interface ExperienceEntryProps {
  item: SanityExperience
}

function ExperienceEntry({ item }: ExperienceEntryProps) {
  return (
    <div
      style={GLASS_STYLE}
      className={`group relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/20 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.08)] ${GLASS_CLASS}`}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-0.5">{item.role}</h3>
          <p className="text-sm text-accent/70 font-medium">{item.company}</p>
        </div>
        <span
          style={GLASS_STYLE}
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-accent/80 ${GLASS_CLASS}`}
        >
          {item.period}
        </span>
      </div>
      <p className="text-base text-white/50 leading-relaxed max-w-prose mb-3 mt-3">
        {item.description}
      </p>
      {item.achievements && item.achievements.length > 0 && (
        <ul className="space-y-1.5 mb-3">
          {item.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/50">
              <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-accent/50" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      )}
      {item.technologies && item.technologies.length > 0 && (
        <>
          <div className="my-3 h-px bg-white/[0.06]" />
          <div className="flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-white/50 transition-colors group-hover:border-accent/10 group-hover:text-accent/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function ExperienceSection({ experience }: { experience: SanityExperience[] }) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 70%"],
  })

  return (
    <section id="experience" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Professional <span className="text-accent/80">Experience</span>
          </h2>
          <div className="mx-auto h-1 w-14 rounded-full bg-gradient-to-r from-accent/30 to-accent mb-4" />
          <p className="text-sm text-white/50 max-w-md mx-auto">
            Leadership roles bridging technical execution and team collaboration.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Static track line */}
          <div aria-hidden className="absolute left-5 top-2 bottom-2 w-px bg-white/10" />
          {/* Scroll-filled progress line — GPU-friendly (scaleY transform only) */}
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent to-accent/20"
          />

          <motion.ol
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            aria-label="Professional experience timeline, most recent first"
            className="space-y-6"
          >
            <TimelineEntry icon={Radar} active>
              <CurrentFocusPanel />
            </TimelineEntry>

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
