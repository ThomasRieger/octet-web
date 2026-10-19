"use client";

import { useState } from "react";

export function CopyButton({ text, label, done: doneLabel }: { text: string; label: string; done: string }) {
  const [done, setDone] = useState(false);
  return (
    <button className="copy" data-done={done} onClick={async () => {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    }}>{done ? doneLabel : label}</button>
  );
}
