import { NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export async function GET() {
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
    return NextResponse.json(
      { error: "CV not found" },
      { status: 404 },
    )
  }
}
