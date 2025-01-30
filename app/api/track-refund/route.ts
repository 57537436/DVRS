import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackingId = searchParams.get("trackingId")

  if (!trackingId) {
    return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 })
  }

  try {
    const refund = await prisma.refund.findUnique({
      where: { id: trackingId },
    })

    if (!refund) {
      return NextResponse.json({ error: "Refund not found" }, { status: 404 })
    }

    return NextResponse.json({ status: refund.status })
  } catch (error) {
    console.error("Error fetching refund:", error)
    return NextResponse.json({ error: "Error fetching refund status" }, { status: 500 })
  }
}

