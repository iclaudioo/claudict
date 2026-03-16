import { createClient, createServiceClient } from "@/lib/supabase/server";
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

  const { data: newValue } = await service.rpc("increment_site_stat", {
    stat_key: "thoughts_and_prayers",
  });

  return NextResponse.json({ count: newValue || 0 });
}
