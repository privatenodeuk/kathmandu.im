/**
 * kathmandu.im — Restaurants seed
 * 14 highly-rated, tourist-recommended restaurants in the Kathmandu Valley
 */

import { PrismaClient, Status } from "@prisma/client";
import { buildAreaMap } from "./_helpers";

const prisma = new PrismaClient();

type RestaurantData = {
  slug: string;
  name: string;
  tagline: string;
  descriptionShort: string;
  description: string;
  cuisines: string[];
  priceTier: "BUDGET" | "MID_RANGE" | "UPSCALE" | "LUXURY";
  pricePerPersonMin: number;
  pricePerPersonMax: number;
  areaSlug: string;
  addressLine1: string;
  latitude: number;
  longitude: number;
  phone?: string;
  websiteUrl?: string;
  reservationUrl?: string;
  openingHours: { dayOfWeek: string[]; opens: string; closes: string }[];
  acceptsReservations: boolean;
  acceptsWalkIns: boolean;
  outdoorSeating: boolean;
  vegetarianOptions: boolean;
  veganOptions: boolean;
  halalOptions?: boolean;
  googleRating?: number;
  tripadvisorRank?: number;
  ourScore?: number;
  featured: boolean;
  editorPick: boolean;
  verified: boolean;
  tagSlugs: string[];
};

