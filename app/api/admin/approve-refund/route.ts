import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { id } = await request.json()

  try {
    const updatedRefund = await prisma.refund.update({
      where: { id },
      data: { status: "APPROVED" },
    })

    return NextResponse.json(updatedRefund)
  } catch (error) {
    console.error("Error approving refund:", error)
    return NextResponse.json({ error: "Failed to approve refund" }, { status: 500 })
  }
}

