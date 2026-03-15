"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

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
        <div className="absolute top-14 left-0 right-0 bg-bg border-b border-border px-4 py-4 space-y-3">
          <Link href="/group-therapy" onClick={() => setOpen(false)} className="block text-sm text-muted hover:text-text">
            Group therapy
          </Link>
          <Link href="/clinical-evidence" onClick={() => setOpen(false)} className="block text-sm text-muted hover:text-text">
            Evidence
          </Link>
          <Link href="/relapse-gallery" onClick={() => setOpen(false)} className="block text-sm text-muted hover:text-text">
            Relapses
          </Link>
          <Link href="/sponsor" onClick={() => setOpen(false)} className="block text-sm text-muted hover:text-text">
            Sponsor
          </Link>
          {isLoggedIn ? (
            <Link href="/my-file" onClick={() => setOpen(false)} className="block text-sm text-accent">
              My file
            </Link>
          ) : (
            <Link href="/intake" onClick={() => setOpen(false)} className="block text-sm text-accent">
              Intake
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
