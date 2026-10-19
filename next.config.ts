import type { NextConfig } from "next";

// Static site: `next build` writes plain HTML to out/, host it anywhere (GitHub Pages, Vercel, Cloudflare).
const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default config;
