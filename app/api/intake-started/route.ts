import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const service = createServiceClient();

  const { data: current } = await service
    .from("site_stats")
    .select("value")
    .eq("key", "intake_starts")
    .single();

  const newValue = (current?.value || 0) + 1;

  await service
    .from("site_stats")
    .update({ value: newValue, updated_at: new Date().toISOString() })
    .eq("key", "intake_starts");

  return NextResponse.json({ count: newValue });
}
