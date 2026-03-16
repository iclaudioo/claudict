"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!localStorage.getItem("cookie_acknowledged")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        acknowledge();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  function acknowledge() {
    localStorage.setItem("cookie_acknowledged", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <div className="rounded-lg border border-border bg-surface shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted leading-relaxed flex-1">
            This facility uses functional cookies for authentication only. No
            tracking. No ads. Just session management.{" "}
            <Link
              href="/cookies"
              className="text-accent hover:underline"
            >
              Full disclosure
            </Link>
          </p>
          <button
            ref={buttonRef}
            onClick={acknowledge}
            className="shrink-0 font-mono text-[10px] uppercase tracking-[2px] px-4 py-2 rounded border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
