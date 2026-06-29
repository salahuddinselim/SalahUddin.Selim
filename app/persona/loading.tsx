export default function PersonaLoading() {
  return (
    <main className="min-h-screen pt-28">
      <div className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="h-4 w-24 bg-white/5 rounded-full animate-pulse mx-auto mb-3" />
          <div className="h-12 w-48 bg-white/5 rounded-xl animate-pulse mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="h-48 bg-white/[0.03] rounded-2xl border border-white/[0.06] animate-pulse" />
          <div className="h-48 bg-white/[0.03] rounded-2xl border border-white/[0.06] animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-white/[0.03] rounded-xl border border-white/[0.06] animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
