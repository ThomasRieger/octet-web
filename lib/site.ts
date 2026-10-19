export const REPO = "https://github.com/MrTomato77/octet";
export const RELEASES = `${REPO}/releases`;
export const DOWNLOAD = `${RELEASES}/latest/download/Octet.exe`;

// Prefix for files in public/ ("/octet-web" on GitHub Pages).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Runs at build time (static export), so the version is as fresh as the last deploy.
// The deploy workflow reruns on every published Octet release.
export async function latestVersion() {
  const token = process.env.GITHUB_TOKEN;
  try {
    const r = await fetch("https://api.github.com/repos/MrTomato77/octet/releases/latest",
      { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return r.ok ? ((await r.json()).tag_name as string) : null;
  } catch {
    return null;
  }
}
