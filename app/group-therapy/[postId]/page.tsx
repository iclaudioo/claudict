import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";
import { timeAgo, formatDate } from "@/lib/utils";
import { CommentForm } from "./comment-form";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title")
    .eq("id", postId)
    .single();

  return {
    title: post
      ? `${post.title} | Claudict Recovery Center`
      : "Session not found",
  };
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase = await createClient();
  const user = await getUser();

  const { data: post } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("id", postId)
    .single();

  if (!post) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(username)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/group-therapy"
        className="text-xs text-muted hover:text-text transition-colors"
      >
        &larr; Back to sessions
      </Link>

      <div className="mt-6">
        <span className="text-xs text-accent uppercase tracking-wider">
          {CATEGORIES[post.category] || post.category}
        </span>
        <h1 className="text-xl font-semibold mt-1">{post.title}</h1>
        <p className="text-xs text-muted mt-1">
          {post.profiles?.username || "unknown"}
          {" \u00b7 "}
          {formatDate(post.created_at)}
        </p>
      </div>

      <Card className="mt-4">
        <p className="text-sm whitespace-pre-wrap">{post.body}</p>
      </Card>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-xs uppercase tracking-[2px] text-muted mb-4">
          Responses ({comments?.length || 0})
        </h2>

        {comments && comments.length > 0 ? (
          <div className="space-y-3">
            {comments.map((comment: any) => (
              <Card key={comment.id} className="py-3">
                <p className="text-sm whitespace-pre-wrap">{comment.body}</p>
                <p className="text-xs text-muted mt-2">
                  {comment.profiles?.username || "unknown"}
                  {" \u00b7 "}
                  {timeAgo(comment.created_at)}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            No responses yet. The group is processing.
          </p>
        )}

        {user && <CommentForm postId={postId} />}
      </div>
    </div>
  );
}
