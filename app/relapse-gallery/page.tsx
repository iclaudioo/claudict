import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { SubmitShowcaseForm } from "./submit-form";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Relapse gallery | Claudict Recovery Center",
  description: "Projects built during coding episodes.",
};

const PER_PAGE = 12;

export default async function RelapseGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const tag = params.tag;

  const supabase = await createClient();
  const user = await getUser();

  let query = supabase
    .from("showcases")
    .select("*, profiles(username)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

  if (tag) {
    query = query.contains("tech_stack", [tag]);
  }

  const { data: showcases, count } = await query;
  const totalPages = Math.ceil((count || 0) / PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-[3px] text-accent mb-2">
        Relapse gallery
      </p>
      <h1 className="text-2xl font-heading mb-6">
        Projects built during episodes
      </h1>

      {user && <SubmitShowcaseForm />}

      <RevealOnScroll>
        {showcases && showcases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showcases.map((showcase: any) => (
              <Card key={showcase.id} variant="showcase" className="flex flex-col card-img-zoom">
                {showcase.image_url ? (
                  <img
                    src={showcase.image_url}
                    alt={showcase.title}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-40 bg-surface-elevated flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, transparent, transparent 10px, var(--color-border) 10px, var(--color-border) 11px)",
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      className="text-muted opacity-60"
                    >
                      <text x="4" y="30" fontSize="28" fontFamily="monospace" fill="currentColor">
                        {"{ }"}
                      </text>
                    </svg>
                  </div>
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-medium text-sm">{showcase.title}</h3>
                  <p className="text-xs text-muted mt-1 flex-1">
                    {showcase.description}
                  </p>
                  {showcase.tech_stack && showcase.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {showcase.tech_stack.map((tech: string) => (
                        <BadgePill key={tech}>{tech}</BadgePill>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted">
                      {showcase.profiles?.username || "anonymous"}
                      {" \u00b7 "}
                      {timeAgo(showcase.created_at)}
                    </p>
                    {showcase.project_url && (
                      <a
                        href={showcase.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:text-accent-hover transition-colors"
                      >
                        View project
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            variant="gallery"
            title="No relapses documented."
            description="Everyone is staying clean. (Sure they are.)"
          />
        )}
      </RevealOnScroll>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/relapse-gallery"
        searchParams={tag ? { tag } : {}}
      />
    </div>
  );
}
