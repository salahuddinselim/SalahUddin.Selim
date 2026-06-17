"use client"

import { useEffect, useState, lazy, Suspense } from "react"

const AnalyticsLoader = lazy(
  () => import("@/components/analytics/AnalyticsLoader")
)

export function AnalyticsWrapper() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setReady(true), { timeout: 2000 })
    } else {
      setTimeout(() => setReady(true), 1500)
    }
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <AnalyticsLoader />
    </Suspense>
  )
}
