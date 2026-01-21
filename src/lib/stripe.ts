import Stripe from "stripe"

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    // Return a proxy that throws on any method call during build
    return new Proxy({} as Stripe, {
      get(_, prop) {
        if (prop === "then") return undefined // For promise detection
        return () => {
          throw new Error("Stripe not configured: STRIPE_SECRET_KEY is missing")
        }
      },
    })
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-12-15.clover",
  })
}

export const stripe = getStripeClient()

export const PRICES = {
  pro_monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
  pro_yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
  enterprise_monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
  enterprise_yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
}

export const TIER_LIMITS = {
  free: { maxAlerts: 3, maxWatchlistItems: 5 },
  pro: { maxAlerts: -1, maxWatchlistItems: 50 },
  enterprise: { maxAlerts: -1, maxWatchlistItems: -1 },
}
