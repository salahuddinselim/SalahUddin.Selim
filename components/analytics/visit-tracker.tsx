"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function VisitTracker() {
  const pathname = usePathname()
  const tracked = useRef<string>("")

  useEffect(() => {
    if (tracked.current === pathname) return
    tracked.current = pathname
    const controller = new AbortController()
    fetch("/api/visit", {
      method: "POST",
      signal: controller.signal,
      keepalive: true,
    })
      .then((r) => {
        if (!r.ok) console.warn("visit track failed:", r.status)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [pathname])

  return null
}
