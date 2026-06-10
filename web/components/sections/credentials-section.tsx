"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Award, Code2, Cloud, Database, Brain, Building2, GraduationCap, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

interface Certificate {
  id: string
  title: string
  issuer: string
  issuerIcon?: React.ReactNode
  date: string
  year: number
  category: string
  tags: string[]
  description?: string
}

const issuerIcons: Record<string, React.ReactNode> = {
  HackerRank: <Code2 size={16} />,
  "Anthropic Academy": <Brain size={16} />,
  "AWS Training": <Cloud size={16} />,
  "Oracle University": <Database size={16} />,
  "Google Cloud": <Cloud size={16} />,
  "Deloitte Academy": <Building2 size={16} />,
  "Tata Consultancy": <Building2 size={16} />,
  "IIT Patna": <GraduationCap size={16} />,
  "NVIDIA Deep Learning": <Cpu size={16} />,
  "DeepLearning.AI (Coursera)": <Brain size={16} />,
}

const certificates: Certificate[] = [
  {
    id: "sql-advanced",
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    date: "Mar 24, 2026",
    year: 2026,
    category: "HackerRank",
    tags: ["SQL", "DATABASES", "QUERY"],
    description: "Advanced-level SQL certification demonstrating complex query writing, database optimization, and data manipulation skills.",
  },
  {
    id: "claude-api",
    title: "Claude with the Anthropic API",
    issuer: "Anthropic Academy",
    date: "Mar 18, 2026",
    year: 2026,
    category: "Anthropic",
    tags: ["AI", "LLM", "API"],
    description: "Hands-on certification covering Anthropic's Claude API, prompt engineering, and production deployment of LLM applications.",
  },
  {
    id: "aws-solutions",
    title: "AWS Solutions Architect",
    issuer: "AWS Training",
    date: "Feb 28, 2026",
    year: 2026,
    category: "AWS",
    tags: ["CLOUD", "AWS", "ARCHITECTURE"],
    description: "Comprehensive certification in designing distributed systems and scalable infrastructure on Amazon Web Services.",
  },
  {
    id: "oracle-db",
    title: "Oracle Database SQL",
    issuer: "Oracle University",
    date: "Feb 14, 2026",
    year: 2026,
    category: "Oracle",
    tags: ["ORACLE", "SQL", "DATABASES"],
    description: "Certification in Oracle Database management, SQL optimization, and enterprise data architecture.",
  },
  {
    id: "google-ml",
    title: "TensorFlow Developer Certificate",
    issuer: "Google Cloud",
    date: "Jan 30, 2026",
    year: 2026,
    category: "Google",
    tags: ["ML", "TENSORFLOW", "AI"],
    description: "Professional certification validating proficiency in building and deploying machine learning models with TensorFlow.",
  },
  {
    id: "google-data",
    title: "Google Data Analytics",
    issuer: "Google Cloud",
    date: "Jan 15, 2026",
    year: 2026,
    category: "Google",
    tags: ["DATA", "ANALYTICS", "GCP"],
    description: "Certification covering data analysis, visualization, and insight generation using Google Cloud tools.",
  },
  {
    id: "deloitte-tech",
    title: "Digital Technology Consulting",
    issuer: "Deloitte Academy",
    date: "Dec 20, 2025",
    year: 2026,
    category: "Deloitte",
    tags: ["CONSULTING", "DIGITAL", "TECH"],
    description: "Program focused on digital transformation strategies, technology consulting frameworks, and client delivery.",
  },
  {
    id: "tata-fs",
    title: "Full-Stack Development",
    issuer: "Tata Consultancy",
    date: "Dec 10, 2025",
    year: 2026,
    category: "Tata",
    tags: ["FULLSTACK", "REACT", "NODE"],
    description: "Enterprise full-stack development certification covering modern web technologies and best practices.",
  },
  {
    id: "tata-cyber",
    title: "Cybersecurity Fundamentals",
    issuer: "Tata Consultancy",
    date: "Nov 28, 2025",
    year: 2026,
    category: "Tata",
    tags: ["CYBERSECURITY", "NETWORK", "SECURITY"],
    description: "Foundational certification in cybersecurity principles, threat analysis, and secure system design.",
  },
  {
    id: "academic-cs",
    title: "Computer Science & Data Analytics",
    issuer: "IIT Patna",
    date: "Aug 01, 2024",
    year: 2026,
    category: "Academic",
    tags: ["ACADEMIC", "CSDA", "DEGREE"],
    description: "Undergraduate program in Computer Science and Data Analytics with a focus on AI/ML and software engineering.",
  },
  {
    id: "nvidia-dl",
    title: "Deep Learning Fundamentals",
    issuer: "NVIDIA Deep Learning",
    date: "Nov 15, 2025",
    year: 2026,
    category: "NVIDIA",
    tags: ["DEEP LEARNING", "GPU", "CUDA"],
    description: "NVIDIA-certified deep learning program covering neural networks, GPU-accelerated computing, and computer vision.",
  },
  {
    id: "dla-ml",
    title: "Advanced Learning Algorithms",
    issuer: "DeepLearning.AI (Coursera)",
    date: "Oct 25, 2025",
    year: 2026,
    category: "DeepLearning.AI",
    tags: ["ML", "ALGORITHMS", "AI"],
    description: "Advanced study of machine learning algorithms, neural network architecture, and supervised/unsupervised learning techniques.",
  },
]

const transcriptEntry: Certificate = {
  id: "academic-transcript",
  title: "Academic Transcript",
  issuer: "IIT Patna",
  date: "2024 – Present",
  year: 2026,
  category: "Academic",
  tags: ["ACADEMIC", "IITPATNA", "CSDA", "Sem 1", "Sem 2", "Sem 3"],
  description: "Official academic transcript from Indian Institute of Technology Patna — Computer Science & Data Analytics program.",
}

