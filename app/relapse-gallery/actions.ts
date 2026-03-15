"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitShowcase(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const techStackRaw = formData.get("tech_stack") as string;
  const projectUrl = (formData.get("project_url") as string)?.trim();
  const imageFile = formData.get("image") as File;

  // Server-side validation
  if (!title || title.length > 100) return;
  if (!description || description.length > 2000) return;

  const techStack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  // Rate limit: 5 min
  const { data: lastShowcase } = await supabase
    .from("showcases")
    .select("created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (lastShowcase) {
    const elapsed = Date.now() - new Date(lastShowcase.created_at).getTime();
    if (elapsed < 300000) return;
  }

  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() || "png";
    const path = `showcases/${user.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(path, imageFile, { contentType: imageFile.type });

    if (!uploadError) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("uploads").getPublicUrl(path);
      imageUrl = publicUrl;
    }
  }

  await supabase.from("showcases").insert({
    author_id: user.id,
    title,
    description,
    tech_stack: techStack,
    project_url: projectUrl || null,
    image_url: imageUrl,
  });

  // Badge check: show_off (5 showcases)
  const { count } = await supabase
    .from("showcases")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id);

  if (count === 5) {
    const serviceClient = createServiceClient();
    const { data: badge } = await serviceClient
      .from("badges")
      .select("id")
      .eq("slug", "show_off")
      .single();
    if (badge) {
      await serviceClient.from("profile_badges").upsert(
        { profile_id: user.id, badge_id: badge.id },
        { onConflict: "profile_id,badge_id", ignoreDuplicates: true }
      );
    }
  }

  revalidatePath("/relapse-gallery");
}
