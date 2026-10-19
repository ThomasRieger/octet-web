"use client";

import { useState } from "react";
import { parseConfig, resolver, scope, validIp } from "@/lib/config.ts";

const examples = [
  "192.168.1.50/24 gw 192.168.1.1 dns 1.1.1.1, 8.8.8.8",
  "10.0.1.124 mask 255.255.254.0 gw 10.0.0.1 dns 9.9.9.9",
  "100.64.0.7/10 dns 94.140.14.14 94.140.15.15",
];

const tag = (v = "") => (!v ? "" : !validIp(v) ? "Invalid" : resolver(v) ?? scope(v) ?? "");

function Octets({ v }: { v: string }) {
  const parts = v ? v.split(".") : ["", "", "", ""];
  return (
    <span className="octets" data-bad={!!v && !validIp(v)}>
      {parts.map((o, n) => <span key={n}><i key={o}>{o}</i></span>)}
    </span>
  );
}

export function PasteDemo() {
  const [text, setText] = useState(examples[0]);
  const c = parseConfig(text);
  const rows: [string, string, string][] = [
    ["IP address", c?.address ?? "", tag(c?.address)],
    ["Subnet mask", c?.subnet ?? "", c ? `/${c.prefix}` : ""],
    ["Gateway", c?.gateway ?? "", tag(c?.gateway)],
    ["Preferred DNS", c?.dns1 ?? "", tag(c?.dns1)],
    ["Alternate DNS", c?.dns2 ?? "", tag(c?.dns2)],
  ];

  return (
    <div className="paste">
      <label className="paste-in">
        <span className="prompt" aria-hidden="true">›</span>
        <span className="sr-only">Paste a setup</span>
        <input value={text} onChange={e => setText(e.target.value)} spellCheck={false} autoComplete="off" />
      </label>

      <div className="rows" data-empty={!c}>
        {rows.map(([label, v, t]) => (
          <div className="row" key={label}>
            <span className="label">{label}</span>
            <Octets v={v} />
            <span className="tag" data-bad={t === "Invalid"} key={t}>{t}</span>
          </div>
        ))}
        <p className="status" aria-live="polite">
          {c ? "Paste this anywhere in Octet and the form fills in."
             : "Not a setup yet. Start with an address, then /prefix or a mask."}
        </p>
      </div>

      <div className="examples">
        <span>Try</span>
        {examples.map(x => <button key={x} onClick={() => setText(x)} aria-pressed={x === text}>{x}</button>)}
      </div>
    </div>
  );
}
