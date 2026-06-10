import { NextResponse } from "next/server"
import { writeClient, VISITOR_DOC_ID, type VisitorStats } from "@/lib/sanity/write"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const doc = await writeClient.getDocument<VisitorStats>(VISITOR_DOC_ID)

    if (!doc) {
      return NextResponse.json({
        totalViews: 0,
        thisMonthViews: 0,
        thisMonth: "",
        countries: [],
        devices: [],
        monthlyHistory: [],
        lastUpdated: null,
      })
    }

    return NextResponse.json({
      totalViews: doc.totalViews ?? 0,
      thisMonthViews: doc.thisMonthViews ?? 0,
      thisMonth: doc.thisMonth ?? "",
      countries: doc.countries ?? [],
      devices: doc.devices ?? [],
      monthlyHistory: doc.monthlyHistory ?? [],
      lastUpdated: doc.lastUpdated ?? null,
    })
  } catch (err) {
    console.error("visitors fetch error:", err)
    return NextResponse.json(
      { error: "Failed to fetch visitor stats" },
      { status: 500 },
    )
  }
}
