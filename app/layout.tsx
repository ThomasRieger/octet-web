import type { Metadata } from "next";
import { Anuphan, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { dict } from "@/lib/i18n.ts";
import "./globals.css";

// Headings: Geist, with Anuphan for Thai. Body stays Segoe UI like the app; Thai body falls through to Anuphan.
// Anuphan isn't preloaded: its unicode-range means English readers never download it.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const anuphan = Anuphan({ subsets: ["thai"], variable: "--font-anuphan", display: "swap", preload: false });

export const metadata: Metadata = { title: "Octet", description: dict.en.meta.description };

// Runs before first paint: pick the saved language, else Thai for Thai browsers. A Thai page stays hidden
// until React has swapped the text in (or 1.2s pass, so a script failure never leaves it blank).
const pickLang = `try{var l=localStorage.getItem("lang")||(/^th\\b/i.test(navigator.language)?"th":"en");if(l==="th"){var d=document.documentElement;d.lang="th";d.dataset.pending="";setTimeout(function(){delete d.dataset.pending},1200)}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${anuphan.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickLang }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
