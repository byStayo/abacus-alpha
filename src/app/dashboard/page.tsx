import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  ArrowUpRight,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { auth } from "@/lib/auth";

// Mock data for demonstration
const stats = [
  {
    label: "Active Alerts",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Bell,
  },
  {
    label: "Watchlist Items",
    value: "28",
    change: "+5",
    trend: "up",
    icon: Eye,
  },
  {
    label: "Portfolio Value",
    value: "$124,580",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Alerts Today",
    value: "7",
    change: "-2",
    trend: "down",
    icon: Activity,
  },
];

const recentAlerts = [
  {
    id: "1",
    title: "AAPL Price Target Hit",
    description: "Apple Inc. reached your target price of $185.00",
    time: "5 minutes ago",
    type: "price",
    severity: "success",
  },
  {
    id: "2",
    title: "TSLA Volume Spike",
    description: "Tesla trading volume increased by 150% in the last hour",
    time: "23 minutes ago",
    type: "volume",
    severity: "warning",
  },
  {
    id: "3",
    title: "MSFT Earnings Report",
    description: "Microsoft Q4 earnings report released - Beat expectations",
    time: "1 hour ago",
    type: "news",
    severity: "info",
  },
  {
    id: "4",
    title: "GOOGL Price Drop",
    description: "Alphabet fell below your stop-loss of $140.00",
    time: "2 hours ago",
    type: "price",
    severity: "error",
  },
];

const watchlist = [
  { symbol: "AAPL", name: "Apple Inc.", price: 185.92, change: 2.34 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 138.45, change: -1.23 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 4.56 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25, change: 0.89 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 495.22, change: 12.45 },
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6 dark:border-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            A
          </div>
          <span className="text-lg font-semibold text-zinc-900 dark:text-white">
            Abacus Alpha
          </span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
          >
            <BarChart3 className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/alerts"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Bell className="h-5 w-5" />
            Alerts
          </Link>
          <Link
            href="/news"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Activity className="h-5 w-5" />
            News Feed
          </Link>
          <Link
            href="/analysis"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <TrendingUp className="h-5 w-5" />
            Analysis
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium dark:bg-blue-900/30">
              {session.user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                {session.user?.name || "User"}
              </p>
              <p className="truncate text-xs text-zinc-500">
                {session.user?.email}
              </p>
            </div>
            <Link
              href="/api/auth/signout"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Welcome back, {session.user?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Here&apos;s what&apos;s happening with your portfolio today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <stat.icon className="h-5 w-5" />
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Alerts */}
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Recent Alerts
              </h2>
              <Link
                href="/alerts"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View all
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4">
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      alert.severity === "success"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : alert.severity === "warning"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : alert.severity === "error"
                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {alert.title}
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {alert.description}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watchlist */}
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Watchlist
              </h2>
              <Link
                href="/watchlist"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Manage
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {watchlist.map((item) => (
                <div
                  key={item.symbol}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {item.symbol}
                    </p>
                    <p className="text-xs text-zinc-500">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs ${
                        item.change >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)} (
                      {((item.change / item.price) * 100).toFixed(2)}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
