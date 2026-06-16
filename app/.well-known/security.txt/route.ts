const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://salah-uddin-selim.vercel.app"

export function GET() {
  const body = [
    `# Security Policy for ${new URL(siteUrl).host}`,
    "Contact: mailto:sselim223512@bscse.uiu.ac.bd",
    "Preferred-Languages: en, bn",
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    `Policy: ${siteUrl}/.well-known/security.txt`,
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  })
}
