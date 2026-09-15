import { useMemo, useState } from "react";
import { matrix } from "../data/matrix";
import type { Owner } from "../data/types";
import { OWNERS, ownerMeta } from "../lib/owner";

type OwnerFilter = Owner | "All";

export function Matrix() {
  const [owner, setOwner] = useState<OwnerFilter>("All");
  const [domain, setDomain] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return matrix
      .filter((d) => domain === "All" || d.id === domain)
      .map((d) => ({
        ...d,
        controls: d.controls.filter((c) => {
          if (owner !== "All" && c.owner !== owner) return false;
          if (!q) return true;
          return (
            c.control.toLowerCase().includes(q) ||
            c.notes.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((d) => d.controls.length > 0);
  }, [owner, domain, query]);

  const visibleCount = filtered.reduce((n, d) => n + d.controls.length, 0);

  return (
    <section className="section" id="matrix">
      <div className="section-head">
        <span className="eyebrow">The deliverable</span>
        <h2>Shared Responsibility Matrix</h2>
        <p>
          Every row is a security control mapped to its true owner for
          ShopFast's specific services. Filter and search to explore where the
          line sits.
        </p>
      </div>

      <div className="controls-bar">
        <div className="filter-group">
          <span className="filter-label">Owner</span>
          <div className="chip-row">
            <button
              className={owner === "All" ? "chip chip-active" : "chip"}
              onClick={() => setOwner("All")}
            >
              All
            </button>
            {OWNERS.map((o) => (
              <button
                key={o}
                className={owner === o ? "chip chip-active" : "chip"}
                onClick={() => setOwner(o)}
                style={
                  owner === o
                    ? { background: ownerMeta[o].bg, color: ownerMeta[o].color, borderColor: ownerMeta[o].color }
                    : undefined
                }
              >
                {ownerMeta[o].label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Domain</span>
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="All">All domains</option>
            {matrix.map((d) => (
              <option key={d.id} value={d.id}>
                {d.id}. {d.title}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group grow">
          <span className="filter-label">Search</span>
          <input
            type="search"
            placeholder="Search controls…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <p className="result-count">
        Showing <strong>{visibleCount}</strong> control
        {visibleCount === 1 ? "" : "s"}
      </p>

      {filtered.map((d) => (
        <div className="domain-block" key={d.id}>
          <h3 className="domain-title">
            <span className="domain-id">{d.id}</span>
            {d.title}
          </h3>
          {d.intro && <p className="domain-intro">{d.intro}</p>}
          <div className="matrix-table-wrap">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="col-id">#</th>
                  <th>Control</th>
                  <th className="col-owner">Owner</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {d.controls.map((c) => (
                  <tr key={c.id}>
                    <td className="col-id">{c.id}</td>
                    <td>{c.control}</td>
                    <td className="col-owner">
                      <span
                        className="owner-badge"
                        style={{
                          background: ownerMeta[c.owner].bg,
                          color: ownerMeta[c.owner].color,
                        }}
                      >
                        <span className="owner-dot">{ownerMeta[c.owner].short}</span>
                        {ownerMeta[c.owner].label}
                      </span>
                    </td>
                    <td className="notes-cell">{c.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {visibleCount === 0 && (
        <p className="empty-state">No controls match those filters.</p>
      )}
    </section>
  );
}
