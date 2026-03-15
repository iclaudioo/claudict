"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ShareButton({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  async function copyLink() {
    const url = `${window.location.origin}/patient/${username}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadCard() {
    const url = `/api/patient-card/${username}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `claudict-${username}.png`;
    link.click();
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative inline-block">
      <Button
        variant="secondary"
        onClick={() => setOpen(!open)}
        className="gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share your file
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-surface border border-border rounded-lg shadow-lg py-1 z-50 animate-slide-down">
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-surface-elevated transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copied ? "Link copied!" : "Copy profile link"}
          </button>
          <button
            onClick={downloadCard}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-surface-elevated transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download patient card
          </button>
        </div>
      )}
    </div>
  );
}
