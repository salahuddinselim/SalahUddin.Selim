"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const educationData = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Indian Institute of Technology, Patna",
    duration: "2024 — Present",
    description:
      "Pursuing a comprehensive curriculum covering algorithms, data structures, AI/ML, distributed systems, and software engineering. Engaged in research projects and technical committees.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Notre Dame College, Dhaka",
    duration: "2022 — 2024",
    description:
      "Completed higher secondary education with a focus on Science. Achieved excellent academic standing and participated in programming contests and extracurricular tech events.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "St. Joseph Higher Secondary School, Dhaka",
    duration: "2020 — 2022",
    description:
      "Completed secondary education with distinction. Developed foundational skills in mathematics, physics, and computer science. Active in science fairs and olympiad competitions.",
  },
]

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

export function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(lineRef)

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
            {educationData.map((item, i) => {
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.15,
                        ease: "easeOut" as const,
                      },
                    },
                  }}
                  className={cn(
                    "relative flex md:items-start gap-6",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse",
                  )}
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.2,
                      }}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center",
                        "bg-bg border-accent",
                        "shadow-[0_0_15px_rgba(0,217,255,0.15)]",
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "flex-1 md:w-[calc(50%-2rem)]",
                      isLeft ? "md:pr-8 md:text-right" : "md:pl-8",
                    )}
                  >
                    <motion.div
                      whileHover={{ y: -3 }}
                      className={cn(
                        "group rounded-2xl p-5 cursor-default",
                        "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px]",
                        "border border-[rgba(255,255,255,0.06)]",
                        "hover:border-accent/20",
                        "transition-all duration-300",
                        "hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]",
                      )}
                    >
                      <span className="inline-block text-xs font-mono text-accent mb-2">
                        {item.duration}
                      </span>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                        {item.degree}
                      </h3>
                      <p className="text-sm text-accent/80 font-body font-medium mb-3">
                        {item.institution}
                      </p>
                      <p className="text-sm text-muted font-body leading-relaxed">
                        {item.description}
                      </p>
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
