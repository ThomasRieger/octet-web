"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { Dict } from "@/lib/i18n.ts";
import { asset } from "@/lib/site.ts";

// The five tab screenshots as a rotating deck: the current tab in front, its neighbours fanned behind.
// It cycles until the visitor picks a tab; the progress bar's CSS animation is the timer, so hover pauses it.
export function HeroTour({ t }: { t: Dict["tour"] }) {
  const tabs = t.tabs;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ready, setReady] = useState(false);
  const [rest, setRest] = useState(false);   // the four screenshots behind, loaded after the page
  const [tilt, setTilt] = useState(false);

  // The front screenshot leans a few degrees toward a mouse pointer; it eases back flat when the pointer leaves.
  const lean = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    // pointer-tilt: rotateY maps x to ±6deg, rotateX maps y to ∓6deg
    e.currentTarget.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
    setTilt(true);
  };
  const flat = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty("--ry");
    e.currentTarget.style.removeProperty("--rx");
    setTilt(false);
  };
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = (n: number, focus = false) => {
    setAuto(false);
    setI(n);
    if (focus) btns.current[n]?.focus();
  };

  useEffect(() => {
    // Only the front screenshot is in the first load; once the page has loaded, the rest come in and the deck fans out.
    let id = 0;
    const go = () => { setRest(true); id = requestAnimationFrame(() => setReady(true)); };
    if (document.readyState === "complete") go();
    else addEventListener("load", go, { once: true });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    // The app uses Ctrl+1..5; browsers keep those for themselves, so the page listens for plain 1..5.
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || (e.target as Element).closest("input, textarea")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= tabs.length) pick(n - 1);
    };
    addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(id); removeEventListener("load", go); removeEventListener("keydown", onKey); };
  }, [tabs.length]);

  // -2..2: where each screenshot sits relative to the current one
  const pos = (n: number) => ((n - i + tabs.length + 2) % tabs.length) - 2;

  return (
    <div className="tour">
      <div className="deck" data-ready={ready} data-tilt={tilt} onPointerMove={lean} onPointerLeave={flat}>
        <div className="deck-in" id="tour-panel" role="tabpanel" aria-labelledby={`tab-${tabs[i].img}`}>
          {tabs.map((tab, n) => (
            <img key={tab.img} width={568} height={596} decoding="async"
              src={n === 0 || rest ? asset(`/screens/${tab.img}-1x.webp`) : undefined}
              srcSet={n === 0 || rest ? `${asset(`/screens/${tab.img}-1x.webp`)} 1x, ${asset(`/screens/${tab.img}.webp`)} 2x` : undefined}
              fetchPriority={n === 0 ? "high" : "low"} data-pos={pos(n)} aria-hidden={n !== i}
              alt={t.alt.replace("{name}", tab.name)} onClick={() => n !== i && pick(n)} />
          ))}
        </div>
      </div>

      <div className="seg" role="tablist" style={{ "--i": i } as CSSProperties}
        onKeyDown={e => {
          if (e.key === "ArrowRight") { e.preventDefault(); pick((i + 1) % tabs.length, true); }
          if (e.key === "ArrowLeft") { e.preventDefault(); pick((i + tabs.length - 1) % tabs.length, true); }
        }}>
        <span className="seg-pill" aria-hidden="true" />
        {tabs.map((tab, n) => (
          <button key={tab.img} ref={el => { btns.current[n] = el; }} role="tab" id={`tab-${tab.img}`}
            aria-selected={n === i} aria-controls="tour-panel" tabIndex={n === i ? 0 : -1} onClick={() => pick(n)}>
            {tab.name}
            {auto && n === i && <span className="seg-bar" onAnimationEnd={() => setI((i + 1) % tabs.length)} />}
          </button>
        ))}
      </div>

      {/* All five texts share one cell, so the block is as tall as the longest and nothing below moves;
          the old one fades up and out while the new one rises in. */}
      <div className="tour-copy" aria-live="polite">
        {tabs.map((tab, n) => (
          <div key={tab.img} data-on={n === i} aria-hidden={n !== i}>
            <p className="tour-title">{tab.title}</p>
            <p>{tab.body}</p>
          </div>
        ))}
      </div>
      <p className="hint">{t.hint}</p>
    </div>
  );
}
