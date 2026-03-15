import { createClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!profile) {
          // Increment intake_starts counter
          const service = createServiceClient();
          const { data: stat } = await service
            .from("site_stats")
            .select("value")
            .eq("key", "intake_starts")
            .single();

          await service
            .from("site_stats")
            .update({ value: (stat?.value || 0) + 1, updated_at: new Date().toISOString() })
            .eq("key", "intake_starts");

          return NextResponse.redirect(`${origin}/intake`);
        }

        return NextResponse.redirect(`${origin}/group-therapy`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/?error=auth`);
}
