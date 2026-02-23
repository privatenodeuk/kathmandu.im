/**
 * generate-sketches.ts
 * Fetches a real reference photo for each hotel/attraction (Google Places API),
 * sends it to gpt-5-image-mini via OpenRouter with a "convert to ink sketch" instruction,
 * compresses to JPEG (~150KB) with sharp, saves to public/images/[slug].jpg
 * and updates coverImageUrl in DB.
 *
 * Usage:
 *   npx tsx scripts/generate-sketches.ts                          — all 41
 *   npx tsx scripts/generate-sketches.ts --slug boudhanath-stupa  — single
 *   npx tsx scripts/generate-sketches.ts --type hotels            — hotels only
 *   npx tsx scripts/generate-sketches.ts --type attractions       — attractions only
 */

import { prisma } from "../src/lib/prisma";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const OR_KEY = process.env.OPENROUTER_KEY;
const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!OR_KEY) throw new Error("OPENROUTER_KEY not set in environment");
if (!PLACES_KEY) throw new Error("GOOGLE_PLACES_API_KEY not set");

const OR_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_HOTELS = "google/gemini-2.5-flash-image";
const MODEL_ATTRACTIONS = "google/gemini-2.5-flash-image";

const OUT_DIR = path.resolve(__dirname, "../public/images");
fs.mkdirSync(OUT_DIR, { recursive: true });

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// ── Google Places — fetch a real reference photo ──────────────────────────────

async function fetchPlacesPhoto(name: string): Promise<Buffer | null> {
  try {
    const searchUrl =
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
      `?input=${encodeURIComponent(name + " Kathmandu Nepal")}` +
      `&inputtype=textquery&fields=place_id,photos&key=${PLACES_KEY}`;

    const sd = await fetch(searchUrl).then((r) => r.json()) as any;
    const photoRef = sd?.candidates?.[0]?.photos?.[0]?.photo_reference;
    if (!photoRef) return null;

    const photoUrl =
      `https://maps.googleapis.com/maps/api/place/photo` +
      `?maxwidth=800&photo_reference=${photoRef}&key=${PLACES_KEY}`;

    const pr = await fetch(photoUrl);
    if (!pr.ok) return null;
    return Buffer.from(await pr.arrayBuffer());
  } catch { return null; }
}

// ── OpenRouter image generation ───────────────────────────────────────────────

const SKETCH_SYSTEM =
  `You are an expert travel illustrator specialising in black and white pencil sketches. ` +
  `All output images must be: pure white background, black and white only, no colour, ` +
  `pencil shading and hatching for depth and texture, vintage travel journal aesthetic, square composition.`;

async function generateSketch(userMessage: any[], model: string): Promise<Buffer> {
  const res = await fetch(OR_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OR_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://kathmandu.im",
      "X-Title": "kathmandu.im sketch generator",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SKETCH_SYSTEM },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);

  const json = (await res.json()) as any;
  if (json.error) throw new Error(JSON.stringify(json.error).slice(0, 200));

  const msg = json.choices?.[0]?.message;

  // Try OpenAI-style: message.images[]
  const images = msg?.images ?? [];
  let url: string = images[0]?.image_url?.url ?? images[0]?.image_url ?? "";

  // Fallback: Gemini-style — image part in message.content[]
  if (!url && Array.isArray(msg?.content)) {
    const imgPart = msg.content.find((p: any) => p.type === "image_url");
    url = imgPart?.image_url?.url ?? "";
  }

  if (!url) throw new Error(`No image in response. Keys: ${Object.keys(msg ?? {}).join(", ")}`);

  let raw: Buffer;
  if (url.startsWith("data:")) {
    const b64 = url.split(",", 2)[1];
    raw = Buffer.from(b64, "base64");
  } else {
    // HTTP URL — fetch it
    const imgRes = await fetch(url);
    raw = Buffer.from(await imgRes.arrayBuffer());
  }

  // Compress to JPEG at model's native resolution (1024×1024)
  return sharp(raw)
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
}

// ── Per-entity content builders ───────────────────────────────────────────────

function photoMessage(photoBuffer: Buffer, entityName: string): any[] {
  return [
    {
      type: "image_url",
      image_url: { url: `data:image/jpeg;base64,${photoBuffer.toString("base64")}` },
    },
    {
      type: "text",
      text:
        `Convert this photo of "${entityName}" into a detailed black and white pencil sketch. ` +
        `Preserve all key architectural and natural features. ` +
        `White background, black and white only, pencil shading and hatching for depth, ` +
        `vintage travel journal style, square composition.`,
    },
  ];
}

function textMessage(prompt: string): any[] {
  return [{ type: "text", text: prompt }];
}

function hotelPrompt(name: string, stars: number | null, area: string): string {
  const tier = stars === 5 ? "five-star luxury heritage" : "four-star boutique";
  return (
    `Detailed black and white pencil sketch of "${name}", a ${tier} hotel in ${area}, Kathmandu, Nepal. ` +
    `Show the hotel facade with Newari or Rana palace architectural details — ornate wooden windows, ` +
    `carved doorways, courtyard garden. Black and white only, pencil shading, white background, vintage travel journal.`
  );
}

