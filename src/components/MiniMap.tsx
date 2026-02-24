"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

// Fix leaflet default icon paths broken by webpack/Next.js
function FixIcon() {
  const map = useMap();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
    // Use custom accent-coloured DivIcon instead
    void map;
  }, [map]);
  return null;
}

function accentPin() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require("leaflet");
  return L.divIcon({
    html: `<div style="
      width:28px; height:28px; border-radius:50% 50% 50% 0;
      background:#C87941; border:3px solid #fff;
      transform:rotate(-45deg);
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    className: "",
  });
}

interface MiniMapProps {
  lat: number;
  lng: number;
  name: string;
}

export function MiniMap({ lat, lng, name }: MiniMapProps) {
  const position: LatLngExpression = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{ height: 220, borderRadius: 8, overflow: "hidden" }}
      attributionControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      <FixIcon />
      <Marker position={position} icon={typeof window !== "undefined" ? accentPin() : undefined} title={name} />
    </MapContainer>
  );
}
