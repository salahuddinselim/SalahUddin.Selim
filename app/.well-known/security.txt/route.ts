import { s as siteUrl } from "@/data/site"

export function GET() {
  const body = [
    `# Security Policy for ${new URL(siteUrl).host}`,
    "Contact: mailto:selimsalahuddin19@gmail.com",
    "Preferred-Languages: en, bn",
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    `Policy: ${siteUrl}/.well-known/security.txt`,
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  })
}
