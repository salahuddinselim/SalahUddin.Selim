"use client"

import { motion } from "framer-motion"
import { FolderKanban, ArrowUpRight } from "lucide-react"
import { ProjectCard } from "@/components/sections/project-card"
import type { Project } from "@/types"

const featured: Project[] = [
  {
    title: "AI-Powered Analytics Dashboard",
    slug: "ai-analytics-dashboard",
    description: "Real-time analytics platform with AI-driven insights and predictive modeling.",
    longDescription:
      "Built a comprehensive analytics dashboard that processes 10M+ events daily. Features include real-time data visualization, AI-powered anomaly detection, predictive trend forecasting, and automated report generation. The system uses WebSocket connections for live updates and employs machine learning models for intelligent data analysis.",
    technologies: ["React", "TypeScript", "Python", "TensorFlow", "PostgreSQL", "WebSocket", "Docker"],
    category: "Full Stack",
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    year: 2024,
  },
  {
    title: "Enterprise Resource Platform",
    slug: "enterprise-resource-platform",
    description: "Scalable ERP system serving 500+ enterprise clients globally.",
    longDescription:
      "Architected and developed a modular ERP platform handling inventory, HR, finance, and CRM modules. Implemented role-based access control, audit logging, and multi-tenant architecture. Reduced operational costs by 35% through workflow automation and intelligent resource allocation.",
    technologies: ["Next.js", "Java", "Spring Boot", "MySQL", "Redis", "Kubernetes"],
    category: "Backend",
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    year: 2024,
  },
  {
    title: "Financial Data Visualization Suite",
    slug: "financial-data-viz",
    description: "Desktop application for complex financial data analysis and visualization.",
    longDescription:
      "Created a JavaFX-based desktop application for financial analysts featuring interactive charts, real-time market data integration, portfolio management tools, and automated reporting. Handles 1M+ data points with sub-second rendering using custom JavaFX canvas optimizations.",
    technologies: ["Java", "JavaFX", "MySQL", "REST API", "WebSocket"],
    category: "Desktop",
    image: "/placeholder.svg",
    featured: true,
    year: 2023,
  },
]

export function ProjectsPreview() {
  return (
    <section id="projects-preview" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <FolderKanban size={20} className="text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium font-body bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:shadow-[0_0_25px_rgba(0,217,255,0.12)] transition-all duration-300"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
