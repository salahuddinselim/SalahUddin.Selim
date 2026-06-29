import type { Metadata } from "next"
import { PersonaSection } from "@/components/sections/persona-section"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.persona
export const dynamic = "force-static"

export default function PersonaPage() {
  return (
    <main className="min-h-screen pt-28">
      <PersonaSection />
    </main>
  )
}