function attractionPrompt(name: string, type: string, area: string): string {
  const descs: Record<string, string> = {
    TEMPLE: "Hindu or Buddhist temple with tiered pagoda roofs and stone carvings",
    STUPA: "Buddhist stupa with dome, harmika tower and prayer flags",
    HISTORIC_SITE: "historic Newari durbar square with ancient palaces and temples",
    MONASTERY: "Tibetan Buddhist monastery with prayer wheels",
    MUSEUM: "classical museum building",
    PARK: "ornate Rana-era garden with pavilions",
    NATURAL_SITE: "lush forested Himalayan hillside",
    MARKET: "bustling traditional bazaar with stalls and temples",
    VIEWPOINT: "hilltop with sweeping Himalayan panorama",
    CULTURAL_SITE: "vibrant traditional street scene",
    PALACE: "grand Rana palace with ornate facade",
  };
  return (
    `Detailed black and white pencil sketch of "${name}", a ${descs[type] ?? "landmark"} in ${area}, Kathmandu, Nepal. ` +
    `Black and white only, pencil shading for depth, white background, vintage travel journal style.`
  );
}

// ── Process functions ─────────────────────────────────────────────────────────

async function processHotel(hotel: {
  id: string; slug: string; name: string;
  stars: number | null; area: { name: string } | null;
}): Promise<boolean> {
  const outPath = path.join(OUT_DIR, `${hotel.slug}.jpg`);
  if (fs.existsSync(outPath)) {
    console.log(`  ⏭  ${hotel.name} — already exists`);
    return false;
  }

  let msg: any[];
  const photo = await fetchPlacesPhoto(hotel.name);
  if (photo) {
    console.log(`  🗺  ${hotel.name} — using Google Maps photo → sketching…`);
    msg = photoMessage(photo, hotel.name);
  } else {
    console.log(`  ✏  ${hotel.name} — text-to-sketch…`);
    msg = textMessage(hotelPrompt(hotel.name, hotel.stars, hotel.area?.name ?? "Kathmandu"));
  }

  const imgBuf = await generateSketch(msg, MODEL_HOTELS);
  fs.writeFileSync(outPath, imgBuf);
  await prisma.property.update({
    where: { id: hotel.id },
    data: { coverImageUrl: `/images/${hotel.slug}.jpg` },
  });
  console.log(`  ✓  ${hotel.slug}.jpg  (${(imgBuf.length / 1024).toFixed(0)}KB)`);
  return true;
}

async function processAttraction(a: {
  id: string; slug: string; name: string;
  listingType: string; area: { name: string } | null;
}): Promise<boolean> {
  const outPath = path.join(OUT_DIR, `${a.slug}.jpg`);
  if (fs.existsSync(outPath)) {
    console.log(`  ⏭  ${a.name} — already exists`);
    return false;
  }

  let msg: any[];
  const photo = await fetchPlacesPhoto(a.name);
  if (photo) {
    console.log(`  🗺  ${a.name} — using Google Maps photo → sketching…`);
    msg = photoMessage(photo, a.name);
  } else {
    console.log(`  ✏  ${a.name} — text-to-sketch…`);
    msg = textMessage(attractionPrompt(a.name, a.listingType, a.area?.name ?? "Kathmandu"));
  }

  const imgBuf = await generateSketch(msg, MODEL_ATTRACTIONS);
  fs.writeFileSync(outPath, imgBuf);
  await prisma.listing.update({
    where: { id: a.id },
    data: { coverImageUrl: `/images/${a.slug}.jpg` },
  });
  console.log(`  ✓  ${a.slug}.jpg  (${(imgBuf.length / 1024).toFixed(0)}KB)`);
  return true;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const slugFilter = args.find((_, i) => args[i - 1] === "--slug");
  const typeFilter = args.find((_, i) => args[i - 1] === "--type");

  const runHotels = !typeFilter || typeFilter === "hotels";
  const runAttractions = !typeFilter || typeFilter === "attractions";
  let generated = 0;

  if (runHotels) {
    console.log("\n🏨  Hotels");
    const hotels = await prisma.property.findMany({
      where: slugFilter ? { slug: slugFilter } : { status: "PUBLISHED" },
      orderBy: { stars: "desc" },
      include: { area: true },
    });
    for (const h of hotels) {
      try {
        if (await processHotel(h)) { generated++; await sleep(4_000); }
      } catch (e: any) {
        console.error(`  ✗  ${h.name}: ${e.message?.slice(0, 150)}`);
        await sleep(6_000);
      }
    }
  }

  if (runAttractions) {
    console.log("\n🛕  Attractions");
    const attractions = await prisma.listing.findMany({
      where: slugFilter ? { slug: slugFilter } : { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { ourScore: "desc" }],
      include: { area: true },
    });
    for (const a of attractions) {
      try {
        if (await processAttraction(a)) { generated++; await sleep(4_000); }
      } catch (e: any) {
        console.error(`  ✗  ${a.name}: ${e.message?.slice(0, 150)}`);
        await sleep(6_000);
      }
    }
  }

  console.log(`\n✅  Done — ${generated} sketches generated.\n`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
