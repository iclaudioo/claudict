import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { VoteButton } from "@/components/evidence/vote-button";
import { SubmitEvidenceForm } from "./submit-form";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clinical evidence | Claudict Recovery Center",
  description: "Documented cases of severe Claude Code addiction.",
};

const PER_PAGE = 20;

export default async function ClinicalEvidencePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const sort = params.sort === "newest" ? "newest" : "votes";

  const supabase = await createClient();
  const user = await getUser();

  const query = supabase
    .from("evidence")
    .select("*, profiles(username)", { count: "exact" })
    .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

  if (sort === "newest") {
    query.order("created_at", { ascending: false });
  } else {
    query.order("vote_count", { ascending: false });
  }

  const { data: evidenceItems, count } = await query;
  const totalPages = Math.ceil((count || 0) / PER_PAGE);

  // Get user's votes
  let userVotes: Set<string> = new Set();
  if (user && evidenceItems) {
    const { data: votes } = await supabase
      .from("evidence_votes")
      .select("evidence_id")
      .eq("user_id", user.id)
      .in(
        "evidence_id",
        evidenceItems.map((e: any) => e.id)
      );
    if (votes) {
      userVotes = new Set(votes.map((v: any) => v.evidence_id));
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-[3px] text-accent mb-2">
        Clinical evidence
      </p>
      <h1 className="text-2xl font-serif mb-6">
        Documented cases
      </h1>

      {/* Sort toggle */}
      <div className="flex gap-2 mb-6">
        <Link
          href="/clinical-evidence?sort=votes"
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            sort === "votes"
              ? "border-accent text-accent"
              : "border-border text-muted hover:text-text"
          }`}
        >
          Most concerning
        </Link>
        <Link
          href="/clinical-evidence?sort=newest"
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            sort === "newest"
              ? "border-accent text-accent"
              : "border-border text-muted hover:text-text"
          }`}
        >
          Newest
        </Link>
      </div>

      {user && <SubmitEvidenceForm />}

      {evidenceItems && evidenceItems.length > 0 ? (
        <div className="space-y-4">
          {evidenceItems.map((item: any) => (
            <Card key={item.id}>
              <img
                src={item.image_url}
                alt={item.description}
                className="w-full rounded-md mb-3 border border-border"
                loading="lazy"
              />
              <p className="text-sm">{item.description}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-muted">
                  {item.profiles?.username || "anonymous"}
                  {" \u00b7 "}
                  {timeAgo(item.created_at)}
                </p>
                <VoteButton
                  evidenceId={item.id}
                  voteCount={item.vote_count}
                  hasVoted={userVotes.has(item.id)}
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No evidence submitted yet."
          description="The patients are covering their tracks."
        />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/clinical-evidence"
        searchParams={{ sort }}
      />
    </div>
  );
}
