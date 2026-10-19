import type { CSSProperties } from "react";
import { CopyButton } from "@/components/copy-button.tsx";
import { HeroTour } from "@/components/hero-tour.tsx";
import { OctetRoll } from "@/components/octet-roll.tsx";
import { PasteDemo } from "@/components/paste-demo.tsx";
import { dict, type Lang } from "@/lib/i18n.ts";
import { DOWNLOAD, latestVersion, RELEASES, REPO } from "@/lib/site.ts";

const d = (n: number) => ({ "--d": n }) as CSSProperties;   // stagger step for .rise
const HASH = String.raw`(Get-FileHash .\Octet.exe).Hash`;

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2.5v7.5m0 0L4.75 6.75M8 10l3.25-3.25M3 13.5h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Head = ({ t, left }: { t: { eyebrow: string; title: string; sub: string }; left?: boolean }) => (
  <header className={left ? "head left reveal" : "head reveal"}>
    <p className="eyebrow">{t.eyebrow}</p>
    <h2>{t.title}</h2>
    <p>{t.sub}</p>
  </header>
);

export async function Home({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const version = await latestVersion();
  const home = lang === "en" ? "/" : "/th/";

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href={home}><img src="/icon.png" width={26} height={26} alt="" />Octet</a>
          <nav className="links" aria-label="Sections">
            <a href="#paste">{t.nav.paste}</a>
            <a href="#engine">{t.nav.engine}</a>
            <a href="#privacy">{t.nav.privacy}</a>
            <a href={REPO}>GitHub</a>
          </nav>
          <nav className="lang" aria-label="Language">
            <a href="/" hrefLang="en" lang="en" aria-current={lang === "en" ? "page" : undefined}>EN</a>
            <a href="/th/" hrefLang="th" lang="th" aria-current={lang === "th" ? "page" : undefined}>ไทย</a>
          </nav>
          <a className="btn" href="#download">{t.nav.download}</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="wrap">
            <a className="badge rise" style={d(0)} href={RELEASES}>
              <span className="pulse" />{version ?? t.hero.latest} · {t.hero.windows}
            </a>
            <h1 className="rise" style={d(1)} aria-label={t.hero.label}>
              <span>{t.hero.before} <OctetRoll /></span>
              <span className="muted">{t.hero.after}</span>
            </h1>
            <p className="lede rise" style={d(2)}>{t.hero.lede}</p>
            <div className="ctas rise" style={d(3)}>
              <a className="btn lg" href={DOWNLOAD}><DownloadIcon />{t.hero.download}</a>
              <a className="btn lg ghost" href={REPO}>{t.hero.source}</a>
            </div>
            <p className="meta rise" style={d(4)}>{t.hero.meta}</p>
            <div className="rise" style={d(5)}><HeroTour t={t.tour} /></div>
          </div>
        </section>

        <section className="wrap section split" id="paste">
          <Head t={t.paste} left />
          <div className="reveal"><PasteDemo t={t.paste} /></div>
        </section>

        <section className="wrap section" id="engine">
          <Head t={t.engine} />
          <p className="nos reveal">{t.engine.nos.map(n => <s key={n}>{n}</s>)}</p>
          <div className="cols three">
            {t.engine.api.map(([h, p]) => <div className="col reveal" key={h}><code>{h}</code><p>{p}</p></div>)}
            {t.engine.details.map(([h, p]) => <div className="col reveal" key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </section>

        <section className="wrap section" id="privacy">
          <Head t={t.privacy} />
          <div className="diagram reveal" role="img" aria-label={t.privacy.diagram}>
            <div className="node"><img src="/icon.png" width={22} height={22} alt="" />{t.privacy.pc}</div>
            <div className="wire"><span>{t.privacy.wire}</span></div>
            <div className="node">{t.privacy.net}</div>
            <div className="wire dashed"><span>{t.privacy.wireOut}</span></div>
            <div className="node out">ipinfo.io</div>
          </div>
          <div className="cols two">
            {t.privacy.items.map(([h, p]) => <div className="col reveal" key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </section>

        <section className="wrap section" id="download">
          <div className="get reveal">
            <img className="get-icon" src="/icon.png" width={80} height={80} alt="" loading="lazy" />
            <h2>{t.get.title}</h2>
            <p className="get-sub">{version ? `${version} · ` : ""}{t.get.sub}</p>
            <div className="ctas">
              <a className="btn lg" href={DOWNLOAD}><DownloadIcon />{t.hero.download}</a>
              <a className="btn lg ghost" href={RELEASES}>{t.get.all}</a>
            </div>
            <ul className="notes">
              {t.get.notes.map(([b, p]) => <li key={b}><b>{b}</b>{p}</li>)}
            </ul>
            <div className="hash">
              <span>{t.get.hash} <code>Octet.exe.sha256</code></span>
              <pre><code>{HASH}</code><CopyButton text={HASH} label={t.get.copy} done={t.get.copied} /></pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-in">
          <a className="brand" href={home}><img src="/icon.png" width={20} height={20} alt="" loading="lazy" />Octet</a>
          <nav aria-label="Project">
            <a href={REPO}>GitHub</a>
            <a href={RELEASES}>Releases</a>
            <a href={`${REPO}/blob/main/SECURITY.md`}>Security</a>
            <a href={`${REPO}/blob/main/LICENSE`}>MIT</a>
          </nav>
          <p>
            {t.footer.inspired} <a href="https://github.com/KurtisLiggett/Simple-IP-Config">Simple IP Config</a>{t.footer.noCode}{" "}
            {t.footer.tracking}
          </p>
        </div>
      </footer>
    </>
  );
}
