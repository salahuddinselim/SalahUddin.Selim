import type { Metadata } from "next"
import { CredentialsSection } from "@/components/sections/credentials-section"

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Achievements, awards, and certifications earned by Salah Uddin Selim throughout his academic career.",
  openGraph: {
    title: "Credentials | Salah Uddin Selim",
    description:
      "Achievements, awards, and certifications earned by Salah Uddin Selim throughout his academic career.",
  },
  alternates: { canonical: "/credentials" },
}

export default function CredentialsPage() {
  return (
    <main className="min-h-screen pt-28">
      <CredentialsSection />
    </main>
  )
}
