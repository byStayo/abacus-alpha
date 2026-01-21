import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { stripe, PRICES } from "@/lib/stripe"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { priceId } = await req.json()
  const price = PRICES[priceId as keyof typeof PRICES]

  if (!price) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true }
  })

  let customerId = user?.subscription?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user?.email!,
      metadata: { userId: session.user.id }
    })
    customerId = customer.id
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
    metadata: { userId: session.user.id }
  })

  return NextResponse.json({ url: checkoutSession.url })
}
