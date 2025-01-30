import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get("path")

  if (!filePath) {
    return NextResponse.json({ error: "No file path provided" }, { status: 400 })
  }

  try {
    const fullPath = path.resolve(filePath)
    const fileBuffer = fs.readFileSync(fullPath)

    const response = new NextResponse(fileBuffer)
    response.headers.set("Content-Type", "application/octet-stream")
    response.headers.set("Content-Disposition", `attachment; filename=${path.basename(filePath)}`)

    return response
  } catch (error) {
    console.error("Error serving document:", error)
    return NextResponse.json({ error: "Failed to serve document" }, { status: 500 })
  }
}

