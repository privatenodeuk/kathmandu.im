import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CoverImage } from "@/components/CoverImage";
import { MiniMapWrapper as MiniMap } from "@/components/MiniMapWrapper";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = await prisma.restaurant.findUnique({ where: { slug } });
  if (!r) return {};
  return {
    title: r.metaTitle ?? `${r.name} — Kathmandu Restaurant`,
    description: r.metaDescription ?? r.descriptionShort ?? undefined,
    openGraph: {
      title: r.metaTitle ?? r.name,
      description: r.metaDescription ?? r.descriptionShort ?? undefined,
    },
  };
}

const TIER_LABEL: Record<string, string> = {
  LUXURY: "Fine Dining",
  UPSCALE: "Upscale",
  MID_RANGE: "Mid-Range",
  BUDGET: "Budget",
};

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const r = await prisma.restaurant.findUnique({
    where: { slug },
    include: { area: true, faqs: { orderBy: { sortOrder: "asc" } } },
  });

  if (!r) notFound();

  const descParagraphs = r.description?.split("\n\n").filter(Boolean) ?? [];
  const cuisines = (r.cuisines as string[]).map((c) => c.replace(/_/g, " ")).join(", ");
  const hours = r.openingHours as { dayOfWeek: string[]; opens: string; closes: string }[] | null;

  return (
    <>
      {/* Hero */}
      <div className="detail-hero">
        <CoverImage
          src={r.coverImageUrl}
          alt={r.name}
          entityType="restaurant"
          className="detail-hero__img"
        />
        <div className="detail-hero__overlay" />
        <div className="detail-hero__content">
          <div className="detail-hero__type">
            {cuisines}
            {r.area && <> · {r.area.name}</>}
            {r.priceTier && <> · {TIER_LABEL[r.priceTier]}</>}
          </div>
          <h1 className="detail-hero__title">{r.name}</h1>
          {r.tagline && <p className="detail-hero__sub">{r.tagline}</p>}
        </div>
      </div>

      <div className="detail-body">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb__sep">›</span>
          <a href="/restaurants">Restaurants</a>
          <span className="breadcrumb__sep">›</span>
          <span>{r.name}</span>
        </div>

        <div className="detail-grid">
          {/* Main */}
          <div className="detail-main">
            <div className="prose-section">
              <h2>About</h2>
              {descParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {r.faqs.length > 0 && (
              <div className="prose-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faqs">
                  {r.faqs.map((f) => (
                    <div key={f.id} className="faq">
                      <div className="faq__q">{f.question}</div>
                      <div className="faq__a">{f.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="detail-side">

            {/* Book / Reserve CTA */}
            {r.reservationUrl && (
              <div className="affiliate-box">
                <div className="affiliate-box__label">Reservations</div>
                {r.pricePerPersonMin && (
                  <div className="affiliate-box__price">
                    From <strong>${r.pricePerPersonMin}</strong> per person
                  </div>
                )}
                <a
                  href={r.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--booking"
                >
                  Reserve a Table →
                </a>
                <p className="affiliate-box__note">Reservations recommended</p>
              </div>
            )}

            {/* Quick info */}
            <div className="info-box">
              <div className="info-box__title">At a Glance</div>
              {r.priceTier && (
                <div className="info-row">
                  <span className="info-row__label">Category</span>
                  <span className="info-row__val">{TIER_LABEL[r.priceTier]}</span>
                </div>
              )}
              {r.pricePerPersonMin && r.pricePerPersonMax && (
                <div className="info-row">
                  <span className="info-row__label">Price</span>
                  <span className="info-row__val">${r.pricePerPersonMin}–${r.pricePerPersonMax} pp</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-row__label">Cuisine</span>
                <span className="info-row__val">{cuisines}</span>
              </div>
              {r.area && (
                <div className="info-row">
                  <span className="info-row__label">Area</span>
                  <span className="info-row__val">{r.area.name}</span>
                </div>
              )}
              {hours && hours.length > 0 && (
                <div className="info-row">
                  <span className="info-row__label">Hours</span>
                  <span className="info-row__val">{hours[0].opens} – {hours[0].closes}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-row__label">Reservations</span>
                <span className="info-row__val">{r.acceptsReservations ? "Recommended" : "Walk-ins welcome"}</span>
              </div>
              {r.outdoorSeating && (
                <div className="info-row">
                  <span className="info-row__label">Seating</span>
                  <span className="info-row__val">Indoor & outdoor</span>
                </div>
              )}
              {r.vegetarianOptions && (
                <div className="info-row">
                  <span className="info-row__label">Dietary</span>
                  <span className="info-row__val">
                    {[r.vegetarianOptions && "Vegetarian", r.veganOptions && "Vegan", r.halalOptions && "Halal"].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
              {r.ourScore && (
                <div className="info-row">
                  <span className="info-row__label">Our score</span>
                  <span className="info-row__val" style={{ color: "var(--accent)", fontWeight: 700 }}>
                    {r.ourScore} / 10
                  </span>
                </div>
              )}
              {r.websiteUrl && (
                <div className="info-row">
                  <span className="info-row__label">Website</span>
                  <a href={r.websiteUrl} target="_blank" rel="noopener noreferrer"
                    className="info-row__val" style={{ color: "var(--accent)" }}>
                    Visit site ↗
                  </a>
                </div>
              )}
              {r.phone && (
                <div className="info-row">
                  <span className="info-row__label">Phone</span>
                  <span className="info-row__val">{r.phone}</span>
                </div>
              )}
            </div>

            {/* Location mini-map */}
            {r.latitude && r.longitude && (
              <div className="info-box">
                <div className="info-box__title">Location</div>
                <div style={{ marginTop: 8, borderRadius: 8, overflow: "hidden" }}>
                  <MiniMap lat={r.latitude} lng={r.longitude} name={r.name} />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${r.latitude},${r.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.78rem", color: "var(--accent)", marginTop: 8, display: "block" }}
                >
                  Open in Google Maps ↗
                </a>
              </div>
            )}

            <a href="/restaurants" className="btn btn--dark" style={{ width: "100%", justifyContent: "center" }}>
              ← All Restaurants
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
