/**
 * kathmandu.im — Prisma seed runner
 * Run: npx prisma db seed
 * Or:  npx tsx prisma/seed/index.ts
 *
 * All scripts use upsert — safe to run multiple times.
 */

import { PrismaClient } from "@prisma/client";
import { seedAreas } from "./areas";
import { seedAmenities } from "./amenities";
import { seedTags } from "./tags";
import { seedHotels } from "./hotels";
import { seedAttractions } from "./attractions";
import { seedRestaurants } from "./restaurants";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting kathmandu.im seed...\n");

  await seedAreas();
  await seedAmenities();
  await seedTags();
  await seedHotels();
  await seedAttractions();
  await seedRestaurants();

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
