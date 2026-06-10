"use client"

import { motion } from "framer-motion"
import { SkillCloud } from "./skill-cloud"

interface Category {
  id: string
  heading: string
  description: string
  skills: string[]
  accent: string
}

const categories: Category[] = [
  {
    id: "Foundations",
    heading: "Programming Foundations",
    description:
      "Core concepts that underpin everything — applied across problem-solving, development, and system design.",
    accent: "purple",
    skills: [
      "Object-Oriented Programming",
      "Data Structures",
      "Algorithms",
      "Complexity Analysis",
      "Linear Algebra",
      "Probability & Statistics",
      "Numerical Methods",
      "Computer Organization",
    ],
  },
  {
    id: "Languages",
    heading: "Languages & Core",
    description:
      "Production-grade languages and version control ecosystems that power modern software development.",
    accent: "cyan",
    skills: ["Python", "TypeScript", "Git", "GitHub"],
  },
  {
    id: "AI/ML",
    heading: "AI / ML & Data Science",
    description:
      "Machine learning frameworks, data processing libraries, and AI tooling for building intelligent systems.",
    accent: "green",
    skills: [
      "LangChain",
      "HuggingFace",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "XGBoost",
      "Jupyter",
      "Plotly",
      "Power BI",
    ],
  },
  {
    id: "Tools",
    heading: "Backend & Infrastructure",
    description:
      "Modern backend frameworks, databases, and containerization tools for building scalable applications.",
    accent: "orange",
    skills: ["Next.js", "Redis", "PostgreSQL", "MongoDB", "Docker"],
  },
]

const accentStyles: Record<string, { border: string; bg: string; text: string; tagBorder: string; tagText: string }> = {
  purple: {
    border: "border-purple-400/20",
    bg: "bg-purple-400/10",
    text: "text-purple-300",
    tagBorder: "hover:border-purple-400/20",
    tagText: "hover:text-purple-300/80",
  },
  cyan: {
    border: "border-cyan-400/20",
    bg: "bg-cyan-400/10",
    text: "text-cyan-300",
    tagBorder: "hover:border-cyan-400/20",
    tagText: "hover:text-cyan-300/80",
  },
  green: {
    border: "border-green-400/20",
    bg: "bg-green-400/10",
    text: "text-green-300",
    tagBorder: "hover:border-green-400/20",
    tagText: "hover:text-green-300/80",
  },
  orange: {
    border: "border-orange-400/20",
    bg: "bg-orange-400/10",
    text: "text-orange-300",
    tagBorder: "hover:border-orange-400/20",
    tagText: "hover:text-orange-300/80",
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function ForgeSection() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="text-center mb-6"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400/50 mb-3">
          EXPERTISE
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Technical{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,217,255,0.2)]">
            Expertise
          </span>
        </h1>
      </motion.div>

      {/* Globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
        className="mb-16 md:mb-24 py-8"
      >
        <SkillCloud />
      </motion.div>

      {/* Category Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {categories.map((cat) => {
          const a = accentStyles[cat.accent]
          return (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${a.bg}`}
                    style={{ boxShadow: `0 0 8px ${cat.accent === 'purple' ? '#8B5CF6' : cat.accent === 'cyan' ? '#00D9FF' : cat.accent === 'green' ? '#22C55E' : '#F97316'}60` }}
                  />
                  <h3 className="text-base font-semibold text-white">
                    {cat.heading}
                  </h3>
                </div>
                <span className={`inline-flex items-center rounded-full border ${a.border} ${a.bg} ${a.text} px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.15em] shrink-0 ml-3`}>
                  {cat.skills.length} skills
                </span>
              </div>
              <p className="mt-2 text-sm text-white/40 leading-relaxed max-w-2xl">
                {cat.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-white/60 transition-all duration-200 ${a.tagBorder} ${a.tagText}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
