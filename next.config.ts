import type { NextConfig } from "next";

// Static site: `next build` writes plain HTML to out/, host it anywhere (GitHub Pages, Vercel, Cloudflare).
const config: NextConfig = {
  output: "export",
  trailingSlash: true,   // th/index.html, so /th/ works on any static host
  images: { unoptimized: true },
};

export default config;
