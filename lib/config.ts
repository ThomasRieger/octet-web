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
