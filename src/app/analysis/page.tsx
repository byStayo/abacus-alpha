"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  BarChart3,
  Activity,
  TrendingUp,
  Settings,
  LogOut,
  Search,
  Building2,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";

interface CompanyData {
  name: string;
  symbol: string;
  sector: string;
  marketCap: string;
  employees: number;
  revenue: {
    quarter: string;
    amount: number;
  }[];
  revenueBreakdown: {
    segment: string;
    value: number;
    color: string;
  }[];
  cashFlow: {
    month: string;
    inflow: number;
    outflow: number;
  }[];
}

const companiesData: Record<string, CompanyData> = {
  AAPL: {
    name: "Apple Inc.",
    symbol: "AAPL",
    sector: "Technology",
    marketCap: "$2.89T",
    employees: 164000,
    revenue: [
      { quarter: "Q1 2023", amount: 117.2 },
      { quarter: "Q2 2023", amount: 94.8 },
      { quarter: "Q3 2023", amount: 81.8 },
      { quarter: "Q4 2023", amount: 89.5 },
      { quarter: "Q1 2024", amount: 119.6 },
    ],
    revenueBreakdown: [
      { segment: "iPhone", value: 52, color: "#3B82F6" },
      { segment: "Services", value: 22, color: "#10B981" },
      { segment: "Mac", value: 10, color: "#F59E0B" },
      { segment: "iPad", value: 8, color: "#8B5CF6" },
      { segment: "Wearables", value: 8, color: "#EC4899" },
    ],
    cashFlow: [
      { month: "Aug", inflow: 25.3, outflow: 18.2 },
      { month: "Sep", inflow: 31.2, outflow: 22.1 },
      { month: "Oct", inflow: 28.7, outflow: 20.5 },
      { month: "Nov", inflow: 35.1, outflow: 24.8 },
      { month: "Dec", inflow: 42.5, outflow: 28.3 },
      { month: "Jan", inflow: 38.9, outflow: 26.1 },
    ],
  },
  MSFT: {
    name: "Microsoft Corporation",
    symbol: "MSFT",
    sector: "Technology",
    marketCap: "$2.78T",
    employees: 221000,
    revenue: [
      { quarter: "Q1 2023", amount: 52.9 },
      { quarter: "Q2 2023", amount: 56.2 },
      { quarter: "Q3 2023", amount: 52.9 },
      { quarter: "Q4 2023", amount: 56.5 },
      { quarter: "Q1 2024", amount: 62.0 },
    ],
    revenueBreakdown: [
      { segment: "Azure", value: 38, color: "#3B82F6" },
      { segment: "Office 365", value: 28, color: "#10B981" },
      { segment: "Windows", value: 14, color: "#F59E0B" },
      { segment: "Gaming", value: 12, color: "#8B5CF6" },
      { segment: "LinkedIn", value: 8, color: "#EC4899" },
    ],
    cashFlow: [
      { month: "Aug", inflow: 18.5, outflow: 12.3 },
      { month: "Sep", inflow: 20.1, outflow: 14.2 },
      { month: "Oct", inflow: 19.8, outflow: 13.5 },
      { month: "Nov", inflow: 22.3, outflow: 15.1 },
      { month: "Dec", inflow: 24.7, outflow: 16.8 },
      { month: "Jan", inflow: 26.1, outflow: 17.5 },
    ],
  },
  GOOGL: {
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    sector: "Technology",
    marketCap: "$1.74T",
    employees: 182502,
    revenue: [
      { quarter: "Q1 2023", amount: 69.8 },
      { quarter: "Q2 2023", amount: 74.6 },
      { quarter: "Q3 2023", amount: 76.7 },
      { quarter: "Q4 2023", amount: 86.3 },
      { quarter: "Q1 2024", amount: 80.5 },
    ],
    revenueBreakdown: [
      { segment: "Search", value: 57, color: "#3B82F6" },
      { segment: "YouTube", value: 11, color: "#10B981" },
      { segment: "Cloud", value: 13, color: "#F59E0B" },
      { segment: "Network", value: 10, color: "#8B5CF6" },
      { segment: "Other", value: 9, color: "#EC4899" },
    ],
    cashFlow: [
      { month: "Aug", inflow: 22.1, outflow: 15.8 },
      { month: "Sep", inflow: 24.5, outflow: 17.2 },
      { month: "Oct", inflow: 25.8, outflow: 18.1 },
      { month: "Nov", inflow: 28.2, outflow: 19.5 },
      { month: "Dec", inflow: 32.1, outflow: 21.8 },
      { month: "Jan", inflow: 29.5, outflow: 20.2 },
    ],
  },
};

const suggestions = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA"];

export default function AnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(
    companiesData.AAPL
  );

  const handleSearch = (symbol: string) => {
    const upperSymbol = symbol.toUpperCase();
    setSearchQuery(upperSymbol);
    if (companiesData[upperSymbol]) {
      setSelectedCompany(companiesData[upperSymbol]);
    }
  };

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
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
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
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
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
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Business Analysis
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Deep dive into company financials and metrics
          </p>
        </div>

        {/* Company Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search company by symbol (e.g., AAPL)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm text-zinc-500">Quick search:</span>
            {suggestions.map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleSearch(symbol)}
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  selectedCompany?.symbol === symbol
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        {selectedCompany ? (
          <>
            {/* Company Overview */}
            <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {selectedCompany.name}
                      </h2>
                      <p className="text-sm text-zinc-500">
                        {selectedCompany.symbol} | {selectedCompany.sector}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">Market Cap</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">
                    {selectedCompany.marketCap}
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Employees</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">
                    {selectedCompany.employees.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Latest Revenue</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">
                    $
                    {
                      selectedCompany.revenue[selectedCompany.revenue.length - 1]
                        .amount
                    }
                    B
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Revenue Trend */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  Quarterly Revenue
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedCompany.revenue}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.2}
                      />
                      <XAxis
                        dataKey="quarter"
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        axisLine={{ stroke: "#374151" }}
                      />
                      <YAxis
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        axisLine={{ stroke: "#374151" }}
                        tickFormatter={(value) => `$${value}B`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181B",
                          border: "1px solid #27272A",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#F4F4F5" }}
                        itemStyle={{ color: "#3B82F6" }}
                        formatter={(value) => [`$${value}B`, "Revenue"]}
                      />
                      <Bar
                        dataKey="amount"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  Revenue Breakdown
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={selectedCompany.revenueBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ payload, value }) => `${payload.segment}: ${value}%`}
                        labelLine={false}
                      >
                        {selectedCompany.revenueBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181B",
                          border: "1px solid #27272A",
                          borderRadius: "8px",
                        }}
                        formatter={(value) => [`${value}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {selectedCompany.revenueBreakdown.map((item) => (
                    <div key={item.segment} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-zinc-600 dark:text-zinc-400">
                        {item.segment}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cash Flow - Inflow/Outflow */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  Cash Flow Analysis (Inflow vs Outflow)
                </h3>
                <div className="mb-4 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Inflow
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Outflow
                    </span>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedCompany.cashFlow}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.2}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        axisLine={{ stroke: "#374151" }}
                      />
                      <YAxis
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        axisLine={{ stroke: "#374151" }}
                        tickFormatter={(value) => `$${value}B`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181B",
                          border: "1px solid #27272A",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#F4F4F5" }}
                        formatter={(value) => [`$${value}B`]}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="inflow"
                        name="Inflow"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="outflow"
                        name="Outflow"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <Search className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Search for a company to view its analysis
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
