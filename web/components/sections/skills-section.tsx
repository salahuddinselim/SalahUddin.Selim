"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Code2,
  Server,
  Database,
  Brain,
  Wrench,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  NodejsIcon,
  PythonIcon,
  DockerIcon,
  GitIcon,
  TailwindIcon,
  JavaIcon,
  MySQLIcon,
  OpenAIIcon,
} from "@/lib/tech-icons"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React", icon: ReactIcon, level: 95 },
      { name: "Next.js", icon: NextjsIcon, level: 92 },
      { name: "TypeScript", icon: TypeScriptIcon, level: 90 },
      { name: "Tailwind", icon: TailwindIcon, level: 88 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: NodejsIcon, level: 90 },
      { name: "Java", icon: JavaIcon, level: 85 },
      { name: "Python", icon: PythonIcon, level: 82 },
      { name: "Spring Boot", icon: null, level: 80 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      { name: "MySQL", icon: MySQLIcon, level: 85 },
      { name: "MongoDB", icon: null, level: 82 },
      { name: "PostgreSQL", icon: null, level: 80 },
      { name: "Redis", icon: null, level: 75 },
    ],
  },
  {
    title: "AI",
    icon: Brain,
    skills: [
      { name: "OpenAI", icon: OpenAIIcon, level: 88 },
      { name: "LangChain", icon: null, level: 82 },
      { name: "TensorFlow", icon: null, level: 75 },
      { name: "Computer Vision", icon: null, level: 70 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Docker", icon: DockerIcon, level: 88 },
      { name: "Git", icon: GitIcon, level: 92 },
      { name: "Kubernetes", icon: null, level: 75 },
      { name: "CI/CD", icon: null, level: 85 },
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
    <div
      ref={ref}
      className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden"
    >
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
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
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
                        className={cn(
                          "group rounded-2xl p-4 cursor-default",
                          "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px]",
                          "border border-[rgba(255,255,255,0.06)]",
                          "hover:border-accent/20",
                          "transition-all duration-300",
                          "hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]",
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                            {SkillIcon ? (
                              <SkillIcon
                                width={20}
                                height={20}
                                className="text-accent"
                              />
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
