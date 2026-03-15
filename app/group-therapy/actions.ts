"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const VALID_CATEGORIES = [
  "relapse_stories",
  "enablers_corner",
  "intervention",
  "success_stories",
  "meta",
] as const;

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const title = (formData.get("title") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();
  const category = formData.get("category") as string;

  // Server-side validation
  if (!title || title.length > 200) return;
  if (!body || body.length > 10000) return;
  if (!VALID_CATEGORIES.includes(category as any)) return;

  // Rate limit: check last post time
  const { data: lastPost } = await supabase
    .from("posts")
    .select("created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (lastPost) {
    const elapsed = Date.now() - new Date(lastPost.created_at).getTime();
    if (elapsed < 30000) return;
  }

  const { data: post } = await supabase
    .from("posts")
    .insert({ author_id: user.id, title, body, category })
    .select("id")
    .single();

  // Badge check: enabler (10 posts in enablers_corner)
  if (category === "enablers_corner") {
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("author_id", user.id)
      .eq("category", "enablers_corner");

    if (count === 10) {
      const serviceClient = createServiceClient();
      const { data: badge } = await serviceClient
        .from("badges")
        .select("id")
        .eq("slug", "enabler")
        .single();
      if (badge) {
        await serviceClient.from("profile_badges").upsert(
          { profile_id: user.id, badge_id: badge.id },
          { onConflict: "profile_id,badge_id", ignoreDuplicates: true }
        );
      }
    }
  }

  revalidatePath("/group-therapy");
  if (post) redirect(`/group-therapy/${post.id}`);
}
