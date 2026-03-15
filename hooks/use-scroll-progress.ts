"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollProgress(options?: { disableOnMobile?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 0 = element just entering bottom, 1 = element leaving top
    const total = windowHeight + rect.height;
    const current = windowHeight - rect.top;
    const p = Math.max(0, Math.min(1, current / total));

    setProgress(p);
  }, []);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    // Optionally disable on mobile
    if (options?.disableOnMobile && window.innerWidth < 768) {
      setProgress(0.5);
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
  }, [update, options?.disableOnMobile]);

  return { ref, progress };
}
