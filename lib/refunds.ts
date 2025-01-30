import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getRefunds() {
  try {
    const refunds = await prisma.refund.findMany({
      orderBy: { createdAt: "desc" },
    })
    return refunds
  } catch (error) {
    console.error("Error fetching refunds:", error)
    return []
  }
}

