import type { ReactNode } from "react";
import { meta, Root } from "@/components/root.tsx";

export const metadata = meta("th");

export default function Layout({ children }: { children: ReactNode }) {
  return <Root lang="th">{children}</Root>;
}
