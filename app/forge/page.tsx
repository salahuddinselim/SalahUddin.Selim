import type { Metadata } from "next"
import { ForgeSection } from "@/components/sections/forge-section"
import { getSkills } from "@/lib/sanity/fetch"

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

export default async function ForgePage() {
  let skills: import("@/types").SanitySkill[] = []
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
