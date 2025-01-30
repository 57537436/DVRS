import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import fs from "fs/promises"
import path from "path"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const taxpayerName = formData.get("taxpayerName") as string
    const taxId = formData.get("taxId") as string
    const refundAmount = formData.get("refundAmount") as string
    const reason = formData.get("reason") as string
    const document = formData.get("document") as File | null

    if (!document) {
      return NextResponse.json({ error: "Document is required" }, { status: 400 })
    }

    // Save the file
    const bytes = await document.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "uploads")
    await fs.mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, document.name)
    await fs.writeFile(filePath, buffer)

    // Create the refund record
    const refund = await prisma.refund.create({
      data: {
        taxpayerName,
        taxId,
        refundAmount: Number.parseFloat(refundAmount),
        reason,
        status: "PENDING",
        documentPath: filePath,
      },
    })

    return NextResponse.json({ trackingId: refund.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating refund:", error)
    return NextResponse.json(
      { error: "Error submitting refund application", details: (error as Error).message },
      { status: 500 },
    )
  }
}

