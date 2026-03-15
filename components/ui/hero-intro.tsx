"use client";

import { useState, useEffect } from "react";

const HEADLINE = "The first step is admitting you have a problem.";

export function HeroIntro() {
  const [labelVisible, setLabelVisible] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLabelVisible(true);
      setTypedChars(HEADLINE.length);
      setDoneTyping(true);
      return;
    }

    // Step 1: Label flickers in
    const labelTimer = setTimeout(() => setLabelVisible(true), 200);

    // Step 2: Cursor appears, typing starts
    const cursorTimer = setTimeout(() => setShowCursor(true), 800);

    const typeTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTypedChars(i);
        if (i >= HEADLINE.length) {
          clearInterval(interval);
          setDoneTyping(true);
        }
      }, 45);
      return () => clearInterval(interval);
    }, 1000);

    return () => {
      clearTimeout(labelTimer);
      clearTimeout(cursorTimer);
      clearTimeout(typeTimer);
    };
  }, []);

  return (
    <>
      <p
        className={`text-xs uppercase tracking-[3px] text-accent mb-4 transition-all duration-500 ${
          labelVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-1"
        }`}
      >
        Recovery Center
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-text max-w-xl mx-auto leading-tight">
        {HEADLINE.slice(0, typedChars)}
        {showCursor && !doneTyping && (
          <span className="animate-blink ml-0.5">|</span>
        )}
        {typedChars === 0 && showCursor && (
          <span className="animate-blink">|</span>
        )}
      </h1>
    </>
  );
}
