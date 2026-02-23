import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { CoverImage } from "@/components/CoverImage";

function Stars({ n }: { n: number }) {
  return <div className="card__stars">{"★".repeat(n)}{"☆".repeat(5 - n)}</div>;
}

export default async function HomePage() {
  const [hotels, attractions] = await Promise.all([
    prisma.property.findMany({
      where: { status: "PUBLISHED", featured: true },
      orderBy: { ourScore: "desc" },
      take: 4,
      include: { area: true },
    }),
    prisma.listing.findMany({
      where: { status: "PUBLISHED", featured: true },
      orderBy: { ourScore: "desc" },
      take: 6,
      include: { area: true },
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <img
          className="hero__img"
          src="/images/hero-kathmandu.jpg"
          style={{ objectPosition: "center 30%" }}
          alt="Kathmandu Durbar Square"
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__eyebrow">Kathmandu Valley, Nepal</div>
          <h1 className="hero__title">Discover Kathmandu</h1>
          <p className="hero__sub">
            The definitive guide to the world's greatest Himalayan city — from five-star
            heritage hotels to UNESCO temples unchanged for a thousand years.
          </p>
          <div className="hero__ctas">
            <a href="/hotels" className="btn btn--primary">Explore Hotels</a>
            <a href="/attractions" className="btn btn--outline">Top Attractions</a>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Where to Stay</h2>
            <a href="/hotels" className="section__link">All 16 hotels →</a>
          </div>
          <div className="grid--4">
            {hotels.map((h) => (
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
                      {h.priceFromUsd ? `$${h.priceFromUsd}` : ""}
                      <span> / night</span>
                    </span>
                    <span className="btn btn--ghost">View →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">What to See</h2>
            <a href="/attractions" className="section__link">All 25 attractions →</a>
          </div>
          <div className="grid--3">
            {attractions.map((a) => (
              <a key={a.id} href={`/attractions/${a.slug}`} className="card">
                <div className="card__img-wrap">
                  <CoverImage
                    src={a.coverImageUrl}
                    alt={a.name}
                    entityType={a.listingType}
                  />
                  <span className="card__badge">{a.listingType.replace(/_/g, " ")}</span>
                </div>
                <div className="card__body">
                  <div className="card__name">{a.name}</div>
                  <div className="card__meta">
                    {a.area?.name}
                    {a.isFree
                      ? " · Free entry"
                      : a.admissionForeigner
                      ? ` · ${a.admissionForeigner}`
                      : ""}
                  </div>
                  {a.tagline && <div className="card__tagline">{a.tagline}</div>}
                  <div className="card__footer">
                    <span className="btn btn--ghost">Explore →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
