import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { CoverImage } from "@/components/CoverImage";

export const metadata: Metadata = {
  title: "Bars & Nightlife in Kathmandu",
  description:
    "The best bars, rooftop bars and nightlife venues in Kathmandu — from backpacker classics to heritage hotel cocktails.",
};

export default async function NightlifePage() {
  const venues = await prisma.listing.findMany({
    where: {
      status: "PUBLISHED",
      listingType: { in: ["BAR", "ROOFTOP_BAR", "NIGHTLIFE"] },
    },
    orderBy: [{ featured: "desc" }, { ourScore: "desc" }],
    include: { area: true },
  });

  const rooftop = venues.filter((v) => v.listingType === "ROOFTOP_BAR");
  const bars = venues.filter((v) => v.listingType === "BAR" || v.listingType === "NIGHTLIFE");

  const BADGE: Record<string, string> = { BAR: "Bar", ROOFTOP_BAR: "Rooftop Bar", NIGHTLIFE: "Nightlife" };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header__eyebrow">Kathmandu Valley</div>
          <h1 className="page-header__title">Bars & Nightlife</h1>
          <p className="page-header__sub">
            {venues.length} curated venues — rooftop cocktail bars, backpacker institutions and Kathmandu's best nightclubs.
          </p>
        </div>
      </div>

      <div className="container">
        {rooftop.length > 0 && (
          <section className="section" style={{ paddingTop: 0, marginTop: 56 }}>
            <div className="section__header">
              <h2 className="section__title">Rooftop Bars</h2>
            </div>
            <div className="grid--3">
              {rooftop.map((v) => (
                <a key={v.id} href={`/attractions/${v.slug}`} className="card">
                  <div className="card__img-wrap">
                    <CoverImage src={v.coverImageUrl} alt={v.name} entityType={v.listingType} />
                    <span className="card__badge">{BADGE[v.listingType]}</span>
                  </div>
                  <div className="card__body">
                    <div className="card__name">{v.name}</div>
                    <div className="card__meta">{v.area?.name}{v.admissionForeigner ? ` · ${v.admissionForeigner}` : ""}</div>
                    {v.tagline && <div className="card__tagline">{v.tagline}</div>}
                    <div className="card__footer">
                      <span className="btn btn--ghost">Explore →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {bars.length > 0 && (
          <section className="section" style={{ paddingTop: 0, marginTop: 56 }}>
            <div className="section__header">
              <h2 className="section__title">Bars & Clubs</h2>
            </div>
            <div className="grid--3">
              {bars.map((v) => (
                <a key={v.id} href={`/attractions/${v.slug}`} className="card">
                  <div className="card__img-wrap">
                    <CoverImage src={v.coverImageUrl} alt={v.name} entityType={v.listingType} />
                    <span className="card__badge">{BADGE[v.listingType]}</span>
                  </div>
                  <div className="card__body">
                    <div className="card__name">{v.name}</div>
                    <div className="card__meta">{v.area?.name}{v.admissionForeigner ? ` · ${v.admissionForeigner}` : ""}</div>
                    {v.tagline && <div className="card__tagline">{v.tagline}</div>}
                    <div className="card__footer">
                      <span className="btn btn--ghost">Explore →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <div style={{ paddingBottom: 64 }} />
      </div>
    </>
  );
}
