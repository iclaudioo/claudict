"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      setProgress(0);
      return;
    }
    setProgress(Math.min(1, scrollTop / docHeight));
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [update]);

  return (
    <div className="fixed top-14 left-0 right-0 h-[2px] z-49 pointer-events-none">
      <div
        className="h-full bg-accent transition-none"
        style={{
          width: `${progress * 100}%`,
          boxShadow: progress > 0 ? "0 0 8px rgba(217, 119, 87, 0.4)" : "none",
        }}
      />
      {progress >= 0.98 && (
        <div className="absolute right-2 -top-5 text-[9px] font-mono text-accent opacity-60">
          Recovery progress: relapsed
        </div>
      )}
    </div>
  );
}
