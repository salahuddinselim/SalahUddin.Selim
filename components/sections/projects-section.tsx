"use client"

import { useId, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { ProjectCard } from "@/components/sections/project-card"
import { cn } from "@/lib/utils"
import type { SanityProject } from "@/types"

export function ProjectsSection({ projects: initialProjects }: { projects: SanityProject[] }) {
  const [projects] = useState(initialProjects)
  const [activeProject, setActiveProject] = useState<SanityProject | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [query, setQuery] = useState("")
  const searchId = useId()

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const project of projects) {
      const category = project.category || "Other"
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }
    return [
      { name: "All", count: projects.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })),
    ]
  }, [projects])

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      if (activeCategory !== "All" && (project.category || "Other") !== activeCategory) {
        return false
      }
      if (!q) return true
      return [
        project.title,
        project.description,
        project.category,
        ...(project.technologies ?? []),
      ].some((value) => (value ?? "").toLowerCase().includes(q))
    })
  }, [projects, activeCategory, query])

  return (
    <section id="projects" className="relative min-h-screen bg-bg pb-16">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.25em] mb-4">
              THE PROJECT COLLECTION
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-foreground">
              Built with curiosity.
              <span className="sr-only"> — Software Projects &amp; Engineering Systems</span>
            </h1>
            <p className="mt-4 max-w-xl text-secondary text-sm sm:text-base leading-relaxed">
              From useful tools to playful experiments. Explore the apps, systems, and ideas
              I&apos;ve brought to life.
            </p>
          </div>
          <a
            href="https://github.com/salahuddinselim"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            <FaGithub size={16} aria-hidden />
            Explore GitHub
          </a>
        </motion.div>

        <div className="rounded-2xl border border-border bg-bg-card p-4 sm:p-5 mb-7">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {categories.map(({ name, count }) => (
              <button
                key={name}
                type="button"
                aria-pressed={activeCategory === name}
                onClick={() => setActiveCategory(name)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                  activeCategory === name
                    ? "bg-cyan-400 text-black"
                    : "bg-bg text-secondary hover:bg-cyan-400/10 hover:text-foreground",
                )}
              >
                {name}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] leading-none",
                    activeCategory === name ? "bg-black/10" : "bg-bg-card",
                  )}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative mt-4 border-t border-border pt-4">
            <label htmlFor={searchId} className="sr-only">
              Search projects by name or technology
            </label>
            <div className="relative">
              <Search
                size={16}
                aria-hidden
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, technologies, or ideas…"
                className="w-full rounded-xl bg-bg border border-border py-2.5 pl-10 pr-12 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              />
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mb-4 text-xs text-muted">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                variant="reference"
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-sm text-muted">
            No projects match that category or search.
          </div>
        )}
      </div>
    </section>
  )
}
