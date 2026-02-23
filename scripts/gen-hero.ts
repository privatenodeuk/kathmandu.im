import sharp from "sharp";
import fs from "fs";

const OR_KEY = process.env.OPENROUTER_KEY!;
const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY!;

async function fetchPlacesPhoto(name: string): Promise<Buffer | null> {
  try {
    const sd = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
      `?input=${encodeURIComponent(name + " Kathmandu Nepal")}` +
      `&inputtype=textquery&fields=place_id,photos&key=${PLACES_KEY}`
    ).then(r => r.json()) as any;
    const ref = sd?.candidates?.[0]?.photos?.[0]?.photo_reference;
    if (!ref) return null;
    const pr = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${ref}&key=${PLACES_KEY}`
    );
    if (!pr.ok) return null;
    return Buffer.from(await pr.arrayBuffer());
  } catch { return null; }
}

async function main() {
  console.log("Fetching Google Maps photo of Kathmandu Durbar Square...");
  const photo = await fetchPlacesPhoto("Kathmandu Durbar Square");
  if (!photo) { console.error("No photo found"); process.exit(1); }
  console.log(`Photo: ${(photo.length/1024).toFixed(0)}KB`);

  const photoB64 = photo.toString("base64");

  console.log("Generating hero sketch with Gemini...");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OR_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://kathmandu.im",
      "X-Title": "kathmandu.im hero",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      image_config: { aspect_ratio: "16:9" },
      messages: [
        {
          role: "system",
          content: "You are an expert travel illustrator creating wide panoramic black and white pencil sketches for travel websites."
        },
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${photoB64}` } },
            {
              type: "text",
              text: "Convert this photo of Kathmandu Durbar Square into a wide panoramic black and white pencil sketch. " +
                    "Show the full scene with pagoda temples, ancient palace architecture, busy square atmosphere. " +
                    "Black and white pencil shading, white background, sweeping landscape composition, vintage travel journal style. " +
                    "Wide 16:9 format."
            }
          ]
        }
      ]
    }),
  });

  const json = await res.json() as any;
  if (json.error) { console.error(json.error); process.exit(1); }

  const msg = json.choices?.[0]?.message;
  const images = msg?.images ?? [];
  let url: string = images[0]?.image_url?.url ?? images[0]?.image_url ?? "";
  if (!url && Array.isArray(msg?.content)) {
    const p = msg.content.find((p: any) => p.type === "image_url");
    url = p?.image_url?.url ?? "";
  }
  if (!url) { console.error("No image. Keys:", Object.keys(msg ?? {})); process.exit(1); }

  let raw: Buffer;
  if (url.startsWith("data:")) {
    raw = Buffer.from(url.split(",", 2)[1], "base64");
  } else {
    raw = Buffer.from(await (await fetch(url)).arrayBuffer());
  }

  const out = await sharp(raw).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  fs.writeFileSync("/home/binit/kathmandu.im/public/images/hero-kathmandu.jpg", out);
  console.log(`✓ hero-kathmandu.jpg (${(out.length/1024).toFixed(0)}KB)`);
}

main().catch(e => { console.error(e); process.exit(1); });
