"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createComment(postId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const body = (formData.get("body") as string)?.trim();
  if (!body || body.length > 5000) return;

  // Rate limit: 30s cooldown
  const { data: lastComment } = await supabase
    .from("comments")
    .select("created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (lastComment) {
    const elapsed = Date.now() - new Date(lastComment.created_at).getTime();
    if (elapsed < 30000) return;
  }

  await supabase.from("comments").insert({
    post_id: postId,
    author_id: user.id,
    body,
  });

  // Badge check: group_regular (50 comments)
  const { count } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id);

  if (count === 50) {
    const serviceClient = createServiceClient();
    const { data: badge } = await serviceClient
      .from("badges")
      .select("id")
      .eq("slug", "group_regular")
      .single();
    if (badge) {
      await serviceClient.from("profile_badges").upsert(
        { profile_id: user.id, badge_id: badge.id },
        { onConflict: "profile_id,badge_id", ignoreDuplicates: true }
      );
    }
  }

  revalidatePath(`/group-therapy/${postId}`);
}
