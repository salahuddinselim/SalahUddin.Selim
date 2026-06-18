import { Award } from "lucide-react"
import { awardBadge } from "@/data"

export function AwardBadge() {
  return (
    <section className="relative w-full px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-amber-400/5 border border-amber-400/15 backdrop-blur-[12px] shadow-[0_0_25px_rgba(251,191,36,0.08)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/10">
              <Award size={16} className="text-amber-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-amber-300 leading-tight">
                {awardBadge.title}
              </p>
              <p className="text-[11px] text-amber-400/60 font-mono leading-tight">
                {awardBadge.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
