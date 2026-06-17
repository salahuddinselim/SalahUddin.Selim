"use client"

import dynamic from "next/dynamic"

const ClientAnalytics = dynamic(
  () => import("@/components/analytics/AnalyticsLoader"),
  { ssr: false }
)

export function AnalyticsWrapper() {
  return <ClientAnalytics />
}
