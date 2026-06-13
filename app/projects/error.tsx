"use client"

import { FolderKanban, AlertCircle, RefreshCw } from "lucide-react"

export default function ProjectsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen pt-28">
      <section className="relative w-full py-24 sm:py-32 px-4">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-xl bg-error/10 flex items-center justify-center mb-6">
            <AlertCircle size={28} className="text-error" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Failed to load projects
          </h2>
          <p className="text-muted font-body mb-6 max-w-md">
            Something went wrong while fetching my projects. Please try again.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium font-body bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all duration-300"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </section>
    </main>
  )
}
