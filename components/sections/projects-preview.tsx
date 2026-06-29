"use client"

import { useState, useMemo, useCallback, startTransition } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { FolderKanban, ArrowUpRight } from "lucide-react"
import type { SanityProject } from "@/types"

const ProjectCard = dynamic(
  () => import("@/components/sections/project-card").then((mod) => mod.ProjectCard),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] min-h-[280px] animate-pulse" />
    ),
  },
)

export function ProjectsPreview({ projects: featuredProjects }: { projects: SanityProject[] }) {
  const featured = useMemo(
    () => featuredProjects.filter((p) => p.featured).slice(0, 3),
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
        <motion.div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <FolderKanban size={20} className="text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {featured.map((project, i) => (
            <ProjectCard
              key={project._id ?? project.title}
              project={project}
              index={i}
              activeProject={activeProject}
              setActiveProject={handleSelectProject}
            />
          ))}
        </div>

        <motion.div transition={{ duration: 0.4, delay: 0.2 }} className="flex justify-center">
          <a href="/projects" className="btn-secondary">
            View All Projects
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
