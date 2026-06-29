export default function CredentialsLoading() {
  return (
    <main className="min-h-screen pt-28">
      <div className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1000px] mx-auto">
        <div className="mb-8">
          <div className="h-4 w-24 bg-white/5 rounded-full animate-pulse mb-3" />
          <div className="h-12 w-72 bg-white/5 rounded-xl animate-pulse" />
        </div>
        <div className="space-y-3">
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
