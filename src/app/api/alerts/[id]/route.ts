import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const alert = await prisma.alert.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    return NextResponse.json(alert)
  } catch (error) {
    console.error("Error fetching alert:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await req.json()

    const existingAlert = await prisma.alert.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingAlert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    const alert = await prisma.alert.update({
      where: { id },
      data: {
        symbol: data.symbol,
        alertType: data.alertType,
        condition: data.condition,
        channels: data.channels,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(alert)
  } catch (error) {
    console.error("Error updating alert:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const existingAlert = await prisma.alert.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingAlert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    await prisma.alert.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting alert:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
