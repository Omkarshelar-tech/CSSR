const links = [
  { href: "#overview", label: "Overview" },
  { href: "#architecture", label: "Architecture" },
  { href: "#matrix", label: "Responsibility Matrix" },
  { href: "#assets", label: "Assets" },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">
        <span className="brand-mark">CSSR</span>
        <span className="brand-text">Cloud Shared Responsibility</span>
      </a>
      <nav className="site-nav">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <a
          className="nav-cta"
          href="https://github.com/Omkarshelar-tech/CSSR"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
