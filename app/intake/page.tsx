import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { IntakeForm } from "./intake-form";

export const metadata: Metadata = {
  title: "Intake | Claudict Recovery Center",
  description: "Begin your admission process.",
};

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (profile) {
    redirect("/my-file");
  }

  const params = await searchParams;

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[3px] text-accent mb-3">
          Intake process
        </p>
        <h1 className="text-2xl font-serif text-text">
          Admitting you have a problem is the first step.
        </h1>
        <p className="text-sm text-muted mt-3">
          Please complete this form honestly. Denial only prolongs treatment.
        </p>
      </div>

      {params.error === "username_taken" && (
        <p className="text-sm text-red-500 mb-4 text-center">
          That patient alias is already in use. Try another.
        </p>
      )}
      {params.error === "unknown" && (
        <p className="text-sm text-red-500 mb-4 text-center">
          An error occurred during intake. Please try again.
        </p>
      )}

      <IntakeForm />
    </div>
  );
}
