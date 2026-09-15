import { useMemo, useState } from "react";
import { assets } from "../data/assets";
import { classColor, ownerMeta } from "../lib/owner";

const tiers = ["All", "Web", "App", "DB", "Cross"] as const;

export function Assets() {
  const [tier, setTier] = useState<(typeof tiers)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((a) => {
      if (tier !== "All" && a.tier !== tier) return false;
      if (!q) return true;
      return (
        a.asset.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    });
  }, [tier, query]);

  return (
    <section className="section" id="assets">
      <div className="section-head">
        <span className="eyebrow">Asset definition</span>
        <h2>Asset inventory</h2>
        <p>
          Responsibility mapping starts with knowing what you protect. Every
          asset, its tier, classification, and owner.
        </p>
      </div>

      <div className="controls-bar">
        <div className="filter-group">
          <span className="filter-label">Tier</span>
          <div className="chip-row">
            {tiers.map((t) => (
              <button
                key={t}
                className={tier === t ? "chip chip-active" : "chip"}
                onClick={() => setTier(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group grow">
          <span className="filter-label">Search</span>
          <input
            type="search"
            placeholder="Search assets…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="asset-grid">
        {filtered.map((a) => (
          <div className="asset-card" key={a.id}>
            <div className="asset-card-head">
              <span className="asset-id">{a.id}</span>
              <span className="tier-tag">{a.tier}</span>
            </div>
            <h4 className="asset-name">{a.asset}</h4>
            <div className="asset-service">{a.service}</div>
            <div className="asset-meta">
              <span
                className="class-badge"
                style={{
                  color: classColor[a.classification],
                  borderColor: classColor[a.classification],
                }}
              >
                {a.classification}
              </span>
              <span
                className="owner-badge sm"
                style={{
                  background: ownerMeta[a.owner].bg,
                  color: ownerMeta[a.owner].color,
                }}
              >
                {ownerMeta[a.owner].label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No assets match those filters.</p>
      )}
    </section>
  );
}
