export default function AnalyticsLoading() {
  return (
    <main className="min-h-screen pt-28">
      <div className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1340px] mx-auto">
        <div className="mb-10">
          <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse mb-3" />
          <div className="h-12 w-64 bg-white/5 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 h-44 bg-white/[0.02] rounded-2xl border border-white/[0.06] animate-pulse" />
          <div className="flex flex-col gap-4">
            <div className="h-24 bg-white/[0.02] rounded-2xl border border-white/[0.06] animate-pulse" />
            <div className="h-24 bg-white/[0.02] rounded-2xl border border-white/[0.06] animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
