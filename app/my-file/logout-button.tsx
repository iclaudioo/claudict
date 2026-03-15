"use client";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <a href="/auth/signout">
      <Button variant="ghost" className="text-muted text-xs">
        Leave facility
      </Button>
    </a>
  );
}
