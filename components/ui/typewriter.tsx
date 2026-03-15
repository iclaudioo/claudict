"use client";
import { useState, useEffect } from "react";

export function Typewriter({ text, speed = 50, delay = 0, className }: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      const timeout = setTimeout(() => setShowCursor(false), 2000);
      return () => clearTimeout(timeout);
    }
    const interval = setInterval(() => {
      setDisplayed(prev => text.slice(0, prev.length + 1));
    }, speed);
    return () => clearInterval(interval);
  }, [started, displayed, text, speed]);

  if (!started) return <span className={className}>&nbsp;</span>;

  return (
    <span className={className}>
      {displayed}
      {showCursor && <span className="animate-blink">|</span>}
    </span>
  );
}
