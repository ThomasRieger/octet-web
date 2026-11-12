import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://thomasrieger.github.io/octet-web/", changeFrequency: "weekly", priority: 1 }];
}
