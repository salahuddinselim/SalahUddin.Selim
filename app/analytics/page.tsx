import type { Metadata } from "next"
import nextDynamic from "next/dynamic"

const MonitorSection = nextDynamic(
  () => import("@/components/sections/monitor-section").then((mod) => mod.MonitorSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

export const metadata: Metadata = {
  title: "Monitor",
  description:
    "Public system dashboard — real-time analytics, infrastructure health, and content metrics for salahuddin.dev.",
  openGraph: {
    title: "Monitor | Salah Uddin Selim",
    description:
      "Public system dashboard — real-time analytics, infrastructure health, and content metrics for salahuddin.dev.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/analytics" },
}
export const dynamic = "force-static"

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen pt-28">
      <MonitorSection />
    </main>
  )
}
