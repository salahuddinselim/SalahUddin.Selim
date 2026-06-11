"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface TechBadgeItem {
  name: string
  logoSvg: ReactNode
  brandColor: string
  textColor?: string
}

interface TechBadgeProps extends TechBadgeItem {
  className?: string
}

export function TechBadge({
  name,
  logoSvg,
  brandColor,
  className = "",
  textColor,
}: TechBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm select-none bg-slate-950/60",
        className,
      )}
      style={{
        background: "var(--glass-badge-bg)",
        borderColor: `${brandColor}66`,
        backdropFilter: "blur(var(--glass-badge-blur))",
        WebkitBackdropFilter: "blur(var(--glass-badge-blur))",
        boxShadow: `0 0 14px ${brandColor}26, inset 0 0 0 1px rgba(255,255,255,0.03)`,
      }}
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5" style={{ color: brandColor }}>
        {logoSvg}
      </span>
      <span
        className="text-sm font-medium tracking-tight whitespace-nowrap"
        style={{ color: textColor ?? brandColor }}
      >
        {name}
      </span>
    </div>
  )
}

interface TechBadgeRowProps {
  items: TechBadgeItem[]
  className?: string
  badgeClassName?: string
}

export function TechBadgeRow({ items, className, badgeClassName }: TechBadgeRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item) => (
        <TechBadge
          key={item.name}
          name={item.name}
          logoSvg={item.logoSvg}
          brandColor={item.brandColor}
          textColor={item.textColor}
          className={badgeClassName}
        />
      ))}
    </div>
  )
}
