import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CoverImage } from "@/components/CoverImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = await prisma.listing.findUnique({ where: { slug } });
  if (!l) return {};
  return {
    title: l.metaTitle ?? `${l.name} — Kathmandu Attraction`,
    description: l.metaDescription ?? l.descriptionShort ?? undefined,
    openGraph: {
      title: l.metaTitle ?? l.name,
      description: l.metaDescription ?? l.descriptionShort ?? undefined,
      images: l.coverImageUrl ? [l.coverImageUrl] : [],
    },
  };
}

function VisitorTips({ tips }: { tips: Record<string, string> }) {
  const entries = Object.entries(tips).filter(([, v]) => v);
  if (!entries.length) return null;
  const LABELS: Record<string, string> = {
    bestTime: "Best Time",
    howToGetThere: "Getting There",
    whatToWear: "What to Wear",
    timeNeeded: "Time Needed",
    photography: "Photography",
  };
  return (
    <div className="tips">
      {entries.map(([k, v]) => (
        <div key={k} className="tip">
          <div className="tip__label">{LABELS[k] ?? k}</div>
          <div className="tip__val">{v}</div>
        </div>
      ))}
    </div>
  );
}

export default async function AttractionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const attraction = await prisma.listing.findUnique({
    where: { slug },
    include: {
      area: true,
      tags: { include: { tag: true } },
      faqs: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!attraction) notFound();

  const descParagraphs = attraction.description?.split("\n\n").filter(Boolean) ?? [];
  const historyParagraphs = attraction.history?.split("\n\n").filter(Boolean) ?? [];
  const highlights = attraction.highlights as string[];
  const visitorTips = attraction.visitorTips as Record<string, string>;
  const typeLabel = attraction.listingType.replace(/_/g, " ");

  // Parse opening hours
  const hours = attraction.openingHoursSpec as any[] | null;
  const firstHours = hours?.[0];

  return (
    <>
      {/* Hero */}
      <div className="detail-hero">
        <CoverImage
          src={attraction.coverImageUrl}
          alt={attraction.name}
          entityType={attraction.listingType}
          className="detail-hero__img"
        />
        <div className="detail-hero__overlay" />
        <div className="detail-hero__content">
          <div className="detail-hero__type">
            {typeLabel}
            {attraction.area && <> · {attraction.area.name}</>}
            {attraction.significance && <> · {attraction.significance}</>}
          </div>
          <h1 className="detail-hero__title">{attraction.name}</h1>
          {attraction.tagline && <p className="detail-hero__sub">{attraction.tagline}</p>}
        </div>
      </div>

      <div className="detail-body">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb__sep">›</span>
          <a href="/attractions">Attractions</a>
          <span className="breadcrumb__sep">›</span>
          <span>{attraction.name}</span>
        </div>

        <div className="detail-grid">
          {/* Main */}
          <div className="detail-main">

            {/* About */}
            <div className="prose-section">
              <h2>About</h2>
              {descParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="prose-section">
                <h2>Highlights</h2>
                <ul className="highlights">
                  {highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            )}

            {/* Visitor Tips */}
            {Object.keys(visitorTips).length > 0 && (
              <div className="prose-section">
                <h2>Visitor Tips</h2>
                <VisitorTips tips={visitorTips} />
              </div>
            )}

            {/* Insider Tip */}
            {attraction.insiderTip && (
              <div className="callout">
                <div className="callout__label">Insider Tip</div>
                <p>{attraction.insiderTip}</p>
              </div>
            )}

            {/* History */}
            {historyParagraphs.length > 0 && (
              <div className="prose-section">
                <h2>History</h2>
                {historyParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}

            {/* FAQs */}
            {attraction.faqs.length > 0 && (
              <div className="prose-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faqs">
                  {attraction.faqs.map((f) => (
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

            {/* Quick info */}
            <div className="info-box">
              <div className="info-box__title">At a Glance</div>
              <div className="info-row">
                <span className="info-row__label">Type</span>
                <span className="info-row__val">{typeLabel}</span>
              </div>
              {attraction.area && (
                <div className="info-row">
                  <span className="info-row__label">Area</span>
                  <span className="info-row__val">{attraction.area.name}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-row__label">Admission</span>
                <span className="info-row__val">
                  {attraction.isFree
                    ? "Free"
                    : attraction.admissionForeigner ?? "Paid"}
                </span>
              </div>
              {attraction.admissionLocal && !attraction.isFree && (
                <div className="info-row">
                  <span className="info-row__label">Local rate</span>
                  <span className="info-row__val">{attraction.admissionLocal}</span>
                </div>
              )}
              {firstHours && (
                <div className="info-row">
                  <span className="info-row__label">Opens</span>
                  <span className="info-row__val">
                    {firstHours.opens} – {firstHours.closes}
                  </span>
                </div>
              )}
              {attraction.ourScore && (
                <div className="info-row">
                  <span className="info-row__label">Our score</span>
                  <span className="info-row__val" style={{ color: "var(--accent)", fontWeight: 700 }}>
                    {attraction.ourScore} / 10
                  </span>
                </div>
              )}
              {attraction.architecturalStyle && (
                <div className="info-row">
                  <span className="info-row__label">Style</span>
                  <span className="info-row__val">{attraction.architecturalStyle}</span>
                </div>
              )}
              {attraction.deityOrSubject && (
                <div className="info-row">
                  <span className="info-row__label">Dedicated to</span>
                  <span className="info-row__val">{attraction.deityOrSubject}</span>
                </div>
              )}
            </div>

            {/* Getting there */}
            {visitorTips.howToGetThere && (
              <div className="info-box">
                <div className="info-box__title">Getting There</div>
                <p style={{ fontSize: "0.875rem", color: "#444", lineHeight: 1.6, marginTop: 4 }}>
                  {visitorTips.howToGetThere}
                </p>
              </div>
            )}

            {/* Best time */}
            {visitorTips.bestTime && (
              <div className="info-box">
                <div className="info-box__title">Best Time to Visit</div>
                <p style={{ fontSize: "0.875rem", color: "#444", lineHeight: 1.6, marginTop: 4 }}>
                  {visitorTips.bestTime}
                </p>
              </div>
            )}

            {/* Tags */}
            {attraction.tags.length > 0 && (
              <div className="info-box">
                <div className="info-box__title">Tags</div>
                <div className="tags" style={{ marginTop: 4 }}>
                  {attraction.tags.map((t) => (
                    <a key={t.tagId} href={`/tags/${t.tag.slug}`} className="tag">{t.tag.name}</a>
                  ))}
                </div>
              </div>
            )}

            <a
              href="/attractions"
              className="btn btn--dark"
              style={{ width: "100%", justifyContent: "center" }}
            >
              ← All Attractions
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
