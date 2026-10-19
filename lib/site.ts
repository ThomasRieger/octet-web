export const REPO = "https://github.com/MrTomato77/octet";
export const RELEASES = `${REPO}/releases`;
export const DOWNLOAD = `${RELEASES}/latest/download/Octet.exe`;

// Runs at build time (static export), so the version is as fresh as the last deploy.
export async function latestVersion() {
  try {
    const r = await fetch("https://api.github.com/repos/MrTomato77/octet/releases/latest");
    return r.ok ? ((await r.json()).tag_name as string) : null;
  } catch {
    return null;
  }
}
