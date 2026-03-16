import type { MetadataRoute } from "next";
import { createServiceClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://claudict.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/group-therapy`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/clinical-evidence`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/relapse-gallery`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/sponsor`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/intervention`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/intake`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const supabase = createServiceClient();

  // Fetch public profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select("username, updated_at");

  const profileRoutes: MetadataRoute.Sitemap = (profiles ?? []).map((p) => ({
    url: `${baseUrl}/patient/${p.username}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Fetch forum posts
  const { data: posts } = await supabase
    .from("posts")
    .select("id, updated_at");

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${baseUrl}/group-therapy/${p.id}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...profileRoutes, ...postRoutes];
}
