"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Dict, Lang } from "@/lib/i18n.ts";
import { parseConfig } from "@/lib/config.ts";
import { asset } from "@/lib/site.ts";

const examples = [
  "192.168.1.50/24 gw 192.168.1.1 dns 1.1.1.1, 8.8.8.8",
  "10.0.1.124 mask 255.255.254.0 gw 10.0.0.1 dns 9.9.9.9",
  "100.64.0.7/10 dns 94.140.14.14 94.140.15.15",
];

// The real app (public/app, a copy of Octet's ui/ on its demo data) in a frame: every field, pill, menu and
// dialog works as in Octet, nothing touches the network. The line above is pasted into it as it is typed.
// Left: the heading (children), the line, the examples. Right: the app window alone.
export function PasteDemo({ t, lang, children }: { t: Dict["paste"]; lang: Lang; children: ReactNode }) {
  const [text, setText] = useState(examples[0]);
  const frame = useRef<HTMLIFrameElement>(null);
  const ok = !!parseConfig(text);
  const send = (m: object) => frame.current?.contentWindow?.postMessage(m, location.origin);

  const now = useRef({ text, ok, lang });
  now.current = { text, ok, lang };

  useEffect(() => { if (ok) send({ paste: text }); }, [text, ok]);
  useEffect(() => send({ lang }), [lang]);
  // The app says when its form is up (it may load before this page hydrates); then it gets the line and the language.
  useEffect(() => {
    const on = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || !e.data?.ready) return;
      send({ lang: now.current.lang });
      if (now.current.ok) send({ paste: now.current.text });
    };
    addEventListener("message", on);
    return () => removeEventListener("message", on);
  }, []);

  return (
    <>
    <div className="paste">
      {children}
      <label className="paste-in">
        <span className="prompt" aria-hidden="true">›</span>
        <span className="sr-only">{t.input}</span>
        <input value={text} onChange={e => setText(e.target.value)} spellCheck={false} autoComplete="off" />
      </label>

      <p className="status" key={ok ? "ok" : "bad"}>{ok ? t.ok : t.bad}</p>

      <div className="examples">
        <span>{t.try}</span>
        {examples.map(x => <button key={x} onClick={() => setText(x)} aria-pressed={x === text}>{x}</button>)}
      </div>
    </div>
    <div className="app-frame reveal">
      <iframe ref={frame} src={asset(`/app/index.html?embed`)} title="Octet" loading="lazy" />
    </div>
    </>
  );
}
