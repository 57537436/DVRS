import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { id } = await request.json()

  try {
    const updatedRefund = await prisma.refund.update({
      where: { id },
      data: { status: "REJECTED" },
    })

    return NextResponse.json(updatedRefund)
  } catch (error) {
    console.error("Error rejecting refund:", error)
    return NextResponse.json({ error: "Failed to reject refund" }, { status: 500 })
  }
}

