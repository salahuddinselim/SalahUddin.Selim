"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const SpaceBackground = dynamic(
  () => import("./space-background").then((m) => m.SpaceBackground),
  { ssr: false },
)

export function SpaceBackgroundWrapper() {
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px), (pointer: coarse)")
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isLowPower = (navigator.hardwareConcurrency || 8) <= 4
    const update = () => setShowBackground(!media.matches && !prefersReducedMotion.matches && !isLowPower)
    update()
    media.addEventListener("change", update)
    prefersReducedMotion.addEventListener("change", update)
    return () => {
      media.removeEventListener("change", update)
      prefersReducedMotion.removeEventListener("change", update)
    }
  }, [])

  return showBackground ? <SpaceBackground /> : null
}
