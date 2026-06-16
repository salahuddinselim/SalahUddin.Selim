"use client"

import dynamic from "next/dynamic"

const SpaceBackground = dynamic(
  () => import("./space-background").then(m => m.SpaceBackground),
  { ssr: false }
)

export function SpaceBackgroundWrapper() {
  return <SpaceBackground />
}
