import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/admitted"],
    },
    sitemap: "https://claudict.com/sitemap.xml",
  };
}
