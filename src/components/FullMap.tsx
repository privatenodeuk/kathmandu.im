"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

export interface MapPin {
  id: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  kind: "hotel" | "attraction";
  subtype?: string; // stars (hotels) or listingType (attractions)
  tagline?: string | null;
  areaName?: string | null;
}

interface FullMapProps {
  pins: MapPin[];
}

type FilterKey = "all" | "hotels" | "temples" | "bars" | "museums" | "nature" | "unesco";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hotels", label: "Hotels" },
  { key: "temples", label: "Temples & Stupas" },
  { key: "bars", label: "Bars & Nightlife" },
  { key: "museums", label: "Museums" },
  { key: "nature", label: "Nature & Parks" },
  { key: "unesco", label: "UNESCO" },
];

const UNESCO_SLUGS = [
  "pashupatinath-temple", "boudhanath-stupa", "swayambhunath-stupa",
  "kathmandu-durbar-square", "patan-durbar-square", "bhaktapur-durbar-square",
  "changu-narayan-temple",
];

function matchesFilter(pin: MapPin, filter: FilterKey): boolean {
  if (filter === "all") return true;
  if (filter === "hotels") return pin.kind === "hotel";
  const t = pin.subtype ?? "";
  if (filter === "temples") return ["TEMPLE", "STUPA", "MONASTERY"].includes(t);
  if (filter === "bars") return ["BAR", "ROOFTOP_BAR", "NIGHTLIFE"].includes(t);
  if (filter === "museums") return t === "MUSEUM";
  if (filter === "nature") return ["PARK", "NATURAL_SITE", "VIEWPOINT"].includes(t);
  if (filter === "unesco") return UNESCO_SLUGS.includes(pin.slug);
  return true;
}

function markerColor(pin: MapPin): string {
  if (pin.kind === "hotel") return "#C87941";
  const t = pin.subtype ?? "";
  if (["TEMPLE", "STUPA", "MONASTERY"].includes(t)) return "#3b82f6";
  if (["BAR", "ROOFTOP_BAR", "NIGHTLIFE"].includes(t)) return "#7c3aed";
  if (t === "MUSEUM") return "#dc2626";
  if (["PARK", "NATURAL_SITE"].includes(t)) return "#16a34a";
  if (t === "VIEWPOINT") return "#0891b2";
  if (["PALACE", "HISTORIC_SITE"].includes(t)) return "#d97706";
  return "#6b7280";
}

function markerLabel(pin: MapPin): string {
  if (pin.kind === "hotel") return "H";
  const t = pin.subtype ?? "";
  if (["TEMPLE", "STUPA", "MONASTERY"].includes(t)) return "T";
  if (["BAR", "ROOFTOP_BAR", "NIGHTLIFE"].includes(t)) return "B";
  if (t === "MUSEUM") return "M";
  if (["PARK", "NATURAL_SITE", "VIEWPOINT"].includes(t)) return "N";
  return "•";
}

