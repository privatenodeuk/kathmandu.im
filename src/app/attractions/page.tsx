import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { ListingType } from "@prisma/client";
import { CoverImage } from "@/components/CoverImage";

export const metadata: Metadata = {
  title: "Attractions in Kathmandu",
  description:
    "25 top tourist attractions in the Kathmandu Valley — UNESCO temples, stupas, museums, trekking and more.",
};

const TYPE_LABELS: Record<ListingType, string> = {
  TEMPLE: "Temple",
  STUPA: "Stupa",
  PALACE: "Palace",
  MUSEUM: "Museum",
  PARK: "Park",
  MARKET: "Market",
  VIEWPOINT: "Viewpoint",
  MONASTERY: "Monastery",
  HISTORIC_SITE: "Historic Site",
  NATURAL_SITE: "Nature",
  CULTURAL_SITE: "Cultural Site",
  ACTIVITY: "Activity",
  SHOPPING: "Shopping",
  NIGHTLIFE: "Nightlife",
  BAR: "Bar",
  ROOFTOP_BAR: "Rooftop Bar",
  OTHER: "Other",
};

export default async function AttractionsPage() {
  const attractions = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { ourScore: "desc" }],
    include: { area: true },
  });

  // Group by type
  const groups: Partial<Record<ListingType, typeof attractions>> = {};
  for (const a of attractions) {
    if (!groups[a.listingType]) groups[a.listingType] = [];
    groups[a.listingType]!.push(a);
  }

  // Preferred display order
  const typeOrder: ListingType[] = [
    "TEMPLE", "STUPA", "HISTORIC_SITE", "MONASTERY", "CULTURAL_SITE",
    "MUSEUM", "PARK", "MARKET", "VIEWPOINT", "NATURAL_SITE",
    "PALACE", "ACTIVITY", "SHOPPING", "NIGHTLIFE", "BAR", "ROOFTOP_BAR", "OTHER",
  ];
  const orderedTypes = typeOrder.filter((t) => groups[t]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header__eyebrow">Kathmandu Valley</div>
          <h1 className="page-header__title">Attractions</h1>
          <p className="page-header__sub">
            {attractions.length} handpicked sites — seven UNESCO World Heritage Sites, ancient temples,
            Himalayan viewpoints and hidden local gems.
          </p>
        </div>
      </div>

      <div className="container">
        {orderedTypes.map((type) => (
          <section key={type} className="section" style={{ paddingTop: 0, marginTop: 56 }}>
            <div className="section__header">
              <h2 className="section__title">{TYPE_LABELS[type]}s</h2>
            </div>
            <div className="grid--3">
              {groups[type]!.map((a) => (
                <a key={a.id} href={`/attractions/${a.slug}`} className="card">
                  <div className="card__img-wrap">
                    <CoverImage
                      src={a.coverImageUrl}
                      alt={a.name}
                      entityType={a.listingType}
                    />
                    <span className="card__badge">{TYPE_LABELS[a.listingType]}</span>
                  </div>
                  <div className="card__body">
                    <div className="card__name">{a.name}</div>
                    <div className="card__meta">
                      {a.area?.name}
                      {a.isFree ? " · Free entry" : a.admissionForeigner ? ` · ${a.admissionForeigner}` : ""}
                    </div>
                    {a.tagline && <div className="card__tagline">{a.tagline}</div>}
                    <div className="card__footer">
                      <span className="btn btn--ghost">Explore →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
        <div style={{ paddingBottom: 64 }} />
      </div>
    </>
  );
}
