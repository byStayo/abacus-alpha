import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      const userId = session.metadata?.userId
      const subscriptionId = session.subscription as string

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const subData = subscription as unknown as {
        items: { data: Array<{ price: { id: string } }> }
        current_period_start: number
        current_period_end: number
      }
      const priceId = subData.items.data[0].price.id

      let tier = "pro"
      if (priceId.includes("enterprise")) tier = "enterprise"

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          tier,
          status: "active",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: priceId,
          currentPeriodStart: new Date(subData.current_period_start * 1000),
          currentPeriodEnd: new Date(subData.current_period_end * 1000),
        },
        create: {
          userId: userId!,
          tier,
          status: "active",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: priceId,
          currentPeriodStart: new Date(subData.current_period_start * 1000),
          currentPeriodEnd: new Date(subData.current_period_end * 1000),
        }
      })
      break
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { tier: "free", status: "canceled" }
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
