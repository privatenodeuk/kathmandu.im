import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { MapPin } from "@/components/FullMap";
import { FullMapWrapper } from "@/components/FullMapWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Map — Kathmandu Valley",
  description: "Explore hotels, temples, museums, bars and attractions across the Kathmandu Valley on an interactive map.",
};

export default async function MapPage() {
  const [hotels, attractions, restaurants] = await Promise.all([
    prisma.property.findMany({
      where: { status: "PUBLISHED", NOT: { latitude: null } },
      select: { id: true, slug: true, name: true, latitude: true, longitude: true, stars: true, tagline: true, area: { select: { name: true } } },
    }),
    prisma.listing.findMany({
      where: { status: "PUBLISHED", NOT: { latitude: null } },
      select: { id: true, slug: true, name: true, latitude: true, longitude: true, listingType: true, tagline: true, area: { select: { name: true } } },
    }),
    prisma.restaurant.findMany({
      where: { status: "PUBLISHED", NOT: { latitude: null } },
      select: { id: true, slug: true, name: true, latitude: true, longitude: true, priceTier: true, tagline: true, area: { select: { name: true } } },
    }),
  ]);

  const pins: MapPin[] = [
    ...hotels.map((h) => ({
      id: `hotel-${h.id}`,
      slug: h.slug,
      name: h.name,
      lat: h.latitude as number,
      lng: h.longitude as number,
      kind: "hotel" as const,
      subtype: h.stars ? String(h.stars) : undefined,
      tagline: h.tagline,
      areaName: h.area?.name ?? null,
    })),
    ...attractions.map((a) => ({
      id: `attraction-${a.id}`,
      slug: a.slug,
      name: a.name,
      lat: a.latitude as number,
      lng: a.longitude as number,
      kind: "attraction" as const,
      subtype: a.listingType,
      tagline: a.tagline,
      areaName: a.area?.name ?? null,
    })),
    ...restaurants.map((r) => ({
      id: `restaurant-${r.id}`,
      slug: r.slug,
      name: r.name,
      lat: r.latitude as number,
      lng: r.longitude as number,
      kind: "restaurant" as const,
      subtype: r.priceTier ?? undefined,
      tagline: r.tagline,
      areaName: r.area?.name ?? null,
    })),
  ];

  return <FullMapWrapper pins={pins} />;
}
