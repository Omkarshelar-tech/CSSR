import type { Owner } from "../data/types";

export const OWNERS: Owner[] = ["Customer", "Provider", "Shared"];

export const ownerMeta: Record<
  Owner,
  { label: string; short: string; color: string; bg: string }
> = {
  Customer: { label: "Customer", short: "C", color: "#38bdf8", bg: "rgba(56,189,248,0.14)" },
  Provider: { label: "Provider", short: "P", color: "#f472b6", bg: "rgba(244,114,182,0.14)" },
  Shared: { label: "Shared", short: "S", color: "#fbbf24", bg: "rgba(251,191,36,0.14)" },
};

export const classColor: Record<string, string> = {
  Restricted: "#f87171",
  Confidential: "#fbbf24",
  Internal: "#60a5fa",
  Public: "#34d399",
};
