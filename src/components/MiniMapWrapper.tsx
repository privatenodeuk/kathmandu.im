"use client";

import dynamic from "next/dynamic";

const MiniMapInner = dynamic(
  () => import("@/components/MiniMap").then((m) => m.MiniMap),
  { ssr: false }
);

interface Props {
  lat: number;
  lng: number;
  name: string;
}

export function MiniMapWrapper(props: Props) {
  return <MiniMapInner {...props} />;
}
