import { FolderKanban } from "lucide-react"

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen pt-28">
      <section className="relative w-full py-24 sm:py-32 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-8 w-32 bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden animate-pulse"
              >
                <div className="aspect-[16/9] bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-white/5 rounded" />
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-2/3 bg-white/5 rounded" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 w-16 bg-white/5 rounded-full" />
                    <div className="h-6 w-20 bg-white/5 rounded-full" />
                    <div className="h-6 w-14 bg-white/5 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
