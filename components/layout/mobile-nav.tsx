"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/group-therapy", label: "Group therapy" },
  { href: "/clinical-evidence", label: "Evidence" },
  { href: "/relapse-gallery", label: "Relapses" },
  { href: "/sponsor", label: "Sponsor" },
  { href: "/intervention", label: "Intervention" },
];

export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  const authItem = isLoggedIn
    ? { href: "/my-file", label: "My file" }
    : { href: "/intake", label: "Intake" };

  const allItems = [...NAV_ITEMS, authItem];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-muted hover:text-text transition-colors"
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-14 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute top-14 left-0 right-0 bg-bg border-b border-border px-4 py-4 space-y-3 z-50 animate-slide-down">
            {allItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block text-sm animate-fade-up ${
                  item === authItem
                    ? "text-accent"
                    : "text-muted hover:text-text"
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
