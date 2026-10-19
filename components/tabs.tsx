"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const tabs = [
  { img: "ip", name: "IP & DNS", title: "DHCP or manual in one click.",
    body: "Every field is checked as you type. Before Apply, Octet asks the network whether someone already has the address. After Apply, it pings the gateway and DNS for you." },
  { img: "advanced", name: "Advanced", title: "Several addresses and gateways.",
    body: "Stack extra addresses and gateways on one adapter, each with its own metric." },
  { img: "ping", name: "Ping", title: "Live latency, jitter and loss.",
    body: "A running graph to the gateway or any host, sent out this adapter and no other." },
  { img: "scan", name: "Scan", title: "Who else is on the subnet.",
    body: "Every address in the range as a grid, with the maker and MAC of whatever answers." },
  { img: "info", name: "Info", title: "Everything about the adapter.",
    body: "What Windows knows about the adapter, in one list. One click copies it." },
];

export function Tabs() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);   // cycles until the visitor picks a tab
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const pick = (n: number, focus = false) => {
    setAuto(false);
    setI(n);
    if (focus) btns.current[n]?.focus();
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    // The app uses Ctrl+1..5; browsers keep those for themselves, so the page listens for plain 1..5.
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || (e.target as Element).closest("input, textarea")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= tabs.length) pick(n - 1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const step = (d: number) => pick((i + d + tabs.length) % tabs.length, true);

  return (
    <div className="tabs">
      <div className="seg" role="tablist" aria-label="Octet tabs" style={{ "--i": i } as CSSProperties}
        onKeyDown={e => {
          if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        }}>
        <span className="seg-pill" aria-hidden="true" />
        {tabs.map((t, n) => (
          <button key={t.img} ref={el => { btns.current[n] = el; }} role="tab" id={`tab-${t.img}`}
            aria-selected={n === i} aria-controls="tab-panel" tabIndex={n === i ? 0 : -1} onClick={() => pick(n)}>
            {t.name}
            {auto && n === i && <span className="seg-bar" onAnimationEnd={() => setI((i + 1) % tabs.length)} />}
          </button>
        ))}
      </div>

      <div className="tab-copy" key={i} aria-live="polite">
        <h3>{tabs[i].title}</h3>
        <p>{tabs[i].body}</p>
      </div>

      <div className="stack" id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tabs[i].img}`}>
        {tabs.map((t, n) => (
          <img key={t.img} src={`/screens/${t.img}.png`} width={568} height={596} loading={n ? "lazy" : "eager"}
            alt={`Octet, ${t.name} tab`} aria-hidden={n !== i} data-on={n === i} />
        ))}
      </div>

      <p className="hint">Press <kbd>1</kbd>–<kbd>5</kbd>, like <kbd>Ctrl</kbd> <kbd>1</kbd>–<kbd>5</kbd> in the app</p>
    </div>
  );
}
