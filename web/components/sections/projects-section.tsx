"use client"

import { motion } from "framer-motion"
import { FolderKanban } from "lucide-react"
import { ProjectCard } from "@/components/sections/project-card"
import type { Project } from "@/types"

const projects: Project[] = [
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
    githubUrl: "https://github.com",
    featured: true,
    year: 2023,
  },
  {
    title: "Customer Support AI Chatbot",
    slug: "customer-support-chatbot",
    description: "Intelligent chatbot reducing support ticket volume by 60%.",
    longDescription:
      "Developed an AI-powered chatbot using LangChain and OpenAI that handles customer inquiries across multiple channels. Features include context-aware responses, sentiment analysis, ticket escalation, and integration with existing CRM systems. Reduced average response time from 4 hours to under 30 seconds.",
    technologies: ["Python", "OpenAI", "LangChain", "Node.js", "MongoDB", "Docker"],
    category: "AI",
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    year: 2024,
  },
  {
    title: "Real-Time Collaboration Platform",
    slug: "real-time-collab",
    description: "Document collaboration platform with live editing and version control.",
    longDescription:
      "Built a Google Docs-inspired collaboration platform featuring operational transforms for conflict-free editing, WebSocket-based real-time sync, CRDT data structures for offline support, and granular permission management. Supports 1000+ concurrent editors per document with sub-100ms latency.",
    technologies: ["React", "Node.js", "TypeScript", "Redis", "PostgreSQL", "WebSocket"],
    category: "Full Stack",
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    year: 2023,
  },
  {
    title: "Cloud Infrastructure Manager",
    slug: "cloud-infra-manager",
    description: "Multi-cloud infrastructure management and monitoring platform.",
    longDescription:
      "Designed a cloud-agnostic infrastructure management platform supporting AWS, GCP, and Azure. Features include auto-scaling, cost optimization, resource monitoring, and disaster recovery automation. Saved clients an average of 40% on cloud costs through intelligent resource right-sizing.",
    technologies: ["Go", "Docker", "Kubernetes", "TypeScript", "React", "Python"],
    category: "DevOps",
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    featured: false,
    year: 2023,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <FolderKanban size={20} className="text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
