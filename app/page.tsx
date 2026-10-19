import { Home } from "@/components/home.tsx";
import { latestVersion } from "@/lib/site.ts";

export default async function Page() {
  return <Home version={await latestVersion()} />;
}
