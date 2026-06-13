"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FolderKanban } from "lucide-react"
import { ProjectCard } from "@/components/sections/project-card"
import type { SanityProject } from "@/types"

export function ProjectsSection({ projects: initialProjects }: { projects: SanityProject[] }) {
  const [projects] = useState(initialProjects)
  const [activeProject, setActiveProject] = useState<SanityProject | null>(null)

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
          <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
            Projects
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id ?? project.title}
              project={project}
              index={i}
              activeProject={activeProject}
              setActiveProject={setActiveProject}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