function makeDivIcon(pin: MapPin) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require("leaflet");
  const color = markerColor(pin);
  const label = markerLabel(pin);
  return L.divIcon({
    html: `<div class="map-pin" style="background:${color};">${label}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
    className: "",
  });
}

function typeLabel(pin: MapPin): string {
  if (pin.kind === "hotel") return `${pin.subtype ?? ""}★ Hotel`;
  return (pin.subtype ?? "OTHER").replace(/_/g, " ");
}

function FlyTo({ pin }: { pin: MapPin | null }) {
  const map = useMap();
  useEffect(() => {
    if (pin) map.flyTo([pin.lat, pin.lng], 16, { duration: 0.8 });
  }, [pin, map]);
  return null;
}

export function FullMap({ pins }: FullMapProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<MapPin | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const visible = pins.filter((p) => matchesFilter(p, activeFilter));
  const center: [number, number] = [27.7172, 85.324]; // Kathmandu

  function handleListClick(pin: MapPin) {
    setActivePinId(pin.id);
    setFlyTarget(pin);
    // Scroll list item into view handled by the browser via focus
  }

  return (
    <div className="fullmap-root">
      {/* Sidebar */}
      <div className="fullmap-sidebar">
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)" }}>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "var(--text)" }}>
            Kathmandu Valley Map
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--muted)", margin: "4px 0 0" }}>
            {visible.length} location{visible.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter pills */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 6,
          padding: "12px 16px", borderBottom: "1px solid var(--border)",
        }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setActivePinId(null); }}
              style={{
                fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px",
                borderRadius: 20, border: "1px solid",
                cursor: "pointer", transition: "all 0.15s",
                background: activeFilter === f.key ? "var(--accent)" : "transparent",
                color: activeFilter === f.key ? "#fff" : "var(--muted)",
                borderColor: activeFilter === f.key ? "var(--accent)" : "var(--border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div ref={listRef} style={{ flex: 1, overflowY: "auto" }}>
          {visible.map((pin) => (
            <button
              key={pin.id}
              onClick={() => handleListClick(pin)}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                width: "100%", textAlign: "left", padding: "10px 16px",
                background: activePinId === pin.id ? "var(--bg)" : "transparent",
                border: "none", borderBottom: "1px solid var(--border)",
                cursor: "pointer", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--bg)"; }}
              onMouseLeave={(e) => {
                if (activePinId !== pin.id) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: markerColor(pin), color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 700, marginTop: 2,
              }}>
                {markerLabel(pin)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>
                  {pin.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: 2 }}>
                  {typeLabel(pin)}{pin.areaName ? ` · ${pin.areaName}` : ""}
                </div>
                {pin.tagline && (
                  <div style={{
                    fontSize: "0.72rem", color: "#666", marginTop: 3,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {pin.tagline}
                  </div>
                )}
              </div>
            </button>
          ))}
          {visible.length === 0 && (
            <div style={{ padding: 24, color: "var(--muted)", fontSize: "0.875rem", textAlign: "center" }}>
              No locations found.
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="fullmap-maparea">
        <MapContainer
          center={center}
          zoom={12}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            subdomains="abcd"
            maxZoom={20}
          />
          <FlyTo pin={flyTarget} />
          <MarkerClusterGroup chunkedLoading>
            {visible.map((pin) => (
              <Marker
                key={pin.id}
                position={[pin.lat, pin.lng]}
                icon={makeDivIcon(pin)}
                eventHandlers={{
                  click: () => setActivePinId(pin.id),
                }}
              >
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <div style={{
                      display: "inline-block",
                      fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.05em", color: "#fff",
                      background: markerColor(pin),
                      padding: "2px 7px", borderRadius: 4, marginBottom: 6,
                    }}>
                      {typeLabel(pin)}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>{pin.name}</div>
                    {pin.tagline && (
                      <div style={{ fontSize: "0.78rem", color: "#555", marginBottom: 8 }}>{pin.tagline}</div>
                    )}
                    <a
                      href={`/${pin.kind === "hotel" ? "hotels" : "attractions"}/${pin.slug}`}
                      style={{
                        fontSize: "0.78rem", color: "var(--accent)", fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      View details →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>

        {/* Styles */}
        <style>{`
          .fullmap-root {
            display: flex;
            flex-direction: row;
            height: calc(100vh - 64px);
            overflow: hidden;
          }
          .fullmap-sidebar {
            width: 340px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--border);
            background: #fff;
            overflow: hidden;
          }
          .fullmap-maparea {
            flex: 1;
            position: relative;
          }
          .map-pin {
            width: 28px; height: 28px; border-radius: 50%;
            color: #fff; font-size: 0.7rem; font-weight: 700;
            display: flex; align-items: center; justify-content: center;
            border: 2.5px solid rgba(255,255,255,0.9);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;
          }
          .map-pin:hover {
            transform: scale(1.18);
            box-shadow: 0 4px 16px rgba(0,0,0,0.4);
          }
          @media (max-width: 640px) {
            .fullmap-root {
              flex-direction: column;
              height: auto;
              min-height: calc(100vh - 64px);
            }
            .fullmap-sidebar {
              width: 100%;
              max-height: 45vh;
              border-right: none;
              border-bottom: 1px solid var(--border);
            }
            .fullmap-maparea {
              height: 55vh;
              flex: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
