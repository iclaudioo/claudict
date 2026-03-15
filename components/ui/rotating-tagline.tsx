"use client";

import { useState, useEffect } from "react";

const TAGLINES = [
  "A support community for developers who said \"just one more prompt\" 14 hours ago.",
  "Where \"I can stop anytime\" meets \"let me just refactor this one thing.\"",
  "Group therapy for people whose git log is longer than their sleep log.",
  "The only rehab where the patients keep building things during treatment.",
  "Founded by someone who used Claude Code to build a site about Claude Code addiction.",
  "Free admission. Leaving is the hard part.",
  "Your IDE is not a therapist. We are. (We are also not therapists.)",
  "97% of our patients relapse within 24 hours. The other 3% are lying.",
  "A safe space to admit you mass-prompted. Judgment-free. Mostly.",
  "For developers who think \"context window\" is a lifestyle, not a feature.",
];

export function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Random starting index
    setIndex(Math.floor(Math.random() * TAGLINES.length));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % TAGLINES.length);
        setVisible(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className={`text-sm text-muted mt-5 max-w-md mx-auto leading-relaxed transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {TAGLINES[index]}
    </p>
  );
}
