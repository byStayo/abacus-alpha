"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/news", label: "News" },
  { href: "/alerts", label: "Alerts" },
  { href: "/analysis", label: "Analysis" },
];

interface HeaderProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export function Header({
  isAuthenticated = false,
  onSignIn,
  onSignOut,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#312e81] bg-[#0f0d24]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0d24]/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#EAB308]">Abacus Alpha</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#EAB308]",
                pathname === link.href
                  ? "text-[#EAB308]"
                  : "text-gray-300"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={onSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={onSignIn}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={onSignIn}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-[#1e1b4b] hover:text-white md:hidden"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#312e81] md:hidden">
          <nav className="flex flex-col space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#1e1b4b]",
                  pathname === link.href
                    ? "bg-[#1e1b4b] text-[#EAB308]"
                    : "text-gray-300"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col space-y-2 border-t border-[#312e81] pt-4">
              {isAuthenticated ? (
                <Button variant="ghost" size="sm" onClick={onSignOut}>
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={onSignIn}>
                    Sign In
                  </Button>
                  <Button variant="primary" size="sm" onClick={onSignIn}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
