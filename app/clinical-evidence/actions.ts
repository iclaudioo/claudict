"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitEvidence(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const description = (formData.get("description") as string)?.trim();
  const imageFile = formData.get("image") as File;

  if (!description || description.length > 500 || !imageFile || imageFile.size === 0) {
    return { error: "Description and image are required" };
  }

  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  if (!ALLOWED_TYPES.includes(imageFile.type) || imageFile.size > MAX_SIZE) {
    return { error: "Invalid file type or size. Max 5MB, PNG/JPEG/WebP only." };
  }

  // Rate limit: 5 min cooldown
  const { data: lastEvidence } = await supabase
    .from("evidence")
    .select("created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (lastEvidence) {
    const elapsed = Date.now() - new Date(lastEvidence.created_at).getTime();
    if (elapsed < 300000) return;
  }

  // Upload image
  const ext = imageFile.name.split(".").pop() || "png";
  const path = `evidence/${user.id}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("uploads")
    .upload(path, imageFile, { contentType: imageFile.type });

  if (uploadError) return { error: "Upload failed" };

  const {
    data: { publicUrl },
  } = supabase.storage.from("uploads").getPublicUrl(path);

  await supabase.from("evidence").insert({
    author_id: user.id,
    image_url: publicUrl,
    description,
  });

  // Badge check: evidence_collector (5 submissions)
  const { count } = await supabase
    .from("evidence")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id);

  if (count === 5) {
    const serviceClient = createServiceClient();
    const { data: badge } = await serviceClient
      .from("badges")
      .select("id")
      .eq("slug", "evidence_collector")
      .single();
    if (badge) {
      await serviceClient.from("profile_badges").upsert(
        { profile_id: user.id, badge_id: badge.id },
        { onConflict: "profile_id,badge_id", ignoreDuplicates: true }
      );
    }
  }

  revalidatePath("/clinical-evidence");
}

export async function toggleVote(evidenceId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Check if already voted
  const { data: existing } = await supabase
    .from("evidence_votes")
    .select("evidence_id")
    .eq("evidence_id", evidenceId)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    await supabase
      .from("evidence_votes")
      .delete()
      .eq("evidence_id", evidenceId)
      .eq("user_id", user.id);
  } else {
    await supabase
      .from("evidence_votes")
      .insert({ evidence_id: evidenceId, user_id: user.id });
  }

  // Badge check: deeply_concerning (100 votes on single evidence)
  if (!existing) {
    const { data: evidence } = await supabase
      .from("evidence")
      .select("vote_count, author_id")
      .eq("id", evidenceId)
      .single();

    if (evidence && evidence.vote_count >= 100) {
      const serviceClient = createServiceClient();
      const { data: badge } = await serviceClient
        .from("badges")
        .select("id")
        .eq("slug", "deeply_concerning")
        .single();
      if (badge) {
        await serviceClient.from("profile_badges").upsert(
          { profile_id: evidence.author_id, badge_id: badge.id },
          { onConflict: "profile_id,badge_id", ignoreDuplicates: true }
        );
      }
    }
  }

  revalidatePath("/clinical-evidence");
}
