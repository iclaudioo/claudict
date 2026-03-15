"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollProgressOptions {
  disableOnMobile?: boolean;
  /** Start progress at 0 regardless of initial position.
   *  Use for elements visible on page load (hero, etc). */
  startAtZero?: boolean;
}

export function useScrollProgress(options?: ScrollProgressOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);
  const initialOffset = useRef<number | null>(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 0 = element just entering bottom, 1 = element leaving top
    const total = windowHeight + rect.height;
    const current = windowHeight - rect.top;
    const raw = Math.max(0, Math.min(1, current / total));

    if (options?.startAtZero) {
      // On first call, capture the initial progress as baseline
      if (initialOffset.current === null) {
        initialOffset.current = raw;
      }
      // Remap so progress=0 at initial position, 1 at leaving
      const range = 1 - initialOffset.current;
      const p = range > 0
        ? Math.max(0, Math.min(1, (raw - initialOffset.current) / range))
        : 0;
      setProgress(p);
    } else {
      setProgress(raw);
    }
  }, [options?.startAtZero]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgress(options?.startAtZero ? 0 : 1);
      return;
    }

    if (options?.disableOnMobile && window.innerWidth < 768) {
      setProgress(options?.startAtZero ? 0 : 0.5);
      return;
    }

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update, options?.disableOnMobile, options?.startAtZero]);

  return { ref, progress };
}
