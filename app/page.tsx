import type { CSSProperties } from "react";
import { CopyButton } from "@/components/copy-button.tsx";
import { OctetRoll } from "@/components/octet-roll.tsx";
import { PasteDemo } from "@/components/paste-demo.tsx";
import { Tabs } from "@/components/tabs.tsx";
import { DOWNLOAD, latestVersion, RELEASES, REPO } from "@/lib/site.ts";

const d = (n: number) => ({ "--d": n }) as CSSProperties;   // stagger step for .rise

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2.5v7.5m0 0L4.75 6.75M8 10l3.25-3.25M3 13.5h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Head = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) => (
  <header className="head reveal">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p>{sub}</p>
  </header>
);

const engine = [
  ["IP Helper", "Addresses, DNS and DHCP."],
  ["ICMP", "Ping, and the checks after Apply."],
  ["WinHTTP", "The one web request."],
];

const details = [
  ["Follows Windows", "Cable, Wi-Fi and address changes show up on their own."],
  ["The usual buttons", "Release and renew, flush DNS, enable and disable adapters."],
  ["DNS presets", "Google, Cloudflare, Quad9, AdGuard, OpenDNS and NextDNS, named as you type them."],
  ["One line, whole setup", "Copy a configuration as text, paste it on another PC."],
  ["Keyboard first", "Ctrl+1 to Ctrl+5 switch tabs."],
  ["Two languages", "English and ไทย."],
];

const privacy = [
  ["Sends only what you'd expect", "An ARP check before Apply, pings to the gateway and DNS after it, pings and ARP while you Ping or Scan, and a reverse lookup for the gateway."],
  ["MAC addresses stay home", "Device makers come from the IEEE list built into the app. MACs are never looked up online."],
  ["One request to the internet", "Your public IP, through ipinfo.io, and only when you click it."],
  ["Admin only for the change", "Octet opens without admin rights. UAC asks when you Apply, toggle an adapter or release and renew, and only that change runs elevated."],
];

export default async function Page() {
  const version = await latestVersion();

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top"><img src="/icon.png" width={22} height={22} alt="" />Octet</a>
          <nav className="links" aria-label="Sections">
            <a href="#tabs">Tour</a>
            <a href="#paste">Paste</a>
            <a href="#fast">Engine</a>
            <a href="#privacy">Privacy</a>
            <a href={REPO}>GitHub</a>
          </nav>
          <a className="btn sm" href="#download">Download</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="wrap hero-in">
            <a className="badge rise" style={d(0)} href={RELEASES}>
              <span className="pulse" />{version ?? "Latest release"} · Windows 10 & 11
            </a>
            <h1 className="rise" style={d(1)} aria-label="Switch your IP in seconds.">
              <span>Switch to</span>
              <OctetRoll />
              <span className="muted">in seconds.</span>
            </h1>
            <p className="lede rise" style={d(2)}>
              Octet changes IPv4 and DNS on Windows in one click, then shows you who else is on the network.
              A fast, modern take on Simple IP Config, written in Rust.
            </p>
            <div className="ctas rise" style={d(3)}>
              <a className="btn lg" href={DOWNLOAD}><DownloadIcon />Download Octet.exe</a>
              <a className="btn lg ghost" href={REPO}>View source</a>
            </div>
            <p className="meta rise" style={d(4)}>One portable file · no installer · no telemetry · MIT</p>
          </div>
          <div className="wrap shots rise" style={d(5)}>
            <img className="side left" src="/screens/ping.png" width={568} height={596} alt="" />
            <img className="main" src="/screens/ip.png" width={568} height={596}
              alt="Octet on the IP & DNS tab: a Wi-Fi adapter on Office-5G, automatic IP and DNS" />
            <img className="side right" src="/screens/scan.png" width={568} height={596} alt="" />
          </div>
        </section>

        <section className="wrap section" id="tabs">
          <Head eyebrow="Tour" title="Five tabs, one adapter." sub="Pick a network card. Everything about it is one keypress away." />
          <div className="reveal"><Tabs /></div>
        </section>

        <section className="wrap section" id="paste">
          <Head eyebrow="Paste" title="One line in, a whole setup out." sub="Try it. This is the parser from the app." />
          <div className="reveal"><PasteDemo /></div>
        </section>

        <section className="wrap section" id="fast">
          <Head eyebrow="Engine" title="Fast, all the way down." sub="Rust talking to Windows directly. A DNS change takes milliseconds." />
          <p className="nos reveal"><s>ipconfig</s><s>PowerShell</s><s>flashing consoles</s></p>
          <div className="cols three">
            {engine.map(([t, p]) => <div className="col reveal" key={t}><code>{t}</code><p>{p}</p></div>)}
          </div>
        </section>

        <section className="wrap section">
          <Head eyebrow="Details" title="And the small things." sub="The parts you notice on the second day." />
          <div className="cols three">
            {details.map(([t, p]) => <div className="col reveal" key={t}><h3>{t}</h3><p>{p}</p></div>)}
          </div>
        </section>

        <section className="wrap section" id="privacy">
          <Head eyebrow="Privacy" title="Private by default." sub="No account, no telemetry, no server of its own." />
          <div className="diagram reveal" role="img" aria-label="Octet talks to your network. The internet only when you ask.">
            <div className="node"><img src="/icon.png" width={22} height={22} alt="" />This PC</div>
            <div className="wire"><span>ARP · ping · lookup</span></div>
            <div className="node">Your network</div>
            <div className="wire dashed"><span>public IP, on click</span></div>
            <div className="node out">ipinfo.io</div>
          </div>
          <div className="cols two">
            {privacy.map(([t, p]) => <div className="col reveal" key={t}><h3>{t}</h3><p>{p}</p></div>)}
          </div>
        </section>

        <section className="wrap section" id="download">
          <div className="get reveal">
            <img className="get-icon" src="/icon.png" width={88} height={88} alt="" />
            <h2>Get Octet.</h2>
            <p className="get-sub">{version ? `${version}. ` : ""}One file. Run it.</p>
            <div className="ctas">
              <a className="btn lg" href={DOWNLOAD}><DownloadIcon />Download Octet.exe</a>
              <a className="btn lg ghost" href={RELEASES}>All releases</a>
            </div>
            <ul className="notes">
              <li><b>Windows 11</b>Runs as is.</li>
              <li><b>Windows 10</b>Needs the WebView2 Runtime. Most PCs already have it.</li>
              <li><b>Not code-signed yet</b>If SmartScreen stops it, choose More info, then Run anyway.</li>
            </ul>
            <div className="hash">
              <span>Check it against <code>Octet.exe.sha256</code></span>
              <pre><code>(Get-FileHash .\Octet.exe).Hash</code><CopyButton text={String.raw`(Get-FileHash .\Octet.exe).Hash`} /></pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-in">
          <a className="brand" href="#top"><img src="/icon.png" width={18} height={18} alt="" />Octet</a>
          <nav aria-label="Project">
            <a href={REPO}>GitHub</a>
            <a href={RELEASES}>Releases</a>
            <a href={`${REPO}/blob/main/SECURITY.md`}>Security</a>
            <a href={`${REPO}/blob/main/LICENSE`}>MIT</a>
          </nav>
          <p>
            Inspired by <a href="https://github.com/KurtisLiggett/Simple-IP-Config">Simple IP Config</a>, shares no code with it.
            No cookies, no tracking.
          </p>
        </div>
      </footer>
    </>
  );
}
