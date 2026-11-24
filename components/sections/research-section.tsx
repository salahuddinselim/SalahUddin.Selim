"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, FlaskConical, FileText, Lock } from "lucide-react"
import Link from "next/link"

type BadgeType = "paper" | "ml" | "iot" | "security" | "fydp" | "datamining"

interface ResearchProject {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  type: BadgeType
  year: number
  coAuthor?: string
  paperTitle?: string
  privateRepo?: boolean
}

const academicPapers: ResearchProject[] = [
  {
    title: "Green Computing — Carbon-Aware Precision Scheduling for LLM Inference",
    paperTitle: "Carbon-Aware Precision Scheduling for LLM Inference",
    description:
      "Investigated whether switching LLM inference precision (FP16 / INT8 / INT4) in real time based on grid carbon intensity reduces carbon footprint. Built a full measurement pipeline across 7 LLMs on a consumer RTX 3060, backtested against real ElectricityMaps data from Norway, Germany, and Poland. Key finding: on consumer GPUs, bitsandbytes INT8 uses 2.4× and INT4 uses 7.8× the energy of FP16 — a negative result reported honestly, with structural explanation. Conference-formatted IEEEtran paper submitted.",
    tags: ["LLM Inference", "Carbon Efficiency", "PyTorch", "bitsandbytes", "ElectricityMaps"],
    type: "paper",
    year: 2026,
    coAuthor: "Afia Tasnim Ria",
    privateRepo: true,
  },
  {
    title: "Computer Security — Forensic Artifact Survival in Containerized Environments",
    paperTitle:
      "Where Does the Evidence Go? A Systematic Study of Forensic Artifact Survival in Containerized and Serverless Compute Environments",
    description:
      "Systematic study of which digital forensic artifacts survive teardown in Docker containers, Kubernetes pods, and AWS Lambda functions — and at what capture cost. Proposes a minimal-overhead capture technique. Full research proposal, literature review (20+ papers), testbed harness, and working conference paper draft (IEEEtran, two-column) with Afia Tasnim Ria.",
    tags: ["Digital Forensics", "Docker", "Kubernetes", "Serverless", "AWS Lambda"],
    type: "paper",
    year: 2026,
    coAuthor: "Afia Tasnim Ria",
    privateRepo: true,
  },
  {
    title: "Final Year Project — Blood Cell Leukemia Classification",
    paperTitle:
      "Automated Deep-Learning System for Classifying Leukemia Subtypes from Microscopic Blood Smear Images",
    description:
      "End-to-end medical AI pipeline that classifies leukemia subtypes (ALL, AML, CLL, CML, Normal) from blood smear images. A heterogeneous 3-model teacher ensemble (ResNet50 + ConvNeXt-Tiny + Swin-Tiny) is distilled into two lightweight students (MobileNetV3-Small, ConvNeXt-Atto) deployable on cheap hardware. Includes Grad-CAM explainability heatmaps and cross-model trust scoring that flags uncertain cases for mandatory doctor review.",
    tags: ["PyTorch", "Knowledge Distillation", "Medical AI", "Computer Vision", "Grad-CAM"],
    type: "fydp",
    year: 2026,
    privateRepo: true,
  },
  {
    title: "Data Mining — GDM Biomarkers Study",
    paperTitle:
      "GDM Biomarkers: Do Composite Inflammatory Ratios Improve Gestational Diabetes Prediction?",
    description:
      "Data-mining study on NHANES 2007–2018 (n = 2,641) testing whether composite biomarker ratios (SII, SIMI, TyG, AIP, NLR) improve ML prediction of gestational diabetes history over raw lab markers. Key finding: composite ratios are a net loss across all tested models (LightGBM, XGBoost, Logistic Regression). External validation AUROC 0.632 — no overfitting. Explains the 0.47–0.92 AUROC spread in the literature as a control-group selection artefact. Elsevier-format manuscript co-authored with Afia Tasnim Ria.",
    tags: ["LightGBM", "XGBoost", "NHANES", "Biomarkers", "Clinical ML"],
    type: "datamining",
    year: 2025,
    coAuthor: "Afia Tasnim Ria",
    privateRepo: true,
  },
]

