/**
 * Seed: Kathmandu Valley neighbourhoods and districts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const areas = [
  {
    slug: "thamel",
    name: "Thamel",
    nameLocal: "थमेल",
    description:
      "Kathmandu's vibrant tourist hub, packed with guesthouses, restaurants, trekking gear shops and lively nightlife. The beating heart of backpacker Nepal since the 1970s.",
    latitude: 27.7151,
    longitude: 85.3122,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    safetyNotes: "Generally safe for tourists; watch for pickpockets in crowded lanes.",
    transportLinks: ["5 min taxi to Durbar Square", "15 min taxi to Pashupatinath", "25 min to TIA airport"],
    practicalInfo: {
      currency: "NPR (Nepalese Rupee). ATMs plentiful in Thamel core.",
      powerSockets: "Type C/D/M — 230V 50Hz",
      tipping: "10% at restaurants is appreciated but not mandatory.",
      visa: "On-arrival visa available at TIA. 15/30/90 day options.",
    },
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "durbar-square",
    name: "Durbar Square",
    nameLocal: "हनुमान ढोका",
    description:
      "The historic heart of old Kathmandu, home to the royal palace complex, ancient temples and the living goddess Kumari. A UNESCO World Heritage Site.",
    latitude: 27.7043,
    longitude: 85.3073,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["10 min walk from Thamel", "Microbus from New Bus Park"],
    practicalInfo: {
      admission: "NPR 1000 for foreigners (includes Patan Durbar). Free for Nepali citizens.",
      currency: "NPR",
    },
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "patan",
    name: "Patan (Lalitpur)",
    nameLocal: "ललितपुर",
    description:
      "The city of fine arts and crafts. Patan's Durbar Square rivals Kathmandu's for temple density and is considered better preserved. Famous for bronze casting and thangka painting.",
    latitude: 27.6728,
    longitude: 85.3249,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["15 min taxi from Thamel", "Microbus via Jawalakhel"],
    practicalInfo: { currency: "NPR", admission: "NPR 1000 entry to Durbar Square" },
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "bhaktapur",
    name: "Bhaktapur",
    nameLocal: "भक्तपुर",
    description:
      "The best-preserved medieval city in Nepal. Bhaktapur's 55-Window Palace, Nyatapola Temple and pottery square make it a must-visit for architecture lovers.",
    latitude: 27.6722,
    longitude: 85.4289,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["45 min bus from Kathmandu", "Taxi ~NPR 1500 from Thamel"],
    practicalInfo: { admission: "NPR 1800 for foreigners (day pass)", currency: "NPR" },
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "boudhanath",
    name: "Boudhanath",
    nameLocal: "बौद्धनाथ",
    description:
      "Home to one of the world's largest Buddhist stupas. The Boudhanath Stupa is a major pilgrimage site for Tibetan Buddhists and a serene counterpoint to the city's bustle.",
    latitude: 27.7215,
    longitude: 85.3620,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["15 min taxi from Thamel", "Tempo from Ratna Park"],
    practicalInfo: { admission: "NPR 400 for foreigners", currency: "NPR" },
    featured: true,
    sortOrder: 5,
  },
  {
    slug: "pashupatinath",
    name: "Pashupatinath",
    nameLocal: "पशुपतिनाथ",
    description:
      "Nepal's holiest Hindu site and a UNESCO World Heritage Site. The Pashupatinath Temple complex stretches along the Bagmati River and is famed for its ghats and cremation ceremonies.",
    latitude: 27.7109,
    longitude: 85.3487,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["20 min taxi from Thamel", "10 min from Boudhanath"],
    practicalInfo: { admission: "NPR 1000 for foreigners (temple area)", currency: "NPR" },
    featured: true,
    sortOrder: 6,
  },
  {
    slug: "swayambhunath",
    name: "Swayambhunath (Monkey Temple)",
    nameLocal: "स्वयम्भूनाथ",
    description:
      "One of the oldest and most sacred Buddhist pilgrimage sites in Nepal. The hilltop stupa offers panoramic views of the Kathmandu Valley and is known for its resident rhesus monkeys.",
    latitude: 27.7149,
    longitude: 85.2904,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["15 min taxi or 30 min walk from Thamel"],
    practicalInfo: { admission: "NPR 200 for foreigners", currency: "NPR" },
    featured: true,
    sortOrder: 7,
  },
  {
    slug: "jhamsikhel",
    name: "Jhamsikhel",
    nameLocal: "झाम्सिखेल",
    description:
      "Patan's expat neighbourhood. Quieter than Thamel with excellent international restaurants, coffee shops, and a relaxed atmosphere popular with NGO workers and long-stay visitors.",
    latitude: 27.6810,
    longitude: 85.3168,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["20 min taxi from Thamel", "Near Patan Durbar Square"],
    practicalInfo: { currency: "NPR" },
    featured: false,
    sortOrder: 8,
  },
  {
    slug: "lazimpat",
    name: "Lazimpat",
    nameLocal: "लाजिम्पाट",
    description:
      "Kathmandu's embassy district. Home to upscale hotels, art galleries and the Dwarika's Hotel. A peaceful neighbourhood north of the palace.",
    latitude: 27.7192,
    longitude: 85.3215,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["10 min taxi from Thamel"],
    practicalInfo: { currency: "NPR" },
    featured: false,
    sortOrder: 9,
  },
  {
    slug: "kirtipur",
    name: "Kirtipur",
    nameLocal: "कीर्तिपुर",
    description:
      "A hilltop town with sweeping valley views and almost no tourist crowds. One of the most authentic medieval settlements in the valley, with a proud history of resisting Prithvi Narayan Shah.",
    latitude: 27.6764,
    longitude: 85.2789,
    climate: { bestMonths: [10, 11, 3, 4], rainyMonths: [6, 7, 8], coldMonths: [12, 1, 2] },
    transportLinks: ["30 min bus from Kathmandu"],
    practicalInfo: { currency: "NPR", admission: "Free" },
    featured: false,
    sortOrder: 10,
  },
];

export async function seedAreas() {
  console.log("🌏 Seeding areas...");
  let created = 0;
  let updated = 0;

  for (const area of areas) {
    const result = await prisma.area.upsert({
      where: { slug: area.slug },
      update: area,
      create: area,
    });
    if (result) {
      // Prisma upsert always returns the record; we can't distinguish create vs update easily
      created++;
    }
  }

  console.log(`✅ Areas seeded: ${areas.length} records`);
}
