import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CoverImage } from "@/components/CoverImage";
import { MiniMapWrapper as MiniMap } from "@/components/MiniMapWrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = await prisma.property.findUnique({ where: { slug } });
  if (!h) return {};
  return {
    title: h.metaTitle ?? `${h.name} — Kathmandu Hotel`,
    description: h.metaDescription ?? h.descriptionShort ?? undefined,
    openGraph: {
      title: h.metaTitle ?? h.name,
      description: h.metaDescription ?? h.descriptionShort ?? undefined,
      images: h.coverImageUrl ? [h.coverImageUrl] : [],
    },
  };
}

function Stars({ n }: { n: number }) {
  return <span style={{ color: "var(--accent)" }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

async function getHotel(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: {
      area: true,
      roomTypes: { orderBy: { priceFromUsd: "asc" } },
      amenities: { include: { amenity: true }, orderBy: { amenity: { sortOrder: "asc" } } },
      tags: { include: { tag: true } },
      policy: true,
      faqs: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export default async function HotelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = await getHotel(slug);
  if (!hotel) notFound();

  const descParagraphs = hotel.description?.split("\n\n").filter(Boolean) ?? [];
  const tips = hotel.policy;

  const bookingAffiliateId = process.env.BOOKING_AFFILIATE_ID;
  const bookingUrl = bookingAffiliateId
    ? `https://www.booking.com/hotel/np/${hotel.slug}.html?aid=${bookingAffiliateId}`
    : `https://www.booking.com/hotel/np/${hotel.slug}.html`;

  return (
    <>
      {/* Hero */}
      <div className="detail-hero">
        <CoverImage
          src={hotel.coverImageUrl}
          alt={hotel.name}
          entityType={hotel.stars === 5 ? "hotel5" : "hotel4"}
          className="detail-hero__img"
        />
        <div className="detail-hero__overlay" />
        <div className="detail-hero__content">
          <div className="detail-hero__type">
            {hotel.stars && <><Stars n={hotel.stars} /> · {hotel.stars}-Star Hotel</>}
            {hotel.area && <> · {hotel.area.name}</>}
          </div>
          <h1 className="detail-hero__title">{hotel.name}</h1>
          {hotel.tagline && <p className="detail-hero__sub">{hotel.tagline}</p>}
        </div>
      </div>

      <div className="detail-body">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb__sep">›</span>
          <a href="/hotels">Hotels</a>
          <span className="breadcrumb__sep">›</span>
          <span>{hotel.name}</span>
        </div>

        <div className="detail-grid">
          {/* Main */}
          <div className="detail-main">

            {/* About */}
            <div className="prose-section">
              <h2>About</h2>
              {descParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Rooms */}
            {hotel.roomTypes.length > 0 && (
              <div className="prose-section">
                <h2>Room Types</h2>
                <div className="rooms">
                  {hotel.roomTypes.map((r) => (
                    <div key={r.id} className="room-card">
                      <div className="room-card__info">
                        <div className="room-card__name">{r.name}</div>
                        {r.description && (
                          <div className="room-card__desc">{r.description}</div>
                        )}
                        <div className="room-card__meta">
                          {[
                            r.bedType && `Bed: ${r.bedType}`,
                            r.sizeM2 && `${r.sizeM2} m²`,
                            r.maxOccupancy && `Max ${r.maxOccupancy} guests`,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </div>
                      </div>
                      {r.priceFromUsd && (
                        <div className="room-card__price">
                          ${r.priceFromUsd}
                          <br />
                          <span>/ night</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {hotel.faqs.length > 0 && (
              <div className="prose-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faqs">
                  {hotel.faqs.map((f) => (
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

            {/* Booking CTA */}
            <div className="affiliate-box">
              <div className="affiliate-box__label">Book on Booking.com</div>
              {hotel.priceFromUsd && (
                <div className="affiliate-box__price">
                  From <strong>${hotel.priceFromUsd}</strong> / night
                </div>
              )}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn--booking"
              >
                Check Availability →
              </a>
              <p className="affiliate-box__note">
                Best price guarantee · Free cancellation on most rates
              </p>
            </div>

            {/* Quick info */}
            <div className="info-box">
              <div className="info-box__title">Quick Info</div>
              {hotel.stars && (
                <div className="info-row">
                  <span className="info-row__label">Rating</span>
                  <span className="info-row__val"><Stars n={hotel.stars} /> {hotel.stars}-star</span>
                </div>
              )}
              {hotel.priceFromUsd && (
                <div className="info-row">
                  <span className="info-row__label">Price from</span>
                  <span className="info-row__val">${hotel.priceFromUsd} / night</span>
                </div>
              )}
              {hotel.area && (
                <div className="info-row">
                  <span className="info-row__label">Area</span>
                  <span className="info-row__val">{hotel.area.name}</span>
                </div>
              )}
              {hotel.totalRooms && (
                <div className="info-row">
                  <span className="info-row__label">Rooms</span>
                  <span className="info-row__val">{hotel.totalRooms}</span>
                </div>
              )}
              {hotel.yearBuilt && (
                <div className="info-row">
                  <span className="info-row__label">Opened</span>
                  <span className="info-row__val">
                    {hotel.yearBuilt}
                    {hotel.yearRenovated ? ` (renovated ${hotel.yearRenovated})` : ""}
                  </span>
                </div>
              )}
              {hotel.ourScore && (
                <div className="info-row">
                  <span className="info-row__label">Our score</span>
                  <span className="info-row__val" style={{ color: "var(--accent)", fontWeight: 700 }}>
                    {hotel.ourScore} / 10
                  </span>
                </div>
              )}
              {hotel.websiteUrl && (
                <div className="info-row">
                  <span className="info-row__label">Website</span>
                  <a
                    href={hotel.websiteUrl}
                    className="info-row__val"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    Visit site ↗
                  </a>
                </div>
              )}
            </div>

            {/* Location mini-map */}
            {hotel.latitude && hotel.longitude && (
              <div className="info-box">
                <div className="info-box__title">Location</div>
                <div style={{ marginTop: 8, borderRadius: 8, overflow: "hidden" }}>
                  <MiniMap lat={hotel.latitude} lng={hotel.longitude} name={hotel.name} />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.78rem", color: "var(--accent)", marginTop: 8, display: "block" }}
                >
                  Open in Google Maps ↗
                </a>
              </div>
            )}

            {/* Policy */}
            {tips && (
              <div className="info-box">
                <div className="info-box__title">Policies</div>
                {tips.checkinFrom && (
                  <div className="info-row">
                    <span className="info-row__label">Check-in</span>
                    <span className="info-row__val">From {tips.checkinFrom}</span>
                  </div>
                )}
                {tips.checkoutUntil && (
                  <div className="info-row">
                    <span className="info-row__label">Check-out</span>
                    <span className="info-row__val">Until {tips.checkoutUntil}</span>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-row__label">Breakfast</span>
                  <span className="info-row__val">{tips.breakfastIncluded ? "Included" : "Not included"}</span>
                </div>
                <div className="info-row">
                  <span className="info-row__label">Parking</span>
                  <span className="info-row__val">
                    {tips.parkingAvailable
                      ? tips.parkingPriceUsd === 0
                        ? "Free"
                        : `$${tips.parkingPriceUsd}/day`
                      : "Not available"}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-row__label">Pets</span>
                  <span className="info-row__val">{tips.petsAllowed ? "Allowed" : "Not allowed"}</span>
                </div>
                {tips.cancellationHours && (
                  <div className="info-row">
                    <span className="info-row__label">Cancellation</span>
                    <span className="info-row__val">Free up to {tips.cancellationHours}h before</span>
                  </div>
                )}
              </div>
            )}

            {/* Amenities */}
            {hotel.amenities.length > 0 && (
              <div className="info-box">
                <div className="info-box__title">Amenities</div>
                <div className="amenities" style={{ marginTop: 4 }}>
                  {hotel.amenities.map((a) => (
                    <span key={a.amenityId} className="amenity-tag">
                      {a.amenity.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {hotel.tags.length > 0 && (
              <div className="info-box">
                <div className="info-box__title">Best For</div>
                <div className="tags" style={{ marginTop: 4 }}>
                  {hotel.tags.map((t) => (
                    <a key={t.tagId} href={`/tags/${t.tag.slug}`} className="tag">{t.tag.name}</a>
                  ))}
                </div>
              </div>
            )}

            <a href="/hotels" className="btn btn--dark" style={{ width: "100%", justifyContent: "center" }}>
              ← All Hotels
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