const restaurants: RestaurantData[] = [
  {
    slug: "krishnarpan",
    name: "Krishnarpan",
    tagline: "Nepal's most celebrated dining experience — a royal Nepali banquet across 6 to 22 courses",
    descriptionShort:
      "Housed within the legendary Dwarika's Hotel, Krishnarpan offers an unmatched journey through Nepal's culinary heritage — a fixed-course Nepali tasting menu served in traditional Newari surroundings.",
    description:
      `Krishnarpan — meaning "an offering to Krishna" — is the finest restaurant in Nepal and one of the most extraordinary dining experiences in South Asia. Set within Dwarika's Hotel, a living museum of salvaged Newari woodcarving, the restaurant transports guests into the Nepal of the Malla kings.\n\nThe menu is entirely fixed: diners choose between a 6-, 12-, 16- or 22-course journey through Nepal's extraordinary culinary geography. Dishes range from the Himalayan north (yak cheese, buckwheat, dried yak meat) through the temperate mid-hills (gundruk, dhido, chhurpi) to the Terai lowlands (mustard fish, maize preparations, jungle herbs). Each course arrives in traditional beaten-bronze or clay vessels, and the ceremony of the meal — the incense, the soft illumination, the Newari art on every surface — is as much a part of the experience as the food itself.\n\nThe cooking is overseen by a team of cooks trained in the dying traditions of Rana-era palace cooking, with recipes sourced from Nepal's 77 districts. Vegetarian variants of every course are available. The 22-course Samriddhi menu is genuinely one of the most ambitious tasting experiences in Asia.`,
    cuisines: ["NEPALI"],
    priceTier: "LUXURY",
    pricePerPersonMin: 45,
    pricePerPersonMax: 120,
    areaSlug: "lazimpat",
    addressLine1: "Dwarika's Hotel, Battisputali, Kathmandu",
    latitude: 27.7086,
    longitude: 85.3398,
    phone: "+977-1-4479488",
    websiteUrl: "https://www.dwarikas.com/dine/krishnarpan/",
    reservationUrl: "https://www.dwarikas.com/dine/krishnarpan/",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "12:00", closes: "14:30" },
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "18:30", closes: "22:00" },
    ],
    acceptsReservations: true,
    acceptsWalkIns: false,
    outdoorSeating: false,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.8,
    tripadvisorRank: 1,
    ourScore: 9.6,
    featured: true,
    editorPick: true,
    verified: true,
    tagSlugs: ["luxury", "cultural", "romantic"],
  },
  {
    slug: "bhojan-griha",
    name: "Bhojan Griha",
    tagline: "A 150-year-old Rana mansion turned traditional Nepali banquet house with live cultural dances",
    descriptionShort:
      "One of Kathmandu's most atmospheric restaurants, set in a beautifully restored Rana-era haveli. Bhojan Griha serves a sprawling Nepali set thali accompanied by traditional music and dance performances.",
    description:
      `Bhojan Griha ("house of food" in Sanskrit) occupies a magnificently preserved Rana-period mansion just south of Thamel. The building itself — whitewashed walls, carved wooden columns, brass oil lamps, ornate courtyards — was constructed around 1870 and has been meticulously restored. Eating here is less a restaurant experience than an immersion in Nepali heritage.\n\nThe menu is a fixed Nepali thali: dozens of small clay and bronze vessels arrive in succession on a gleaming beaten-metal plate. Dishes include dal bhat, a rotating selection of seasonal vegetable curries, gundruk soup, achar pickles, sekuwa (marinated grilled meat), yomari (sweet steamed dumplings), and juju dhau (the famous king curd of Bhaktapur). The portions keep coming — this is Nepali hospitality at its most generous.\n\nWhat sets Bhojan Griha apart is the accompanying cultural programme: traditional Newari and folk music plays throughout the evening, and there is a nightly dance performance showcasing masked Lakhe and Kumari dances. The combination of food, music and extraordinary architecture makes this one of the most complete cultural evenings available in Kathmandu.`,
    cuisines: ["NEPALI", "NEWARI"],
    priceTier: "UPSCALE",
    pricePerPersonMin: 22,
    pricePerPersonMax: 35,
    areaSlug: "thamel",
    addressLine1: "Dilli Bazar, Kathmandu (near Thamel south)",
    latitude: 27.7101,
    longitude: 85.3182,
    phone: "+977-1-4416423",
    websiteUrl: "https://bhojangriha.com",
    reservationUrl: "https://bhojangriha.com",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "11:00", closes: "14:30" },
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "18:00", closes: "21:30" },
    ],
    acceptsReservations: true,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.5,
    tripadvisorRank: 3,
    ourScore: 9.1,
    featured: true,
    editorPick: true,
    verified: true,
    tagSlugs: ["cultural", "romantic", "luxury"],
  },
  {
    slug: "baan-thai",
    name: "Baan Thai",
    tagline: "The Kathmandu Valley's finest Thai restaurant — authentic Bangkok flavours in an elegant wooden villa",
    descriptionShort:
      "Consistently ranked among Kathmandu's top restaurants, Baan Thai delivers genuinely authentic Thai cuisine in a beautifully decorated traditional wooden house in Naxal.",
    description:
      `Baan Thai has been the benchmark for Thai cooking in Kathmandu since it opened, and it remains a reference point more than two decades later. The restaurant occupies a handsome traditional wooden house in the quiet Naxal neighbourhood — teak furniture, silk cushions, Thai temple art and soft lighting create an atmosphere that would not be out of place in Chiang Mai.\n\nThe kitchen is overseen by Thai-trained chefs who source imported Thai ingredients where substitutes would compromise the dish. The result is cooking that would satisfy a Bangkok regular: tom kha gai with the right aromatic balance, pad thai that doesn't concede to local palates, green curry with the correct fragrance, and a massaman that achieves the slow-cooked depth it requires. The fish dishes — particularly the whole fried fish with tamarind — are exceptional.\n\nService is polished and unhurried. The wine list is one of the better ones in Kathmandu. Baan Thai is the go-to for expats celebrating occasions, tourists seeking a break from Nepali food, and anyone who takes Thai cooking seriously.`,
    cuisines: ["THAI"],
    priceTier: "UPSCALE",
    pricePerPersonMin: 18,
    pricePerPersonMax: 35,
    areaSlug: "lazimpat",
    addressLine1: "Naxal, Bhagwati Bahal, Kathmandu",
    latitude: 27.7168,
    longitude: 85.3257,
    phone: "+977-1-4434388",
    websiteUrl: "https://baanthai.com.np",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "11:30", closes: "14:30" },
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "18:00", closes: "22:00" },
    ],
    acceptsReservations: true,
    acceptsWalkIns: true,
    outdoorSeating: false,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.5,
    tripadvisorRank: 5,
    ourScore: 9.0,
    featured: true,
    editorPick: false,
    verified: true,
    tagSlugs: ["romantic", "luxury"],
  },
  {
    slug: "1905-patan",
    name: "1905",
    tagline: "Farm-to-table international cuisine inside the Patan Museum — the most beautiful restaurant setting in Nepal",
    descriptionShort:
      "Nestled within the 17th-century Keshav Narayan Chowk courtyard of the Patan Museum, 1905 serves refined international and Nepali dishes with the finest architectural backdrop of any restaurant in the Valley.",
    description:
      `1905 is named for the year the Patan Museum building was last significantly renovated during the Rana period. The restaurant occupies a sheltered section of the museum's main courtyard — a UNESCO World Heritage Site — where intricately carved stone and wood surroundings from the 17th century form the backdrop to a contemporary menu.\n\nThe kitchen works closely with local farms and producers, with seasonal menus that shift according to what the Kathmandu Valley is growing. Nepali ingredients are treated with international technique: yak cheese tarts, gundruk bruschetta, sel roti with honey and butter, alongside well-executed pasta, salads and grilled dishes. The set lunch is excellent value; the dinner menu expands into more ambitious territory.\n\nThe coffee programme — sourced from Himalayan coffee-growing regions in east Nepal — is among the best in Patan. The garden terrace between the stone chaityas is one of the most serene places to sit in the entire Valley.`,
    cuisines: ["INTERNATIONAL", "NEPALI"],
    priceTier: "UPSCALE",
    pricePerPersonMin: 15,
    pricePerPersonMax: 30,
    areaSlug: "patan",
    addressLine1: "Patan Museum, Patan Durbar Square, Lalitpur",
    latitude: 27.6727,
    longitude: 85.3247,
    phone: "+977-1-5524492",
    websiteUrl: "https://www.1905patan.com",
    openingHours: [
      { dayOfWeek: ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "10:30", closes: "17:30" },
    ],
    acceptsReservations: true,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: true,
    googleRating: 4.6,
    tripadvisorRank: 4,
    ourScore: 9.2,
    featured: true,
    editorPick: true,
    verified: true,
    tagSlugs: ["cultural", "photography", "romantic"],
  },
  {
    slug: "garden-of-dreams-cafe",
    name: "Kaiser Cafe — Garden of Dreams",
    tagline: "Continental classics in a restored neo-classical garden — one of Kathmandu's most romantic settings",
    descriptionShort:
      "Inside the restored Garden of Dreams, Kaiser Cafe serves European and Nepali dishes on a terrace surrounded by fountains, pergolas and century-old trees — a world apart from Thamel's bustle.",
    description:
      `Kaiser Cafe sits at the heart of the Garden of Dreams, a neo-classical pleasure garden built by Field Marshal Kaiser Shumsher in the early 20th century and painstakingly restored in 2006 with Austrian development funding. The garden — with its fountains, amphitheatres, pergolas and seasonal plantings — is one of the loveliest public spaces in Kathmandu, and the cafe leverages this setting brilliantly.\n\nThe food is solidly European: wood-fired sandwiches, fresh salads, pasta, grilled chicken, continental breakfast plates and excellent cakes. The Nepali dishes are a notch above typical tourist fare. The cafe is inside a ticketed garden (NPR 400 for foreigners, refundable against food and drinks).\n\nA table under the pergola on a clear October morning is one of the finest ways to spend an hour in Kathmandu.`,
    cuisines: ["CONTINENTAL", "NEPALI"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 10,
    pricePerPersonMax: 22,
    areaSlug: "thamel",
    addressLine1: "Garden of Dreams, Kaiser Mahal, Thamel, Kathmandu",
    latitude: 27.7133,
    longitude: 85.3146,
    phone: "+977-1-4411031",
    websiteUrl: "https://www.gardenofdreams.org.np",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "18:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: true,
    googleRating: 4.3,
    tripadvisorRank: 12,
    ourScore: 8.7,
    featured: false,
    editorPick: true,
    verified: true,
    tagSlugs: ["romantic", "photography"],
  },
  {
    slug: "roadhouse-cafe",
    name: "Roadhouse Cafe",
    tagline: "Thamel's best wood-fired pizza — a 25-year institution beloved by trekkers and locals alike",
    descriptionShort:
      "The original and still the best pizza in Kathmandu, Roadhouse Cafe has been wood-firing thin-crust Neapolitan-style pizzas in Thamel since the 1990s.",
    description:
      `Roadhouse Cafe is one of Kathmandu's oldest surviving tourist restaurants and, unusually for an institution of its age, still one of the best. The wood-fired oven — a rarity in Nepal — produces a crust with the right char and chew, and the toppings are generous and fresh.\n\nThe menu extends beyond pizza to pastas, salads, Nepali snacks and a well-stocked bar. The atmosphere is reliably lively: the restaurant is popular with both pre-trek carb-loaders and post-trek reward diners, as well as Kathmandu's expat community.\n\nFor straightforward, honest, well-executed food at fair prices in the heart of Thamel, Roadhouse remains the standard after 25 years.`,
    cuisines: ["ITALIAN", "CONTINENTAL"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 8,
    pricePerPersonMax: 18,
    areaSlug: "thamel",
    addressLine1: "Thamel, Kathmandu (JP Road, near Pilgrim's Bookhouse)",
    latitude: 27.7154,
    longitude: 85.3129,
    phone: "+977-1-4700070",
    websiteUrl: "https://roadhousecafe.com",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "10:00", closes: "22:30" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.3,
    tripadvisorRank: 18,
    ourScore: 8.5,
    featured: false,
    editorPick: false,
    verified: true,
    tagSlugs: ["budget-friendly"],
  },
  {
    slug: "third-eye-restaurant",
    name: "Third Eye Restaurant",
    tagline: "Multi-level Thamel rooftop with classic Indian and Nepali cuisine — a 30-year favourite",
    descriptionShort:
      "One of Thamel's longest-running restaurants, Third Eye occupies several floors culminating in a rooftop terrace, serving reliable Indian and Nepali classics that have satisfied travellers for three decades.",
    description:
      `Third Eye has been part of the Thamel landscape since the early 1990s and has earned a reputation for consistency that most restaurants in the neighbourhood can only envy. The multilevel building rises through several dining rooms to a rooftop terrace that offers views across Thamel's mosaic of rooftops and prayer flags.\n\nThe menu is a well-executed survey of north Indian and Nepali cooking: butter chicken, dal makhani and saag paneer are kitchen benchmarks here, alongside Nepali staples including excellent dal bhat and freshly made momo. The tandoor is put to good use on the breads and the seekh kebabs.\n\nThird Eye is not a destination for cutting-edge cooking, but it is utterly reliable and has earned its place among Kathmandu's essential tourist restaurants through three decades of consistent performance.`,
    cuisines: ["INDIAN", "NEPALI"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 8,
    pricePerPersonMax: 18,
    areaSlug: "thamel",
    addressLine1: "Thamel, Kathmandu (JP Road, Thamel North)",
    latitude: 27.7162,
    longitude: 85.3118,
    phone: "+977-1-4260950",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "22:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.2,
    tripadvisorRank: 22,
    ourScore: 8.3,
    featured: false,
    editorPick: false,
    verified: true,
    tagSlugs: ["budget-friendly", "spiritual"],
  },
  {
    slug: "or2k",
    name: "OR2K",
    tagline: "Bohemian rooftop vegetarian dining with Middle Eastern flair — Thamel's most relaxed hangout",
    descriptionShort:
      "A Thamel institution for over two decades, OR2K serves generous Middle Eastern and Mediterranean vegetarian food on cushioned floor seating under a stretched canopy.",
    description:
      `OR2K (pronounced "Oracle") has held a unique place in Thamel's restaurant landscape since the late 1990s. The floor-seating setup — low tables, floor cushions, backgammon boards, candles, world music — created a template for the Thamel chill-out restaurant that many have attempted to copy without quite capturing the original's atmosphere.\n\nThe menu is entirely vegetarian with strong Middle Eastern and Mediterranean influences: shakshuka, hummus with fresh-baked flatbread, falafel wraps, mezze platters, sabich, tahini bowls and excellent fruit smoothies. The food is honest and generous rather than technically refined, but everything is made fresh and the portions are substantial.\n\nOR2K is the sort of place where trekkers decompress after Everest Base Camp, where solo travellers inevitably meet other solo travellers, and where an intended one-hour lunch can comfortably become three.`,
    cuisines: ["MIDDLE_EASTERN", "VEGETARIAN"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 7,
    pricePerPersonMax: 15,
    areaSlug: "thamel",
    addressLine1: "Thamel, Kathmandu (Thamel South, near Pumpernickel Bakery)",
    latitude: 27.7138,
    longitude: 85.3119,
    phone: "+977-1-4700117",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "10:00", closes: "22:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: true,
    googleRating: 4.3,
    tripadvisorRank: 20,
    ourScore: 8.4,
    featured: false,
    editorPick: false,
    verified: true,
    tagSlugs: ["budget-friendly"],
  },
  {
    slug: "rosemary-kitchen",
    name: "Rosemary Kitchen & Coffee Shop",
    tagline: "Thamel's best breakfast spot and a beloved all-day cafe for travellers since 1992",
    descriptionShort:
      "A Thamel legend since 1992, Rosemary Kitchen serves the best breakfast in the neighbourhood — freshly baked breads, excellent eggs, proper coffee and reliable Nepali dishes in a warm, unhurried atmosphere.",
    description:
      `Rosemary Kitchen has been feeding Kathmandu's travellers since 1992, making it one of the oldest continuously operating tourist restaurants in Thamel. It has survived earthquakes, political upheavals and the complete transformation of Thamel around it by doing one thing consistently well: providing honest, well-made food in a warm atmosphere at fair prices.\n\nThe breakfast menu is the reason to come: freshly baked bread, granola with curd, muesli, proper eggs prepared exactly as ordered, French toast, pancakes and excellent filter coffee. The kitchen opens early — a rarity in Nepal — making it the natural choice for pre-dawn trek departures.\n\nLunch and dinner extend into Nepali staples (dal bhat, momo, thukpa), pasta and salads. The cafe's longevity is testament to the loyalty it inspires: many Kathmandu regulars have been coming here for twenty years.`,
    cuisines: ["NEPALI", "CONTINENTAL", "BAKERY"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 5,
    pricePerPersonMax: 14,
    areaSlug: "thamel",
    addressLine1: "Thamel, Kathmandu (Paknajol area, north Thamel)",
    latitude: 27.7173,
    longitude: 85.3108,
    phone: "+977-1-4417820",
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "07:00", closes: "21:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: false,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.4,
    tripadvisorRank: 15,
    ourScore: 8.6,
    featured: false,
    editorPick: true,
    verified: true,
    tagSlugs: ["budget-friendly"],
  },
  {
    slug: "newa-lahana",
    name: "Newa Lahana",
    tagline: "Authentic Newari cuisine in the heart of medieval Bhaktapur — rare, local and unmissable",
    descriptionShort:
      "The best place to experience genuine Newari food culture in the Valley. Newa Lahana serves traditional Bhaktapur dishes — bara, chatamari, juju dhau and more — in an authentic setting within the old city.",
    description:
      `Newari cuisine is one of South Asia's most distinctive and least-known culinary traditions, developed over centuries by the indigenous Newar people of the Kathmandu Valley. Newa Lahana, in the heart of medieval Bhaktapur, is one of the most authentic places to explore it.\n\nThe menu reads as an education in Newari food culture. Chatamari (rice flour crepes topped with minced meat, eggs and spices) arrives crisp and fragrant. Bara (lentil patties) are the city's most popular street snack elevated to a sit-down preparation. Samay baji — the ceremonial Newari snack plate of beaten rice, black soybeans, ginger pickle, egg and dried meat — is a window into the feast culture of Bhaktapur's festivals. The meal concludes with juju dhau: Bhaktapur's famous king curd, thick and slightly sweet, served in its traditional terracotta cup.\n\nThe setting — a traditional Newari courtyard building with carved woodwork and stone floors — matches the food in authenticity. Newa Lahana is best visited as part of a Bhaktapur day, ideally at lunch.`,
    cuisines: ["NEWARI", "NEPALI"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 6,
    pricePerPersonMax: 14,
    areaSlug: "bhaktapur",
    addressLine1: "Taumadhi Square, Bhaktapur",
    latitude: 27.6717,
    longitude: 85.4277,
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "20:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: false,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.4,
    tripadvisorRank: 2,
    ourScore: 8.8,
    featured: false,
    editorPick: true,
    verified: true,
    tagSlugs: ["cultural", "budget-friendly"],
  },
  {
    slug: "stupa-view-restaurant",
    name: "Stupa View Restaurant & Terrace",
    tagline: "Uninterrupted rooftop views of Boudhanath Stupa — the best table in the valley for the great white dome",
    descriptionShort:
      "Perched directly above Boudhanath Square, this rooftop restaurant offers what is arguably the finest view of the stupa of any dining spot, paired with solid Tibetan, Nepali and international food.",
    description:
      `The greatest single thing about Stupa View is its position: the rooftop terrace sits at exactly the right height and angle to look directly into the eyes of Boudhanath Stupa — the great white dome rising above the prayer flags, monk robes, incense smoke and circling pigeons that make Boudhanath one of the most atmospheric places in Asia.\n\nThe cooking is reliable rather than remarkable: Tibetan staples (thukpa, thenthuk, steamed and fried momos), Nepali dal bhat, continental breakfast plates and good coffee. The kitchen produces everything competently and the portions are honest.\n\nBut the reason to climb the stairs is the view. At sunrise, with the stupa illuminated by the first light and the circling monks beginning their morning kora, a table here is one of the finest experiences in the Kathmandu Valley. Sunset is equally spectacular.`,
    cuisines: ["TIBETAN", "NEPALI", "CONTINENTAL"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 7,
    pricePerPersonMax: 16,
    areaSlug: "boudhanath",
    addressLine1: "Boudhanath Square, rooftop above main ring road, Boudha",
    latitude: 27.7215,
    longitude: 85.3625,
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "07:00", closes: "21:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: true,
    googleRating: 4.4,
    tripadvisorRank: 1,
    ourScore: 8.9,
    featured: false,
    editorPick: true,
    verified: true,
    tagSlugs: ["photography", "spiritual", "budget-friendly"],
  },
  {
    slug: "momo-magic",
    name: "Momo Magic",
    tagline: "The definitive guide to Kathmandu's favourite food — 18 varieties of Nepal's beloved dumpling",
    descriptionShort:
      "A cheerful, unpretentious spot dedicated entirely to the art of the momo. Steam, fry, jhol, kothey or C-shaped — all 18 varieties are made fresh and served with the right house achar.",
    description:
      `If there is a single dish that defines Kathmandu's food culture, it is the momo — Nepal's answer to the dumpling, brought down from Tibet centuries ago and thoroughly Nepalised. Momo Magic is dedicated to doing this single dish justice across its entire spectrum.\n\nThe menu lists 18 varieties: buff (water buffalo), chicken, pork, vegetable, paneer, toasted cheese. Preparation methods include traditional steamed, kothey (pan-fried on one side), deep-fried, jhol momo (in a spiced tomato broth) and C-shape (the upscale Kathmandu style, folded into a crescent). Each arrives with a freshly made achar (chilli-sesame dipping sauce) that is housemade and properly spiced.\n\nThe room is simple and the pricing is honest — this is neighbourhood eating, not tourist restaurant eating, which is precisely why it's good. The jhol momo has attracted a devoted following and is the thing to order in cooler months.`,
    cuisines: ["NEPALI", "TIBETAN"],
    priceTier: "BUDGET",
    pricePerPersonMin: 3,
    pricePerPersonMax: 8,
    areaSlug: "thamel",
    addressLine1: "Thamel, Kathmandu",
    latitude: 27.7148,
    longitude: 85.3121,
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "10:00", closes: "21:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: false,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.5,
    tripadvisorRank: 8,
    ourScore: 8.5,
    featured: true,
    editorPick: false,
    verified: true,
    tagSlugs: ["budget-friendly", "cultural"],
  },
  {
    slug: "jimbu-restaurant",
    name: "Jimbu",
    tagline: "Contemporary Nepali cuisine in Patan's expat quarter — elevated comfort food with local soul",
    descriptionShort:
      "Named after the Himalayan herb used across Nepal's mountain cooking, Jimbu serves thoughtful, contemporary Nepali food in the relaxed setting of Patan's Jhamsikhel neighbourhood.",
    description:
      `Jimbu — the dried Himalayan herb (Allium hypsistum) whose pungent fragrance is the signature of Nepali highland cooking — is a fitting name for a restaurant that takes Nepal's culinary traditions seriously without being reverential about them.\n\nLocated in Jhamsikhel, Patan's quiet expat neighbourhood, Jimbu attracts a crowd of NGO workers, long-stay travellers and Kathmandu's food-literate middle class. The kitchen draws on Nepali ingredients and traditions but applies contemporary technique: the sekuwa is finished with more precision than usual, the achar has more complexity, the dal bhat is made with heritage varieties of lentil that are rarely seen outside home cooking.\n\nThe menu changes with the season — gundruk and nettle soup in the cool months, fresh green preparations in spring, dal and rice of exceptional quality year-round. Jimbu is where Kathmandu's food-aware visitors come to understand Nepali cuisine rather than simply consume it.`,
    cuisines: ["NEPALI", "NEWARI"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 10,
    pricePerPersonMax: 22,
    areaSlug: "jhamsikhel",
    addressLine1: "Jhamsikhel, Lalitpur (Patan)",
    latitude: 27.6810,
    longitude: 85.3175,
    phone: "+977-1-5522999",
    openingHours: [
      { dayOfWeek: ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "12:00", closes: "14:30" },
      { dayOfWeek: ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "18:30", closes: "21:30" },
    ],
    acceptsReservations: true,
    acceptsWalkIns: true,
    outdoorSeating: false,
    vegetarianOptions: true,
    veganOptions: false,
    googleRating: 4.4,
    tripadvisorRank: 6,
    ourScore: 8.8,
    featured: false,
    editorPick: true,
    verified: true,
    tagSlugs: ["cultural", "romantic"],
  },
  {
    slug: "cafe-soma",
    name: "Cafe Soma",
    tagline: "Patan's finest specialty coffee and brunch — the Kathmandu Valley's best flat white",
    descriptionShort:
      "A calm, beautifully designed specialty coffee shop and all-day brunch spot in Patan. Cafe Soma sources Himalayan-grown Nepali coffee and serves the most technically accomplished espresso drinks in the Valley.",
    description:
      `Cafe Soma arrived in Patan's Jhamsikhel neighbourhood and immediately set a new benchmark for coffee in the Kathmandu Valley. Nepal grows some exceptional coffee — primarily in the Gulmi, Palpa and Kaski districts of the mid-western hills — and Soma sources directly from producers at high altitude, bringing coffees to Kathmandu that most visitors have never tasted.\n\nThe espresso programme is managed with the rigour you would find in a serious speciality coffee shop in London or Melbourne: freshly roasted beans, dialled-in extraction, well-trained baristas who understand what they are doing. The flat white is the best in the Valley.\n\nThe food programme matches the coffee ambition: house-baked sourdough, excellent avocado toast, egg dishes with locally sourced ingredients, and Nepali-influenced baked goods. Cafe Soma is where Kathmandu's creative professionals work through the morning, and the most pleasant place in the city to begin a day in Patan.`,
    cuisines: ["CAFE", "INTERNATIONAL", "BAKERY"],
    priceTier: "MID_RANGE",
    pricePerPersonMin: 6,
    pricePerPersonMax: 15,
    areaSlug: "jhamsikhel",
    addressLine1: "Jhamsikhel, Lalitpur (Patan)",
    latitude: 27.6798,
    longitude: 85.3168,
    openingHours: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "08:00", closes: "18:00" },
    ],
    acceptsReservations: false,
    acceptsWalkIns: true,
    outdoorSeating: true,
    vegetarianOptions: true,
    veganOptions: true,
    googleRating: 4.6,
    tripadvisorRank: 10,
    ourScore: 8.9,
    featured: false,
    editorPick: true,
    verified: true,
    tagSlugs: ["budget-friendly", "photography"],
  },
];

export async function seedRestaurants() {
  const areaMap = await buildAreaMap(prisma);
  console.log("Seeding restaurants...");

  for (const r of restaurants) {
    const { areaSlug, tagSlugs, ...data } = r;
    await prisma.restaurant.upsert({
      where: { slug: data.slug },
      create: {
        ...data,
        status: "PUBLISHED" as Status,
        cuisines: data.cuisines,
        openingHours: data.openingHours ?? [],
        areaId: areaSlug ? (areaMap.get(areaSlug) ?? null) : null,
      },
      update: {
        tagline: data.tagline,
        descriptionShort: data.descriptionShort,
        description: data.description,
        cuisines: data.cuisines,
        priceTier: data.priceTier,
        pricePerPersonMin: data.pricePerPersonMin,
        pricePerPersonMax: data.pricePerPersonMax,
        latitude: data.latitude,
        longitude: data.longitude,
        addressLine1: data.addressLine1,
        phone: data.phone ?? null,
        websiteUrl: data.websiteUrl ?? null,
        reservationUrl: data.reservationUrl ?? null,
        openingHours: data.openingHours ?? [],
        acceptsReservations: data.acceptsReservations,
        acceptsWalkIns: data.acceptsWalkIns,
        outdoorSeating: data.outdoorSeating,
        vegetarianOptions: data.vegetarianOptions,
        veganOptions: data.veganOptions,
        halalOptions: data.halalOptions ?? false,
        googleRating: data.googleRating ?? null,
        tripadvisorRank: data.tripadvisorRank ?? null,
        ourScore: data.ourScore ?? null,
        featured: data.featured,
        editorPick: data.editorPick,
        verified: data.verified,
        areaId: areaSlug ? (areaMap.get(areaSlug) ?? null) : null,
      },
    });
  }

  console.log("Restaurants seeded: " + restaurants.length + " records");
}
