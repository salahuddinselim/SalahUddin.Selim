import type { Metadata } from "next"
import { CredentialsSection } from "@/components/sections/credentials-section"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.credentials

export default function CredentialsPage() {
  return (
    <main className="min-h-screen pt-28">
      <CredentialsSection />
    </main>
  )
}
