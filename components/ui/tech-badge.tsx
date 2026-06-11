"use client"

import type { ReactNode } from "react"

interface TechBadgeProps {
  name: string
  brandColor: string
  icon: ReactNode
  className?: string
  textColor?: string
}

export function TechBadge({
  name,
  brandColor,
  icon,
  className = "",
  textColor,
}: TechBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm select-none ${className}`}
      style={{
        background: "rgba(10, 15, 30, 0.6)",
        borderColor: `${brandColor}55`,
        boxShadow: `0 0 12px ${brandColor}15, inset 0 0 20px ${brandColor}08`,
      }}
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0" style={{ color: brandColor }}>
        {icon}
      </span>
      <span
        className="text-xs font-medium tracking-wide whitespace-nowrap"
        style={{ color: textColor ?? brandColor }}
      >
        {name}
      </span>
    </div>
  )
}
