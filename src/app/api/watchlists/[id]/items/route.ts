import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: watchlistId } = await params
    const data = await req.json()

    const watchlist = await prisma.watchlist.findFirst({
      where: {
        id: watchlistId,
        userId: session.user.id,
      },
    })

    if (!watchlist) {
      return NextResponse.json({ error: "Watchlist not found" }, { status: 404 })
    }

    const existingItem = await prisma.watchlistItem.findFirst({
      where: {
        watchlistId,
        symbol: data.symbol,
      },
    })

    if (existingItem) {
      return NextResponse.json({ error: "Item already exists in watchlist" }, { status: 400 })
    }

    const item = await prisma.watchlistItem.create({
      data: {
        watchlistId,
        symbol: data.symbol,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error adding watchlist item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: watchlistId } = await params
    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get("itemId")
    const symbol = searchParams.get("symbol")

    const watchlist = await prisma.watchlist.findFirst({
      where: {
        id: watchlistId,
        userId: session.user.id,
      },
    })

    if (!watchlist) {
      return NextResponse.json({ error: "Watchlist not found" }, { status: 404 })
    }

    if (itemId) {
      await prisma.watchlistItem.delete({
        where: { id: itemId },
      })
    } else if (symbol) {
      await prisma.watchlistItem.deleteMany({
        where: {
          watchlistId,
          symbol,
        },
      })
    } else {
      return NextResponse.json({ error: "itemId or symbol required" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing watchlist item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
