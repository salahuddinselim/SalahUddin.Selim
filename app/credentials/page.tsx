import type { Metadata } from "next"
import { CredentialsSection } from "@/components/sections/credentials-section"
import { getCredentials } from "@/lib/sanity/fetch"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.credentials
export const dynamic = "force-static"

export default async function CredentialsPage() {
  const credentials = await getCredentials().catch(() => [])
  return (
    <main className="min-h-screen pt-28">
      <CredentialsSection credentials={credentials} />
    </main>
  )
}
