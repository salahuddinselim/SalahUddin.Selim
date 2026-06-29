import type { Metadata } from "next"
import { ForgeSection } from "@/components/sections/forge-section"
import { getSkills } from "@/lib/sanity/fetch"
import { pageMeta } from "@/data"
import type { SanitySkill } from "@/types"

export const metadata: Metadata = pageMeta.forge
export const dynamic = "force-static"

export default async function ForgePage() {
  let skills: SanitySkill[] = []
  try {
    skills = await getSkills()
  } catch (error) {
    console.error("Failed to load skills:", error)
  }

  return (
    <main className="min-h-screen pt-28 relative">
      <ForgeSection skills={skills} />
    </main>
  )
}
