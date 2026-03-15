"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number | string;
  label: string;
  tooltip?: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
}

function parseValue(value: number | string): { num: number; suffix: string; decimals: number } {
  if (typeof value === "number") {
    return { num: value, suffix: "", decimals: 0 };
  }
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) {
    return { num: 0, suffix: String(value), decimals: 0 };
  }
  const numStr = match[1];
  const suffix = match[2];
  const decimalPart = numStr.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  return { num: parseFloat(numStr), suffix, decimals };
}

function AnimatedNumber({ value, animate }: { value: number | string; animate: boolean }) {
  const { num, suffix, decimals } = parseValue(value);
  const rafRef = useRef<number>(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * num);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, num]);

  const display = animate
    ? (current >= num ? num : current).toFixed(decimals) + suffix
    : "0" + suffix;

  return <>{display}</>;
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [primary, ...secondary] = stats;

  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12 items-center"
    >
      {/* Primary stat: patient count */}
      <div className="animate-fade-up group">
        <p className="text-[10px] uppercase tracking-[4px] text-muted font-mono mb-2">
          {primary.label}
        </p>
        <p className="text-6xl md:text-7xl font-heading text-accent tracking-tight">
          <AnimatedNumber value={primary.value} animate={visible} />
        </p>
        {primary.tooltip && (
          <p className="text-[10px] text-accent/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {primary.tooltip}
          </p>
        )}
      </div>

      {/* Secondary stats stacked */}
      <div className="flex flex-col gap-6">
        {secondary.map((stat, i) => (
          <div
            key={stat.label}
            className="animate-fade-up group"
            style={{ "--stagger": i + 1 } as React.CSSProperties}
          >
            <p className="text-[10px] uppercase tracking-[3px] text-muted font-mono mb-1">
              {stat.label}
            </p>
            <p className={`font-mono tracking-tight ${
              stat.label === "Relapse rate"
                ? "text-3xl text-accent"
                : "text-2xl text-text"
            }`}>
              <AnimatedNumber value={stat.value} animate={visible} />
            </p>
            {stat.tooltip && (
              <p className="text-[10px] text-accent/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {stat.tooltip}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
