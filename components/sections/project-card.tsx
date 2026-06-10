"use client"

import { useEffect, useId, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { GitBranch, ExternalLink, X } from "lucide-react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { cn } from "@/lib/utils"
import type { SanityProject as Project } from "@/types"

interface ProjectCardProps {
  project: Project
  index: number
  activeProject: Project | null
  setActiveProject: (project: Project | null) => void
}

export function ProjectCard({ project, index, activeProject, setActiveProject }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  const active = activeProject?.title === project.title

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveProject(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setActiveProject])

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [activeProject])

  useOutsideClick(ref, () => setActiveProject(null))

  return (
    <>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-40"
        />
      )}

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-50 px-4">
            <motion.button
              key={`close-${project.title}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="fixed top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              onClick={() => setActiveProject(null)}
            >
              <X size={16} />
            </motion.button>

            <motion.div
              layoutId={`card-${project.title}-${id}`}
              ref={ref}
              className={cn(
                "w-full max-w-[560px] max-h-[85vh] overflow-y-auto",
                "rounded-2xl",
                "bg-[rgba(17,24,39,0.85)] backdrop-blur-[20px]",
                "border border-[rgba(0,217,255,0.15)]",
                "shadow-[0_0_40px_rgba(0,217,255,0.08)]",
              )}
            >
              <motion.div layoutId={`image-${project.title}-${id}`}>
                <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-bg-secondary flex items-center justify-center">
                  <span className="text-4xl font-heading font-bold text-accent/30 select-none">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </motion.div>

              <div className="p-5 space-y-4">
                <div>
                  <motion.h3
                    layoutId={`title-${project.title}-${id}`}
                    className="text-xl font-heading font-semibold text-foreground"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${project.title}-${id}`}
                    className="text-sm text-accent font-body mt-1"
                  >
                    {project.description}
                  </motion.p>
                  <p className="text-xs text-muted font-mono mt-1">
                    {project.year} &middot; {project.category}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted font-body leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div>
                    <h4 className="text-xs font-heading font-semibold text-foreground/60 uppercase tracking-wider mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body bg-white/5 text-muted hover:text-foreground hover:bg-white/10 border border-white/10 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <GitBranch size={16} />
                        GitHub
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${project.title}-${id}`}
        onClick={() => setActiveProject(active ? null : project)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          delay: index * 0.08,
          duration: 0.5,
          ease: "easeOut",
        }}
        whileHover={{ y: -4 }}
        className={cn(
          "group cursor-pointer rounded-2xl overflow-hidden",
          "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px]",
          "border border-[rgba(255,255,255,0.06)]",
          "hover:border-accent/20",
          "transition-all duration-300",
          "hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]",
        )}
      >
          <motion.div
            layoutId={`image-${project.title}-${id}`}
            className="relative overflow-hidden"
          >
            <div className="aspect-video bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-bg-secondary overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <span className="text-3xl font-heading font-bold text-accent/20 select-none">
                {project.title.charAt(0)}
              </span>
            </div>
          </motion.div>

        <div className="p-4 space-y-3">
          <motion.h3
            layoutId={`title-${project.title}-${id}`}
            className="text-base font-heading font-semibold text-foreground"
          >
            {project.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${project.title}-${id}`}
            className="text-sm text-muted font-body line-clamp-2 leading-relaxed"
          >
            {project.description}
          </motion.p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent/8 text-accent/70 border border-accent/8"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-muted">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <motion.button
            layoutId={`button-${project.title}-${id}`}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium font-body bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-colors"
          >
            View Project
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
