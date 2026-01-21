import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const alerts = await prisma.alert.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    
    const alert = await prisma.alert.create({
      data: {
        userId: session.user.id,
        symbol: data.symbol,
        alertType: data.alertType,
        condition: data.condition,
        channels: data.channels || ["email"],
      }
    })

    return NextResponse.json(alert)
  } catch (error) {
    console.error("Error creating alert:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
