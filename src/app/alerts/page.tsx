"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  BarChart3,
  Activity,
  TrendingUp,
  Settings,
  LogOut,
  X,
  Search,
} from "lucide-react";

interface Alert {
  id: string;
  name: string;
  symbol: string;
  condition: string;
  value: string;
  enabled: boolean;
  createdAt: string;
  triggeredCount: number;
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    name: "AAPL Price Target",
    symbol: "AAPL",
    condition: "price_above",
    value: "185.00",
    enabled: true,
    createdAt: "2024-01-15",
    triggeredCount: 3,
  },
  {
    id: "2",
    name: "TSLA Volume Alert",
    symbol: "TSLA",
    condition: "volume_spike",
    value: "150",
    enabled: true,
    createdAt: "2024-01-14",
    triggeredCount: 7,
  },
  {
    id: "3",
    name: "GOOGL Stop Loss",
    symbol: "GOOGL",
    condition: "price_below",
    value: "140.00",
    enabled: false,
    createdAt: "2024-01-10",
    triggeredCount: 1,
  },
  {
    id: "4",
    name: "MSFT Earnings Alert",
    symbol: "MSFT",
    condition: "news_mention",
    value: "earnings",
    enabled: true,
    createdAt: "2024-01-08",
    triggeredCount: 2,
  },
  {
    id: "5",
    name: "NVDA Price Drop",
    symbol: "NVDA",
    condition: "price_change",
    value: "-5",
    enabled: true,
    createdAt: "2024-01-05",
    triggeredCount: 0,
  },
];

const conditionLabels: Record<string, string> = {
  price_above: "Price Above",
  price_below: "Price Below",
  price_change: "Price Change %",
  volume_spike: "Volume Spike %",
  news_mention: "News Mention",
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newAlert, setNewAlert] = useState({
    name: "",
    symbol: "",
    condition: "price_above",
    value: "",
  });

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAlert = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const createAlert = () => {
    if (!newAlert.name || !newAlert.symbol || !newAlert.value) return;

    const alert: Alert = {
      id: Date.now().toString(),
      name: newAlert.name,
      symbol: newAlert.symbol.toUpperCase(),
      condition: newAlert.condition,
      value: newAlert.value,
      enabled: true,
      createdAt: new Date().toISOString().split("T")[0],
      triggeredCount: 0,
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({ name: "", symbol: "", condition: "price_above", value: "" });
    setShowCreateModal(false);
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
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Alerts
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Manage your price alerts and notifications
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Alert
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Alerts
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">
              {alerts.length}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Active Alerts
            </p>
            <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
              {alerts.filter((a) => a.enabled).length}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Triggers
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {alerts.reduce((sum, a) => sum + a.triggeredCount, 0)}
            </p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Your Alerts
            </h2>
          </div>
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                No alerts found. Create your first alert to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        alert.enabled
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                      }`}
                    >
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {alert.name}
                        </p>
                        <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                          {alert.symbol}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                        {conditionLabels[alert.condition]}:{" "}
                        {alert.condition.includes("price")
                          ? `$${alert.value}`
                          : alert.condition.includes("volume") ||
                              alert.condition.includes("change")
                            ? `${alert.value}%`
                            : alert.value}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        Created {alert.createdAt} | Triggered{" "}
                        {alert.triggeredCount} times
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAlert(alert.id)}
                      className={`rounded-lg p-2 transition-colors ${
                        alert.enabled
                          ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                          : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                      title={alert.enabled ? "Disable alert" : "Enable alert"}
                    >
                      {alert.enabled ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Delete alert"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-zinc-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Create New Alert
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Alert Name
                </label>
                <input
                  type="text"
                  value={newAlert.name}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, name: e.target.value })
                  }
                  placeholder="e.g., AAPL Price Target"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Symbol
                </label>
                <input
                  type="text"
                  value={newAlert.symbol}
                  onChange={(e) =>
                    setNewAlert({
                      ...newAlert,
                      symbol: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="e.g., AAPL"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Condition
                </label>
                <select
                  value={newAlert.condition}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, condition: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                >
                  <option value="price_above">Price Above</option>
                  <option value="price_below">Price Below</option>
                  <option value="price_change">Price Change %</option>
                  <option value="volume_spike">Volume Spike %</option>
                  <option value="news_mention">News Mention</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Value
                </label>
                <input
                  type="text"
                  value={newAlert.value}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, value: e.target.value })
                  }
                  placeholder={
                    newAlert.condition.includes("price")
                      ? "e.g., 185.00"
                      : newAlert.condition === "news_mention"
                        ? "e.g., earnings"
                        : "e.g., 50"
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={createAlert}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
