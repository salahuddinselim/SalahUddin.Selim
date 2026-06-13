import { Image } from "lucide-react"

export default function GalleryLoading() {
  return (
    <main className="min-h-screen pt-28">
      <section className="relative w-full py-24 sm:py-32 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-10 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-white/5" />
            <div className="h-8 w-32 bg-white/5 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden animate-pulse"
                style={{ aspectRatio: i % 5 === 0 ? "3/4" : i % 3 === 0 ? "16/9" : "1/1" }}
              >
                <div className="w-full h-full bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
