import type { Metadata } from "next"
import nextDynamic from "next/dynamic"
import { getCredentials } from "@/lib/sanity/fetch"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.credentials
export const dynamic = "force-static"

const CredentialsSection = nextDynamic(
  () => import("@/components/sections/credentials-section").then((mod) => mod.CredentialsSection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

export default async function CredentialsPage() {
  const credentials = await getCredentials().catch(() => [])
  return (
    <main className="min-h-screen pt-28">
      <CredentialsSection credentials={credentials} />
    </main>
  )
}
