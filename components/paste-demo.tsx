"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Dict } from "@/lib/i18n.ts";
import { parseConfig, resolver, scope, validIp } from "@/lib/config.ts";
import { asset } from "@/lib/site.ts";

const examples = [
  "192.168.1.50/24 gw 192.168.1.1 dns 1.1.1.1, 8.8.8.8",
  "10.0.1.124 mask 255.255.254.0 gw 10.0.0.1 dns 9.9.9.9",
  "100.64.0.7/10 dns 94.140.14.14 94.140.15.15",
];

// One octet, as the app counts it (ui/index.html, countTo): from the old number to the new one in 700ms,
// expo out, each octet 40ms after the one before. Typing shows the value at once, as typing does in the app.
function Octet({ v, n, count }: { v: string; n: number; count: boolean }) {
  const [shown, setShown] = useState(v);
  const now = useRef(v);
  useEffect(() => {
    const from = /^\d+$/.test(now.current) ? +now.current : null, to = /^\d+$/.test(v) ? +v : null;
    if (!count || from === null || to === null || from === to || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      now.current = v; setShown(v); return;
    }
    let id = 0;
    const start = performance.now() + n * 40;
    const step = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / 700)), e = p === 1 ? 1 : 1 - 2 ** (-10 * p);
      now.current = String(Math.round(from + (to - from) * e));
      setShown(now.current);
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [v, n, count]);
  return <span className="o">{shown}</span>;
}

// The app's IPv4 box: four octets in fixed columns, the address kind in the tail of the box.
function Ip({ v, tag, short, count }: { v: string; tag?: string; short?: boolean; count: boolean }) {
  const parts = v ? v.split(".") : ["", "", "", ""];
  return (
    <span className={`ip${short ? " short" : ""}${v && !validIp(v) ? " invalid" : ""}`}>
      {parts.map((o, n) => (
        <span key={n} className="cell">{n > 0 && <span className="sep">.</span>}<Octet v={o} n={n} count={count} /></span>
      ))}
      {tag && <span className="tag" key={tag}>{tag}</span>}
    </span>
  );
}

// The DNS mark, outside the box in the 40px tile, as in the app: a logo for a known resolver, else a word.
function Mark({ v, gw }: { v: string; gw: string }) {
  const r = resolver(v, gw);
  if (!r) return <span className="ext"><span className="tile empty">None</span></span>;
  return (
    <span className="ext">
      {r.logo
        ? <span className="tile logo" title={r.title} key={r.logo} style={{ "--logo": `url(${asset(`/logos/${r.logo}.svg`)})` } as CSSProperties} />
        : <span className="tile" title={r.title} key={r.text}>{r.text}</span>}
    </span>
  );
}

const Seg = ({ on, t }: { on: boolean; t: Dict["paste"] }) => (
  <span className="mode" data-manual={on} aria-hidden="true"><span className="thumb" /><span>{t.auto}</span><span>{t.manual}</span></span>
);

export function PasteDemo({ t }: { t: Dict["paste"] }) {
  const [text, setText] = useState(examples[0]);
  const [count, setCount] = useState(true);   // an example was pasted: the octets count; typing: they don't
  const c = parseConfig(text);
  const kind = (v = "") => (validIp(v) ? scope(v) ?? undefined : v ? t.invalid : undefined);

  return (
    <div className="paste">
      <label className="paste-in">
        <span className="prompt" aria-hidden="true">›</span>
        <span className="sr-only">{t.input}</span>
        <input value={text} onChange={e => { setCount(false); setText(e.target.value); }} spellCheck={false} autoComplete="off" />
      </label>

      {/* The IP & DNS tab of the app, filled from the line above */}
      <div className="app" data-empty={!c} aria-live="polite">
        <span className="lbl">IP</span><Seg on={!!c} t={t} />
        <span className="lbl">{t.rows[0]}</span><Ip v={c?.address ?? ""} tag={kind(c?.address)} count={count} />
        <span className="lbl">{t.rows[1]}</span>
        <span className="subnet">
          <Ip v={c?.subnet ?? ""} short count={count} /><span className="slash">/</span>
          <span className="prefix">{c?.prefix ?? ""}</span>
        </span>
        <span className="lbl">{t.rows[2]}</span><Ip v={c?.gateway ?? ""} tag={kind(c?.gateway)} count={count} />
        <hr />
        <span className="lbl">DNS</span><Seg on={!!c?.dns1} t={t} />
        <span className="lbl">{t.rows[3]}</span>
        <span className="dns"><Ip v={c?.dns1 ?? ""} short count={count} /><Mark v={c?.dns1 ?? ""} gw={c?.gateway ?? ""} /></span>
        <span className="lbl">{t.rows[4]}</span>
        <span className="dns"><Ip v={c?.dns2 ?? ""} short count={count} /><Mark v={c?.dns2 ?? ""} gw={c?.gateway ?? ""} /></span>
      </div>
      <p className="status" key={c ? "ok" : "bad"}>{c ? t.ok : t.bad}</p>

      <div className="examples">
        <span>{t.try}</span>
        {examples.map(x => <button key={x} onClick={() => { setCount(true); setText(x); }} aria-pressed={x === text}>{x}</button>)}
      </div>
    </div>
  );
}
