"use client";

import dynamic from "next/dynamic";
import type { MapPin } from "@/components/FullMap";

const FullMapInner = dynamic(
  () => import("@/components/FullMap").then((m) => m.FullMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
          color: "var(--muted)",
        }}
      >
        Loading map…
      </div>
    ),
  }
);

export function FullMapWrapper({ pins }: { pins: MapPin[] }) {
  return <FullMapInner pins={pins} />;
}
