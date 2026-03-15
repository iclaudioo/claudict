"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <Button variant="ghost" onClick={handleLogout} className="text-muted text-xs">
      Leave facility
    </Button>
  );
}
