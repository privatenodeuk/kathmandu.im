import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ hotels: [], attractions: [] });

  const [hotels, attractions] = await Promise.all([
    prisma.property.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { tagline: { contains: q, mode: "insensitive" } },
          { area: { name: { contains: q, mode: "insensitive" } } },
        ],
      },
      select: { slug: true, name: true, stars: true, area: { select: { name: true } } },
      take: 5,
      orderBy: [{ stars: "desc" }, { ourScore: "desc" }],
    }),
    prisma.listing.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { tagline: { contains: q, mode: "insensitive" } },
          { area: { name: { contains: q, mode: "insensitive" } } },
        ],
      },
      select: { slug: true, name: true, listingType: true, area: { select: { name: true } } },
      take: 8,
      orderBy: [{ featured: "desc" }, { ourScore: "desc" }],
    }),
  ]);

  return NextResponse.json({ hotels, attractions });
}
