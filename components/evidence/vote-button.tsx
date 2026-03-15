"use client";

import { toggleVote } from "@/app/clinical-evidence/actions";
import { useState, useRef } from "react";

export function VoteButton({
  evidenceId,
  voteCount,
  hasVoted,
}: {
  evidenceId: string;
  voteCount: number;
  hasVoted: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  async function handleVote() {
    setPending(true);

    // Trigger bounce animation on the button
    setBouncing(true);
    setTimeout(() => setBouncing(false), 300);

    // Trigger flash on the count
    setFlashing(true);
    setTimeout(() => setFlashing(false), 600);

    await toggleVote(evidenceId);
    setPending(false);
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleVote}
      disabled={pending}
      className={`text-xs px-3 py-1 rounded-full border transition-colors ${
        bouncing ? "animate-vote-bounce" : ""
      } ${
        hasVoted
          ? "border-accent text-accent bg-accent/10"
          : "border-border text-muted hover:text-accent hover:border-accent/30"
      }`}
    >
      <span className={flashing ? "animate-flash-accent" : ""}>
        {voteCount}
      </span>{" "}
      deeply concerning
    </button>
  );
}
