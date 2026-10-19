// Port of the app's one-line setup format (ui/index.html, parseConfig):
// "192.168.1.50/24 gw 192.168.1.1 dns 1.1.1.1, 8.8.8.8"

export type Config = { address: string; subnet: string; prefix: number; gateway: string; dns1: string; dns2: string };

const IP = String.raw`(\d{1,3}(?:\.\d{1,3}){3})`;

// masks[24] === "255.255.255.0"
export const masks = Array.from({ length: 33 }, (_, p) => {
  const n = p ? (~0 << (32 - p)) >>> 0 : 0;
  return [24, 16, 8, 0].map(s => (n >>> s) & 255).join(".");
});

export const validIp = (v: string) => /^\d{1,3}(\.\d{1,3}){3}$/.test(v) && v.split(".").every(o => +o <= 255);

const num = (v: string) => v.split(".").reduce((n, o) => n * 256 + +o, 0);
const inNet = (v: string, net: string, p: number) => Math.floor(num(v) / 2 ** (32 - p)) === Math.floor(num(net) / 2 ** (32 - p));

export function scope(v: string): string | null {
  if (!validIp(v)) return null;
  if (inNet(v, "127.0.0.0", 8)) return "Loop";
  if (inNet(v, "169.254.0.0", 16)) return "APIPA";
  if (inNet(v, "10.0.0.0", 8) || inNet(v, "172.16.0.0", 12) || inNet(v, "192.168.0.0", 16)) return "Private";
  if (inNet(v, "100.64.0.0", 10)) return "CGNAT";
  return "Public";
}

const resolvers: [string[], string][] = [
  [["8.8.8.8", "8.8.4.4"], "Google"],
  [["1.1.1.1", "1.0.0.1", "1.1.1.2", "1.0.0.2", "1.1.1.3", "1.0.0.3"], "Cloudflare"],
  [["9.9.9.9", "149.112.112.112"], "Quad9"],
  [["94.140.14.14", "94.140.15.15"], "AdGuard"],
  [["208.67.222.222", "208.67.220.220"], "OpenDNS"],
  [["45.90.28.0", "45.90.30.0"], "NextDNS"],
];
export const resolver = (v: string) => resolvers.find(([ips]) => ips.includes(v))?.[1] ?? null;

export function parseConfig(text: string): Config | null {
  const m = text.match(new RegExp(String.raw`^\s*${IP}\s*(?:/(\d{1,2})|\s+(?:mask\s+)?${IP})`, "i"));
  if (!m || !validIp(m[1])) return null;
  const subnet = m[2] !== undefined ? masks[+m[2]] : m[3];
  const prefix = masks.indexOf(subnet);
  if (prefix < 0) return null;
  const gw = text.match(new RegExp(String.raw`(?:gw|gateway)\s*:?\s*${IP}`, "i"));
  const dns = text.match(new RegExp(String.raw`dns\s*:?\s*${IP}(?:\s*[,\s]\s*${IP})?`, "i"));
  return { address: m[1], subnet, prefix, gateway: gw?.[1] ?? "", dns1: dns?.[1] ?? "", dns2: dns?.[2] ?? "" };
}
