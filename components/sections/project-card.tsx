"use client"

import { useEffect, useId, useRef, memo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, type Transition } from "framer-motion"
import { X, GitBranch, ArrowUpRight } from "lucide-react"
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
  variant?: "grid" | "list" | "reference"
  /** Pass for above-the-fold cards (e.g. the first row) so their image
   * loads eagerly instead of lazily -- Next.js flags this as the LCP
   * element otherwise, since the default `loading="lazy"` defers it. */
  priority?: boolean
}

// Derives "owner/repo" from a GitHub URL for the no-screenshot fallback's
// terminal chrome. Falls back to null (renders a generic label) rather than
// guessing at a malformed URL.
export function repoPathFrom(githubUrl?: string): string | null {
  if (!githubUrl) return null
  try {
    const { pathname } = new URL(githubUrl)
    const path = pathname.replace(/^\/+|\/+$/g, "")
    return path || null
  } catch {
    return null
  }
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
  transition?: Transition
}) {
  const repoPath = repoPathFrom(project.githubUrl)

  return (
    <motion.div
      layoutId={layoutId}
      transition={transition}
      className={cn("relative shrink-0 overflow-hidden bg-bg-secondary", className)}
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
        // No screenshot on file for this project -- rather than fake a
        // product screenshot that doesn't exist, render it honestly as a
        // repo card: real GitHub path and tech stack in the site's own
        // terminal/monospace voice. This is a deliberate design choice for
        // GitHub-only projects, not an apology for a missing asset.
        <div className="absolute inset-0 flex flex-col font-mono">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-black/20 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
            <span className="ml-2 truncate text-[10px] text-muted/50">
              {repoPath ?? project.category}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden px-4">
            <p className={cn("truncate text-accent/70", fallbackTextClassName ?? "text-xs")}>
              $ git clone{" "}
              {repoPath
                ? repoPath.split("/").pop()
                : project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            </p>
            {project.technologies && project.technologies.length > 0 && (
              <p className="truncate text-[10px] text-muted/50">
                {project.technologies.slice(0, 4).join(" · ")}
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export const ProjectCard = memo(function ProjectCard({
  project,
  activeProject,
  setActiveProject,
  variant = "grid",
  priority = false,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  const [showTech, setShowTech] = useState(false)
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

  if (variant === "reference") {
    const repoPath = repoPathFrom(project.githubUrl)

    return (
      <article className="bg-bg-card border border-border hover:border-cyan-500/60 rounded-2xl overflow-hidden transition-colors duration-300 group relative flex flex-col">
        <div className="h-44 shrink-0 relative overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-bg-secondary">
              <span className="font-heading text-lg font-bold text-foreground/70">
                {project.category}
              </span>
            </div>
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10"
          />
          <span className="absolute bottom-3 left-4 z-20 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-md">
            {project.category}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h2 className="font-heading text-lg font-bold text-foreground mb-2">{project.title}</h2>
          <p className="text-sm text-secondary mb-4 leading-relaxed">{project.description}</p>

          <div
            role="group"
            aria-label={`Details view for ${project.title}`}
            className="flex gap-2 mb-3"
          >
            <button
              type="button"
              aria-pressed={!showTech}
              onClick={() => setShowTech(false)}
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                !showTech
                  ? "bg-accent text-black"
                  : "bg-bg-card text-secondary hover:text-foreground",
              )}
            >
              SCOPE
            </button>
            <button
              type="button"
              aria-pressed={showTech}
              onClick={() => setShowTech(true)}
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                showTech
                  ? "bg-accent text-black"
                  : "bg-bg-card text-secondary hover:text-foreground",
              )}
            >
              TECH
            </button>
          </div>

          <div className="min-h-[60px] flex-1">
            {showTech ? (
              <div className="flex flex-wrap gap-2">
                {(project.technologies ?? []).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-mono text-secondary"
                  >
                    {tech}
                  </span>
                ))}
                {(project.technologies?.length ?? 0) === 0 && (
                  <span className="text-xs text-muted">No technologies listed.</span>
                )}
              </div>
            ) : (
              <p className="text-sm text-secondary leading-relaxed">
                {project.longDescription ?? project.description}
              </p>
            )}
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex gap-3 mt-4 pt-4 border-t border-border">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source for ${project.title}${repoPath ? ` (${repoPath})` : ""} on GitHub`}
                  className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-foreground transition-colors duration-200"
                >
                  <GitBranch size={13} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors duration-200"
                >
                  Live
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    )
  }

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
              className="relative z-10 w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[rgba(10,10,10,0.98)] border border-[rgba(255,255,255,0.1)] shadow-[0_0_40px_rgba(0,0,0,0.6)] sm:rounded-3xl overflow-hidden"
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
                fallbackTextClassName="text-sm"
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
          className="p-4 flex flex-col rounded-xl cursor-pointer border border-transparent hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        >
          <div className="flex gap-4 flex-col w-full">
            <ProjectThumb
              project={project}
              layoutId={`image-${project._id}-${id}`}
              transition={modalTransition}
              className="h-60 w-full rounded-lg"
              fallbackTextClassName="text-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
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
          animate={{ opacity: 1 }}
          transition={modalTransition}
          className={cn(
            "cursor-pointer rounded-2xl overflow-hidden flex flex-col",
            // Solid background, not backdrop-blur -- this box is the
            // layoutId shared element that resizes into the modal, and
            // animating backdrop-filter while it resizes forces a re-blur
            // every frame (see project modal's own comment / CLAUDE.md).
            "bg-[rgba(255,255,255,0.05)]",
            "border border-[rgba(255,255,255,0.1)]",
            "hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(0,217,255,0.3)]",
            "transition-[border-color,background-color,box-shadow] duration-300",
            "hover:shadow-[0_0_30px_rgba(0,217,255,0.08)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
          )}
        >
          {/* Colored accent bar at top — reference pattern */}
          <div className="h-0.5 w-full bg-gradient-to-r from-[rgba(0,217,255,0.8)] via-[rgba(0,217,255,0.4)] to-transparent" />

          <div className="p-5 space-y-3 flex flex-col flex-1">
            {project.category && (
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(255,255,255,0.35)]">
                {project.category}
              </p>
            )}
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
              className="text-sm text-[rgba(255,255,255,0.65)] font-body line-clamp-3 leading-relaxed flex-1"
            >
              {project.description}
            </motion.p>

            <div className="flex flex-wrap gap-1.5">
              {(project.technologies ?? []).slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[rgba(255,255,255,0.65)] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)]"
                >
                  {tech}
                </span>
              ))}
              {(project.technologies?.length ?? 0) > 4 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[rgba(255,255,255,0.35)]">
                  +{(project.technologies?.length ?? 0) - 4}
                </span>
              )}
            </div>

            {/* Reference-style text links */}
            <div className="flex items-center gap-4 pt-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-sm text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200"
                >
                  <GitBranch size={13} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors duration-200"
                >
                  Live app
                  <ArrowUpRight size={13} />
                </a>
              )}
              {!project.githubUrl && !project.liveUrl && (
                <span className="text-sm text-[rgba(255,255,255,0.3)] font-mono">
                  View Details →
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
})
