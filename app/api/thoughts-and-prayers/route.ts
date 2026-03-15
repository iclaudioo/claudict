import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_stats")
    .select("value")
    .eq("key", "thoughts_and_prayers")
    .single();

  return NextResponse.json({ count: data?.value || 0 });
}

export async function POST() {
  const service = createServiceClient();

  // Increment via RPC or raw update
  const { data: current } = await service
    .from("site_stats")
    .select("value")
    .eq("key", "thoughts_and_prayers")
    .single();

  const newValue = (current?.value || 0) + 1;

  await service
    .from("site_stats")
    .update({ value: newValue, updated_at: new Date().toISOString() })
    .eq("key", "thoughts_and_prayers");

  return NextResponse.json({ count: newValue });
}
