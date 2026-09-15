import { tiers, dataFlow, architectureDiagram } from "../data/architecture";
import { Mermaid } from "./Mermaid";

export function Architecture() {
  return (
    <section className="section" id="architecture">
      <div className="section-head">
        <span className="eyebrow">The system</span>
        <h2>3-tier architecture</h2>
        <p>
          Each tier lives in its own security zone. Traffic only flows inward:
          internet → web → app → database. Nothing in the app or DB tier has a
          public IP.
        </p>
      </div>

      <div className="tier-grid">
        {tiers.map((tier) => (
          <div className="tier-card" key={tier.id} style={{ borderTopColor: tier.accent }}>
            <div className="tier-card-head">
              <h3>{tier.name}</h3>
              <p>{tier.tagline}</p>
            </div>
            <ul className="component-list">
              {tier.components.map((c) => (
                <li key={c.name}>
                  <div className="component-top">
                    <span className="component-name">{c.name}</span>
                    <span className="model-tag" style={{ color: tier.accent }}>
                      {c.model}
                    </span>
                  </div>
                  <span className="component-service">{c.service}</span>
                  <span className="component-role">{c.role}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="diagram-block">
        <h3>Architecture &amp; trust boundaries</h3>
        <Mermaid chart={architectureDiagram} />
      </div>

      <div className="flow-block">
        <h3>Data flow — a customer checkout</h3>
        <ol className="flow-list">
          {dataFlow.map((step, i) => (
            <li key={i}>
              <span className="flow-num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
