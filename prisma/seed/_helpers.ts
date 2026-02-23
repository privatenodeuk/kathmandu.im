/**
 * kathmandu.im — Seed helpers
 * Shared utility functions for building lookup maps and connecting relations.
 * All helpers accept a PrismaClient instance — no side-effect imports.
 */

import { PrismaClient, EntityType } from "@prisma/client";

// ─────────────────────────────────────────────
// LOOKUP MAP BUILDERS
// ─────────────────────────────────────────────

/** Pre-fetch all amenities into a slug → id Map */
export async function buildAmenityMap(prisma: PrismaClient): Promise<Map<string, string>> {
  const rows = await prisma.amenity.findMany({ select: { id: true, slug: true } });
  return new Map(rows.map((r) => [r.slug, r.id]));
}

/** Pre-fetch all tags into a slug → id Map */
export async function buildTagMap(prisma: PrismaClient): Promise<Map<string, string>> {
  const rows = await prisma.tag.findMany({ select: { id: true, slug: true } });
  return new Map(rows.map((r) => [r.slug, r.id]));
}

/** Pre-fetch all areas into a slug → id Map */
export async function buildAreaMap(prisma: PrismaClient): Promise<Map<string, string>> {
  const rows = await prisma.area.findMany({ select: { id: true, slug: true } });
  return new Map(rows.map((r) => [r.slug, r.id]));
}

// ─────────────────────────────────────────────
// RELATION CONNECTORS
// ─────────────────────────────────────────────

/** Attach amenities to a property (idempotent — skipDuplicates) */
export async function connectAmenities(
  prisma: PrismaClient,
  propertyId: string,
  amenitySlugs: string[],
  amenityMap: Map<string, string>,
): Promise<void> {
  const data = amenitySlugs
    .map((slug) => ({ propertyId, amenityId: amenityMap.get(slug)! }))
    .filter((d) => d.amenityId); // silently skip unknown slugs
  if (data.length) {
    await prisma.propertyAmenity.createMany({ data, skipDuplicates: true });
  }
}

/** Attach tags to a property (idempotent — skipDuplicates) */
export async function connectPropertyTags(
  prisma: PrismaClient,
  propertyId: string,
  tagSlugs: string[],
  tagMap: Map<string, string>,
): Promise<void> {
  const data = tagSlugs
    .map((slug) => ({ propertyId, tagId: tagMap.get(slug)! }))
    .filter((d) => d.tagId);
  if (data.length) {
    await prisma.propertyTag.createMany({ data, skipDuplicates: true });
  }
}

/** Attach tags to a listing (idempotent — skipDuplicates) */
export async function connectListingTags(
  prisma: PrismaClient,
  listingId: string,
  tagSlugs: string[],
  tagMap: Map<string, string>,
): Promise<void> {
  const data = tagSlugs
    .map((slug) => ({ listingId, tagId: tagMap.get(slug)! }))
    .filter((d) => d.tagId);
  if (data.length) {
    await prisma.listingTag.createMany({ data, skipDuplicates: true });
  }
}

// ─────────────────────────────────────────────
// FAQ UPSERT (delete-then-create — safe for re-runs)
// ─────────────────────────────────────────────

export interface FAQInput {
  question: string;
  answer: string;
  sortOrder?: number;
}

/**
 * Replace FAQs for a given parent entity.
 * parentField: "propertyId" | "listingId" | "tourId" | "areaId"
 */
export async function upsertFAQs(
  prisma: PrismaClient,
  entityType: EntityType,
  parentField: "propertyId" | "listingId" | "tourId" | "areaId",
  parentId: string,
  faqs: FAQInput[],
): Promise<void> {
  await prisma.fAQ.deleteMany({ where: { [parentField]: parentId } });
  await prisma.fAQ.createMany({
    data: faqs.map((faq, i) => ({
      entityType,
      entityId: parentId,
      [parentField]: parentId,
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sortOrder ?? i,
      published: true,
    })),
  });
}