const categories = [
  { id: "All", count: 13 },
  { id: "HackerRank", count: 1 },
  { id: "Anthropic", count: 1 },
  { id: "AWS", count: 1 },
  { id: "Oracle", count: 1 },
  { id: "Google", count: 2 },
  { id: "Deloitte", count: 1 },
  { id: "Tata", count: 2 },
  { id: "Academic", count: 1 },
  { id: "NVIDIA", count: 1 },
  { id: "DeepLearning.AI", count: 1 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

const categoryColors: Record<string, string> = {
  HackerRank: "#00EA64",
  Anthropic: "#D4A574",
  AWS: "#FF9900",
  Oracle: "#F80000",
  Google: "#4285F4",
  Deloitte: "#86BC25",
  Tata: "#1A5DA6",
  Academic: "#8B5CF6",
  NVIDIA: "#76B900",
  "DeepLearning.AI": "#FF6F00",
}

function getCategoryColor(cat: string): string {
  return categoryColors[cat] || "#00D9FF"
}

function CardDetail({ cert }: { cert: Certificate }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" as const }}
      className="overflow-hidden"
    >
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="mt-3 pt-3 border-t border-white/[0.06] text-sm text-white/40 leading-relaxed"
      >
        {cert.description}
      </motion.p>
    </motion.div>
  )
}

export function CredentialsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = activeCategory === "All"
    ? certificates
    : certificates.filter((c) => c.category === activeCategory)

  const years = [...new Set(filtered.map((c) => c.year))].sort((a, b) => b - a)

  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1000px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-8"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400/50 mb-3">
          • ACHIEVEMENTS
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,217,255,0.2)]">
            Credentials
          </span>
        </h1>
        <p className="mt-2 text-xs font-mono tracking-[0.15em] text-white/30">
          13 certificates · click any entry to expand
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center gap-2 mb-10"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          const color = cat.id === "All" ? "#00D9FF" : getCategoryColor(cat.id)
          return (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              type="button"
              onClick={() => { setActiveCategory(cat.id); setExpandedId(null) }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-[0.15em] transition-all duration-200",
                isActive
                  ? "border shadow-[0_0_15px_rgba(0,217,255,0.06)]"
                  : "border border-white/[0.06] text-white/35 hover:text-white/70 hover:border-white/10",
              )}
              style={
                isActive
                  ? { borderColor: `${color}40`, backgroundColor: `${color}10`, color }
                  : undefined
              }
            >
              {cat.id}
              <span className={cn("tabular-nums", isActive ? "opacity-80" : "text-white/20")}>
                {cat.count}
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Continuous vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-white/[0.06] to-transparent" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {years.map((year) => {
            const yearCerts = filtered.filter((c) => c.year === year)
            return (
              <motion.div key={year} variants={itemVariants}>
                {/* Year badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-[10px] w-[10px]">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/60" />
                      <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/20">
                      {year}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.15em] text-white/20">
                    {yearCerts.length} cert{yearCerts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Certificate cards */}
                <div className="space-y-3 pl-8">
                  {yearCerts.map((cert) => {
                    const isExpanded = expandedId === cert.id
                    const issuerIcon = issuerIcons[cert.issuer]
                    return (
                      <motion.div
                        key={cert.id}
                        layout
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" as const }}
                        className={cn(
                          "rounded-xl border bg-white/[0.02] p-4 cursor-pointer transition-all duration-200",
                          "hover:border-cyan-400/20 hover:shadow-[0_0_25px_rgba(0,217,255,0.04)]",
                          isExpanded ? "border-cyan-400/20" : "border-white/[0.06]",
                        )}
                        onClick={() => setExpandedId(isExpanded ? null : cert.id)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                            {issuerIcon || <Award size={16} />}
                          </div>

                          {/* Center content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white">
                              {cert.title}
                            </h3>
                            <p
                              className="mt-0.5 text-xs font-mono"
                              style={{ color: getCategoryColor(cert.category) }}
                            >
                              {cert.issuer}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {cert.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.1em] text-white/35"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Right side */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="text-[10px] font-mono whitespace-nowrap text-white/25">
                              {cert.date}
                            </span>
                            <ChevronDown
                              size={14}
                              className={cn(
                                "text-white/20 transition-transform duration-200",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && <CardDetail cert={cert} />}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}

          {/* Present segment — Academic Transcript */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-[10px] w-[10px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400/60" />
                  <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                </span>
                <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300">
                  Present
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-[0.15em] text-white/20">
                1 cert
              </span>
            </div>

            <div className="pl-8">
              <div
                className={cn(
                  "rounded-xl border border-purple-400/10 bg-purple-400/[0.02] p-4 cursor-pointer transition-all duration-200",
                  "hover:border-purple-400/20 hover:shadow-[0_0_25px_rgba(139,92,246,0.04)]",
                  expandedId === "academic-transcript" && "border-purple-400/20",
                )}
                onClick={() =>
                  setExpandedId(expandedId === "academic-transcript" ? null : "academic-transcript")
                }
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-400/10 text-purple-300">
                    <GraduationCap size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      {transcriptEntry.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-mono text-purple-300">
                      {transcriptEntry.issuer}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {transcriptEntry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.1em] text-white/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[10px] font-mono whitespace-nowrap text-white/25">
                      {transcriptEntry.date}
                    </span>
                    <ChevronDown
                      size={14}
                      className={cn(
                        "text-white/20 transition-transform duration-200",
                        expandedId === "academic-transcript" && "rotate-180",
                      )}
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedId === "academic-transcript" && <CardDetail cert={transcriptEntry} />}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
