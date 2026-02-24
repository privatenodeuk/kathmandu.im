"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Hotel {
  slug: string;
  name: string;
  stars: number | null;
  area: { name: string } | null;
}

interface Attraction {
  slug: string;
  name: string;
  listingType: string;
  area: { name: string } | null;
}

interface Restaurant {
  slug: string;
  name: string;
  priceTier: string | null;
  area: { name: string } | null;
}

const TYPE_LABELS: Record<string, string> = {
  TEMPLE: "Temple", STUPA: "Stupa", PALACE: "Palace", MUSEUM: "Museum",
  PARK: "Park", MARKET: "Market", VIEWPOINT: "Viewpoint", MONASTERY: "Monastery",
  HISTORIC_SITE: "Historic Site", NATURAL_SITE: "Nature", CULTURAL_SITE: "Cultural",
  ACTIVITY: "Activity", SHOPPING: "Shopping", NIGHTLIFE: "Nightlife",
  BAR: "Bar", ROOFTOP_BAR: "Rooftop Bar", OTHER: "Other",
};

function TypePill({ type }: { type: string }) {
  const COLOR: Record<string, string> = {
    hotel: "#C87941",
    restaurant: "#e11d48",
    TEMPLE: "#7c3aed", STUPA: "#d97706", MONASTERY: "#0f766e",
    MUSEUM: "#0369a1", PARK: "#16a34a", MARKET: "#b45309",
    VIEWPOINT: "#1d4ed8", HISTORIC_SITE: "#92400e", CULTURAL_SITE: "#ea580c",
    PALACE: "#6b21a8", NATURAL_SITE: "#15803d", ACTIVITY: "#dc2626",
    BAR: "#6d28d9", ROOFTOP_BAR: "#0ea5e9",
  };
  const color = COLOR[type] ?? "#666";
  const label = type === "hotel" ? "Hotel" : type === "restaurant" ? "Restaurant" : (TYPE_LABELS[type] ?? type);
  return (
    <span style={{
      fontSize: "0.65rem", fontWeight: 600, padding: "2px 8px",
      borderRadius: 20, background: color + "18", color, border: `1px solid ${color}44`,
      letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const totalResults = hotels.length + attractions.length + restaurants.length;
  const allResults = [
    ...hotels.map((h) => ({ href: `/hotels/${h.slug}`, name: h.name, sub: h.area?.name ?? "", type: "hotel" })),
    ...attractions.map((a) => ({ href: `/attractions/${a.slug}`, name: a.name, sub: a.area?.name ?? "", type: a.listingType })),
    ...restaurants.map((r) => ({ href: `/restaurants/${r.slug}`, name: r.name, sub: r.area?.name ?? "", type: "restaurant" })),
  ];

  const openSearch = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setHotels([]);
    setAttractions([]);
    setRestaurants([]);
    setActive(-1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openSearch(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  const search = useCallback((q: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (q.length < 2) { setHotels([]); setAttractions([]); setLoading(false); return; }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setHotels(data.hotels ?? []);
        setAttractions(data.attractions ?? []);
        setRestaurants(data.restaurants ?? []);
        setActive(-1);
      } finally {
        setLoading(false);
      }
    }, 200);
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, allResults.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    if (e.key === "Enter" && active >= 0) { window.location.href = allResults[active].href; closeSearch(); }
  };

  return (
    <>
      {/* Search icon button in nav */}
      <button
        onClick={openSearch}
        aria-label="Search"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 12px", border: "1px solid var(--border)",
          borderRadius: 8, background: "var(--bg)",
          color: "var(--muted)", cursor: "pointer",
          fontSize: "0.8rem", fontFamily: "inherit",
          transition: "border-color 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span>Search</span>
        <span style={{ fontSize: "0.7rem", opacity: 0.6, marginLeft: 4 }}>⌘K</span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) closeSearch(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            padding: "80px 24px 24px",
          }}
        >
          <div style={{
            width: "100%", maxWidth: 640,
            background: "#fff", borderRadius: 16,
            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}>
            {/* Input row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={onInput}
                onKeyDown={onKeyDown}
                placeholder="Search hotels, restaurants, temples…"
                style={{
                  flex: 1, border: "none", outline: "none",
                  fontSize: "1.05rem", fontFamily: "inherit",
                  color: "var(--text)", background: "transparent",
                }}
              />
              {loading && (
                <span style={{ fontSize: "0.75rem", color: "var(--muted)", animation: "pulse 1s infinite" }}>…</span>
              )}
              <button
                onClick={closeSearch}
                style={{
                  padding: "4px 8px", border: "1px solid var(--border)",
                  borderRadius: 6, background: "var(--bg)", color: "var(--muted)",
                  cursor: "pointer", fontSize: "0.7rem", fontFamily: "inherit",
                }}
              >
                ESC
              </button>
            </div>

            {/* Results */}
            {query.length >= 2 && totalResults > 0 && (
              <div style={{ maxHeight: 400, overflowY: "auto" }}>
                {hotels.length > 0 && (
                  <div>
                    <div style={{ padding: "10px 20px 4px", fontSize: "0.68rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Hotels</div>
                    {hotels.map((h, i) => (
                      <a
                        key={h.slug}
                        href={`/hotels/${h.slug}`}
                        onClick={closeSearch}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "10px 20px", textDecoration: "none",
                          background: active === i ? "var(--bg)" : "transparent",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={() => setActive(i)}
                      >
                        <span style={{ fontSize: "1rem" }}>🏨</span>
                        <span style={{ flex: 1, fontWeight: 500, fontSize: "0.9rem", color: "var(--text)" }}>{h.name}</span>
                        {h.area && <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{h.area.name}</span>}
                        <TypePill type="hotel" />
                      </a>
                    ))}
                  </div>
                )}
                {attractions.length > 0 && (
                  <div>
                    <div style={{ padding: "10px 20px 4px", fontSize: "0.68rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Attractions</div>
                    {attractions.map((a, i) => {
                      const idx = hotels.length + i;
                      const icon: Record<string, string> = { TEMPLE: "🛕", STUPA: "☸️", MONASTERY: "🙏", MUSEUM: "🏛️", PARK: "🌿", MARKET: "🛍️", VIEWPOINT: "🏔️", BAR: "🍸", ROOFTOP_BAR: "🍸", PALACE: "🏰", HISTORIC_SITE: "🏛️" };
                      return (
                        <a
                          key={a.slug}
                          href={`/attractions/${a.slug}`}
                          onClick={closeSearch}
                          style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "10px 20px", textDecoration: "none",
                            background: active === idx ? "var(--bg)" : "transparent",
                            transition: "background 0.1s",
                          }}
                          onMouseEnter={() => setActive(idx)}
                        >
                          <span style={{ fontSize: "1rem" }}>{icon[a.listingType] ?? "📍"}</span>
                          <span style={{ flex: 1, fontWeight: 500, fontSize: "0.9rem", color: "var(--text)" }}>{a.name}</span>
                          {a.area && <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{a.area.name}</span>}
                          <TypePill type={a.listingType} />
                        </a>
                      );
                    })}
                  </div>
                )}
                {restaurants.length > 0 && (
                  <div>
                    <div style={{ padding: "10px 20px 4px", fontSize: "0.68rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Restaurants</div>
                    {restaurants.map((r, i) => {
                      const idx = hotels.length + attractions.length + i;
                      return (
                        <a
                          key={r.slug}
                          href={`/restaurants/${r.slug}`}
                          onClick={closeSearch}
                          style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "10px 20px", textDecoration: "none",
                            background: active === idx ? "var(--bg)" : "transparent",
                            transition: "background 0.1s",
                          }}
                          onMouseEnter={() => setActive(idx)}
                        >
                          <span style={{ fontSize: "1rem" }}>🍽️</span>
                          <span style={{ flex: 1, fontWeight: 500, fontSize: "0.9rem", color: "var(--text)" }}>{r.name}</span>
                          {r.area && <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{r.area.name}</span>}
                          <TypePill type="restaurant" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* No results */}
            {query.length >= 2 && !loading && totalResults === 0 && (
              <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--muted)", fontSize: "0.9rem" }}>
                No results for &ldquo;{query}&rdquo;
              </div>
            )}

            {/* Empty state hint */}
            {query.length < 2 && (
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  Try:{" "}
                  <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => { setQuery("boudhanath"); search("boudhanath"); }}>Boudhanath</span>
                  {" · "}
                  <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => { setQuery("luxury"); search("luxury"); }}>luxury</span>
                  {" · "}
                  <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => { setQuery("thamel"); search("thamel"); }}>Thamel</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
