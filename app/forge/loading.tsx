export default function ForgeLoading() {
  return (
    <main className="min-h-screen pt-28">
      <div className="relative min-h-screen pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-4 w-24 bg-white/5 rounded-full animate-pulse mx-auto mb-3" />
            <div className="h-12 w-72 bg-white/5 rounded-xl animate-pulse mx-auto" />
          </div>
          <div className="h-[440px] sm:h-[600px] md:h-[680px] bg-white/[0.02] rounded-2xl border border-white/[0.06] animate-pulse mb-12" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-white/[0.02] rounded-2xl border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
