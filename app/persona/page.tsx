import type { Metadata } from "next"
import nextDynamic from "next/dynamic"
import { getSocialLinks, getEducation } from "@/lib/sanity/fetch"
import { fallbackSocials, pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.persona
export const dynamic = "force-static"

const PersonaSection = nextDynamic(
  () => import("@/components/sections/persona-section").then((mod) => mod.PersonaSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

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
