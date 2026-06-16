import type { Metadata } from "next"
import { ForgeSection } from "@/components/sections/forge-section"

export const metadata: Metadata = {
  title: "Forge",
  description:
    "Technical expertise and skill set of Salah Uddin Selim — languages, frameworks, IoT, tools, and design.",
  openGraph: {
    title: "Forge | Salah Uddin Selim",
    description:
      "Technical expertise and skill set of Salah Uddin Selim — languages, frameworks, IoT, tools, and design.",
  },
  alternates: { canonical: "/forge" },
}

export default function ForgePage() {
  return (
    <main className="min-h-screen pt-28 relative">
      <ForgeSection />
    </main>
  )
}
