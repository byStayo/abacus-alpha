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
  ExternalLink,
  Clock,
  Filter,
  TrendingDown,
  Minus,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  sentiment: "positive" | "negative" | "neutral";
  relatedSymbols: string[];
  imageUrl?: string;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple Reports Record Q4 Revenue, Beats Analyst Expectations",
    summary:
      "Apple Inc. reported quarterly revenue of $90.1 billion, up 8% year over year, driven by strong iPhone and Services performance.",
    source: "Reuters",
    url: "#",
    publishedAt: "2024-01-20T14:30:00Z",
    category: "earnings",
    sentiment: "positive",
    relatedSymbols: ["AAPL"],
  },
  {
    id: "2",
    title: "Tesla Announces Global Price Cuts Amid Growing Competition",
    summary:
      "Tesla has reduced prices on Model 3 and Model Y in key markets as competition from BYD and other EV makers intensifies.",
    source: "Bloomberg",
    url: "#",
    publishedAt: "2024-01-20T12:15:00Z",
    category: "market",
    sentiment: "negative",
    relatedSymbols: ["TSLA"],
  },
  {
    id: "3",
    title: "Microsoft Azure Revenue Grows 29% in Cloud Services",
    summary:
      "Microsoft's cloud computing platform Azure continued its strong growth trajectory, helping the company maintain its market leadership.",
    source: "CNBC",
    url: "#",
    publishedAt: "2024-01-20T10:00:00Z",
    category: "earnings",
    sentiment: "positive",
    relatedSymbols: ["MSFT"],
  },
  {
    id: "4",
    title: "Federal Reserve Signals Potential Rate Cuts in 2024",
    summary:
      "Fed officials indicated they may begin cutting interest rates later this year if inflation continues to moderate toward their 2% target.",
    source: "Wall Street Journal",
    url: "#",
    publishedAt: "2024-01-20T08:45:00Z",
    category: "economy",
    sentiment: "positive",
    relatedSymbols: [],
  },
  {
    id: "5",
    title: "NVIDIA Unveils Next-Generation AI Chips at CES",
    summary:
      "NVIDIA announced its latest GPU architecture designed for AI workloads, promising significant performance improvements over current generation.",
    source: "TechCrunch",
    url: "#",
    publishedAt: "2024-01-19T16:30:00Z",
    category: "technology",
    sentiment: "positive",
    relatedSymbols: ["NVDA"],
  },
  {
    id: "6",
    title: "Amazon to Invest $15 Billion in India Operations",
    summary:
      "Amazon announced plans to invest $15 billion in India over the next five years to expand its e-commerce and cloud infrastructure.",
    source: "Financial Times",
    url: "#",
    publishedAt: "2024-01-19T14:00:00Z",
    category: "market",
    sentiment: "neutral",
    relatedSymbols: ["AMZN"],
  },
  {
    id: "7",
    title: "Oil Prices Surge on Middle East Supply Concerns",
    summary:
      "Crude oil prices jumped 3% as tensions in the Middle East raised concerns about potential supply disruptions.",
    source: "Reuters",
    url: "#",
    publishedAt: "2024-01-19T11:20:00Z",
    category: "commodities",
    sentiment: "negative",
    relatedSymbols: ["XOM", "CVX"],
  },
  {
    id: "8",
    title: "Google Faces Antitrust Lawsuit Over Search Dominance",
    summary:
      "The Department of Justice filed a major antitrust lawsuit against Google, alleging the company illegally maintained its search monopoly.",
    source: "New York Times",
    url: "#",
    publishedAt: "2024-01-19T09:00:00Z",
    category: "regulatory",
    sentiment: "negative",
    relatedSymbols: ["GOOGL"],
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "earnings", label: "Earnings" },
  { value: "market", label: "Market News" },
  { value: "technology", label: "Technology" },
  { value: "economy", label: "Economy" },
  { value: "commodities", label: "Commodities" },
  { value: "regulatory", label: "Regulatory" },
];

const sentiments = [
  { value: "all", label: "All Sentiment" },
  { value: "positive", label: "Positive" },
  { value: "neutral", label: "Neutral" },
  { value: "negative", label: "Negative" },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return "Just now";
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  const filteredNews = mockNews.filter((item) => {
    const categoryMatch =
      selectedCategory === "all" || item.category === selectedCategory;
    const sentimentMatch =
      selectedSentiment === "all" || item.sentiment === selectedSentiment;
    return categoryMatch && sentimentMatch;
  });

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4" />;
      case "negative":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "negative":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
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
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
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
            News Feed
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Stay updated with the latest market news and insights
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Filters:
            </span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {sentiments.map((sent) => (
              <option key={sent.value} value={sent.value}>
                {sent.label}
              </option>
            ))}
          </select>
          <span className="text-sm text-zinc-500">
            Showing {filteredNews.length} articles
          </span>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getSentimentColor(item.sentiment)}`}
                  >
                    {getSentimentIcon(item.sentiment)}
                    {item.sentiment.charAt(0).toUpperCase() +
                      item.sentiment.slice(1)}
                  </span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)}
                  </span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1 text-zinc-400 opacity-0 transition-all hover:bg-zinc-100 hover:text-zinc-600 group-hover:opacity-100 dark:hover:bg-zinc-800"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                {item.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{item.source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(item.publishedAt)}
                  </span>
                </div>
                {item.relatedSymbols.length > 0 && (
                  <div className="flex items-center gap-1">
                    {item.relatedSymbols.map((symbol) => (
                      <span
                        key={symbol}
                        className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <Activity className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              No news articles match your filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
