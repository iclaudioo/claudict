"use client";

import { useState, useEffect } from "react";

const DISCLAIMERS = [
  "No actual recovery has ever been achieved at this facility.",
  "Side effects may include mass-prompting, refactoring addiction, and spontaneous SaaS creation.",
  "This facility is not responsible for any code written between 2am and 6am.",
  "Patients who claim to be \"clean\" are under clinical observation for denial.",
  "Warning: prolonged exposure to this community may increase your API bill.",
  "The management accepts no liability for marriages ruined by \"just one more prompt.\"",
  "If you experience clean code lasting more than 4 hours, consult your tech lead immediately.",
  "Past relapse performance is not indicative of future relapse results. (It is.)",
  "This site was built during a relapse. The irony is not lost on us.",
  "Ask your doctor if Claude Code is right for you. (Do not ask your doctor.)",
];

export function RotatingDisclaimer() {
  const [text, setText] = useState(DISCLAIMERS[0]);

  useEffect(() => {
    setText(DISCLAIMERS[Math.floor(Math.random() * DISCLAIMERS.length)]);
  }, []);

  return (
    <p className="text-[10px] text-muted/60 max-w-sm text-center md:text-left leading-relaxed">
      {text}
    </p>
  );
}
