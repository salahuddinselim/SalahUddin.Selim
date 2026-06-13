import { Monitor, BarChart3, Database, Zap } from "lucide-react"

export default function AnalyticsLoading() {
  return (
    <main className="min-h-screen pt-28">
      <section className="relative px-4 sm:px-6 md:px-8 pb-24 max-w-[1340px] mx-auto">
        <div className="mb-10 animate-pulse">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="h-3 w-24 bg-white/5 rounded" />
          </div>
          <div className="h-12 w-72 bg-white/5 rounded-lg" />
          <div className="mt-2 h-4 w-48 bg-white/5 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
            <div className="h-3 w-24 bg-white/5 rounded mb-4" />
            <div className="h-12 w-24 bg-white/5 rounded mb-2" />
            <div className="h-1.5 w-full bg-white/5 rounded-full" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 animate-pulse">
              <div className="h-3 w-20 bg-white/5 rounded mb-3" />
              <div className="h-8 w-16 bg-white/5 rounded" />
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 animate-pulse">
              <div className="h-3 w-24 bg-white/5 rounded mb-3" />
              <div className="h-8 w-16 bg-white/5 rounded" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-4 animate-pulse">
          <div className="h-3 w-16 bg-white/5 rounded mb-2" />
          <div className="h-8 w-32 bg-white/5 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
            <div className="h-3 w-24 bg-white/5 rounded mb-5" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                  <div className="h-3 w-16 bg-white/5 rounded mb-2" />
                  <div className="h-5 w-20 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
            <div className="h-3 w-24 bg-white/5 rounded mb-5" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-white/5" />
                  <div className="h-6 w-12 bg-white/5 rounded mx-auto mb-1" />
                  <div className="h-3 w-16 bg-white/5 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
