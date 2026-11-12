import type { MetadataRoute } from "next";

export const dynamic = "force-static";   // a static export writes robots.txt once

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://octet-app.github.io/sitemap.xml" };
}
