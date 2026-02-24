const EXPLORE = [
  { label: "Hotels", href: "/hotels" },
  { label: "Attractions", href: "/attractions" },
  { label: "Bars & Nightlife", href: "/nightlife" },
  { label: "Map", href: "/map" },
];

const DISCOVER = [
  { label: "UNESCO Heritage", href: "/tags/unesco-heritage" },
  { label: "Spiritual & Temples", href: "/tags/spiritual" },
  { label: "Luxury Stays", href: "/tags/luxury" },
  { label: "Photography Spots", href: "/tags/photography" },
  { label: "Budget Friendly", href: "/tags/budget-friendly" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">

        {/* Brand */}
        <div className="footer__brand">
          <a href="/" className="footer__logo">kathmandu.im</a>
          <p className="footer__tagline">
            The definitive travel guide to the Kathmandu Valley — hotels, temples, stupas, museums and more.
          </p>
          {/* Nepal Tourism Board */}
          <a
            href="https://ntb.gov.np/en"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__ntb"
            title="Nepal Tourism Board — official national tourism organisation"
          >
            <img
              src="https://ntb.gov.np/storage/website/logo.svg"
              alt="Nepal Tourism Board"
              className="footer__ntb-logo"
              loading="lazy"
            />
            <span className="footer__ntb-text">
              <span className="footer__ntb-label">Proud to promote</span>
              <span className="footer__ntb-name">Nepal Tourism Board</span>
            </span>
          </a>
        </div>

        {/* Explore */}
        <div className="footer__col">
          <div className="footer__col-title">Explore</div>
          <ul className="footer__col-list">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Discover */}
        <div className="footer__col">
          <div className="footer__col-title">Discover</div>
          <ul className="footer__col-list">
            {DISCOVER.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} kathmandu.im</span>
        <span className="footer__bottom-sep">·</span>
        <span>The Kathmandu Valley Travel Guide</span>
      </div>
    </footer>
  );
}
