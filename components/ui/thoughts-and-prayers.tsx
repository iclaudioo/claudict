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
    <div className="text-center py-6 border-t border-border">
      <button
        onClick={sendPrayer}
        disabled={hasPrayed || sending}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono
          transition-all duration-300
          ${hasPrayed
            ? "text-muted/60 cursor-default"
            : "text-muted hover:text-accent hover:bg-accent/5 cursor-pointer active:scale-95"
          }
        `}
      >
        <span className={`text-lg ${sent ? "animate-bounce" : ""}`}>
          🙏
        </span>
        {hasPrayed ? "Prayer received" : sending ? "Sending..." : "Send thoughts & prayers"}
      </button>
      {count !== null && (
        <p className="text-[11px] text-muted/50 font-mono mt-1.5">
          {count.toLocaleString()} thoughts & prayers sent.
          {" "}None have worked.
        </p>
      )}
    </div>
  );
}
