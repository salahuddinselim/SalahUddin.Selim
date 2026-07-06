"use client"

import { useEffect, useId, useRef, memo } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { cn } from "@/lib/utils"
import type { SanityProject as Project } from "@/types"

const modalTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 35,
}

interface ProjectCardProps {
  project: Project
  activeProject: Project | null
  setActiveProject: (project: Project | null) => void
  variant?: "grid" | "list"
}

function ProjectThumb({
  project,
  layoutId,
  className,
  fallbackTextClassName,
  sizes,
  priority,
  transition,
}: {
  project: Project
  layoutId: string
  className?: string
  fallbackTextClassName?: string
  sizes: string
  priority?: boolean
  transition?: import("framer-motion").Transition
}) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={transition}
      className={cn(
        "relative shrink-0 overflow-hidden bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-bg-secondary flex items-center justify-center",
        className,
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      ) : (
        <span
          className={cn("font-heading font-bold text-accent/30 select-none", fallbackTextClassName)}
        >
          {project.title.charAt(0)}
        </span>
      )}
    </motion.div>
  )
}

export const ProjectCard = memo(function ProjectCard({
  project,
  activeProject,
  setActiveProject,
  variant = "grid",
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
    document.body.style.overflow = activeProject ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeProject])

  useOutsideClick(ref, () => setActiveProject(null))

  return (
    <>
      {/* Backdrop and modal share one AnimatePresence so they fade/collapse
          together on close. No custom transition duration on the backdrop
          and no delay on the content fade -- both would desync from the
          card's own layoutId animation and read as a jarring, out-of-sync
          close even though each element individually animates smoothly. */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[60] grid place-items-center px-4">
            <motion.div
              key={`overlay-${project._id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60"
            />

            {/* No backdrop-blur here -- this box is the layoutId shared
                element that resizes between the card and the full modal.
                Animating backdrop-filter while width/height change forces
                a re-blur every frame, a known real-device jank source. */}
            <motion.div
              layoutId={`card-${project._id}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              transition={modalTransition}
              className="relative z-10 w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[rgba(15,21,35,0.98)] border border-[rgba(0,217,255,0.15)] shadow-[0_0_40px_rgba(0,217,255,0.08)] sm:rounded-3xl overflow-hidden"
            >
              {/* Always visible, at every breakpoint -- outside-click and
                  Escape both close the modal too, but neither is discoverable
                  on first use, so a visible exit is required regardless.
                  Anchored to the modal's own corner (not the viewport) so it
                  reads as part of the modal on desktop, where the modal
                  doesn't fill the screen. z-[70], not z-50, because the
                  site's fixed navbar (and its mobile menu button) is also
                  z-50, and a viewport-anchored button at this position
                  previously landed under the navbar's hamburger button on
                  small viewports. */}
              <motion.button
                key={`close-${project._id}-${id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-3 right-3 z-[70] items-center justify-center bg-white/15 rounded-full h-11 w-11 text-white/80 hover:text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
              >
                <X size={18} />
              </motion.button>

              <ProjectThumb
                project={project}
                layoutId={`image-${project._id}-${id}`}
                transition={modalTransition}
                className="w-full h-80 shrink-0 sm:rounded-t-3xl"
                fallbackTextClassName="text-5xl"
                sizes="500px"
                priority
              />

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${project._id}-${id}`}
                      transition={modalTransition}
                      className="font-heading font-semibold text-foreground text-base"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${project._id}-${id}`}
                      transition={modalTransition}
                      className="text-accent font-body text-sm mt-1"
                    >
                      {project.description}
                    </motion.p>
                    <p className="text-xs text-muted font-mono mt-1">
                      {project.year} &middot; {project.category}
                    </p>
                  </div>

                  {/* Both links, not just one -- picking a single "best"
                      link (previously liveUrl ?? githubUrl) silently made
                      whichever one lost the pick unreachable from the
                      modal for any project that has both set. */}
                  {(project.liveUrl || project.githubUrl) && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-2 shrink-0"
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs px-4 py-2 whitespace-nowrap text-center"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs px-4 py-2 whitespace-nowrap text-center"
                        >
                          GitHub
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "text-muted text-sm h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto",
                      "[mask:linear-gradient(to_bottom,white,white,transparent)]",
                      "[scrollbar-width:none] [-ms-overflow-style:none]",
                      "[-webkit-overflow-scrolling:touch]",
                    )}
                  >
                    <p className="leading-relaxed">{project.longDescription}</p>
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {variant === "list" ? (
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
          animate={{ opacity: 1 }}
          transition={modalTransition}
          className="p-4 flex flex-col hover:bg-white/[0.04] rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        >
          <div className="flex gap-4 flex-col w-full">
            <ProjectThumb
              project={project}
              layoutId={`image-${project._id}-${id}`}
              transition={modalTransition}
              className="h-60 w-full rounded-lg"
              fallbackTextClassName="text-4xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="flex justify-center items-center flex-col">
              <motion.h3
                layoutId={`title-${project._id}-${id}`}
                transition={modalTransition}
                className="font-heading font-semibold text-foreground text-center text-base"
              >
                {project.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${project._id}-${id}`}
                transition={modalTransition}
                className="text-muted font-body text-center text-sm"
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ) : (
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
          transition={modalTransition}
          whileHover={{ y: -4 }}
          className={cn(
            "group cursor-pointer rounded-2xl overflow-hidden",
            // Solid background, not backdrop-blur -- this box is the
            // layoutId shared element that resizes into the modal, and
            // animating backdrop-filter while it resizes forces a re-blur
            // every frame (see project modal's own comment / CLAUDE.md).
            "bg-[rgba(17,24,39,0.92)]",
            "border border-[rgba(255,255,255,0.06)]",
            "hover:border-accent/20",
            "transition-all duration-300",
            "hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
          )}
        >
          <ProjectThumb
            project={project}
            layoutId={`image-${project._id}-${id}`}
            transition={modalTransition}
            className="aspect-video w-full transition-transform duration-500 group-hover:scale-105"
            fallbackTextClassName="text-3xl"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <div className="p-4 space-y-3">
            <motion.h3
              layoutId={`title-${project._id}-${id}`}
              transition={modalTransition}
              className="text-base font-heading font-semibold text-foreground"
            >
              {project.title}
            </motion.h3>
            <motion.p
              layoutId={`description-${project._id}-${id}`}
              transition={modalTransition}
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
              transition={modalTransition}
              className="btn-secondary text-xs px-3 py-1.5"
            >
              View Project
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  )
})
