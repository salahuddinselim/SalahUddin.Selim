import type { Metadata } from "next"
import { PersonaSection } from "@/components/sections/persona-section"
import { getSocialLinks, getEducation } from "@/lib/sanity/fetch"
import { fallbackSocials, pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.persona
export const dynamic = "force-static"

export default async function PersonaPage() {
  const [socials, education] = await Promise.all([
    getSocialLinks().catch(() => fallbackSocials),
    getEducation().catch(() => []),
  ])
  return (
    <main className="min-h-screen pt-28">
      <PersonaSection socials={socials} education={education} />
    </main>
  )
}
