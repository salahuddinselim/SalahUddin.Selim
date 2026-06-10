import type { Metadata } from "next"
import { MonitorSection } from "@/components/sections/monitor-section"

export const metadata: Metadata = {
  title: "Monitor",
  description:
    "System dashboard and real-time analytics for salahuddin.dev.",
  openGraph: {
    title: "Monitor | Salah Uddin Selim",
    description:
      "System dashboard and real-time analytics for salahuddin.dev.",
  },
}

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen pt-28">
      <MonitorSection />
    </main>
  )
}
