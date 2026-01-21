import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const watchlists = await prisma.watchlist.findMany({
      where: { userId: session.user.id },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(watchlists)
  } catch (error) {
    console.error("Error fetching watchlists:", error)
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

    const watchlist = await prisma.watchlist.create({
      data: {
        userId: session.user.id,
        name: data.name,
        isDefault: data.isDefault ?? false,
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(watchlist)
  } catch (error) {
    console.error("Error creating watchlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
