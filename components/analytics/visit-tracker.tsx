"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function VisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/visit", {
      method: "POST",
      signal: controller.signal,
      keepalive: true,
    }).catch(() => {})
    return () => controller.abort()
  }, [pathname])

  return null
}
