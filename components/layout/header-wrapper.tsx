"use client";

import { useEffect, useState } from "react";

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-bg/80 backdrop-blur-lg transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-border shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      {children}
    </header>
  );
}
