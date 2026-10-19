"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";

const ips = ["192.168.1.50", "10.0.1.124", "172.16.8.20", "100.64.0.7"];

// The headline address, drawn like the app's four octet boxes. Each octet rolls in when it changes.
export function OctetRoll() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI(n => (n + 1) % ips.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="roll" aria-hidden="true">
      {ips[i].split(".").map((o, n) => (
        <Fragment key={n}>
          {n > 0 && <span className="roll-dot">.</span>}
          <span className="roll-cell">
            <span key={o} style={{ "--n": n } as CSSProperties}>{o}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
