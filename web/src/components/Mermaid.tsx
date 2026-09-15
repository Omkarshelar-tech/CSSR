import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "strict",
  themeVariables: {
    fontFamily: "Inter, system-ui, sans-serif",
    primaryColor: "#1e293b",
    primaryTextColor: "#e2e8f0",
    lineColor: "#64748b",
    background: "#0f172a",
  },
});

let idCounter = 0;

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = `mermaid-${idCounter++}`;
    let cancelled = false;
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return <pre className="mermaid-error">Diagram error: {error}</pre>;
  }
  return <div className="mermaid-container" ref={ref} />;
}
