import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json") && !contentType.includes("application/csp-report")) {
    return new NextResponse(null, { status: 204 })
  }

  try {
    const text = await request.text()
    if (!text || text.length > 10000) {
      return new NextResponse(null, { status: 204 })
    }
    const report = JSON.parse(text)
    console.log("[CSP Report]", JSON.stringify(report, null, 2))
  } catch {
    // Silent — CSP reports are best-effort
  }

  return new NextResponse(null, { status: 204 })
}
