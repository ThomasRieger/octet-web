"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n.ts";
import { parseConfig, resolver, scope, validIp } from "@/lib/config.ts";

const examples = [
  "192.168.1.50/24 gw 192.168.1.1 dns 1.1.1.1, 8.8.8.8",
  "10.0.1.124 mask 255.255.254.0 gw 10.0.0.1 dns 9.9.9.9",
  "100.64.0.7/10 dns 94.140.14.14 94.140.15.15",
];

function Octets({ v }: { v: string }) {
  const parts = v ? v.split(".") : ["", "", "", ""];
  return (
    <span className="octets" data-bad={!!v && !validIp(v)}>
      {parts.map((o, n) => <span key={n}><i key={o}>{o}</i></span>)}
    </span>
  );
}

export function PasteDemo({ t }: { t: Dict["paste"] }) {
  const [text, setText] = useState(examples[0]);
  const c = parseConfig(text);
  const tag = (v = "") => (!v ? "" : !validIp(v) ? t.invalid : resolver(v) ?? scope(v) ?? "");
  const values: [string, string][] = [
    [c?.address ?? "", tag(c?.address)],
    [c?.subnet ?? "", c ? `/${c.prefix}` : ""],
    [c?.gateway ?? "", tag(c?.gateway)],
    [c?.dns1 ?? "", tag(c?.dns1)],
    [c?.dns2 ?? "", tag(c?.dns2)],
  ];

  return (
    <div className="paste">
      <label className="paste-in">
        <span className="prompt" aria-hidden="true">›</span>
        <span className="sr-only">{t.input}</span>
        <input value={text} onChange={e => setText(e.target.value)} spellCheck={false} autoComplete="off" />
      </label>

      <div className="rows" data-empty={!c}>
        {values.map(([v, tg], n) => (
          <div className="row" key={n}>
            <span className="label">{t.rows[n]}</span>
            <Octets v={v} />
            <span className="tag" data-bad={tg === t.invalid} key={tg}>{tg}</span>
          </div>
        ))}
        <p className="status" aria-live="polite">{c ? t.ok : t.bad}</p>
      </div>

      <div className="examples">
        <span>{t.try}</span>
        {examples.map(x => <button key={x} onClick={() => setText(x)} aria-pressed={x === text}>{x}</button>)}
      </div>
    </div>
  );
}
