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

    const watchlist = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    })

    if (!watchlist) {
      return NextResponse.json({ error: "Watchlist not found" }, { status: 404 })
    }

    return NextResponse.json(watchlist)
  } catch (error) {
    console.error("Error fetching watchlist:", error)
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

    const existingWatchlist = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingWatchlist) {
      return NextResponse.json({ error: "Watchlist not found" }, { status: 404 })
    }

    const watchlist = await prisma.watchlist.update({
      where: { id },
      data: {
        name: data.name,
        isDefault: data.isDefault,
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(watchlist)
  } catch (error) {
    console.error("Error updating watchlist:", error)
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

    const existingWatchlist = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingWatchlist) {
      return NextResponse.json({ error: "Watchlist not found" }, { status: 404 })
    }

    await prisma.watchlist.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting watchlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
