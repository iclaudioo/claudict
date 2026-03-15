"use client";

import { Button } from "@/components/ui/button";
import { recordRelapse } from "./actions";
import { useState, useRef } from "react";

export function RelapseButton() {
  const [pending, setPending] = useState(false);
  const [relapsed, setRelapsed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  async function handleRelapse() {
    setPending(true);

    // Trigger shake animation
    buttonRef.current?.classList.add("animate-shake");
    setTimeout(() => {
      buttonRef.current?.classList.remove("animate-shake");
    }, 400);

    await recordRelapse();
    setPending(false);
    setRelapsed(true);

    setTimeout(() => {
      setRelapsed(false);
    }, 2000);
  }

  return (
    <Button
      ref={buttonRef}
      onClick={handleRelapse}
      disabled={pending}
      variant="secondary"
      className={`border-accent/30 hover:border-accent text-accent ${
        relapsed ? "animate-pulse-accent" : ""
      }`}
    >
      {pending
        ? "Recording..."
        : relapsed
          ? "Relapse recorded. Again."
          : "I relapsed"}
    </Button>
  );
}
