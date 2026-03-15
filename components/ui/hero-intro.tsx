"use client";

import { useState, useEffect, ReactNode } from "react";

const WELCOME = "Welcome to Claudict, the recovery center for AI addicts.";
const QUOTE = "The first step is admitting you have a problem.";

function highlightClaudict(text: string) {
  const parts = text.split(/(Claudict)/);
  return parts.map((part, i) =>
    part === "Claudict" ? <span key={i} className="text-accent">{part}</span> : part
  );
}

export function HeroIntro({ children }: { children?: ReactNode }) {
  const [typedChars, setTypedChars] = useState(0);
  const [doneWelcome, setDoneWelcome] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(WELCOME.length);
      setDoneWelcome(true);
      setShowQuote(true);
      setShowRest(true);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedChars(i);
      if (i >= WELCOME.length) {
        clearInterval(interval);
        setDoneWelcome(true);
        setTimeout(() => setShowQuote(true), 500);
        setTimeout(() => setShowRest(true), 1200);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="font-serif text-3xl md:text-4xl text-text max-w-2xl mx-auto leading-tight min-h-[2.5em] md:min-h-[2em]">
        {highlightClaudict(WELCOME.slice(0, typedChars))}
        {!doneWelcome && (
          <span className="animate-blink ml-0.5">|</span>
        )}
      </h1>
      <p
        className={`font-serif text-lg md:text-xl text-muted mt-4 max-w-lg mx-auto italic transition-all duration-700 ${
          showQuote
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        {QUOTE}
      </p>
      <div
        className={`transition-all duration-500 ${
          showRest ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
