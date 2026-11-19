"use client"

import { useState, useMemo, useCallback, startTransition } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { SanityProject } from "@/types"

const ProjectCard = dynamic(
  () => import("@/components/sections/project-card").then((mod) => mod.ProjectCard),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.05] min-h-[280px] animate-pulse" />
    ),
  },
)

export function ProjectsPreview({ projects: featuredProjects }: { projects: SanityProject[] }) {
  const featured = useMemo(
    () => featuredProjects.filter((p) => p.featured).slice(0, 4),
    [featuredProjects],
  )
  const [activeProject, setActiveProject] = useState<SanityProject | null>(null)

  const handleSelectProject = useCallback((project: SanityProject | null) => {
    startTransition(() => setActiveProject(project))
  }, [])

  return (
    <motion.section
      id="projects-preview"
      className="relative w-full py-24 sm:py-32 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div className="mb-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/60 mb-3">
            Featured Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {featured.map((project, i) => (
            <ProjectCard
              key={project._id ?? project.title}
              project={project}
              activeProject={activeProject}
              setActiveProject={handleSelectProject}
              priority={i < 3}
            />
          ))}
        </div>

        <motion.div transition={{ duration: 0.4, delay: 0.2 }} className="flex justify-center">
          <Link href="/projects" className="btn-secondary">
            View All Projects
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
