"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, ChevronDown, ChevronUp } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: "5 custom alerts", included: true },
      { name: "Basic analytics dashboard", included: true },
      { name: "7-day data retention", included: true },
      { name: "Email support", included: true },
      { name: "Advanced analytics", included: false },
      { name: "API access", included: false },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For serious investors",
    monthlyPrice: 49,
    yearlyPrice: 470,
    features: [
      { name: "Unlimited custom alerts", included: true },
      { name: "Advanced analytics dashboard", included: true },
      { name: "1-year data retention", included: true },
      { name: "Priority email support", included: true },
      { name: "Advanced analytics & reports", included: true },
      { name: "Full API access", included: true },
      { name: "Priority support (24h)", included: true },
      { name: "Custom integrations", included: false },
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: "Unlimited custom alerts", included: true },
      { name: "Enterprise analytics suite", included: true },
      { name: "Unlimited data retention", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Advanced analytics & reports", included: true },
      { name: "Full API access + webhooks", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Custom integrations & white-label", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the remaining credit will be applied to future invoices.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! The Pro plan comes with a 14-day free trial. No credit card required to start. You can explore all Pro features during the trial period.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "At the end of your trial, you'll be prompted to enter payment details to continue using Pro features. If you don't subscribe, your account will automatically switch to the Free plan.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with our service, contact our support team within 30 days for a full refund.",
  },
  {
    question: "What's included in the Enterprise plan?",
    answer:
      "The Enterprise plan includes everything in Pro plus dedicated account management, custom integrations, SLA guarantees, on-premise deployment options, white-label solutions, and custom contract terms.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              A
            </div>
            <span className="text-xl font-semibold text-zinc-900 dark:text-white">
              Abacus Alpha
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-zinc-900 dark:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Choose the plan that fits your needs. All plans include a 14-day
              free trial.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span
                className={`text-sm ${
                  billingCycle === "monthly"
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="relative h-6 w-11 rounded-full bg-blue-600 transition-colors"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    billingCycle === "yearly"
                      ? "translate-x-5"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-sm ${
                  billingCycle === "yearly"
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500"
                }`}
              >
                Yearly
                <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border-2 border-blue-600 bg-white shadow-xl dark:bg-zinc-900"
                    : "border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {plan.description}
                  </p>
                  <div className="mt-6 flex items-baseline justify-center gap-1">
                    {plan.monthlyPrice !== null ? (
                      <>
                        <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                          $
                          {billingCycle === "monthly"
                            ? plan.monthlyPrice
                            : Math.round(plan.yearlyPrice / 12)}
                        </span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          /month
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                        Custom
                      </span>
                    )}
                  </div>
                  {plan.yearlyPrice !== null &&
                    plan.yearlyPrice > 0 &&
                    billingCycle === "yearly" && (
                      <p className="mt-1 text-sm text-zinc-500">
                        Billed annually (${plan.yearlyPrice}/year)
                      </p>
                    )}
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 flex-shrink-0 text-blue-600" />
                      ) : (
                        <Minus className="h-5 w-5 flex-shrink-0 text-zinc-300 dark:text-zinc-700" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-zinc-700 dark:text-zinc-300"
                            : "text-zinc-400 dark:text-zinc-600"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Compare all features
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Find the perfect plan for your needs
            </p>
          </div>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="py-4 text-left text-sm font-medium text-zinc-500">
                    Features
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-zinc-900 dark:text-white">
                    Free
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-zinc-900 dark:text-white">
                    Pro
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-zinc-900 dark:text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { feature: "Custom alerts", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Data retention", free: "7 days", pro: "1 year", enterprise: "Unlimited" },
                  { feature: "API access", free: false, pro: true, enterprise: true },
                  { feature: "Webhooks", free: false, pro: false, enterprise: true },
                  { feature: "Custom integrations", free: false, pro: false, enterprise: true },
                  { feature: "White-label", free: false, pro: false, enterprise: true },
                  { feature: "Support", free: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
                  { feature: "SLA guarantee", free: false, pro: false, enterprise: true },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td className="py-4 text-sm text-zinc-700 dark:text-zinc-300">
                      {row.feature}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <Minus className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                        )
                      ) : (
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {row.free}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <Minus className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                        )
                      ) : (
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {row.pro}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <Minus className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                        )
                      ) : (
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {row.enterprise}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need to know about our pricing
            </p>
          </div>
          <div className="mt-12 divide-y divide-zinc-200 dark:divide-zinc-800">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-zinc-400" />
                  )}
                </button>
                {openFaq === index && (
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Our team is here to help. Contact us for a personalized demo.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Contact Sales
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                A
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                Abacus Alpha
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} Abacus Alpha. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
