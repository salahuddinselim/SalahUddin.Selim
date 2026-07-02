import { NextResponse } from "next/server"
import { writeClient, VISITOR_DOC_ID, type VisitorStats } from "@/lib/sanity/write"
import { corsResponse, addCorsHeaders, isSameOrigin } from "@/lib/cors"
import { checkRateLimit } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  if (!isSameOrigin(request)) {
    return addCorsHeaders(request, NextResponse.json({ error: "Forbidden" }, { status: 403 }))
  }

  const { success: allowed } = await checkRateLimit(request, "visitors", {
    max: 60,
    windowMs: 3600_000,
  })
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const doc = await writeClient.getDocument<VisitorStats>(VISITOR_DOC_ID)

    if (!doc) {
      const response = NextResponse.json({
        totalViews: 0,
        thisMonthViews: 0,
        thisMonth: "",
        countries: [],
        devices: [],
        monthlyHistory: [],
        lastUpdated: null,
      })
      return addCorsHeaders(request, response)
    }

    const response = NextResponse.json({
      totalViews: doc.totalViews ?? 0,
      thisMonthViews: doc.thisMonthViews ?? 0,
      thisMonth: doc.thisMonth ?? "",
      countries: doc.countries ?? [],
      devices: doc.devices ?? [],
      monthlyHistory: doc.monthlyHistory ?? [],
      lastUpdated: doc.lastUpdated ?? null,
    })
    return addCorsHeaders(request, response)
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
