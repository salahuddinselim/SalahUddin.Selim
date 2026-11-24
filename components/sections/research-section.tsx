"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, FlaskConical } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import Link from "next/link"

interface ResearchProject {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  type: "ml" | "iot" | "security"
  year: number
}

const researchProjects: ResearchProject[] = [
  {
    title: "Sales Prediction from Advertising Spend",
    description:
      "Regression study comparing scikit-learn Random Forest against a PyTorch neural network on advertising channel spend data. Includes feature-importance analysis and cross-validation.",
    tags: ["Machine Learning", "PyTorch", "scikit-learn", "Regression", "Python"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Sales_Prediction",
    type: "ml",
    year: 2024,
  },
  {
    title: "COVID-19 Unemployment Impact Analysis",
    description:
      "Exploratory data analysis on India's unemployment rates during and after COVID-19 lockdowns. Visualises regional disparities and labour-market recovery curves using pandas and seaborn.",
    tags: ["Data Analysis", "pandas", "seaborn", "COVID-19", "Python"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Unemployment_Analysis",
    type: "ml",
    year: 2024,
  },
  {
    title: "Iris Flower Classification — ML vs Neural Network",
    description:
      "Benchmark comparing Random Forest (scikit-learn) against a custom PyTorch neural network on the classic Iris dataset. Documents accuracy, convergence speed, and decision-boundary differences.",
    tags: ["Classification", "PyTorch", "scikit-learn", "Neural Network", "Python"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Iris_Flower_Classification",
    type: "ml",
    year: 2024,
  },
  {
    title: "Used Car Price Prediction",
    description:
      "Predictive modelling for second-hand vehicle prices. Random Forest baseline versus a PyTorch regression model; includes hyperparameter tuning and SHAP-style feature attribution.",
    tags: ["Regression", "PyTorch", "scikit-learn", "Feature Engineering", "Python"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Car_Price_Prediction",
    type: "ml",
    year: 2024,
  },
  {
    title: "Automated Fish Pond Monitoring System",
    description:
      "Arduino-based IoT system for aquaculture. Auto-controls feeding schedules, monitors water level and temperature via sensors, and triggers alerts — reducing manual intervention in fish farming.",
    tags: ["Arduino", "IoT", "C++", "Sensors", "Automation"],
    githubUrl: "https://github.com/salahuddinselim/Automated-Fish-Pond",
    type: "iot",
    year: 2023,
  },
  {
    title: "SwasthoLink — Secure e-Prescription System",
    description:
      "Healthcare platform enabling doctors to issue cryptographically signed prescriptions using RSA digital signatures. Features 2FA, role-based access, and an audit trail for pharmacies and hospitals.",
    tags: ["Laravel", "RSA Cryptography", "2FA", "Healthcare", "PHP"],
    githubUrl: "https://github.com/salahuddinselim/SwasthoLink",
    type: "security",
    year: 2024,
  },
]

const typeLabel: Record<ResearchProject["type"], string> = {
  ml: "ML / Data Science",
  iot: "IoT / Embedded",
  security: "Security Research",
}

const typeColor: Record<ResearchProject["type"], string> = {
  ml: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  iot: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  security: "text-rose-400 bg-rose-400/10 border-rose-400/20",
}

export function ResearchSection() {
  return (
    <motion.section
      id="research"
      className="relative w-full py-24 sm:py-32 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical size={14} className="text-accent/60" aria-hidden="true" />
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/60">
              Research &amp; Data Science
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Research Work
          </h2>
          <p className="mt-4 text-sm text-foreground/50 max-w-xl">
            Notebooks, experiments, and applied-research projects spanning machine learning, IoT
            systems, and applied cryptography.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {researchProjects.map((project, i) => (
            <motion.article
              key={project.githubUrl}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] transition-colors duration-200 p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border ${typeColor[project.type]}`}
                >
                  {typeLabel[project.type]}
                </span>
                <span className="text-[11px] font-mono text-foreground/30">{project.year}</span>
              </div>

              <h3 className="text-sm font-semibold text-foreground leading-snug mb-2">
                {project.title}
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-foreground/40 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent/70 hover:text-accent transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <FaGithub size={12} aria-hidden="true" />
                View on GitHub
                <ArrowUpRight size={11} aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="https://github.com/salahuddinselim"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FaGithub size={15} aria-hidden="true" />
            All Research on GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
