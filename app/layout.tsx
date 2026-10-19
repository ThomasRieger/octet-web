import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octet: switch IPv4 and DNS on Windows in seconds",
  description: "A fast, modern take on Simple IP Config, written in Rust. One portable .exe, no installer, no telemetry.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
