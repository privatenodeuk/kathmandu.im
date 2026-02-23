import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CoverImage } from "@/components/CoverImage";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) return {};
  return {
    title: `${tag.name} — Kathmandu Travel Guide`,
    description: `Hotels and attractions in Kathmandu tagged "${tag.name}".`,
  };
}

function Stars({ n }: { n: number }) {
  return <div className="card__stars">{"★".repeat(n)}{"☆".repeat(5 - n)}</div>;
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) notFound();

  const [hotels, attractions] = await Promise.all([
    prisma.property.findMany({
      where: {
        status: "PUBLISHED",
        tags: { some: { tag: { slug } } },
      },
      orderBy: [{ stars: "desc" }, { ourScore: "desc" }],
      include: { area: true },
    }),
    prisma.listing.findMany({
      where: {
        status: "PUBLISHED",
        tags: { some: { tag: { slug } } },
      },
      orderBy: [{ featured: "desc" }, { ourScore: "desc" }],
      include: { area: true },
    }),
  ]);

  const total = hotels.length + attractions.length;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header__eyebrow">Tag</div>
          <h1 className="page-header__title">{tag.name}</h1>
          <p className="page-header__sub">
            {total} {total === 1 ? "result" : "results"} tagged &ldquo;{tag.name}&rdquo;
            {tag.category ? ` · ${tag.category}` : ""}
          </p>
        </div>
      </div>

      <div className="container">
        {hotels.length > 0 && (
          <section className="section" style={{ paddingTop: 0, marginTop: 56 }}>
            <div className="section__header">
              <h2 className="section__title">Hotels</h2>
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

        {attractions.length > 0 && (
          <section className="section" style={{ paddingTop: 0, marginTop: 56 }}>
            <div className="section__header">
              <h2 className="section__title">Attractions</h2>
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
        )}

        {total === 0 && (
          <div style={{ padding: "80px 0", textAlign: "center", color: "var(--muted)" }}>
            No results found for this tag yet.
          </div>
        )}

        <div style={{ paddingBottom: 64 }} />
      </div>
    </>
  );
}
