import type { NextConfig } from "next";

// "/octet-web" when served from <user>.github.io/octet-web (set by the deploy workflow), "" locally.
const basePath = process.env.BASE_PATH ?? "";

// Static site: `next build` writes plain HTML to out/, which the deploy workflow publishes to GitHub Pages.
const config: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },   // for plain <img src> paths, which basePath doesn't rewrite
  images: { unoptimized: true },
};

export default config;
