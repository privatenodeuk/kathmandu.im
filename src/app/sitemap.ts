import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kathmandu.im";

  const [hotels, attractions, tags] = await Promise.all([
    prisma.property.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.listing.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.tag.findMany({
      where: {
        OR: [
          { properties: { some: { property: { status: "PUBLISHED" } } } },
          { listings: { some: { listing: { status: "PUBLISHED" } } } },
        ],
      },
      select: { slug: true },
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/hotels`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/attractions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/nightlife`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  ];

  const hotelRoutes: MetadataRoute.Sitemap = hotels.map((h) => ({
    url: `${siteUrl}/hotels/${h.slug}`,
    lastModified: h.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const attractionRoutes: MetadataRoute.Sitemap = attractions.map((a) => ({
    url: `${siteUrl}/attractions/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `${siteUrl}/tags/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...hotelRoutes, ...attractionRoutes, ...tagRoutes];
}
