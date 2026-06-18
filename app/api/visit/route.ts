import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import {
  writeClient,
  VISITOR_DOC_ID,
  type VisitorStats,
  type CountryStat,
  type DeviceStat,
} from "@/lib/sanity/write"
import { checkRateLimit } from "@/lib/rate-limit"
import { corsResponse, addCorsHeaders, isSameOrigin } from "@/lib/cors"

const TIMEOUT_MS = 3500

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ])
}

function getDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (ua.includes("iphone") || ua.includes("ipad")) return "iOS"
  if (ua.includes("android")) return "Android"
  if (ua.includes("mac")) return "macOS"
  if (ua.includes("windows")) return "Windows"
  if (ua.includes("linux")) return "Linux"
  return "Other"
}

async function lookupCountry(ip: string) {
  try {
    const res = await fetch(`https://ip-api.com/json/${ip}?fields=status,country,countryCode`, {
      signal: AbortSignal.timeout(3000),
    })
    const data = await res.json()
    if (data.status !== "success") return null
    const code = data.countryCode as string
    const flag =
      String.fromCodePoint(code.codePointAt(0)! - 0x41 + 0x1f1e6) +
      String.fromCodePoint(code.codePointAt(1)! - 0x41 + 0x1f1e6)
    return { name: data.country as string, code, flag }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return addCorsHeaders(request, NextResponse.json({ ok: false }, { status: 403 }))
  }

  if (request.method === "OPTIONS") {
    return corsResponse(request)
  }

  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported media type" }, { status: 415 })
  }

  const { success: allowed } = await checkRateLimit(request, "visit", {
    max: 120,
    windowMs: 3600_000,
  })
  if (!allowed) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "127.0.0.1"

    const ua = request.headers.get("user-agent") ?? "Unknown"
    const now = new Date()
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

    const [countryInfo, currentDoc] = await Promise.all([
      ip !== "127.0.0.1" ? lookupCountry(ip) : null,
      withTimeout(writeClient.getDocument<VisitorStats>(VISITOR_DOC_ID), 2500).catch(() => null),
    ])

    const total = (currentDoc?.totalViews ?? 0) + 1
    let thisMonthViews = (currentDoc?.thisMonthViews ?? 0) + 1
    let thisMonth = currentDoc?.thisMonth ?? monthKey

    if (thisMonth !== monthKey) {
      thisMonthViews = 1
      thisMonth = monthKey
    }

    const countries: CountryStat[] = currentDoc?.countries ?? []
    const devices: DeviceStat[] = currentDoc?.devices ?? []
    const monthlyHistory: { month: string; views: number }[] = currentDoc?.monthlyHistory ?? []

    if (countryInfo) {
      const existing = countries.find((c) => c.code === countryInfo.code)
      if (existing) {
        existing.count += 1
      } else {
        countries.push({ ...countryInfo, count: 1 })
      }
      countries.sort((a, b) => b.count - a.count)
    }

    const deviceName = getDevice(ua)
    const existingDevice = devices.find((d) => d.name === deviceName)
    if (existingDevice) {
      existingDevice.count += 1
    } else {
      devices.push({ name: deviceName, count: 1 })
    }
    devices.sort((a, b) => b.count - a.count)

    const historyEntry = monthlyHistory.find((h) => h.month === thisMonth)
    if (historyEntry) {
      historyEntry.views = thisMonthViews
    } else {
      monthlyHistory.push({ month: thisMonth, views: thisMonthViews })
    }
    monthlyHistory.sort((a, b) => a.month.localeCompare(b.month))

    const payload = {
      _id: VISITOR_DOC_ID,
      _type: "visitorStats",
      totalViews: total,
      thisMonthViews,
      thisMonth,
      countries,
      devices,
      monthlyHistory,
      lastUpdated: now.toISOString(),
    }

    await withTimeout(writeClient.createOrReplace(payload), TIMEOUT_MS)

    const response = NextResponse.json({ ok: true })
    return addCorsHeaders(request, response)
  } catch {
    const response = NextResponse.json({ ok: true, persisted: false }, { status: 202 })
    return addCorsHeaders(request, response)
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
