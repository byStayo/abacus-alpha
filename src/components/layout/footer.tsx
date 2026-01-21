import * as React from "react";
import Link from "next/link";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const toolsLinks: FooterLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analysis", label: "Analysis" },
  { href: "/alerts", label: "Alerts" },
  { href: "/news", label: "News Feed" },
];

const legalLinks: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookies", label: "Cookie Policy" },
];

const socialLinks: FooterLink[] = [
  { href: "https://twitter.com/abacusalpha", label: "Twitter" },
  { href: "https://linkedin.com/company/abacusalpha", label: "LinkedIn" },
  { href: "https://github.com/abacusalpha", label: "GitHub" },
  { href: "https://discord.gg/abacusalpha", label: "Discord" },
];

const footerSections: FooterSection[] = [
  { title: "Tools", links: toolsLinks },
  { title: "Legal", links: legalLinks },
  { title: "Social", links: socialLinks },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#312e81] bg-[#0f0d24]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-[#EAB308]">
                Abacus Alpha
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Advanced financial analytics and market intelligence platform for
              modern investors.
            </p>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#EAB308]">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#312e81] pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Abacus Alpha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
