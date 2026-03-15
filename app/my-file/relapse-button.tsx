"use client";

import { Button } from "@/components/ui/button";
import { recordRelapse } from "./actions";
import { useState } from "react";

export function RelapseButton() {
  const [pending, setPending] = useState(false);

  async function handleRelapse() {
    setPending(true);
    await recordRelapse();
    setPending(false);
  }

  return (
    <Button
      onClick={handleRelapse}
      disabled={pending}
      variant="secondary"
      className="border-accent/30 hover:border-accent text-accent"
    >
      {pending ? "Recording..." : "I relapsed"}
    </Button>
  );
}