const appliedProjects: ResearchProject[] = [
  {
    title: "Sales Prediction from Advertising Spend",
    description:
      "Regression study comparing scikit-learn Random Forest against a PyTorch neural network on advertising channel spend data. Includes feature-importance analysis and cross-validation.",
    tags: ["Machine Learning", "PyTorch", "scikit-learn", "Regression"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Sales_Prediction",
    type: "ml",
    year: 2024,
  },
  {
    title: "COVID-19 Unemployment Impact Analysis",
    description:
      "EDA on India's unemployment rates during COVID-19 lockdowns. Visualises regional disparities and labour-market recovery curves using pandas and seaborn.",
    tags: ["Data Analysis", "pandas", "seaborn", "COVID-19"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Unemployment_Analysis",
    type: "ml",
    year: 2024,
  },
  {
    title: "Iris Flower Classification — ML vs Neural Network",
    description:
      "Benchmark: Random Forest vs PyTorch neural network on Iris dataset. Documents accuracy, convergence, and decision-boundary differences.",
    tags: ["Classification", "PyTorch", "scikit-learn", "Neural Network"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Iris_Flower_Classification",
    type: "ml",
    year: 2024,
  },
  {
    title: "Used Car Price Prediction",
    description:
      "Predictive modelling for second-hand vehicle prices — Random Forest vs PyTorch regression, with hyperparameter tuning and feature attribution.",
    tags: ["Regression", "PyTorch", "scikit-learn", "Feature Engineering"],
    githubUrl: "https://github.com/salahuddinselim/CodeAlpha_Car_Price_Prediction",
    type: "ml",
    year: 2024,
  },
  {
    title: "Automated Fish Pond Monitoring System",
    description:
      "Arduino IoT system for aquaculture — auto-controls feeding, monitors water level and temperature via sensors, and triggers alerts.",
    tags: ["Arduino", "IoT", "C++", "Sensors"],
    githubUrl: "https://github.com/salahuddinselim/Automated-Fish-Pond",
    type: "iot",
    year: 2023,
  },
  {
    title: "SwasthoLink — Secure e-Prescription System",
    description:
      "RSA-signed digital prescriptions with 2FA, role-based access, and pharmacist audit trail for doctors, hospitals, and pharmacies.",
    tags: ["Laravel", "RSA Cryptography", "2FA", "Healthcare"],
    githubUrl: "https://github.com/salahuddinselim/SwasthoLink",
    type: "security",
    year: 2024,
  },
]

const badgeStyle: Record<BadgeType, string> = {
  paper: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  ml: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  iot: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  security: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  fydp: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  datamining: "text-violet-400 bg-violet-400/10 border-violet-400/20",
}

const badgeLabel: Record<BadgeType, string> = {
  paper: "Research Paper",
  ml: "ML / Data Science",
  iot: "IoT / Embedded",
  security: "Security Research",
  fydp: "FYDP",
  datamining: "Data Mining",
}

function ResearchCard({ project, index }: { project: ResearchProject; index: number }) {
  return (
    <motion.article
      key={project.title}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] p-5 transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border ${badgeStyle[project.type]}`}
        >
          {project.type === "paper" && <FileText size={9} aria-hidden="true" />}
          {badgeLabel[project.type]}
        </span>
        <span className="text-[11px] font-mono text-foreground/30">{project.year}</span>
      </div>

      <h3 className="text-sm font-semibold text-foreground leading-snug mb-1">{project.title}</h3>

      {project.coAuthor && (
        <p className="text-[11px] font-mono text-accent/50 mb-2">with {project.coAuthor}</p>
      )}

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

      {project.privateRepo ? (
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground/35">
          <Lock size={11} aria-hidden="true" />
          Private — not yet published
        </span>
      ) : (
        <Link
          href={project.githubUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-accent/70 hover:text-accent transition-colors"
          aria-label={`View ${project.title} on GitHub`}
        >
          View on GitHub
          <ArrowUpRight size={11} aria-hidden="true" />
        </Link>
      )}
    </motion.article>
  )
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
        {/* Header */}
        <motion.div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical size={14} className="text-accent/60" aria-hidden="true" />
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/60">
              Academic &amp; Applied Research
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Research Work
          </h2>
          <p className="mt-4 text-sm text-foreground/50 max-w-xl">
            Course research papers, capstone projects, and applied experiments spanning green AI,
            digital forensics, data mining, and embedded systems.
          </p>
        </motion.div>

        {/* Academic papers */}
        <div className="mb-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/30 mb-5">
            Course Research Papers &amp; FYDP
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {academicPapers.map((project, i) => (
              <ResearchCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Applied projects */}
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/30 mb-5">
            Applied &amp; Experimental Projects
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {appliedProjects.map((project, i) => (
              <ResearchCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="https://github.com/salahuddinselim"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            All Research on GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
