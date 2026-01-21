import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const preferences = await prisma.notificationPreferences.findUnique({
      where: { userId: session.user.id },
    })

    if (!preferences) {
      return NextResponse.json({
        dailyDigest: true,
        breakingNews: true,
        weeklySummary: true,
        emailEnabled: true,
        pushEnabled: false,
      })
    }

    return NextResponse.json(preferences)
  } catch (error) {
    console.error("Error fetching preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const preferences = await prisma.notificationPreferences.upsert({
      where: { userId: session.user.id },
      update: {
        dailyDigest: data.dailyDigest,
        breakingNews: data.breakingNews,
        weeklySummary: data.weeklySummary,
        emailEnabled: data.emailEnabled,
        pushEnabled: data.pushEnabled,
      },
      create: {
        userId: session.user.id,
        dailyDigest: data.dailyDigest ?? true,
        breakingNews: data.breakingNews ?? true,
        weeklySummary: data.weeklySummary ?? true,
        emailEnabled: data.emailEnabled ?? true,
        pushEnabled: data.pushEnabled ?? false,
      },
    })

    return NextResponse.json(preferences)
  } catch (error) {
    console.error("Error updating preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
