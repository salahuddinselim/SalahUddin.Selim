"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, CheckCircle2, Sparkles } from "lucide-react"
import { getExperience, getEducation } from "@/lib/sanity/fetch"
import type { SanityExperience } from "@/types"
import type { EducationData } from "@/lib/sanity/fetch"

interface ExperienceCardProps {
  item: SanityExperience
  index: number
}

function ExperienceCard({ item, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-cyan-400/20 hover:shadow-[0_0_40px_-8px_rgba(0,217,255,0.08)]"
    >
      <div className="absolute inset-y-6 left-0 w-0.5 rounded-full bg-gradient-to-b from-cyan-400 via-cyan-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="p-5 pl-7">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-cyan-300/90 mb-3">
          <Sparkles size={10} />
          {item.period}
        </span>
        <h3 className="text-base font-semibold text-white mb-0.5">{item.role}</h3>
        <p className="text-sm text-cyan-400/70 font-medium mb-3">{item.company}</p>
        <p className="text-base text-white/50 leading-relaxed max-w-prose mb-3">
          {item.description}
        </p>
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
    </motion.div>
  )
}

interface EducationCardProps {
  item: EducationData
  index: number
}

function EducationCard({ item, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-amber-400/20 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.08)]"
    >
      <div className="absolute inset-y-6 left-0 w-0.5 rounded-full bg-gradient-to-b from-amber-400 via-amber-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="p-5 pl-7">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-300/70 mb-2">
          {item.startYear ?? ""}
          {item.startYear && item.endYear ? " — " : ""}
          {item.endYear ?? ""}
        </span>
        <h3 className="text-base font-semibold text-white mb-0.5">
          {item.degree}
          {item.field ? ` in ${item.field}` : ""}
        </h3>
        <p className="text-sm text-amber-400/70 font-medium mb-3">{item.institution}</p>
        {item.description && (
          <p className="text-base text-white/60 leading-relaxed max-w-prose mb-3">
            {item.description}
          </p>
        )}
        {item.gpa && (
          <div className="flex items-center gap-2 rounded-lg bg-amber-400/5 border border-amber-400/10 px-3 py-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
              CGPA
            </span>
            <span className="text-amber-400 font-bold text-sm leading-none">{item.gpa}</span>
            {item.gpaScale && <span className="text-white/30 text-xs">/{item.gpaScale}</span>}
            {item.status === "ongoing" && (
              <span className="ml-auto rounded-full border border-amber-400/20 px-2 py-0.5 text-[10px] font-mono text-amber-400/60">
                Ongoing
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SectionHeader({
  icon,
  label,
  count,
  color,
}: {
  icon: React.ReactNode
  label: string
  count: number
  color: string
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: `${color}12` }}
      >
        <div className="text-sm" style={{ color }}>
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-semibold text-white/80">{label}</h3>
      <span
        className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-mono"
        style={{ background: `${color}10`, color: `${color}80` }}
      >
        {count}
      </span>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.06] px-6 py-12 text-center">
      <p className="text-xs font-mono text-white/20">No {label} entries yet</p>
    </div>
  )
}

export function ExperienceSection() {
  const [experience, setExperience] = useState<SanityExperience[]>([])
  const [education, setEducation] = useState<EducationData[]>([])

  useEffect(() => {
    Promise.all([
      getExperience().catch(() => [] as SanityExperience[]),
      getEducation().catch(() => [] as EducationData[]),
    ]).then(([exp, edu]) => {
      setExperience(exp)
      setEducation(edu)
    })
  }, [])

  return (
    <section id="experience" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-5xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div>
            <SectionHeader
              icon={<Briefcase size={14} />}
              label="Experience"
              count={experience.length}
              color="#00D9FF"
            />
            <div className="space-y-4">
              {experience.length === 0 && <EmptyState label="experience" />}
              {experience.map((item, i) => (
                <ExperienceCard key={item._id ?? i} item={item} index={i} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader
              icon={<GraduationCap size={14} />}
              label="Education"
              count={education.length}
              color="#FBBF24"
            />
            <div className="space-y-4">
              {education.length === 0 && <EmptyState label="education" />}
              {education.map((item, i) => (
                <EducationCard key={item.institution + (item.degree ?? "")} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
