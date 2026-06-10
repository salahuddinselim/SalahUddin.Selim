"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FolderKanban, ArrowUpRight } from "lucide-react"
import { ProjectCard } from "@/components/sections/project-card"
import { getProjects } from "@/lib/sanity/fetch"
import type { SanityProject } from "@/types"

export function ProjectsPreview() {
  const [featured, setFeatured] = useState<SanityProject[]>([])
  const [activeProject, setActiveProject] = useState<SanityProject | null>(null)

  useEffect(() => {
    getProjects().then((all) => setFeatured(all.filter((p) => p.featured).slice(0, 3)))
  }, [])

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
            <ProjectCard key={project._id ?? project.title} project={project} index={i} activeProject={activeProject} setActiveProject={setActiveProject} />
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
