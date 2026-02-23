/**
 * Seed: Tag taxonomy — shared across Properties, Listings, Tours, Restaurants, Events
 * Categories: Experience, Vibe, Type, Traveller, Season
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tags = [
  // ── Experience ────────────────────────────────────────────────────────────
  { slug: "unesco-heritage",     name: "UNESCO Heritage",      category: "Experience", color: "#d4a017", sortOrder: 1  },
  { slug: "spiritual",           name: "Spiritual",            category: "Experience", color: "#7c3aed", sortOrder: 2  },
  { slug: "trekking",            name: "Trekking",             category: "Experience", color: "#16a34a", sortOrder: 3  },
  { slug: "adventure",           name: "Adventure",            category: "Experience", color: "#dc2626", sortOrder: 4  },
  { slug: "cultural",            name: "Cultural",             category: "Experience", color: "#ea580c", sortOrder: 5  },
  { slug: "historical",          name: "Historical",           category: "Experience", color: "#92400e", sortOrder: 6  },
  { slug: "photography",         name: "Photography",          category: "Experience", color: "#1d4ed8", sortOrder: 7  },
  { slug: "food-and-drink",      name: "Food & Drink",         category: "Experience", color: "#b45309", sortOrder: 8  },
  { slug: "nightlife",           name: "Nightlife",            category: "Experience", color: "#6d28d9", sortOrder: 9  },
  { slug: "shopping",            name: "Shopping",             category: "Experience", color: "#be185d", sortOrder: 10 },
  { slug: "wildlife",            name: "Wildlife",             category: "Experience", color: "#065f46", sortOrder: 11 },
  { slug: "meditation-yoga",     name: "Meditation & Yoga",    category: "Experience", color: "#0f766e", sortOrder: 12 },
  { slug: "art-and-craft",       name: "Art & Craft",          category: "Experience", color: "#c2410c", sortOrder: 13 },
  { slug: "music-and-dance",     name: "Music & Dance",        category: "Experience", color: "#7c3aed", sortOrder: 14 },
  { slug: "rooftop",             name: "Rooftop",              category: "Experience", color: "#0ea5e9", sortOrder: 15 },
  { slug: "views",               name: "Views",                category: "Experience", color: "#0284c7", sortOrder: 16 },
  { slug: "cocktails",           name: "Cocktails",            category: "Experience", color: "#c026d3", sortOrder: 17 },
  { slug: "royal-history",       name: "Royal History",        category: "Experience", color: "#7c2d12", sortOrder: 18 },
  // ── Vibe ──────────────────────────────────────────────────────────────────
  { slug: "romantic",            name: "Romantic",             category: "Vibe",       color: "#db2777", sortOrder: 20 },
  { slug: "luxury",              name: "Luxury",               category: "Vibe",       color: "#d97706", sortOrder: 21 },
  { slug: "budget-friendly",     name: "Budget-Friendly",      category: "Vibe",       color: "#15803d", sortOrder: 22 },
  { slug: "local-favourite",     name: "Local Favourite",      category: "Vibe",       color: "#0369a1", sortOrder: 23 },
  { slug: "hidden-gem",          name: "Hidden Gem",           category: "Vibe",       color: "#7e22ce", sortOrder: 24 },
  { slug: "off-the-beaten-path", name: "Off the Beaten Path",  category: "Vibe",       color: "#4d7c0f", sortOrder: 25 },
  { slug: "instagrammable",      name: "Instagrammable",       category: "Vibe",       color: "#9333ea", sortOrder: 26 },
  { slug: "kid-friendly",        name: "Kid-Friendly",         category: "Vibe",       color: "#0891b2", sortOrder: 27 },
  { slug: "pet-friendly",        name: "Pet-Friendly",         category: "Vibe",       color: "#65a30d", sortOrder: 28 },
  { slug: "eco-friendly",        name: "Eco-Friendly",         category: "Vibe",       color: "#16a34a", sortOrder: 29 },
  { slug: "accessible",          name: "Accessible",           category: "Vibe",       color: "#2563eb", sortOrder: 30 },
  { slug: "quiet-and-peaceful",  name: "Quiet & Peaceful",     category: "Vibe",       color: "#0f766e", sortOrder: 31 },
  { slug: "social",              name: "Social",               category: "Vibe",       color: "#0891b2", sortOrder: 32 },
  // ── Property Type ─────────────────────────────────────────────────────────
  { slug: "museum",              name: "Museum",               category: "Type",       color: "#64748b", sortOrder: 39 },
  { slug: "boutique-hotel",      name: "Boutique Hotel",       category: "Type",       color: "#b45309", sortOrder: 40 },
  { slug: "heritage-property",   name: "Heritage Property",    category: "Type",       color: "#92400e", sortOrder: 41 },
  { slug: "hostel",              name: "Hostel",               category: "Type",       color: "#0369a1", sortOrder: 42 },
  { slug: "guesthouse",          name: "Guesthouse",           category: "Type",       color: "#15803d", sortOrder: 43 },
  { slug: "resort",              name: "Resort",               category: "Type",       color: "#0891b2", sortOrder: 44 },
  { slug: "apartment",           name: "Apartment",            category: "Type",       color: "#4338ca", sortOrder: 45 },
  // ── Traveller ─────────────────────────────────────────────────────────────
  { slug: "solo-traveller",      name: "Solo Traveller",       category: "Traveller",  color: "#0369a1", sortOrder: 50 },
  { slug: "couple",              name: "Couple",               category: "Traveller",  color: "#be185d", sortOrder: 51 },
  { slug: "family",              name: "Family",               category: "Traveller",  color: "#0891b2", sortOrder: 52 },
  { slug: "group",               name: "Group",                category: "Traveller",  color: "#7c3aed", sortOrder: 53 },
  { slug: "pilgrim",             name: "Pilgrim",              category: "Traveller",  color: "#92400e", sortOrder: 54 },
  { slug: "backpacker",          name: "Backpacker",           category: "Traveller",  color: "#15803d", sortOrder: 55 },
  { slug: "business-traveller",  name: "Business Traveller",   category: "Traveller",  color: "#1d4ed8", sortOrder: 56 },
  // ── Season ────────────────────────────────────────────────────────────────
  { slug: "spring",              name: "Spring (Mar–May)",     category: "Season",     color: "#16a34a", sortOrder: 60 },
  { slug: "pre-monsoon",         name: "Pre-Monsoon",          category: "Season",     color: "#65a30d", sortOrder: 61 },
  { slug: "autumn",              name: "Autumn (Oct–Nov)",     category: "Season",     color: "#d97706", sortOrder: 62 },
  { slug: "winter",              name: "Winter (Dec–Feb)",     category: "Season",     color: "#0369a1", sortOrder: 63 },
  { slug: "year-round",          name: "Year-Round",           category: "Season",     color: "#6d28d9", sortOrder: 64 },
];

export async function seedTags() {
  console.log("🏷  Seeding tags...");

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }

  console.log(`✅ Tags seeded: ${tags.length} records`);
}
