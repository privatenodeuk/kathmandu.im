"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { label: "Hotels", href: "/hotels", icon: "🏨", desc: "5-star & boutique" },
  { label: "Attractions", href: "/attractions", icon: "🛕", desc: "Temples, stupas & more" },
  { label: "Bars & Nightlife", href: "/nightlife", icon: "🍸", desc: "Rooftop bars & clubs" },
  { label: "UNESCO Sites", href: "/tags/unesco-heritage", icon: "⭐", desc: "World Heritage" },
  { label: "Spiritual", href: "/tags/spiritual", icon: "🙏", desc: "Temples & monasteries" },
  { label: "Luxury", href: "/tags/luxury", icon: "✨", desc: "Premium experiences" },
  { label: "Photography", href: "/tags/photography", icon: "📷", desc: "Best photo spots" },
];

export function NavMore() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "none", border: "none", cursor: "pointer",
          fontSize: "0.875rem", fontWeight: 500, fontFamily: "inherit",
          color: open ? "var(--text)" : "var(--muted)",
          padding: 0, transition: "color 0.15s",
        }}
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
        onMouseLeave={(e) => { if (!open) (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
      >
        More
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M2 4l4 4 4-4"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 12px)", right: 0,
          background: "#fff", borderRadius: 12,
          border: "1px solid var(--border)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          padding: "8px", minWidth: 260, zIndex: 200,
        }}>
          <div style={{
            fontSize: "0.65rem", fontWeight: 700, color: "var(--muted)",
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "6px 10px 8px",
          }}>
            Browse
          </div>
          {CATEGORIES.map((c) => (
            <a
              key={c.href}
              href={c.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "9px 10px", borderRadius: 8,
                textDecoration: "none", color: "var(--text)",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <span style={{ fontSize: "1.1rem", width: 24, textAlign: "center" }}>{c.icon}</span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontWeight: 500, fontSize: "0.875rem" }}>{c.label}</span>
                <span style={{ display: "block", fontSize: "0.72rem", color: "var(--muted)", marginTop: 1 }}>{c.desc}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
