"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";

const LINKS = [
  { href: "/hotels", label: "Hotels", icon: "🏨" },
  { href: "/attractions", label: "Attractions", icon: "🛕" },
  { href: "/restaurants", label: "Restaurants", icon: "🍽️" },
  { href: "/nightlife", label: "Bars & Nightlife", icon: "🍸" },
  { href: "/map", label: "Map", icon: "🗺️" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop links — hidden on mobile via CSS */}
      <div className="nav__links">
        <a href="/hotels">Hotels</a>
        <a href="/attractions">Attractions</a>
        <a href="/restaurants">Restaurants</a>
        <a href="/nightlife">Bars & Nightlife</a>
        <a href="/map">Map</a>
        <SearchBar />
      </div>

      {/* Mobile: hamburger only — hidden on desktop via CSS */}
      <button
        className="nav__hamburger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="4" y1="4" x2="18" y2="18" />
            <line x1="18" y1="4" x2="4" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="6" x2="19" y2="6" />
            <line x1="3" y1="11" x2="19" y2="11" />
            <line x1="3" y1="16" x2="19" y2="16" />
          </svg>
        )}
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="nav__backdrop" onClick={() => setOpen(false)} />
          <div className="nav__drawer">
            {/* Search at top of drawer */}
            <div className="nav__drawer-search">
              <SearchBar />
            </div>
            <div className="nav__drawer-divider" />
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav__drawer-link"
                onClick={() => setOpen(false)}
              >
                <span className="nav__drawer-icon">{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}
