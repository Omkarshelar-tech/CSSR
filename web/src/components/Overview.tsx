const models = [
  { layer: "Data", iaas: "C", paas: "C", saas: "C" },
  { layer: "App code", iaas: "C", paas: "C", saas: "P" },
  { layer: "Runtime", iaas: "C", paas: "P", saas: "P" },
  { layer: "OS / patching", iaas: "C", paas: "P", saas: "P" },
  { layer: "Virtualization", iaas: "P", paas: "P", saas: "P" },
  { layer: "Physical", iaas: "P", paas: "P", saas: "P" },
];

export function Overview() {
  return (
    <section className="section" id="overview">
      <div className="section-head">
        <span className="eyebrow">The core principle</span>
        <h2>Responsibility shifts with the service model</h2>
        <p>
          Security <em>of</em> the cloud is the provider's job. Security{" "}
          <em>in</em> the cloud is yours. But the boundary line moves depending
          on whether a service is IaaS, PaaS, or SaaS. ShopFast mixes all three,
          so the matrix is built per service.
        </p>
      </div>
      <div className="model-table-wrap">
        <table className="model-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>IaaS</th>
              <th>PaaS</th>
              <th>SaaS</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.layer}>
                <td className="layer-name">{m.layer}</td>
                {[m.iaas, m.paas, m.saas].map((v, i) => (
                  <td key={i} className={v === "C" ? "cell-c" : "cell-p"}>
                    {v === "C" ? "Customer" : "Provider"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
