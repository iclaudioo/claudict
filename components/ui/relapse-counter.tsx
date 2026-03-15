"use client";

import { useState, useEffect } from "react";

export function RelapseCounter({ lastRelapseAt }: { lastRelapseAt: string }) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    function update() {
      const diff = Date.now() - new Date(lastRelapseAt).getTime();
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setElapsed(
        `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lastRelapseAt]);

  return (
    <div className="text-center py-3 text-xs text-muted font-mono">
      <span className="text-muted/60">Time since last site-wide relapse: </span>
      <span className="text-accent font-bold">{elapsed}</span>
    </div>
  );
}
