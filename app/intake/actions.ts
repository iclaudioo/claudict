"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function submitIntake(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const username = (formData.get("username") as string)?.trim();
  const drugOfChoice = (formData.get("drug_of_choice") as string)?.trim();
  const hoursPerDay = parseInt(formData.get("hours_per_day") as string, 10);
  const anyoneConcerned = formData.get("anyone_concerned") === "on";

  // Server-side validation
  if (!username || username.length < 3 || username.length > 30) {
    redirect("/intake?error=unknown");
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    redirect("/intake?error=unknown");
  }
  if (!drugOfChoice) {
    redirect("/intake?error=unknown");
  }
  if (isNaN(hoursPerDay) || hoursPerDay < 1 || hoursPerDay > 24) {
    redirect("/intake?error=unknown");
  }

  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    username,
    drug_of_choice: drugOfChoice,
    hours_per_day: hoursPerDay,
    anyone_concerned: anyoneConcerned,
  });

  if (error) {
    if (error.code === "23505") {
      redirect("/intake?error=username_taken");
    }
    redirect("/intake?error=unknown");
  }

  // Award "First Admission" badge
  const serviceClient = createServiceClient();
  const { data: badge } = await serviceClient
    .from("badges")
    .select("id")
    .eq("slug", "first_admission")
    .single();

  if (badge) {
    await serviceClient.from("profile_badges").upsert(
      { profile_id: user.id, badge_id: badge.id },
      { onConflict: "profile_id,badge_id", ignoreDuplicates: true }
    );
  }

  redirect("/admitted");
}
