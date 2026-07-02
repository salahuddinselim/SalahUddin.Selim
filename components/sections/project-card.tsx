"use client"

import { useEffect, useId, useRef, memo } from "react"
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

export const ProjectCard = memo(function ProjectCard({
  project,
  index,
  activeProject,
  setActiveProject,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  const active = activeProject?._id === project._id

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveProject(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setActiveProject])

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden"
    } else {
      // Only restore if no other component is locking scroll
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = ""
      }
    }
    return () => {
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = ""
      }
    }
  }, [activeProject])

  useOutsideClick(ref, () => setActiveProject(null))

  return (
    <>
      {/* Backdrop and modal share one AnimatePresence so they fade/collapse
          together on close -- previously the backdrop was a bare conditional
          outside AnimatePresence and vanished instantly while the layoutId
          card kept animating shut, which read as a broken, out-of-sync close. */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-40 grid place-items-center px-4">
            <motion.div
              key={`overlay-${project._id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.button
              key={`close-${project._id}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
            >
              <X size={16} />
            </motion.button>

            <motion.div
              layoutId={`card-${project._id}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              className={cn(
                "relative z-50 w-full max-w-[560px] max-h-[85vh] overflow-y-auto",
                "rounded-2xl",
                "bg-[rgba(17,24,39,0.85)] backdrop-blur-[20px]",
                "border border-[rgba(0,217,255,0.15)]",
                "shadow-[0_0_40px_rgba(0,217,255,0.08)]",
              )}
            >
              <motion.div layoutId={`image-${project._id}-${id}`}>
                <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-bg-secondary flex items-center justify-center">
                  <span className="text-4xl font-heading font-bold text-accent/30 select-none">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </motion.div>

              <div className="p-5 space-y-4">
                <div>
                  <motion.h3
                    layoutId={`title-${project._id}-${id}`}
                    className="text-xl font-heading font-semibold text-foreground"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${project._id}-${id}`}
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
                  <p className="text-base text-muted font-body leading-relaxed max-w-prose">
                    {project.longDescription}
                  </p>

                  <div>
                    <h4 className="text-xs font-heading font-semibold text-foreground/60 uppercase tracking-wider mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies ?? []).map((tech) => (
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
                        className="btn-secondary text-xs px-3 py-1.5"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <GitBranch size={14} />
                        GitHub
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs px-3 py-1.5"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ExternalLink size={14} />
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
        layoutId={`card-${project._id}-${id}`}
        onClick={() => setActiveProject(active ? null : project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setActiveProject(active ? null : project)
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={active}
        aria-label={`View details for ${project.title}`}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
        )}
      >
        <motion.div layoutId={`image-${project._id}-${id}`} className="relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-bg-secondary overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <span className="text-3xl font-heading font-bold text-accent/20 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        </motion.div>

        <div className="p-4 space-y-3">
          <motion.h3
            layoutId={`title-${project._id}-${id}`}
            className="text-base font-heading font-semibold text-foreground"
          >
            {project.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${project._id}-${id}`}
            className="text-sm text-muted font-body line-clamp-2 leading-relaxed"
          >
            {project.description}
          </motion.p>

          <div className="flex flex-wrap gap-1.5">
            {(project.technologies ?? []).slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent/8 text-accent/70 border border-accent/8"
              >
                {tech}
              </span>
            ))}
            {(project.technologies?.length ?? 0) > 4 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-muted">
                +{(project.technologies?.length ?? 0) - 4}
              </span>
            )}
          </div>

          <motion.button
            layoutId={`button-${project._id}-${id}`}
            className="btn-secondary text-xs px-3 py-1.5"
          >
            View Project
          </motion.button>
        </div>
      </motion.div>
    </>
  )
})
