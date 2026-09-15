import { allControls } from "../data/matrix";
import { assets } from "../data/assets";
import { ownerMeta } from "../lib/owner";

export function Hero() {
  const counts = {
    Customer: allControls.filter((c) => c.owner === "Customer").length,
    Provider: allControls.filter((c) => c.owner === "Provider").length,
    Shared: allControls.filter((c) => c.owner === "Shared").length,
  };

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="pill">Unit 1 · Responsibility Mapping &amp; Asset Definition</div>
        <h1>
          Who secures what in the cloud?
          <span className="hero-accent"> A tailored responsibility map.</span>
        </h1>
        <p className="hero-sub">
          A 3-tier e-commerce app (<strong>ShopFast</strong>) on AWS, with a
          Shared Responsibility Matrix built control-by-control for its actual
          mix of IaaS and PaaS services — not a generic vendor diagram.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#matrix">
            Explore the matrix
          </a>
          <a className="btn btn-ghost" href="#architecture">
            See the architecture
          </a>
        </div>
        <div className="hero-stats">
          {(["Customer", "Provider", "Shared"] as const).map((o) => (
            <div className="stat" key={o}>
              <span className="stat-num" style={{ color: ownerMeta[o].color }}>
                {counts[o]}
              </span>
              <span className="stat-label">{ownerMeta[o].label} controls</span>
            </div>
          ))}
          <div className="stat">
            <span className="stat-num">{assets.length}</span>
            <span className="stat-label">Assets tracked</span>
          </div>
        </div>
      </div>
    </section>
  );
}
