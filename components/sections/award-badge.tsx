import { Award } from "lucide-react"
import { awardBadge } from "@/data"

export function AwardBadge() {
  return (
    <div
      role="group"
      aria-label={`Award: ${awardBadge.title} — ${awardBadge.description}`}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-accent/[0.06] border border-accent/15 backdrop-blur-[12px] shadow-[0_0_25px_rgba(0,217,255,0.08)]"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
        <Award size={16} className="text-accent" aria-hidden="true" />
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-accent leading-tight">{awardBadge.title}</p>
        <p className="text-[11px] text-accent/60 font-mono leading-tight">
          {awardBadge.description}
        </p>
      </div>
    </div>
  )
}
