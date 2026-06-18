import { NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { corsResponse, addCorsHeaders, isSameOrigin } from "@/lib/cors"

export async function GET(request: Request) {
  if (!isSameOrigin(request)) {
    return addCorsHeaders(request, NextResponse.json({ error: "Forbidden" }, { status: 403 }))
  }

  try {
    const filePath = join(process.cwd(), "cv", "Salah_Uddin_Selim.pdf")
    const file = await readFile(filePath)

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Salah_Uddin_Selim.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
