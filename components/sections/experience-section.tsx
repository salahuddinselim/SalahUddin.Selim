"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { getExperience, getEducation } from "@/lib/sanity/fetch"
import type { SanityExperience } from "@/types"
import type { EducationData } from "@/lib/sanity/fetch"

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const update = () => {
            if (!el) return
            const rect = el.getBoundingClientRect()
            const total = rect.height
            const visible = window.innerHeight - rect.top
            const pct = Math.min(Math.max(visible / total, 0), 1)
            setProgress(pct)
          }
          update()
          window.addEventListener("scroll", update, { passive: true })
          return () => window.removeEventListener("scroll", update)
        }
      },
      { threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return progress
}

interface TimelineItem {
  type: "experience" | "education"
  date: string
  data: SanityExperience | EducationData
}

export function ExperienceSection() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(lineRef)

  useEffect(() => {
    Promise.all([
      getExperience().catch(() => [] as SanityExperience[]),
      getEducation().catch(() => [] as EducationData[]),
    ]).then(([exp, edu]) => {
      const items: TimelineItem[] = [
        ...exp.map((e) => ({
          type: "experience" as const,
          date: e.period ?? "",
          data: e,
        })),
        ...edu.map((e) => ({
          type: "education" as const,
          date: e.endYear ?? "",
          data: e,
        })),
      ]
      items.sort((a, b) => b.date.localeCompare(a.date))
      setTimeline(items)
    })
  }, [])

  return (
    <section id="experience" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <GraduationCap size={20} className="text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
            Experience & Education
          </h2>
        </motion.div>

        <div ref={lineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px]">
            <div className="absolute inset-0 bg-white/5 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent-secondary to-accent rounded-full"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {timeline.length === 0 && (
              <p className="text-center text-sm font-mono text-white/20">No entries yet</p>
            )}
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0
              const isEdu = item.type === "education"
              const eduData = isEdu ? (item.data as EducationData) : null
              const expData = !isEdu ? (item.data as SanityExperience) : null
              const variants = (() => {
                const style = i % 3
                if (style === 0) return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } }
                if (style === 1) return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } }
                return { hidden: { opacity: 0, x: isLeft ? -30 : 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" as const } } }
              })()

              return (
                  <motion.div
                    key={i}
                    initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={variants}
                  className={cn(
                    "relative flex md:items-start gap-6",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse",
                  )}
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0, rotate: i * 120 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 350 - i * 50,
                        damping: 15,
                        delay: 0.25,
                      }}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-bg shadow-[0_0_15px_rgba(0,217,255,0.15)]",
                        isEdu ? "border-amber-400" : "border-accent",
                      )}
                    >
                      <motion.div
                        className={cn("w-2 h-2 rounded-full", isEdu ? "bg-amber-400" : "bg-accent")}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={cn("flex-1 md:w-[calc(50%-2rem)]", isLeft ? "md:pr-8 md:text-right" : "md:pl-8")}>
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className={cn(
                        "group rounded-2xl p-5 cursor-default bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px] border transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]",
                        isEdu
                          ? "border-amber-400/20 hover:border-amber-400/30"
                          : "border-[rgba(255,255,255,0.06)] hover:border-accent/20",
                      )}
                    >
                      {isEdu ? (
                        <>
                          <span className="inline-block text-xs font-mono text-amber-400 mb-2">
                            {eduData!.startYear ?? ""}{eduData!.startYear && eduData!.endYear ? " – " : ""}{eduData!.endYear ?? ""}
                          </span>
                          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                            {eduData!.degree}{eduData!.field ? ` in ${eduData!.field}` : ""}
                          </h3>
                          <p className="text-sm text-amber-400/80 font-body font-medium mb-3">
                            {eduData!.institution}
                          </p>
                          {eduData!.description && (
                            <p className="text-sm text-muted font-body leading-relaxed">{eduData!.description}</p>
                          )}
                          {eduData!.gpa && (
                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">CGPA</span>
                              <span className="text-amber-400 font-bold text-sm">{eduData!.gpa}</span>
                              {eduData!.gpaScale && <span className="text-white/30 text-xs">/{eduData!.gpaScale}</span>}
                              {eduData!.status === "ongoing" && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-400/20 text-amber-400/60 ml-auto">Ongoing</span>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="inline-block text-xs font-mono text-accent mb-2">
                            {expData!.period}
                          </span>
                          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                            {expData!.role}
                          </h3>
                          <p className="text-sm text-accent/80 font-body font-medium mb-3">
                            {expData!.company}
                          </p>
                          <p className="text-sm text-muted font-body leading-relaxed">
                            {expData!.description}
                          </p>
                          {expData!.technologies && expData!.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {expData!.technologies.map((tech) => (
                                <span key={tech} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent/8 text-accent/70 border border-accent/8">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
