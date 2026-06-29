"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code2, Server, Database, Cpu, Wrench, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { PythonIcon, JavaIcon, GitIcon } from "@/lib/tech-icons"

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", icon: PythonIcon, level: 85 },
      { name: "Java", icon: JavaIcon, level: 80 },
      { name: "C", icon: null, level: 75 },
      { name: "C++", icon: null, level: 70 },
      { name: "PHP", icon: null, level: 75 },
      { name: "JavaScript", icon: null, level: 78 },
      { name: "HTML/CSS", icon: null, level: 82 },
    ],
  },
  {
    title: "Frameworks",
    icon: Server,
    skills: [
      { name: "JavaFX", icon: null, level: 80 },
      { name: "Bootstrap", icon: null, level: 78 },
      { name: "SpeechRecognition", icon: null, level: 70 },
      { name: "Pyttsx3", icon: null, level: 65 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "MySQL", icon: null, level: 80 },
      { name: "File I/O", icon: null, level: 75 },
    ],
  },
  {
    title: "Hardware & IoT",
    icon: Cpu,
    skills: [
      { name: "Arduino", icon: null, level: 75 },
      { name: "Sensors", icon: null, level: 70 },
      { name: "Motor Drivers", icon: null, level: 65 },
    ],
  },
  {
    title: "Tools & Concepts",
    icon: Wrench,
    skills: [
      { name: "Git", icon: GitIcon, level: 80 },
      { name: "OOP", icon: null, level: 85 },
      { name: "DSA", icon: null, level: 80 },
      { name: "Socket Programming", icon: null, level: 75 },
      { name: "REST APIs", icon: null, level: 70 },
    ],
  },
]

function SkillBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles size={20} className="text-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-foreground">
            Skills & Expertise
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-12"
        >
          {skillCategories.map((category, ci) => {
            const CatIcon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.5, ease: "easeOut" as const }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CatIcon size={20} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        tabIndex={0}
                        role="article"
                        aria-label={`${skill.name}: ${skill.level}% proficiency`}
                        className={cn(
                          "group rounded-2xl p-4 cursor-default",
                          "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px]",
                          "border border-[rgba(255,255,255,0.06)]",
                          "hover:border-accent/20",
                          "transition-all duration-300",
                          "hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                            {SkillIcon ? (
                              <SkillIcon width={20} height={20} className="text-accent" />
                            ) : (
                              <div className="w-5 h-5 rounded bg-white/10" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-foreground font-body">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <SkillBar level={skill.level} />
                          <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                            {skill.level}%
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
