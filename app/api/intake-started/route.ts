import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const service = createServiceClient();

  const { data: newValue } = await service.rpc("increment_site_stat", {
    stat_key: "intake_starts",
  });

  return NextResponse.json({ count: newValue || 0 });
}
