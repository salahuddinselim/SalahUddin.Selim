// Precomputes CSP script-src hash-sources for the inline JSON-LD <script>
// tags on statically generated project pages (app/projects/[slug]/page.tsx).
// Those pages use `dynamic = "force-static"` and can't read a per-request
// CSP nonce, so a build-time sha256 hash-source is the only way to keep
// script-src free of 'unsafe-inline' while still allowing that script to run.
import { createClient } from "@sanity/client"
import { createHash } from "node:crypto"
import { writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outFile = path.join(__dirname, "..", "lib", "csp-hashes.generated.json")

function buildProjectJsonLd(project, url) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: "Salah Uddin Selim" },
    dateCreated: String(project.year),
    keywords: (project.technologies ?? []).join(", "),
    url,
    ...(project.image ? { image: project.image } : {}),
  }
}

function serializeJsonLd(jsonLd) {
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c")
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01"
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salah-uddin-selim.vercel.app"

  if (!projectId || !dataset) {
    console.warn("[generate-csp-hashes] Sanity env vars missing — writing empty hash list.")
    await writeFile(outFile, "[]\n")
    return
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  })
  const projects = await client.fetch(
    `*[_type == "project"]{ title, description, technologies, "image": image.asset->url, year, "slug": slug.current }`,
  )

  const hashes = projects
    .filter((p) => p.slug)
    .map((p) => {
      const jsonLd = buildProjectJsonLd(p, `${siteUrl}/projects/${p.slug}`)
      const serialized = serializeJsonLd(jsonLd)
      const digest = createHash("sha256").update(serialized, "utf8").digest("base64")
      return `'sha256-${digest}'`
    })

  await writeFile(outFile, JSON.stringify(hashes, null, 2) + "\n")
  console.log(`[generate-csp-hashes] Wrote ${hashes.length} hash-source(s) to ${outFile}`)
}

main().catch((error) => {
  console.error("[generate-csp-hashes] Failed:", error)
  process.exit(1)
})
