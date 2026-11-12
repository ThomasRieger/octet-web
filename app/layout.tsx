import type { Metadata } from "next";
import { Anuphan, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { dict } from "@/lib/i18n.ts";
import "./globals.css";

// Headings: Geist, with Anuphan for Thai. Body stays Segoe UI like the app; Thai body falls through to Anuphan.
// Anuphan isn't preloaded: its unicode-range means English readers never download it.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const anuphan = Anuphan({ subsets: ["thai"], variable: "--font-anuphan", display: "swap", preload: false });

// The page's name in search results says what Octet is, for people who've never heard the name.
const site = "https://thomasrieger.github.io/octet-web/";
const title = "Octet: free, open-source IP and DNS changer for Windows and macOS";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description: dict.en.meta.description,
  alternates: { canonical: site },
  openGraph: { type: "website", url: site, siteName: "Octet", title, description: dict.en.meta.description, images: [{ url: "screens/ip.webp", alt: "Octet on the IP & DNS tab" }] },
  twitter: { card: "summary_large_image", title, description: dict.en.meta.description, images: ["screens/ip.webp"] },
};

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
