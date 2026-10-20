"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";

const ips = ["192.168.1.50", "10.0.1.124", "172.16.8.20", "100.64.0.7"];

// The headline address, drawn like the app's four octet boxes. When an octet changes, the old number rolls up
// and out while the new one rolls up in behind it; octets that stay the same don't move.
export function OctetRoll() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI(n => n + 1), 2800);
    return () => clearInterval(t);
  }, []);

  // i only counts up; the one before it is what just rolled out.
  const now = ips[i % ips.length].split("."), old = i ? ips[(i - 1) % ips.length].split(".") : [];
  return (
    <span className="roll" aria-hidden="true">
      {now.map((o, n) => (
        <Fragment key={n}>
          {n > 0 && <span className="roll-dot">.</span>}
          <span className="roll-cell" style={{ "--n": n } as CSSProperties}>
            {old[n] !== undefined && old[n] !== o && <span className="out" key={`out-${i}`}>{old[n]}</span>}
            <span key={o}>{o}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
