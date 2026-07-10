import { NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { corsResponse, addCorsHeaders, isSameOrigin } from "@/lib/cors"
import { checkRateLimit } from "@/lib/rate-limit"

export async function GET(request: Request) {
  if (!isSameOrigin(request)) {
    return addCorsHeaders(request, NextResponse.json({ error: "Forbidden" }, { status: 403 }))
  }

  const { success: allowed } = await checkRateLimit(request, "cv", {
    max: 60,
    windowMs: 3600_000,
  })
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    // Look for CV in public directory first, then fall back to cv/ directory
    const paths = [
      join(process.cwd(), "public", "Salah_Uddin_Selim.pdf"),
      join(process.cwd(), "cv", "Salah_Uddin_Selim.pdf"),
    ]

    let file: Blob | null = null
    for (const p of paths) {
      try {
        const data = await readFile(p)
        file = new Blob([data], { type: "application/pdf" })
        break
      } catch {}
    }

    if (!file) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Salah_Uddin_Selim.pdf"`,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
