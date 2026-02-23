/**
 * Seed: Hotel amenities taxonomy (50+ amenities)
 * Categories: General, Room, Food & Drink, Services, Outdoor, Wellness, Business
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const amenities = [
  // ── General ───────────────────────────────────────────────────────────────
  { slug: "wifi-free",           name: "Free WiFi",                   category: "General",        icon: "wifi",          sortOrder: 1  },
  { slug: "24h-reception",       name: "24-Hour Reception",           category: "General",        icon: "clock",         sortOrder: 2  },
  { slug: "24h-security",        name: "24-Hour Security",            category: "General",        icon: "shield",        sortOrder: 3  },
  { slug: "elevator",            name: "Elevator / Lift",             category: "General",        icon: "arrow-up",      sortOrder: 4  },
  { slug: "air-conditioning",    name: "Air Conditioning",            category: "General",        icon: "snowflake",     sortOrder: 5  },
  { slug: "heating",             name: "Heating",                     category: "General",        icon: "flame",         sortOrder: 6  },
  { slug: "non-smoking",         name: "Non-Smoking Rooms",           category: "General",        icon: "ban",           sortOrder: 7  },
  { slug: "smoking-area",        name: "Designated Smoking Area",     category: "General",        icon: "cigarette",     sortOrder: 8  },
  { slug: "luggage-storage",     name: "Luggage Storage",             category: "General",        icon: "briefcase",     sortOrder: 9  },
  { slug: "safety-deposit",      name: "Safety Deposit Box",          category: "General",        icon: "lock",          sortOrder: 10 },
  // ── Room ──────────────────────────────────────────────────────────────────
  { slug: "private-bathroom",    name: "Private Bathroom",            category: "Room",           icon: "bath",          sortOrder: 20 },
  { slug: "hot-shower",          name: "Hot Shower",                  category: "Room",           icon: "droplets",      sortOrder: 21 },
  { slug: "bathtub",             name: "Bathtub",                     category: "Room",           icon: "bath",          sortOrder: 22 },
  { slug: "flat-screen-tv",      name: "Flat-Screen TV",              category: "Room",           icon: "tv",            sortOrder: 23 },
  { slug: "minibar",             name: "Minibar",                     category: "Room",           icon: "wine",          sortOrder: 24 },
  { slug: "kettle",              name: "Electric Kettle",             category: "Room",           icon: "coffee",        sortOrder: 25 },
  { slug: "coffee-maker",        name: "Coffee / Tea Maker",          category: "Room",           icon: "coffee",        sortOrder: 26 },
  { slug: "desk",                name: "Work Desk",                   category: "Room",           icon: "monitor",       sortOrder: 27 },
  { slug: "wardrobe",            name: "Wardrobe / Closet",           category: "Room",           icon: "shirt",         sortOrder: 28 },
  { slug: "blackout-curtains",   name: "Blackout Curtains",           category: "Room",           icon: "moon",          sortOrder: 29 },
  { slug: "mountain-view",       name: "Mountain View",               category: "Room",           icon: "mountain",      sortOrder: 30 },
  { slug: "valley-view",         name: "Valley View",                 category: "Room",           icon: "landscape",     sortOrder: 31 },
  { slug: "balcony",             name: "Balcony / Terrace",           category: "Room",           icon: "home",          sortOrder: 32 },
  // ── Food & Drink ──────────────────────────────────────────────────────────
  { slug: "restaurant",          name: "On-Site Restaurant",          category: "Food & Drink",   icon: "utensils",      sortOrder: 40 },
  { slug: "bar",                 name: "Bar / Lounge",                category: "Food & Drink",   icon: "glass",         sortOrder: 41 },
  { slug: "breakfast-included",  name: "Breakfast Included",          category: "Food & Drink",   icon: "egg",           sortOrder: 42 },
  { slug: "breakfast-available", name: "Breakfast Available",         category: "Food & Drink",   icon: "egg",           sortOrder: 43 },
  { slug: "rooftop-restaurant",  name: "Rooftop Restaurant",          category: "Food & Drink",   icon: "building",      sortOrder: 44 },
  { slug: "room-service",        name: "Room Service",                category: "Food & Drink",   icon: "truck",         sortOrder: 45 },
  { slug: "vegetarian-menu",     name: "Vegetarian Menu Options",     category: "Food & Drink",   icon: "leaf",          sortOrder: 46 },
  { slug: "vegan-menu",          name: "Vegan Menu Options",          category: "Food & Drink",   icon: "leaf",          sortOrder: 47 },
  { slug: "halal-food",          name: "Halal Food Options",          category: "Food & Drink",   icon: "moon",          sortOrder: 48 },
  // ── Services ──────────────────────────────────────────────────────────────
  { slug: "airport-transfer",    name: "Airport Transfer",            category: "Services",       icon: "plane",         sortOrder: 60 },
  { slug: "taxi-service",        name: "Taxi / Tuk-Tuk Arrangement",  category: "Services",       icon: "car",           sortOrder: 61 },
  { slug: "tour-desk",           name: "Tour Desk",                   category: "Services",       icon: "map",           sortOrder: 62 },
  { slug: "trekking-info",       name: "Trekking / Permit Assistance",category: "Services",       icon: "map-pin",       sortOrder: 63 },
  { slug: "currency-exchange",   name: "Currency Exchange",           category: "Services",       icon: "banknote",      sortOrder: 64 },
  { slug: "laundry",             name: "Laundry Service",             category: "Services",       icon: "shirt",         sortOrder: 65 },
  { slug: "dry-cleaning",        name: "Dry Cleaning",                category: "Services",       icon: "shirt",         sortOrder: 66 },
  { slug: "concierge",           name: "Concierge Service",           category: "Services",       icon: "user",          sortOrder: 67 },
  { slug: "baggage-transfer",    name: "Baggage Transfer",            category: "Services",       icon: "briefcase",     sortOrder: 68 },
  { slug: "medical-assistance",  name: "Medical Assistance",          category: "Services",       icon: "heart-pulse",   sortOrder: 69 },
  { slug: "gear-storage",        name: "Trekking Gear Storage",       category: "Services",       icon: "package",       sortOrder: 70 },
  // ── Outdoor / Facilities ──────────────────────────────────────────────────
  { slug: "garden",              name: "Garden / Courtyard",          category: "Outdoor",        icon: "flower",        sortOrder: 80 },
  { slug: "rooftop-terrace",     name: "Rooftop Terrace",             category: "Outdoor",        icon: "building",      sortOrder: 81 },
  { slug: "swimming-pool",       name: "Swimming Pool",               category: "Outdoor",        icon: "waves",         sortOrder: 82 },
  { slug: "parking-free",        name: "Free Parking",                category: "Outdoor",        icon: "car",           sortOrder: 83 },
  { slug: "parking-paid",        name: "Paid Parking",                category: "Outdoor",        icon: "car",           sortOrder: 84 },
  // ── Wellness ──────────────────────────────────────────────────────────────
  { slug: "spa",                 name: "Spa",                         category: "Wellness",       icon: "leaf",          sortOrder: 90 },
  { slug: "ayurvedic-massage",   name: "Ayurvedic / Traditional Massage", category: "Wellness",  icon: "hands",         sortOrder: 91 },
  { slug: "gym",                 name: "Fitness Centre / Gym",        category: "Wellness",       icon: "dumbbell",      sortOrder: 92 },
  { slug: "yoga",                name: "Yoga Classes",                category: "Wellness",       icon: "person-arms-up",sortOrder: 93 },
  { slug: "meditation",          name: "Meditation Room",             category: "Wellness",       icon: "brain",         sortOrder: 94 },
  { slug: "sauna",               name: "Sauna / Steam Room",          category: "Wellness",       icon: "thermometer",   sortOrder: 95 },
  // ── Business ──────────────────────────────────────────────────────────────
  { slug: "meeting-room",        name: "Meeting / Conference Room",   category: "Business",       icon: "users",         sortOrder: 100 },
  { slug: "business-centre",     name: "Business Centre",             category: "Business",       icon: "briefcase",     sortOrder: 101 },
  { slug: "printing",            name: "Printing / Fax Service",      category: "Business",       icon: "printer",       sortOrder: 102 },
  // ── Accessibility ─────────────────────────────────────────────────────────
  { slug: "wheelchair-access",   name: "Wheelchair Accessible",       category: "Accessibility",  icon: "accessibility", sortOrder: 110 },
  { slug: "accessible-bathroom", name: "Accessible Bathroom",         category: "Accessibility",  icon: "bath",          sortOrder: 111 },
];

export async function seedAmenities() {
  console.log("🛎  Seeding amenities...");

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { slug: amenity.slug },
      update: amenity,
      create: amenity,
    });
  }

  console.log(`✅ Amenities seeded: ${amenities.length} records`);
}
