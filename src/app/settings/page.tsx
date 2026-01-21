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
  User,
  CreditCard,
  Mail,
  Shield,
  Save,
  Loader2,
  Check,
} from "lucide-react";

interface NotificationSettings {
  emailAlerts: boolean;
  priceAlerts: boolean;
  newsDigest: boolean;
  weeklyReport: boolean;
  marketingEmails: boolean;
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
  });

  // Subscription state
  const [subscription] = useState({
    plan: "Pro",
    status: "Active",
    billingCycle: "Monthly",
    nextBilling: "Feb 15, 2024",
    price: "$49.00",
  });

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailAlerts: true,
    priceAlerts: true,
    newsDigest: true,
    weeklyReport: false,
    marketingEmails: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <TrendingUp className="h-5 w-5" />
            Analysis
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
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
              Settings
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Manage your account settings and preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <Check className="h-4 w-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Profile Information
                </h2>
                <p className="text-sm text-zinc-500">
                  Update your personal details
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Timezone
                  </label>
                  <select
                    value={profile.timezone}
                    onChange={(e) =>
                      setProfile({ ...profile, timezone: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="America/New_York">
                      Eastern Time (ET)
                    </option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Subscription Section */}
          <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Subscription
                </h2>
                <p className="text-sm text-zinc-500">
                  Manage your billing and subscription
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    {subscription.plan}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {subscription.status}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {subscription.billingCycle} billing
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    {subscription.price}
                    <span className="text-sm font-normal text-zinc-500">
                      /month
                    </span>
                  </p>
                  <p className="text-xs text-zinc-500">
                    Next billing: {subscription.nextBilling}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Change Plan
                </Link>
                <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                  Update Payment Method
                </button>
                <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                  View Billing History
                </button>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Notification Preferences
                </h2>
                <p className="text-sm text-zinc-500">
                  Choose what notifications you receive
                </p>
              </div>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {[
                {
                  key: "emailAlerts" as const,
                  title: "Email Alerts",
                  description: "Receive email notifications for triggered alerts",
                },
                {
                  key: "priceAlerts" as const,
                  title: "Price Alerts",
                  description: "Get notified when prices hit your targets",
                },
                {
                  key: "newsDigest" as const,
                  title: "Daily News Digest",
                  description:
                    "Receive a daily summary of relevant news articles",
                },
                {
                  key: "weeklyReport" as const,
                  title: "Weekly Performance Report",
                  description: "Get a weekly summary of your portfolio performance",
                },
                {
                  key: "marketingEmails" as const,
                  title: "Marketing Communications",
                  description: "Receive updates about new features and promotions",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-zinc-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications[item.key]
                        ? "bg-blue-600"
                        : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        notifications[item.key]
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Security Section */}
          <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Security
                </h2>
                <p className="text-sm text-zinc-500">
                  Manage your account security settings
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                  Change Password
                </button>
                <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                  Enable Two-Factor Authentication
                </button>
                <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                  View Active Sessions
                </button>
              </div>
              <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
                  Danger Zone
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Permanently delete your account and all associated data
                </p>
                <button className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20">
                  Delete Account
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
