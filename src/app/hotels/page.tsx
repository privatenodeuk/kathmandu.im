import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { CoverImage } from "@/components/CoverImage";

export const metadata: Metadata = {
  title: "Hotels in Kathmandu",
  description:
    "The best hotels in the Kathmandu Valley — from five-star Rana palaces and international chains to boutique three-star properties for independent travellers.",
};

function Stars({ n }: { n: number }) {
  return <div className="card__stars">{"★".repeat(n)}{"☆".repeat(5 - n)}</div>;
}

export default async function HotelsPage() {
  const hotels = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ stars: "desc" }, { ourScore: "desc" }],
    include: { area: true },
  });

  const fiveStar = hotels.filter((h) => h.stars === 5);
  const fourStar = hotels.filter((h) => h.stars === 4);
  const threeStar = hotels.filter((h) => h.stars === 3);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header__eyebrow">Kathmandu Valley</div>
          <h1 className="page-header__title">Hotels</h1>
          <p className="page-header__sub">
            {hotels.length} curated properties — from UNESCO heritage palaces and international five-star chains to boutique three-star guesthouses.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Five Star */}
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">Five-Star Hotels</h2>
          </div>
          <div className="grid--4">
            {fiveStar.map((h) => (
              <a key={h.id} href={`/hotels/${h.slug}`} className="card">
                <div className="card__img-wrap">
                  <CoverImage
                    src={h.coverImageUrl}
                    alt={h.name}
                    entityType={h.stars === 5 ? "hotel5" : "hotel4"}
                  />
                </div>
                <div className="card__body">
                  {h.stars && <Stars n={h.stars} />}
                  <div className="card__name">{h.name}</div>
                  <div className="card__meta">
                    {h.area?.name}{h.priceFromUsd ? ` · from $${h.priceFromUsd}` : ""}
                  </div>
                  {h.tagline && <div className="card__tagline">{h.tagline}</div>}
                  <div className="card__footer">
                    <span className="card__price">
                      {h.priceFromUsd ? `$${h.priceFromUsd}` : "—"}
                      <span> / night</span>
                    </span>
                    <span className="btn btn--ghost">View →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Four Star */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__header">
            <h2 className="section__title">Four-Star Hotels</h2>
          </div>
          <div className="grid--4">
            {fourStar.map((h) => (
              <a key={h.id} href={`/hotels/${h.slug}`} className="card">
                <div className="card__img-wrap">
                  <CoverImage
                    src={h.coverImageUrl}
                    alt={h.name}
                    entityType="hotel4"
                  />
                </div>
                <div className="card__body">
                  {h.stars && <Stars n={h.stars} />}
                  <div className="card__name">{h.name}</div>
                  <div className="card__meta">
                    {h.area?.name}{h.priceFromUsd ? ` · from $${h.priceFromUsd}` : ""}
                  </div>
                  {h.tagline && <div className="card__tagline">{h.tagline}</div>}
                  <div className="card__footer">
                    <span className="card__price">
                      {h.priceFromUsd ? `$${h.priceFromUsd}` : "—"}
                      <span> / night</span>
                    </span>
                    <span className="btn btn--ghost">View →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Three Star */}
        {threeStar.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section__header">
              <h2 className="section__title">Three-Star Hotels</h2>
            </div>
            <div className="grid--4">
              {threeStar.map((h) => (
                <a key={h.id} href={`/hotels/${h.slug}`} className="card">
                  <div className="card__img-wrap">
                    <CoverImage
                      src={h.coverImageUrl}
                      alt={h.name}
                      entityType="hotel4"
                    />
                  </div>
                  <div className="card__body">
                    {h.stars && <Stars n={h.stars} />}
                    <div className="card__name">{h.name}</div>
                    <div className="card__meta">
                      {h.area?.name}{h.priceFromUsd ? ` · from $${h.priceFromUsd}` : ""}
                    </div>
                    {h.tagline && <div className="card__tagline">{h.tagline}</div>}
                    <div className="card__footer">
                      <span className="card__price">
                        {h.priceFromUsd ? `$${h.priceFromUsd}` : "—"}
                        <span> / night</span>
                      </span>
                      <span className="btn btn--ghost">View →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
