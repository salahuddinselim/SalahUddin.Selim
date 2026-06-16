import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const text = await request.text()
    let report: unknown
    try {
      report = JSON.parse(text)
    } catch {
      report = text
    }
    console.log("[CSP Report]", JSON.stringify(report, null, 2))
  } catch {
    // ignore parse errors
  }
  return new NextResponse(null, { status: 204 })
}
