"use client";

import { useState, useEffect } from "react";

export function ThoughtsAndPrayers() {
  const [count, setCount] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [hasPrayed, setHasPrayed] = useState(false);

  useEffect(() => {
    setHasPrayed(localStorage.getItem("thoughts_and_prayers") === "1");

    fetch("/api/thoughts-and-prayers")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  async function sendPrayer() {
    if (hasPrayed || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/thoughts-and-prayers", { method: "POST" });
      const data = await res.json();
      setCount(data.count);
      setSent(true);
      setHasPrayed(true);
      localStorage.setItem("thoughts_and_prayers", "1");
    } catch {
      // Fail silently
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="relative rounded-lg border border-border bg-surface-elevated/50 py-8 px-4 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-3">
          <span className="text-[10px] uppercase tracking-[3px] text-muted/50 font-mono">
            Community support
          </span>
        </div>

        <button
          onClick={sendPrayer}
          disabled={hasPrayed || sending}
          className={`
            inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md text-sm font-mono
            transition-all duration-300 border
            ${hasPrayed
              ? "text-muted/50 border-border cursor-default bg-transparent"
              : "text-text border-accent/30 hover:border-accent hover:bg-accent/5 cursor-pointer active:scale-95"
            }
          `}
        >
          <span className={`text-base ${sent ? "animate-bounce" : hasPrayed ? "opacity-40" : "animate-float"}`}>
            🙏
          </span>
          {hasPrayed ? "Prayer received. God has been notified." : sending ? "Channeling..." : "Send thoughts & prayers"}
        </button>

        {count !== null && (
          <p className="text-[10px] text-muted/40 font-mono mt-3 tracking-wide">
            {count.toLocaleString()} prayers sent to production. None have worked.
          </p>
        )}
      </div>
    </div>
  );
}
