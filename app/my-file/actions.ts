"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function recordRelapse() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("last_relapse_at")
    .eq("id", user.id)
    .single();

  if (!profile) return;

  // Rate limit: 1 per minute
  const lastRelapse = new Date(profile.last_relapse_at).getTime();
  if (Date.now() - lastRelapse < 60000) return;

  // Atomic increment via RPC
  const { data: newCount } = await supabase.rpc("increment_relapse_count", {
    user_id: user.id,
  });

  if (!newCount) return;

  // Badge checks
  const badgeSlugs: string[] = [];
  if (newCount === 1) badgeSlugs.push("first_relapse");
  if (newCount === 10) badgeSlugs.push("serial_relapser");
  if (newCount === 50) badgeSlugs.push("terminal_case");

  if (badgeSlugs.length > 0) {
    const serviceClient = createServiceClient();
    const { data: badges } = await serviceClient
      .from("badges")
      .select("id, slug")
      .in("slug", badgeSlugs);

    if (badges && badges.length > 0) {
      await serviceClient.from("profile_badges").upsert(
        badges.map((b) => ({ profile_id: user.id, badge_id: b.id })),
        { onConflict: "profile_id,badge_id", ignoreDuplicates: true }
      );
    }
  }

  revalidatePath("/my-file");
}
