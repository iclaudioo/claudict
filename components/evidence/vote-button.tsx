"use client";

import { toggleVote } from "@/app/clinical-evidence/actions";
import { useState } from "react";

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

  async function handleVote() {
    setPending(true);
    await toggleVote(evidenceId);
    setPending(false);
  }

  return (
    <button
      onClick={handleVote}
      disabled={pending}
      className={`text-xs px-3 py-1 rounded-full border transition-colors ${
        hasVoted
          ? "border-accent text-accent bg-accent/10"
          : "border-border text-muted hover:text-accent hover:border-accent/30"
      }`}
    >
      {voteCount} deeply concerning
    </button>
  );
}
