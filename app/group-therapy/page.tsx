import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { CATEGORIES } from "@/lib/constants";
import { NewPostForm } from "./new-post-form";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Group therapy | Claudict Recovery Center",
  description: "Therapy sessions for Claude Code addicts.",
};

const PER_PAGE = 20;

export default async function GroupTherapyPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const category = params.category;

  const supabase = await createClient();
  const user = await getUser();

  let query = supabase
    .from("posts")
    .select("id, title, category, reply_count, last_activity_at, profiles(username)", {
      count: "exact",
    })
    .order("last_activity_at", { ascending: false })
    .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

  if (category && CATEGORIES[category]) {
    query = query.eq("category", category);
  }

  const { data: posts, count } = await query;
  const totalPages = Math.ceil((count || 0) / PER_PAGE);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-[3px] text-accent mb-2">
        Group therapy
      </p>
      <h1 className="text-2xl font-serif mb-6">Therapy sessions</h1>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/group-therapy"
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            !category
              ? "border-accent text-accent"
              : "border-border text-muted hover:text-text"
          }`}
        >
          All
        </Link>
        {Object.entries(CATEGORIES).map(([key, label]) => (
          <Link
            key={key}
            href={`/group-therapy?category=${key}`}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              category === key
                ? "border-accent text-accent"
                : "border-border text-muted hover:text-text"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {user && <NewPostForm />}

      {/* Posts */}
      {posts && posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/group-therapy/${post.id}`}>
              <Card className="hover:border-accent/30 transition-colors">
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-muted mt-1.5">
                  {CATEGORIES[post.category] || post.category}
                  {" \u00b7 "}
                  {post.profiles?.username || "unknown"}
                  {" \u00b7 "}
                  {post.reply_count} replies
                  {" \u00b7 "}
                  {timeAgo(post.last_activity_at)}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No sessions recorded."
          description="The patients are in denial. Be the first to share."
        />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/group-therapy"
        searchParams={category ? { category } : {}}
      />
    </div>
  );
}
