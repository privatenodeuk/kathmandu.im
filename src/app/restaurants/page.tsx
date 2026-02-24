import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CoverImage } from "@/components/CoverImage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Restaurants — Kathmandu Valley",
  description:
    "The best restaurants in Kathmandu — from royal Nepali banquets at Krishnarpan to authentic Newari street food in Bhaktapur. Curated, reviewed and recommended.",
};

const TIER_LABEL: Record<string, string> = {
  LUXURY: "Fine Dining",
  UPSCALE: "Upscale",
  MID_RANGE: "Mid-Range",
  BUDGET: "Budget",
};

const TIER_ORDER = ["LUXURY", "UPSCALE", "MID_RANGE", "BUDGET"];

function PriceBadge({ tier, min, max }: { tier: string | null; min: number | null; max: number | null }) {
  if (!tier) return null;
  const label = TIER_LABEL[tier] ?? tier;
  const price = min && max ? `$${min}–$${max} pp` : min ? `from $${min}` : null;
  return (
    <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
      {label}{price ? ` · ${price}` : ""}
    </span>
  );
}

function CuisineList({ cuisines }: { cuisines: unknown }) {
  if (!Array.isArray(cuisines) || cuisines.length === 0) return null;
  return (
    <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
      {(cuisines as string[]).map((c) => c.replace(/_/g, " ")).join(", ")}
    </span>
  );
}

export default async function RestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany({
    where: { status: "PUBLISHED" },
    include: { area: true },
    // coverImageUrl is included by default (no select restriction)
    orderBy: [{ featured: "desc" }, { ourScore: "desc" }, { name: "asc" }],
  });

  const grouped = TIER_ORDER.reduce<Record<string, typeof restaurants>>((acc, tier) => {
    const group = restaurants.filter((r) => r.priceTier === tier);
    if (group.length > 0) acc[tier] = group;
    return acc;
  }, {});

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">Kathmandu Valley</div>
          <h1 className="page-header__title">Restaurants</h1>
          <p className="page-header__sub">
            {restaurants.length} curated restaurants — from royal Nepali banquets to rooftop momo spots
          </p>
        </div>
      </div>

      <div className="list-body">
        {Object.entries(grouped).map(([tier, group]) => (
          <section key={tier} className="tier-section">
            <h2 className="tier-section__title">
              {TIER_LABEL[tier]}
              <span className="tier-section__count">{group.length}</span>
            </h2>
            <div className="card-grid">
              {group.map((r) => (
                <a key={r.id} href={`/restaurants/${r.slug}`} className="card">
                  <div className="card__img-wrap">
                    <CoverImage
                      src={r.coverImageUrl}
                      alt={r.name}
                      entityType="restaurant"
                      className="card__img"
                    />
                  </div>
                  <div className="card__body">
                    <div className="card__meta">
                      <CuisineList cuisines={r.cuisines} />
                      {r.area && <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{r.area.name}</span>}
                    </div>
                    <h3 className="card__title">{r.name}</h3>
                    {r.tagline && <p className="card__sub">{r.tagline}</p>}
                    <div className="card__footer">
                      <PriceBadge tier={r.priceTier} min={r.pricePerPersonMin} max={r.pricePerPersonMax} />
                      {r.ourScore && (
                        <span style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 700, marginLeft: "auto" }}>
                          {r.ourScore}/10
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
