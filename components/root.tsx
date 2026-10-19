import type { Metadata } from "next";
import { Anuphan, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { dict, type Lang } from "@/lib/i18n.ts";
import "@/app/globals.css";

// Headings: Geist, with Anuphan for Thai. Body stays Segoe UI like the app; Thai body falls through to Anuphan.
// Anuphan isn't preloaded: its unicode-range keeps the English page from downloading it.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const anuphan = Anuphan({ subsets: ["thai"], variable: "--font-anuphan", display: "swap", preload: false });

export const meta = (lang: Lang): Metadata => ({
  title: dict[lang].meta.title,
  description: dict[lang].meta.description,
  alternates: { languages: { en: "/", th: "/th/" } },
});

// Each language is its own root layout, so <html lang> is right on both pages.
export function Root({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${geist.variable} ${anuphan.variable}`}>
      <body>{children}</body>
    </html>
  );
}
