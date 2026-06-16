import type { Metadata } from "next"
import { PersonaSection } from "@/components/sections/persona-section"

export const metadata: Metadata = {
  title: "Persona",
  description:
    "Complete profile of Salah Uddin Selim — CSE student at UIU, GitHub stats, education history, and social links.",
  openGraph: {
    title: "Persona | Salah Uddin Selim",
    description:
      "Complete profile of Salah Uddin Selim — CSE student at UIU, GitHub stats, education history, and social links.",
  },
  alternates: { canonical: "/persona" },
}

export default function PersonaPage() {
  return (
    <main className="min-h-screen pt-28">
      <PersonaSection />
    </main>
  )
}
