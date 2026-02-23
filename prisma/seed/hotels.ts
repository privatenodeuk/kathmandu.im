/**
 * kathmandu.im — Hotels seed
 * 16 properties: 8 five-star, 8 four-star
 * Run via: npm run db:seed
 */

import { PrismaClient, PriceTier, Status } from "@prisma/client";
import {
  buildAmenityMap,
  buildTagMap,
  buildAreaMap,
  connectAmenities,
  connectPropertyTags,
  upsertFAQs,
} from "./_helpers";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────
// FIVE-STAR HOTELS
// ─────────────────────────────────────────────

const fiveStarHotels = [
  {
    slug: "dwarikas-hotel",
    name: "Dwarika's Hotel",
    areaSlug: "lazimpat",
    stars: 5,
    priceFromUsd: 350,
    priceTier: "LUXURY" as PriceTier,
    tagline: "A living museum of Newari art and architecture",
    descriptionShort:
      "Kathmandu's most celebrated heritage hotel, preserving 500 years of Newari craftsmanship across 80 rooms and suites.",
    description: `Dwarika's Hotel is not merely a place to stay — it is an act of cultural preservation. Founded by Dwarika Das Shrestha in 1977 after he rescued centuries-old carved woodwork from buildings being demolished across Kathmandu Valley, the hotel has grown into a sanctuary of Newari heritage that rivals any museum in Nepal.

Every window lattice, every door frame, every column capital in the property is an authentic artifact salvaged from medieval townhouses and temples. Shrestha spent decades cataloguing, cleaning and incorporating these pieces into a hotel that feels simultaneously ancient and liveable. Today his family continues the mission, running a dedicated restoration workshop on-site that trains artisans in dying crafts.

The 80 rooms and suites are grouped around a series of brick-paved courtyards, each planted with jasmine and marigold. Rooms feature hand-carved four-poster beds, stone-inlaid bathrooms, and silk cushions in the deep ochres and reds of the Kathmandu palette. Even the smallest Deluxe room feels like sleeping inside a living piece of history.

The Krishnarpan restaurant is the hotel's culinary jewel — a multi-course tasting menu (7 to 22 courses) of royal Newari cuisine served in traditional fashion, with diners seated on cushions and attended by staff in period dress. It consistently ranks among the finest dining experiences in South Asia. The Toran bar and the IKOMM spa — offering Ayurvedic treatments rooted in classical texts — complete a property that demands at least two nights.

Dwarika's is the right choice for travellers who want to experience Nepal's culture with the deepest possible immersion, and who understand that preservation of heritage is worth paying for.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7183,
    longitude: 85.3221,
    totalRooms: 80,
    yearBuilt: 1977,
    ourScore: 9.4,
    websiteUrl: "https://dwarikas.com",
    rooms: [
      {
        name: "Deluxe Room",
        description:
          "30 m² rooms fitted with original Newari carved woodwork, handwoven Dhaka fabrics and a stone-inlaid bathroom. Garden or courtyard views.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 30,
        priceFromUsd: 350,
      },
      {
        name: "Premium Heritage Room",
        description:
          "42 m² rooms featuring a curated collection of artifacts unique to each room. Private sit-out terrace, soaking tub.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 42,
        priceFromUsd: 480,
      },
      {
        name: "Junior Suite",
        description:
          "Separate living room with original 15th-century window screens. Writing desk hand-carved from sal wood, walk-in wardrobe.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 65,
        priceFromUsd: 650,
      },
      {
        name: "Presidential Suite",
        description:
          "The hotel's masterpiece — two floors centred on a courtyard with a private fountain. Museum-quality woodwork throughout, butler service.",
        maxOccupancy: 4,
        bedType: "King",
        sizeM2: 140,
        priceFromUsd: 1200,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","airport-transfer",
      "tour-desk","trekking-info","room-service","concierge","business-centre","yoga",
      "meditation","currency-exchange",
    ],
    tagSlugs: ["luxury","heritage-property","cultural","romantic","instagrammable"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 48,
      cancellationPolicy:
        "Free cancellation up to 48 hours before arrival. Within 48 hours, one night's room rate applies.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne", "zh", "ja"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Dwarika's Hotel worth the price?",
        answer:
          "Absolutely, for the right traveller. Dwarika's is the only hotel in Nepal that operates as a living museum of Newari craftsmanship. Every piece of carved wood is a genuine artifact, the Krishnarpan restaurant serves a royal Newari tasting menu that cannot be found anywhere else, and the IKOMM spa offers authentic Ayurvedic treatments. If cultural immersion is your priority, it represents outstanding value at its price point.",
      },
      {
        question: "What is the best room type at Dwarika's Hotel?",
        answer:
          "The Premium Heritage Rooms offer the best balance of space, artifact quality and price. Each is unique — staff can describe the specific wood carvings and their origins before you book. If budget is less of a concern, the Junior Suite's private terrace and soaking tub make it ideal for a special occasion.",
      },
      {
        question: "Does Dwarika's Hotel have an airport shuttle?",
        answer:
          "Yes. Dwarika's provides a private airport transfer service (both arrival and departure). The hotel is approximately 8 km from Tribhuvan International Airport — roughly 20–40 minutes depending on Kathmandu traffic. Arrange in advance through the hotel concierge.",
      },
      {
        question: "What restaurants are at Dwarika's Hotel?",
        answer:
          "The flagship is Krishnarpan, serving a royal Newari tasting menu of 7 to 22 courses — widely considered the finest dining experience in Nepal. Toran is the all-day lounge and bar. The Malla restaurant offers international and continental options. Reservations for Krishnarpan are essential and should be made at least 24 hours in advance.",
      },
      {
        question: "How far is Dwarika's Hotel from Thamel?",
        answer:
          "Dwarika's is located in Battisputali, about 2 km east of Thamel — a 10-minute taxi ride (NPR 300–400). The hotel is also well-positioned for visits to Pashupatinath Temple (2 km) and Boudhanath Stupa (4 km).",
      },
    ],
  },

  {
    slug: "hyatt-regency-kathmandu",
    name: "Hyatt Regency Kathmandu",
    areaSlug: "boudhanath",
    stars: 5,
    priceFromUsd: 180,
    priceTier: "LUXURY" as PriceTier,
    tagline: "International luxury beside the world's greatest stupa",
    descriptionShort:
      "A landmark five-star on the edge of the Boudhanath UNESCO zone, with 6 acres of Himalayan gardens, a full-size outdoor pool and four restaurants.",
    description: `Set on six acres of landscaped gardens on the Boudhanath plateau, the Hyatt Regency Kathmandu is the valley's largest full-service luxury hotel and one of its most consistently rated. Opened in 2000, the property combines the international standards of the Hyatt brand with a design language that pays homage to the Newari pagoda tradition — red brick facades, sloped rooflines, and courtyards anchored by ancient pipal trees.

The 280 rooms and suites are among the most spacious in Kathmandu, with floor-to-ceiling windows framing either the gardens or the distant Himalayan skyline. Superior rooms start at a generous 40 m², and the property's suites — including the 200 m² Regency Suite — set a standard rarely matched in Nepal. All rooms received a full renovation in 2019 with new Italian linens, walk-in rain showers and integrated smart controls.

The dining options span four outlets: Rox (all-day international), Terrace (al-fresco Nepali and Indian), Zen (pan-Asian), and Polo Bar (cocktails and light bites). The 25-metre outdoor pool, heated during the cooler months, is one of the best in the city. The Club Oasis spa offers traditional Nepali and Thai treatments alongside a modern fitness centre.

The hotel's proximity to Boudhanath Stupa — a 12-minute walk — gives guests the rare opportunity to experience the stupa at dawn and dusk without the logistics that affect city-centre stays. The Hyatt is the natural base for travellers combining a Kathmandu city visit with a circuit of the eastern valley: Boudhanath, Pashupatinath, Kopan Monastery and Changu Narayan are all within 20 minutes.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7219,
    longitude: 85.3622,
    totalRooms: 280,
    yearBuilt: 2000,
    yearRenovated: 2019,
    brandChain: "Hyatt",
    ourScore: 9.0,
    websiteUrl: "https://www.hyatt.com/hyatt-regency/en-US/ktmhr-hyatt-regency-kathmandu",
    rooms: [
      {
        name: "Standard Room",
        description:
          "40 m² rooms with garden or pool views. King or twin configuration, marble bathroom with rain shower.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 40,
        priceFromUsd: 180,
      },
      {
        name: "Regency Club Room",
        description:
          "Access to the Regency Club lounge with complimentary breakfast, evening cocktails and canapes. Himalayan-facing rooms available.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 40,
        priceFromUsd: 250,
      },
      {
        name: "Junior Suite",
        description:
          "60 m² with separate lounge area, a large soaking tub and panoramic views over the gardens.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 60,
        priceFromUsd: 380,
      },
      {
        name: "Regency Suite",
        description:
          "200 m² of living space across two floors, with a private terrace, dining room and butler service.",
        maxOccupancy: 4,
        bedType: "King",
        sizeM2: 200,
        priceFromUsd: 900,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","room-service","concierge",
      "business-centre","rooftop-terrace","yoga","meeting-room",
    ],
    tagSlugs: ["luxury","romantic","family","business-traveller","instagrammable"],
    policy: {
      checkinFrom: "15:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy:
        "Free cancellation up to 24 hours before arrival. Late cancellation or no-show charged at one night's rate.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne", "zh", "ja", "ko"],
      currenciesAccepted: ["USD", "EUR", "GBP", "NPR"],
    },
    faqs: [
      {
        question: "Is the Hyatt Regency Kathmandu worth the price?",
        answer:
          "Yes, especially if you value space, consistent international standards and access to multiple dining options. At $180–250 per night it's competitive with equivalent Hyatt properties in South and Southeast Asia. The proximity to Boudhanath Stupa and the large outdoor pool are standout advantages.",
      },
      {
        question: "What is the best room type at Hyatt Regency Kathmandu?",
        answer:
          "The Regency Club Rooms offer the best value upgrade — the Club lounge breakfast alone (worth ~$30 per person) and evening cocktails make the premium worthwhile. For special occasions, the Junior Suite's garden views and soaking tub are hard to beat.",
      },
      {
        question: "Does the Hyatt Regency have an airport shuttle?",
        answer:
          "Yes, the hotel operates a private airport transfer. Tribhuvan International Airport is approximately 6 km away — around 20–30 minutes by car. Book through the hotel at least 12 hours in advance.",
      },
      {
        question: "What restaurants are at the Hyatt Regency Kathmandu?",
        answer:
          "Rox is the main all-day dining restaurant with international buffet and à la carte. The Garden Terrace serves Indian and Nepali cuisine with outdoor seating. Zen specialises in pan-Asian dishes. Polo Bar offers cocktails, light snacks and weekend brunches.",
      },
      {
        question: "How far is the Hyatt Regency from Thamel?",
        answer:
          "Approximately 5 km north-east of Thamel — a 15–20 minute taxi ride (NPR 400–600). The hotel runs a complimentary shuttle to the city centre for guests. Boudhanath Stupa is a 12-minute walk.",
      },
    ],
  },

  {
    slug: "soaltee-crowne-plaza",
    name: "Soaltee Crowne Plaza",
    areaSlug: "thamel",
    stars: 5,
    priceFromUsd: 150,
    priceTier: "LUXURY" as PriceTier,
    tagline: "Nepal's original five-star, reinvented for the modern traveller",
    descriptionShort:
      "Opened in 1966 as Nepal's first luxury hotel, the Soaltee Crowne Plaza sits on 12 acres of Kathmandu's western edge with a 25m pool, casino and five dining outlets.",
    description: `The Soaltee Hotel opened on 1 January 1966, welcoming Nepal's first generation of international tourists at a time when Kathmandu was emerging as a destination for adventurers, diplomats and hippie trail travellers alike. Nearly six decades later — now operating under the IHG Crowne Plaza brand — the Soaltee retains its position as one of Nepal's most recognisable luxury addresses while having comprehensively modernised its facilities.

Set on 12 acres of manicured grounds in western Kathmandu, the property is built around an original low-rise wing of colonial proportions and a newer tower addition. The grounds include Nepal's largest hotel swimming pool, extensive rose gardens and a private driveway that offers a sense of arrival matched by few properties in the valley.

The 285 rooms span Deluxe rooms, Crowne Club floors (with lounge access and complimentary meals), and suites up to the 250 m² Royal Suite. A full refurbishment completed in 2021 brought high-speed fibre internet, new bathroom fittings and contemporary soft furnishings throughout — while retaining the grand scale of the original architecture.

The property houses the Casino Royale — Nepal's best-known casino — alongside five food and beverage outlets ranging from Tibetan thali to poolside grills. The Mandara Spa offers traditional Ayurvedic treatments as well as international massage therapies.

The Soaltee is particularly well-suited to large groups, conference delegations and travellers who prioritise space and amenities over boutique character. Its western location means slightly longer taxi rides to the old city, but the property's shuttle service and 24-hour taxi desk mitigate this easily.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7019,
    longitude: 85.2891,
    totalRooms: 285,
    yearBuilt: 1966,
    yearRenovated: 2021,
    brandChain: "IHG / Crowne Plaza",
    ourScore: 8.6,
    websiteUrl: "https://www.ihg.com/crowneplaza/hotels/us/en/kathmandu/ktmcp/hoteldetail",
    rooms: [
      {
        name: "Deluxe Room",
        description:
          "38 m² with garden or pool view. Renovated in 2021 with contemporary furnishings, large work desk and walk-in shower.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 38,
        priceFromUsd: 150,
      },
      {
        name: "Crowne Club Room",
        description:
          "Same footprint as Deluxe with Crowne Club floor access: complimentary breakfast, afternoon tea and evening cocktails.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 38,
        priceFromUsd: 200,
      },
      {
        name: "Junior Suite",
        description:
          "Separate living area with sofa bed, dining table and panoramic garden views. Ideal for long stays or families.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 70,
        priceFromUsd: 320,
      },
      {
        name: "Royal Suite",
        description:
          "250 m² across two rooms, private dining area, private butler, and an expansive terrace overlooking the pool gardens.",
        maxOccupancy: 4,
        bedType: "King",
        sizeM2: 250,
        priceFromUsd: 800,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","room-service","concierge",
      "business-centre","meeting-room","currency-exchange",
    ],
    tagSlugs: ["luxury","business-traveller","group","family","year-round"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne", "zh", "hi"],
      currenciesAccepted: ["USD", "EUR", "NPR", "INR"],
    },
    faqs: [
      {
        question: "Is the Soaltee Crowne Plaza worth the price?",
        answer:
          "For groups, conferences and travellers who want a full-scale resort experience, yes. The 12-acre grounds, largest hotel pool in Nepal, casino and five dining outlets represent real value at the $150–200 price point. Independent travellers seeking a more intimate experience might prefer Dwarika's or Yak & Yeti.",
      },
      {
        question: "What is the best room type at Soaltee Crowne Plaza?",
        answer:
          "The Crowne Club rooms represent excellent value — the complimentary breakfast, afternoon tea and evening cocktails included in the rate bring the effective cost much closer to a standard Deluxe room.",
      },
      {
        question: "Does the Soaltee Crowne Plaza have an airport shuttle?",
        answer:
          "Yes. The hotel is approximately 7 km from Tribhuvan International Airport — a 20–35 minute drive. Complimentary shuttle for Crowne Club and suite guests; standard rate for other room categories.",
      },
      {
        question: "What restaurants are at the Soaltee Crowne Plaza?",
        answer:
          "The property has five outlets: Himalchuli (all-day dining, international buffet), Tansen (Nepali and Indian à la carte), Splash (poolside grill and bar), The Café (bakery and light meals) and a lobby lounge bar.",
      },
      {
        question: "How far is the Soaltee Crowne Plaza from Tribhuvan Airport?",
        answer:
          "Approximately 7 km, or 20–35 minutes by car. The hotel is on the western side of Kathmandu, making it one of the closer five-star options to the airport.",
      },
    ],
  },

  {
    slug: "hotel-yak-and-yeti",
    name: "Hotel Yak & Yeti",
    areaSlug: "lazimpat",
    stars: 5,
    priceFromUsd: 200,
    priceTier: "LUXURY" as PriceTier,
    tagline: "Rana palace heritage at the centre of Kathmandu",
    descriptionShort:
      "Built around a 19th-century Rana palace, Hotel Yak & Yeti is the most centrally located five-star in Kathmandu with 270 rooms, a casino and the city's best-known rooftop bar.",
    description: `The Yak & Yeti holds a unique position among Kathmandu's five-star hotels: it is the only one located at the true geographic centre of the city, within walking distance of Durbar Marg, the Royal Palace grounds, and Thamel. Its central wing was originally a 19th-century Rana palace — Lal Durbar — whose ornate ballrooms and marble-floored reception halls have been preserved as public spaces and dining venues.

The hotel's two towers (the Heritage Wing and the modern Himalaya Wing) contain 270 rooms ranging from 35 m² Deluxe rooms to the 300 m² Royal Suite. The Heritage Wing rooms, while slightly older, offer the atmosphere of a grand colonial hotel; the Himalaya Wing delivers contemporary comfort and mountain views from upper floors.

The culinary offering is the strongest of any Kathmandu hotel. The Chimney Restaurant — opened in 1964 and one of Asia's oldest European fine-dining institutions — serves a menu of Russian and continental classics in a dining room unchanged since Boris Lissanevitch, Nepal's most legendary restaurateur and hotelier, first lit the chimney fire. The Sunrise Bar on the rooftop is the city's premier spot for sundowners, with views from the Annapurnas to Everest on clear days. Naachghar serves Nepali, Tibetan and Indian dishes with nightly cultural performances.

The Yak & Yeti Casino is one of Nepal's most atmospheric, housed within the former Rana palace ballroom. The Utse Spa and pool complete a property that offers urban convenience without sacrificing character. For travellers who want five-star facilities within walking distance of Kathmandu's historic core, Yak & Yeti remains the definitive choice.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7152,
    longitude: 85.3178,
    totalRooms: 270,
    yearBuilt: 1973,
    ourScore: 9.1,
    websiteUrl: "https://www.yakandyeti.com",
    rooms: [
      {
        name: "Deluxe Room",
        description:
          "35 m² rooms in either the Heritage Wing (classic décor) or Himalaya Wing (contemporary). Garden or city views.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 35,
        priceFromUsd: 200,
      },
      {
        name: "Luxury Room",
        description:
          "42 m² with upgraded linens, Himalayan-facing windows and complimentary minibar replenishment.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 42,
        priceFromUsd: 270,
      },
      {
        name: "Junior Suite",
        description:
          "Separate lounge, dining table for two and a soaking tub with city views. Heritage or Himalaya Wing options.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 70,
        priceFromUsd: 420,
      },
      {
        name: "Royal Suite",
        description:
          "Housed in the original Rana palace section, 300 m² with original architectural features, private dining room and butler.",
        maxOccupancy: 4,
        bedType: "King",
        sizeM2: 300,
        priceFromUsd: 1100,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","room-service","concierge",
      "business-centre","rooftop-terrace","currency-exchange",
    ],
    tagSlugs: ["luxury","heritage-property","romantic","cultural","instagrammable"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 48,
      cancellationPolicy: "Free cancellation up to 48 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne", "fr", "zh"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Hotel Yak & Yeti worth the price?",
        answer:
          "Yes — particularly for its central location, heritage character and dining. The Chimney Restaurant is a once-in-a-trip experience; the Sunrise Rooftop Bar is the best sundowner spot in the city. Rooms in the Heritage Wing carry genuine historical atmosphere that more modern properties cannot replicate.",
      },
      {
        question: "What is the best room type at Hotel Yak & Yeti?",
        answer:
          "The Luxury Rooms in the Himalaya Wing on upper floors offer the best value: contemporary comfort, mountain views on clear mornings, and access to all hotel amenities. Heritage Wing rooms suit travellers who want colonial atmosphere over modern fittings.",
      },
      {
        question: "Does Hotel Yak & Yeti have an airport shuttle?",
        answer:
          "Yes. The hotel is approximately 6 km from Tribhuvan International Airport — 20–30 minutes by car. Private transfers can be arranged via the concierge; Thamel is a 10-minute walk or 5-minute taxi from the hotel.",
      },
      {
        question: "What restaurants are at Hotel Yak & Yeti?",
        answer:
          "The Chimney Restaurant is Kathmandu's most iconic fine-dining room (continental and Russian, open since 1964). Naachghar serves Nepali, Tibetan and Indian cuisine with nightly cultural dance performances. The Sunrise Rooftop Bar is the city's top sundowner spot. A coffee shop and pool bar complete the offering.",
      },
      {
        question: "How far is Hotel Yak & Yeti from Thamel?",
        answer:
          "Approximately 1 km — a 10–15 minute walk through the Durbar Marg area, or a 5-minute taxi. It is the most centrally located five-star hotel in Kathmandu.",
      },
    ],
  },

  {
    slug: "shangri-la-kathmandu",
    name: "Shangri-La Hotel Kathmandu",
    areaSlug: "lazimpat",
    stars: 5,
    priceFromUsd: 220,
    priceTier: "LUXURY" as PriceTier,
    tagline: "A garden oasis in the heart of Kathmandu's embassy district",
    descriptionShort:
      "Secluded behind high walls in the Lazimpat embassy district, Shangri-La Kathmandu offers 82 rooms, four-acre tropical gardens and the city's most serene pool terrace.",
    description: `The Shangri-La Hotel Kathmandu is a rare thing in this perpetually noisy city: genuinely quiet. Set behind high brick walls in the Lazimpat embassy district, its four acres of tropical gardens — filled with bougainvillea, frangipani and century-old trees — absorb the city's sounds entirely. Stepping through the gate feels like entering a different country.

Originally opened in 1971 as the Soaltee Oberoi and subsequently rebranded, the property has been independent since 2003, operating as a privately-owned boutique luxury hotel that deliberately limits its inventory to 82 rooms and suites. This restraint is part of the appeal: service ratios are high, the pool terrace is never crowded, and the restaurant can actually be heard across the table.

The architecture blends Newari pagoda rooflines with Himalayan stone details. Rooms are furnished with hand-loomed Nepali textiles, carved wooden headboards and marble bathrooms with deep soaking tubs. Superior rooms look over the gardens; the Premium Himalaya Facing rooms on upper floors deliver exceptional mountain views on the many clear days between October and April.

Shangri-La's Bagaicha restaurant is among Kathmandu's better all-day dining options — the lunch thali and the Newari dinner set menu are both worth ordering beyond the buffet. The Pillar Bar's gin selection, drawn from Nepal's growing craft distillery scene, has become a quiet talking point among regulars.

For travellers who prioritise calm, garden space and genuine personal service, Shangri-La is arguably the best-value five-star in Kathmandu at its price point.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7189,
    longitude: 85.3208,
    totalRooms: 82,
    yearBuilt: 1971,
    ourScore: 9.2,
    websiteUrl: "https://www.hotelshangrila.com.np",
    rooms: [
      {
        name: "Superior Room",
        description:
          "Garden-facing rooms at 32 m² with carved wooden furnishings, Nepali handloom textiles and marble bathroom.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 32,
        priceFromUsd: 220,
      },
      {
        name: "Premium Himalaya Facing Room",
        description:
          "40 m² on upper floors with unobstructed mountain views. The clear-day Himalayan panorama from these rooms is exceptional.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 40,
        priceFromUsd: 290,
      },
      {
        name: "Junior Suite",
        description:
          "55 m² with private garden terrace, separate lounge and a sunken soaking tub. Ground floor garden access.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 55,
        priceFromUsd: 420,
      },
      {
        name: "Shangri-La Suite",
        description:
          "120 m² penthouse suite with panoramic terrace, private dining and dedicated butler service.",
        maxOccupancy: 4,
        bedType: "King",
        sizeM2: 120,
        priceFromUsd: 850,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","room-service","concierge",
      "rooftop-terrace","yoga","garden",
    ],
    tagSlugs: ["luxury","romantic","quiet-and-peaceful","eco-friendly","couple"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 48,
      cancellationPolicy: "Free cancellation up to 48 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne", "zh", "ja"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Shangri-La Hotel Kathmandu worth the price?",
        answer:
          "It's arguably the best value five-star in Kathmandu for travellers who want a peaceful garden hotel with high service levels. The smaller inventory (82 rooms) means personalised service that larger properties struggle to match, and the garden pool setting is the most beautiful of any hotel in the city.",
      },
      {
        question: "What is the best room type at Shangri-La Kathmandu?",
        answer:
          "The Premium Himalaya Facing Rooms on upper floors are exceptional value — on clear mornings (October to April) the mountain views stretch from Annapurna to Everest. The Junior Suite with private garden terrace is ideal for honeymoons or anniversaries.",
      },
      {
        question: "Does Shangri-La Hotel Kathmandu have an airport shuttle?",
        answer:
          "Yes, private airport transfers are available. The hotel is approximately 8 km from Tribhuvan International Airport — around 25–35 minutes. Book via the concierge; taxis are also easily arranged from the hotel gate.",
      },
      {
        question: "What restaurants are at Shangri-La Hotel Kathmandu?",
        answer:
          "Bagaicha is the main restaurant offering international buffet breakfast, Nepali lunch thali and a Newari tasting dinner. The Pillar Bar specialises in Nepali craft gin cocktails and light evening bites.",
      },
      {
        question: "How far is Shangri-La Kathmandu from Thamel?",
        answer:
          "About 1.5 km north of Thamel — a 10-minute walk or 5-minute taxi (NPR 200–300). The hotel's quiet Lazimpat location puts it close to embassies, Dwarika's and the Royal Palace grounds.",
      },
    ],
  },

  {
    slug: "radisson-hotel-kathmandu",
    name: "Radisson Hotel Kathmandu",
    areaSlug: "lazimpat",
    stars: 5,
    priceFromUsd: 160,
    priceTier: "LUXURY" as PriceTier,
    tagline: "Contemporary five-star with Kathmandu's best rooftop infinity pool",
    descriptionShort:
      "A modern glass-and-steel five-star in Lazimpat, the Radisson stands out for its rooftop infinity pool with Himalayan views and one of Kathmandu's strongest all-round F&B programmes.",
    description: `The Radisson Hotel Kathmandu opened in 2014 as one of the valley's most modern five-star properties, bringing a contemporary international standard to a city whose luxury segment had historically leaned towards heritage. The 16-storey glass-and-stone tower in Lazimpat has become a recognisable landmark in Kathmandu's skyline, and its rooftop infinity pool — 150 metres above street level with unobstructed views of the Himalayan range — remains genuinely one of the great hotel experiences in Nepal.

The 197 rooms are configured across five categories, all recently refurbished with a neutral palate of local stone, Bhutanese textile accents and Himalayan-facing windows from the 8th floor upward. Business-class amenities are a particular strength: the business centre runs 24 hours, conference rooms accommodate up to 400 delegates, and the hotel sits a 10-minute drive from the financial district.

Dining options are robust: House of Curries is the signature restaurant, specialising in Indian and Nepali cuisine with an open kitchen and tandoor. The Liquid bar on the ground floor is a popular after-work destination for Kathmandu's expatriate community. The rooftop Sky Bar operates seasonally in fine weather.

The Relaxx Spa uses Himalayan salt stone therapies alongside Swedish and Thai massage techniques. A fully-equipped gym occupies the 5th floor.

For business travellers, those arriving on points redemptions (Radisson Rewards), or anyone who simply wants reliable five-star facilities in a modern building at competitive price points, the Radisson delivers consistently well.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7194,
    longitude: 85.3195,
    totalRooms: 197,
    yearBuilt: 2014,
    brandChain: "Radisson Hotels",
    ourScore: 8.8,
    websiteUrl: "https://www.radissonhotels.com/en-us/hotels/radisson-kathmandu",
    rooms: [
      {
        name: "Superior Room",
        description:
          "35 m² city-view rooms with contemporary furnishings, Himalayan textile accents and a large rain shower.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 35,
        priceFromUsd: 160,
      },
      {
        name: "Deluxe Himalayan View Room",
        description:
          "Same footprint as Superior but on the 8th floor and above, with direct mountain views on clear days.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 35,
        priceFromUsd: 210,
      },
      {
        name: "Business Class Room",
        description:
          "40 m² with dedicated workspace, Nespresso machine, Club lounge access and complimentary evening cocktails.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 40,
        priceFromUsd: 260,
      },
      {
        name: "Executive Suite",
        description:
          "80 m² with panoramic floor-to-ceiling windows, separate lounge, dining area and private check-in.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 80,
        priceFromUsd: 500,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","room-service","concierge",
      "business-centre","meeting-room","rooftop-terrace",
    ],
    tagSlugs: ["luxury","business-traveller","instagrammable","couple","year-round"],
    policy: {
      checkinFrom: "15:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: true,
      parkingPriceUsd: 5,
      languagesSpoken: ["en", "ne", "zh", "hi"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is the Radisson Hotel Kathmandu worth the price?",
        answer:
          "Yes, particularly for business travellers and Radisson Rewards members. The rooftop infinity pool with Himalayan views is a genuine highlight at any price, and the hotel's modern infrastructure (fast WiFi, conference facilities, 24h business centre) is the strongest of any Kathmandu five-star.",
      },
      {
        question: "What is the best room type at Radisson Kathmandu?",
        answer:
          "The Deluxe Himalayan View rooms on the 10th floor and above offer the best combination of price and experience — the mountain views on clear mornings (October–February especially) are exceptional. Business Class rooms are worth the upgrade for long stays.",
      },
      {
        question: "Does Radisson Hotel Kathmandu have an airport shuttle?",
        answer:
          "Yes, private transfers are available. The hotel is about 9 km from Tribhuvan International Airport — approximately 25–40 minutes depending on traffic.",
      },
      {
        question: "What restaurants are at Radisson Hotel Kathmandu?",
        answer:
          "House of Curries is the signature restaurant specialising in Indian and Nepali cuisine with an open-kitchen tandoor. The Liquid bar is a popular evening destination. The rooftop Sky Bar operates in fine weather (October to April primarily).",
      },
      {
        question: "How far is Radisson Hotel Kathmandu from Thamel?",
        answer:
          "About 2 km north of Thamel — a 10-minute taxi (NPR 200–300) or a 20-minute walk through the Lazimpat embassy area.",
      },
    ],
  },

  {
    slug: "marriott-hotel-kathmandu",
    name: "Marriott Hotel Kathmandu",
    areaSlug: "lazimpat",
    stars: 5,
    priceFromUsd: 190,
    priceTier: "LUXURY" as PriceTier,
    tagline: "Marriott Bonvoy's flagship Nepal property with convention facilities",
    descriptionShort:
      "The Marriott Hotel Kathmandu opened in 2018 as the valley's largest convention hotel, with 252 rooms, a 1,200-delegate ballroom and one of Nepal's most active Bonvoy properties.",
    description: `The Marriott Hotel Kathmandu arrived in 2018, filling a gap in the market for a large-capacity luxury hotel capable of hosting international conferences alongside leisure travellers. The property anchors the Naxal neighbourhood at the intersection of Lazimpat and the Ring Road — a location that works well for business, though it is slightly further from the historic core than the Yak & Yeti or Shangri-La.

The 252 rooms and suites occupy a purpose-built 17-storey tower designed by a local architectural team that incorporated Himalayan stone cladding, carved copper panels and traditional lattice patterns into a fundamentally modern building. Rooms are configured with the standard Marriott matrix: Classic rooms start at 36 m², with Executive Lounge access available from the Deluxe category upward. Upper-floor rooms deliver reliable Himalayan views on clear days.

The ballroom capacity of 1,200 makes the Marriott the largest events venue in Nepal's hotel sector, hosting everything from SAARC ministerial meetings to Nepalese corporate galas. The business infrastructure is correspondingly comprehensive: high-speed fibre throughout, 14 dedicated meeting rooms and a 24-hour business centre.

Dining is anchored by Tansen (Nepali and Indian, signature restaurant), the Latitude Bar & Grill (poolside, international), and the Executive Lounge for Bonvoy Gold/Platinum members. The Quan Spa and a 25-metre outdoor pool complete the leisure offering.

For Marriott Bonvoy members, this is the natural Kathmandu home — the Bonvoy tier benefits are well-administered and the point redemption rates are competitive for the value received.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7201,
    longitude: 85.3231,
    totalRooms: 252,
    yearBuilt: 2018,
    brandChain: "Marriott International",
    ourScore: 8.7,
    websiteUrl: "https://www.marriott.com/en-us/hotels/ktmmd-marriott-hotel-kathmandu",
    rooms: [
      {
        name: "Classic Room",
        description:
          "36 m² with city or courtyard views. Contemporary design with Himalayan stone accents and a large work desk.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 36,
        priceFromUsd: 190,
      },
      {
        name: "Deluxe Himalaya View Room",
        description:
          "Same footprint on floors 10 and above, with mountain views and Executive Lounge access.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 36,
        priceFromUsd: 250,
      },
      {
        name: "Junior Suite",
        description:
          "65 m² with separate living area, dining table, Nespresso machine and panoramic windows.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 65,
        priceFromUsd: 420,
      },
      {
        name: "Presidential Suite",
        description:
          "180 m² two-bedroom configuration, private dining room, dedicated butler and terrace with Himalayan views.",
        maxOccupancy: 4,
        bedType: "King",
        sizeM2: 180,
        priceFromUsd: 950,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","room-service","concierge",
      "business-centre","meeting-room","yoga",
    ],
    tagSlugs: ["luxury","business-traveller","group","family","year-round"],
    policy: {
      checkinFrom: "15:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne", "zh", "hi", "ja"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is the Marriott Hotel Kathmandu worth the price?",
        answer:
          "For Marriott Bonvoy members and business travellers, yes. The Bonvoy benefits are well-administered and the points value on award redemptions is strong. For leisure travellers without loyalty programme ties, the Shangri-La or Dwarika's offer more distinctive experiences at similar prices.",
      },
      {
        question: "What is the best room type at Marriott Hotel Kathmandu?",
        answer:
          "The Deluxe Himalaya View rooms with Executive Lounge access represent the best value proposition. The lounge breakfast and evening cocktails substantially reduce effective daily costs.",
      },
      {
        question: "Does Marriott Hotel Kathmandu have an airport shuttle?",
        answer:
          "Yes. Airport transfer is available and the hotel is approximately 9 km from Tribhuvan International Airport — around 25–40 minutes by car.",
      },
      {
        question: "What restaurants are at Marriott Hotel Kathmandu?",
        answer:
          "Tansen is the signature restaurant with Nepali and Indian cuisine. Latitude Bar & Grill serves international dishes poolside. The Executive Lounge provides complimentary breakfast and evening cocktails for eligible Bonvoy members.",
      },
      {
        question: "How far is Marriott Hotel Kathmandu from Thamel?",
        answer:
          "About 2.5 km — a 12-minute taxi (NPR 300–400). The hotel provides a complimentary scheduled shuttle to Thamel and the city centre for in-house guests.",
      },
    ],
  },

  {
    slug: "annapurna-hotel-kathmandu",
    name: "Hotel Annapurna",
    areaSlug: "lazimpat",
    stars: 5,
    priceFromUsd: 140,
    priceTier: "LUXURY" as PriceTier,
    tagline: "The grand dame of Durbar Marg since 1965",
    descriptionShort:
      "Nepal's second-oldest luxury hotel, the Annapurna anchors the elegant Durbar Marg boulevard with 94 rooms, lush gardens and the city's most storied swimming pool terrace.",
    description: `When Nepal opened to foreign visitors in 1951, it took fourteen years before a true luxury hotel arrived: the Annapurna, which opened on 1 January 1965 on the prestigious Durbar Marg avenue directly facing the Royal Palace gates. Over the six decades since, the Annapurna has hosted every Nepalese head of state, dozens of foreign dignitaries, and generations of mountaineers returning from Everest and the Annapurna ranges.

The hotel is owned by the Chaudhary Group — Nepal's largest conglomerate — and carries the accumulated character of a property that has aged gracefully rather than undergone disruptive reinvention. The low-rise main building, with its Neoclassical colonnades and wide verandas, gives way to south-facing gardens where the hotel's famous pool and terrace remain the best people-watching spot on Durbar Marg.

The 94 rooms are generous by the standards of the building's era, ranging from 38 m² Garden Deluxe rooms to the 150 m² Royal Suite. A quiet refurbishment programme (2017–2020) brought new bathrooms, updated in-room technology and improved mattresses without altering the rooms' fundamental proportions or their original teak window frames.

The Annapurna Cafe is one of Kathmandu's oldest running restaurants, famous for its buffet breakfasts and its Nepali set lunches. The Arniko bar is the hotel's evening institution — a wood-panelled room where the city's old guard has been meeting for decades. Friday evenings bring live Nepali folk and jazz music.

The hotel's Durbar Marg location is genuinely walkable to Narayanhiti Palace Museum, the Thamel bars and the old city — a convenience that larger properties on the city's periphery cannot offer.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7124,
    longitude: 85.3161,
    totalRooms: 94,
    yearBuilt: 1965,
    yearRenovated: 2020,
    ourScore: 8.5,
    websiteUrl: "https://www.theAnnapurna.com",
    rooms: [
      {
        name: "Garden Deluxe Room",
        description:
          "38 m² with teak windows overlooking the pool gardens. Classic proportions, updated bathroom with walk-in shower.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 38,
        priceFromUsd: 140,
      },
      {
        name: "Superior Room",
        description:
          "44 m² on upper floors with Durbar Marg and Royal Palace views. Upgraded minibar and Nespresso machine.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 44,
        priceFromUsd: 190,
      },
      {
        name: "Junior Suite",
        description:
          "Separate sitting room, teak writing desk and a claw-foot bathtub alongside a walk-in shower.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 75,
        priceFromUsd: 350,
      },
      {
        name: "Royal Suite",
        description:
          "150 m² overlooking the Royal Palace grounds. Two bedrooms, formal dining room, butler service, private bar.",
        maxOccupancy: 4,
        bedType: "King",
        sizeM2: 150,
        priceFromUsd: 700,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","room-service","concierge",
      "currency-exchange","garden","laundry",
    ],
    tagSlugs: ["luxury","heritage-property","cultural","business-traveller","local-favourite"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 48,
      cancellationPolicy: "Free cancellation up to 48 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne", "hi", "zh"],
      currenciesAccepted: ["USD", "EUR", "NPR", "INR"],
    },
    faqs: [
      {
        question: "Is Hotel Annapurna worth the price?",
        answer:
          "For travellers who appreciate history and central location, yes. The Annapurna's Durbar Marg address is walkable to the Royal Palace grounds and Thamel, the pool terrace is outstanding, and the Arniko bar has more character than most hotel bars in the city.",
      },
      {
        question: "What is the best room type at Hotel Annapurna?",
        answer:
          "The Superior Rooms on upper floors offer the best value: updated bathrooms, Durbar Marg views, and the right amount of classic character without feeling dated.",
      },
      {
        question: "Does Hotel Annapurna have an airport shuttle?",
        answer:
          "Yes. The hotel is approximately 6 km from Tribhuvan International Airport — around 20–35 minutes. Taxis from the airport directly to Durbar Marg are also readily available.",
      },
      {
        question: "What restaurants are at Hotel Annapurna?",
        answer:
          "The Annapurna Cafe is the main restaurant, famous for its buffet breakfast and Nepali set lunch. The Arniko bar is the hotel's atmospheric evening lounge with live folk/jazz on Friday nights. The pool terrace serves light meals and drinks through the day.",
      },
      {
        question: "How far is Hotel Annapurna from Tribhuvan Airport?",
        answer:
          "Approximately 6 km — a 20–35 minute drive depending on traffic. The hotel sits at the northern end of Durbar Marg, directly facing the Royal Palace gates.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// FOUR-STAR HOTELS
// ─────────────────────────────────────────────

const fourStarHotels = [
  {
    slug: "hotel-shanker",
    name: "Hotel Shanker",
    areaSlug: "lazimpat",
    stars: 4,
    priceFromUsd: 90,
    priceTier: "UPSCALE" as PriceTier,
    tagline: "Sleep in a Rana palace — without the five-star price tag",
    descriptionShort:
      "A 19th-century Rana palace converted into a 98-room heritage hotel on Lazimpat, with original ballrooms, a pool and extraordinary architectural detail at accessible prices.",
    description: `Hotel Shanker occupies one of the finest examples of Rana-era palace architecture in Kathmandu — the former Shanker Palace, built in the 1890s for a Rana prime minister and featuring a remarkable fusion of European Neoclassical columns, ornate plasterwork cornices and Newari brick detailing that was the signature style of the Rana dynasty.

The conversion into a hotel in 1964 preserved the palace's principal rooms as public spaces: the grand ballroom with its crystal chandeliers and original parquet floor, the colonnaded entrance hall, and the formal dining room where Rana ministers once hosted European delegations. Guests staying in the older wing rooms genuinely sleep within the palace walls — high ceilings, arched windows and elaborate plasterwork overhead.

The 98 rooms span the original palace building (heritage character, some noise from Lazimpat road) and a quieter garden wing added in the 1990s. The outdoor pool set within manicured lawns is one of the most pleasant in Kathmandu, particularly in the spring months when the surrounding trees are in blossom.

At NPR 8,000–12,000 per night (approximately $60–90), Hotel Shanker delivers heritage character that its five-star neighbours charge three times more to access. The restaurant quality and room fittings are honest four-star; the architecture and grounds are unmatched at the price.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7178,
    longitude: 85.3199,
    totalRooms: 98,
    yearBuilt: 1964,
    ourScore: 8.3,
    websiteUrl: "https://www.hotelshanker.com.np",
    rooms: [
      {
        name: "Deluxe Room",
        description:
          "Heritage wing rooms with high ceilings, arched windows and original Rana-era plasterwork detail. Garden or road views.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 32,
        priceFromUsd: 90,
      },
      {
        name: "Garden Wing Room",
        description:
          "Quieter rooms in the 1990s extension overlooking the pool gardens. Contemporary fittings with traditional accents.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 30,
        priceFromUsd: 95,
      },
      {
        name: "Junior Suite",
        description:
          "Located in the original palace, with ornate ceiling plasterwork, separate lounge area and palace garden views.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 60,
        priceFromUsd: 160,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","swimming-pool","tour-desk",
      "trekking-info","airport-transfer","laundry","garden","currency-exchange",
    ],
    tagSlugs: ["heritage-property","boutique-hotel","cultural","romantic","budget-friendly"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne"],
      currenciesAccepted: ["USD", "NPR"],
    },
    faqs: [
      {
        question: "Is Hotel Shanker worth the price?",
        answer:
          "Exceptional value. You get genuine 19th-century Rana palace architecture — crystal chandeliers, ornate plasterwork, original ballrooms — at around $90 per night including breakfast. There is no other hotel in Kathmandu that delivers this level of architectural heritage at this price.",
      },
      {
        question: "What is the best room type at Hotel Shanker?",
        answer:
          "The Heritage Wing Deluxe rooms offer the most atmospheric experience — high ceilings, arched windows, original detail. If you prefer quiet, the Garden Wing rooms face the pool and are more peaceful, though slightly less characterful.",
      },
      {
        question: "Does Hotel Shanker have an airport shuttle?",
        answer:
          "Yes, airport transfers can be arranged through reception. The hotel is approximately 8 km from Tribhuvan International Airport — about 25–35 minutes by car.",
      },
      {
        question: "What restaurants are at Hotel Shanker?",
        answer:
          "The main restaurant is housed in the original palace dining room — an impressive setting for breakfast and dinner. The bar serves cocktails in the former palace lounge. Quality is solid four-star rather than exceptional, but the surroundings make any meal memorable.",
      },
      {
        question: "How far is Hotel Shanker from Thamel?",
        answer:
          "About 1 km south of Thamel in Lazimpat — a 5–10 minute walk or very short taxi ride (NPR 150–200).",
      },
    ],
  },

  {
    slug: "kantipur-temple-house",
    name: "Kantipur Temple House",
    areaSlug: "thamel",
    stars: 4,
    priceFromUsd: 110,
    priceTier: "UPSCALE" as PriceTier,
    tagline: "Newari temple architecture in the heart of Thamel",
    descriptionShort:
      "A 53-room boutique hotel built entirely in the Newari pagoda tradition, with exposed brick, hand-carved wood lattices and a garden courtyard five minutes from Thamel's centre.",
    description: `Kantipur Temple House is the finest example of traditional Newari boutique hotel design in central Kathmandu. Where many properties claim Newari inspiration and deliver only decorative gestures, Kantipur committed from its 2003 opening to authentic construction — every brick laid by Newari craftsmen using lime-mortar techniques, every window screen carved by artisans from Bhaktapur, every courtyard pillar sourced from historic salvage.

The result is a hotel that feels genuinely embedded in the valley's architectural tradition rather than assembled as pastiche. The four-storey building rises around a central garden courtyard planted with marigold and jasmine, its curved eaves and tiered roof visible from the lane outside before guests even enter.

The 53 rooms range from compact Deluxe rooms (23 m²) with carved window benches and cotton dhaka bedspreads, to the spacious Temple View Suite on the top floor with private terrace and sight-lines over the rooftops to the distant hills. None of the rooms have televisions — a deliberate choice that reinforces the hotel's invitation to slow down.

Breakfast is served in the ground-floor Tsampa restaurant, which also offers a concise dinner menu of Newari and Tibetan dishes. The rooftop terrace serves tea from 3 pm and is one of the better people-watching perches in Thamel.

Kantipur Temple House is the right choice for culturally-minded travellers who want to sleep in a building that actively participates in Newari heritage preservation, within five minutes' walk of Thamel's restaurants and gear shops.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1614735241165-6756e1df61ab?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7163,
    longitude: 85.3111,
    totalRooms: 53,
    yearBuilt: 2003,
    ourScore: 8.9,
    websiteUrl: "https://www.kantipurtemple.com",
    rooms: [
      {
        name: "Deluxe Room",
        description:
          "23 m² with carved wooden furniture, dhaka textile accents, private bathroom with hot shower. Courtyard or street views.",
        maxOccupancy: 2,
        bedType: "Double or Twin",
        sizeM2: 23,
        priceFromUsd: 110,
      },
      {
        name: "Superior Room",
        description:
          "30 m² on upper floors with carved window seats and improved mountain-facing views. Slightly quieter than street-level.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 30,
        priceFromUsd: 145,
      },
      {
        name: "Temple View Suite",
        description:
          "Top-floor suite with private terrace, panoramic rooftop views, sitting room with traditional Newari furnishings.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 55,
        priceFromUsd: 240,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","tour-desk","trekking-info",
      "airport-transfer","laundry","rooftop-terrace","garden",
    ],
    tagSlugs: ["boutique-hotel","heritage-property","cultural","solo-traveller","quiet-and-peaceful"],
    policy: {
      checkinFrom: "13:00",
      checkinUntil: "23:00",
      checkoutFrom: "06:00",
      checkoutUntil: "11:00",
      cancellationHours: 48,
      cancellationPolicy: "Free cancellation up to 48 hours before arrival. Full charge within 48 hours.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: false,
      languagesSpoken: ["en", "ne", "fr", "de"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Kantipur Temple House worth the price?",
        answer:
          "Yes — it's the best boutique heritage hotel in Thamel. Authentic Newari construction, no televisions (a feature, not a bug), excellent breakfast and a rooftop terrace above the Thamel rooftops. The $110 rate is competitive for what's offered.",
      },
      {
        question: "What is the best room type at Kantipur Temple House?",
        answer:
          "The Temple View Suite on the top floor is special — the private terrace with rooftop views over Thamel and the distant hills is worth the premium for a one or two-night splurge. For a standard stay, the Superior Rooms on the third floor are quieter than street-level Deluxe rooms.",
      },
      {
        question: "Does Kantipur Temple House have an airport shuttle?",
        answer:
          "Yes, the hotel arranges private airport transfers through a trusted local driver service. The hotel is approximately 6 km from Tribhuvan International Airport.",
      },
      {
        question: "What restaurants are at Kantipur Temple House?",
        answer:
          "Tsampa restaurant on the ground floor serves Newari and Tibetan dishes. Breakfast is included and features a mix of continental and local options including sel roti (Nepali rice doughnuts) and fresh yoghurt. The rooftop terrace serves tea and light snacks in the afternoon.",
      },
      {
        question: "How far is Kantipur Temple House from Thamel?",
        answer:
          "It is in Thamel — specifically in the Chhetrapati area on Thamel's southern edge, about 5 minutes' walk from Thamel Chowk and adjacent to several of Kathmandu's better restaurants.",
      },
    ],
  },

  {
    slug: "hotel-himalaya",
    name: "Hotel Himalaya",
    areaSlug: "patan",
    stars: 4,
    priceFromUsd: 95,
    priceTier: "UPSCALE" as PriceTier,
    tagline: "Patan's premier hotel, steps from the finest Durbar Square in Nepal",
    descriptionShort:
      "A 100-room four-star in the heart of Patan (Lalitpur) with mountain-view pool, two restaurants and an unrivalled location 5 minutes' walk from Patan Durbar Square.",
    description: `Hotel Himalaya occupies an enviable position in Patan — also known as Lalitpur — the city of fine arts directly south of Kathmandu across the Bagmati River. Where most Kathmandu hotels require taxi rides to reach historic sites, Hotel Himalaya guests can walk to Patan Durbar Square in five minutes and to the Patan Museum — widely considered the finest museum in Nepal — in seven.

Established in 1976, the hotel has grown through several phases of construction into a 100-room property whose pool terrace, open to Himalayan views on clear mornings, remains one of the most photographed hotel spaces in Nepal. A renovation completed in 2018 refreshed all rooms with new furniture, improved insulation and upgraded bathrooms while retaining the hotel's characteristic scale and warmth.

The rooms are housed in two interconnected wings: the older Garden Wing (lower rates, ground-level garden access) and the Tower Wing (higher floors, better views, marginally more modern fittings). Patan's generally quieter character means even the street-facing rooms experience less noise than equivalent hotels in central Kathmandu.

The Arniko restaurant serves Nepali and continental dishes with a long-running reputation for reliable quality. The poolside café operates through the day and is a popular stop for travellers returning from Durbar Square visits.

Patan's concentration of bronze workshops, thangka studios and traditional Newari townhouses makes it arguably a more interesting base than Thamel for culturally-focused travellers. Hotel Himalaya is the natural home for that itinerary.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6741,
    longitude: 85.3261,
    totalRooms: 100,
    yearBuilt: 1976,
    yearRenovated: 2018,
    ourScore: 8.2,
    websiteUrl: "https://www.hotelhimalaya.com",
    rooms: [
      {
        name: "Garden Wing Room",
        description:
          "Standard 28 m² with garden or courtyard views. Contemporary furnishings, private bathroom with hot shower.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 28,
        priceFromUsd: 95,
      },
      {
        name: "Tower Superior Room",
        description:
          "32 m² on floors 4+ with Himalayan-facing windows. Best mountain views in the property on clear mornings.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 32,
        priceFromUsd: 125,
      },
      {
        name: "Junior Suite",
        description:
          "Separate lounge, soaking tub and a private balcony overlooking the pool and the hills beyond Patan.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 55,
        priceFromUsd: 210,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","swimming-pool","tour-desk",
      "trekking-info","airport-transfer","laundry","garden","currency-exchange",
    ],
    tagSlugs: ["boutique-hotel","cultural","art-and-craft","quiet-and-peaceful","couple"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:00",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Hotel Himalaya Patan worth the price?",
        answer:
          "Yes, particularly for cultural travellers. The location — 5 minutes from Patan Durbar Square and the Patan Museum — is unmatched at this price. Patan's quieter, more residential character is a genuine advantage over Thamel-based hotels.",
      },
      {
        question: "What is the best room type at Hotel Himalaya?",
        answer:
          "Tower Superior Rooms on the 5th floor and above, facing north, have the best mountain views in the property. For the same rate as similar rooms elsewhere, you get a significantly more interesting neighbourhood.",
      },
      {
        question: "Does Hotel Himalaya have an airport shuttle?",
        answer:
          "Yes, transfers can be arranged. The hotel is approximately 12 km from Tribhuvan International Airport — around 35–50 minutes by car, including the Patan bridge.",
      },
      {
        question: "What restaurants are at Hotel Himalaya Patan?",
        answer:
          "The Arniko restaurant serves Nepali and continental dishes, with a popular breakfast buffet. The poolside café operates from mid-morning to evening. Both are well-regarded by guests for reliable quality.",
      },
      {
        question: "How far is Hotel Himalaya from Thamel?",
        answer:
          "Patan is approximately 4 km south of Thamel across the Bagmati River — a 15–25 minute taxi (NPR 400–600). The hotel provides taxi referrals; Patan itself has enough to occupy 2–3 days without needing to return to Thamel.",
      },
    ],
  },

  {
    slug: "gokarna-forest-resort",
    name: "Gokarna Forest Resort",
    areaSlug: "boudhanath",
    stars: 4,
    priceFromUsd: 130,
    priceTier: "UPSCALE" as PriceTier,
    tagline: "18-hole golf and forest retreat in the Royal Gokarna Forest",
    descriptionShort:
      "Nepal's premier golf resort, set within the 1,500-acre Royal Gokarna Forest with an 18-hole championship course, 100 rooms and an extraordinary wildlife backdrop 25 minutes from the city.",
    description: `The Gokarna Forest Resort occupies a setting unlike any other hotel in the Kathmandu Valley: 1,500 acres of Royal Gokarna Forest, a former royal hunting reserve where spotted deer, peacocks and over 200 bird species share the grounds with golfers and hotel guests. The 18-hole championship golf course — the only one of its kind in Nepal — winds through the forest with Himalayan views from several fairways.

The resort's 100 rooms and cottages are distributed across the forested grounds in low-rise clusters designed to minimise visual impact on the surrounding woodland. Rooms in the main building deliver standard resort luxury; the Forest Cottages, set deeper within the trees, offer a genuine jungle retreat atmosphere unusual at this altitude and latitude.

Beyond golf, the resort offers mountain biking through forest trails, birdwatching with resident naturalists, yoga by the river and a full-service spa. The Forest Restaurant occupies a glassed pavilion overlooking the fairways and serves Nepali, Indian and continental cuisine sourced substantially from the resort's kitchen garden.

The Gokarna Forest Resort receives a premium for its extraordinary environment rather than pure room quality — the cottages in particular are comfortable rather than luxurious. But the combination of forest, wildlife, silence and professional golf makes it unique in Nepal, and the 25-minute drive to Boudhanath Stupa keeps it connected to the valley's cultural circuit.

It is the ideal choice for nature and golf travellers, families who want children to experience wildlife within Kathmandu's reach, and anyone in Kathmandu for four nights or more who wants to combine city culture with an outdoor retreat.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7374,
    longitude: 85.3789,
    totalRooms: 100,
    yearBuilt: 1997,
    ourScore: 8.6,
    websiteUrl: "https://www.gokarna.com.np",
    rooms: [
      {
        name: "Deluxe Room",
        description:
          "35 m² in the main building with garden or fairway views. Contemporary furnishings, private bathroom.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 35,
        priceFromUsd: 130,
      },
      {
        name: "Forest Cottage",
        description:
          "Standalone cottage set within the forest, 42 m², private veranda, immersive woodland views and birdlife at the windows.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 42,
        priceFromUsd: 180,
      },
      {
        name: "Forest Suite",
        description:
          "Two-room forest cottage with private outdoor soaking tub, butler service and dedicated dining terrace.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 80,
        priceFromUsd: 320,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","spa","gym","swimming-pool",
      "airport-transfer","tour-desk","trekking-info","laundry","garden","yoga",
    ],
    tagSlugs: ["resort","eco-friendly","wildlife","family","quiet-and-peaceful"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "22:00",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 48,
      cancellationPolicy: "Free cancellation up to 48 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Gokarna Forest Resort worth the price?",
        answer:
          "For nature lovers, golfers and families, absolutely. There is nowhere else in Nepal where you can see spotted deer from your cottage window at sunrise and reach a UNESCO World Heritage stupa (Boudhanath) in 20 minutes. The golf course is the only 18-hole championship course in the country.",
      },
      {
        question: "What is the best room type at Gokarna Forest Resort?",
        answer:
          "The Forest Cottages are the star of the property — set within the trees, with bird species at the windows from dawn. Worth the modest premium over the main building rooms.",
      },
      {
        question: "Does Gokarna Forest Resort have an airport shuttle?",
        answer:
          "Yes. The resort is approximately 10 km from Tribhuvan International Airport — about 30–40 minutes. Transfers are arranged via reception.",
      },
      {
        question: "What restaurants are at Gokarna Forest Resort?",
        answer:
          "The Forest Restaurant is the main dining venue — a glass-walled pavilion with fairway views serving Nepali, Indian and continental cuisine. The Bar at the 19th Hole serves drinks and light meals.",
      },
      {
        question: "How far is Gokarna Forest Resort from Thamel?",
        answer:
          "About 12 km north-east of Thamel — approximately 30–45 minutes by taxi (NPR 700–1000). The resort provides a shuttle service to Boudhanath Stupa (20 minutes) and Thamel on request.",
      },
    ],
  },

  {
    slug: "baber-mahal-vilas",
    name: "Baber Mahal Vilas",
    areaSlug: "durbar-square",
    stars: 4,
    priceFromUsd: 120,
    priceTier: "UPSCALE" as PriceTier,
    tagline: "The most atmospheric heritage hotel in old Kathmandu",
    descriptionShort:
      "A boutique hotel carved from a 19th-century Rana stable complex, with 18 individually decorated suites, a garden courtyard and extraordinary architectural character near Durbar Square.",
    description: `Baber Mahal Vilas occupies a former Rana horse stable and carriage house — a long, arcaded structure from the 1890s that has been transformed, with extraordinary sensitivity, into 18 individually decorated suites. The restoration was carried out by the Nepalese architect Niels Gutschow working with the family of Prime Minister Juddha Shumsher Rana, whose estate the buildings originally belonged to.

The result is unique in Nepal: 18 rooms, no two identical, each furnished with antique photographs, Rana-era oils, carved furniture and textiles sourced from across the subcontinent. The colonnaded courtyard — once the carriage turning circle — has been planted into a green garden with terracotta pots and climbing jasmine. Breakfast is served here on fine mornings.

The hotel's location in the old Baber Mahal precinct, now a small enclave of boutique shops and restaurants south of Durbar Square, gives guests immediate access to the historic core of Kathmandu while providing a degree of residential quiet that Thamel-based hotels cannot match. Kathmandu Durbar Square is a 10-minute walk; Freak Street (Jhochhen Tole) is 5 minutes.

With only 18 suites, Baber Mahal Vilas is genuinely boutique in the true sense — staff know every guest by name within a few hours. The hotel cannot accommodate large groups and does not offer the full amenity set of a conventional four-star. What it offers instead is irreplaceable atmosphere and a connection to Kathmandu's history that its larger competitors simply cannot replicate.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6991,
    longitude: 85.3119,
    totalRooms: 18,
    yearBuilt: 1999,
    ourScore: 9.0,
    websiteUrl: "https://www.babermahalvilas.com",
    rooms: [
      {
        name: "Heritage Suite",
        description:
          "40–55 m², each uniquely furnished with antiques, Rana-era photographs and hand-selected artworks. Courtyard or garden access.",
        maxOccupancy: 2,
        bedType: "King or Double",
        sizeM2: 48,
        priceFromUsd: 120,
      },
      {
        name: "Grand Suite",
        description:
          "65 m² with the most impressive artifact collection in the property, four-poster bed and private garden terrace.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 65,
        priceFromUsd: 200,
      },
      {
        name: "Royal Carriage Suite",
        description:
          "The original carriage house converted into a split-level 90 m² suite with mezzanine bedroom, original stone floors and private garden.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 90,
        priceFromUsd: 280,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","tour-desk","trekking-info",
      "airport-transfer","laundry","garden",
    ],
    tagSlugs: ["boutique-hotel","heritage-property","romantic","cultural","hidden-gem"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "22:00",
      checkoutFrom: "07:00",
      checkoutUntil: "11:00",
      cancellationHours: 72,
      cancellationPolicy:
        "Free cancellation up to 72 hours before arrival. Within 72 hours, full stay charge applies.",
      prepaymentRequired: true,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: false,
      languagesSpoken: ["en", "ne", "fr"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Baber Mahal Vilas worth the price?",
        answer:
          "For travellers who value uniqueness over amenities, it is one of the most worthwhile stays in Nepal. Only 18 suites, each different, in a beautifully restored Rana stable complex with personalised service that large hotels cannot achieve. The character is extraordinary and irreplaceable.",
      },
      {
        question: "What is the best room type at Baber Mahal Vilas?",
        answer:
          "All 18 suites are different — ask the hotel to describe available rooms before booking. The Royal Carriage Suite is the most unusual, with its original stone floors and split-level layout in the old carriage house.",
      },
      {
        question: "Does Baber Mahal Vilas have an airport shuttle?",
        answer:
          "Private transfers can be arranged via the hotel. Tribhuvan International Airport is approximately 8 km away — 25–40 minutes by car.",
      },
      {
        question: "What restaurants are at Baber Mahal Vilas?",
        answer:
          "Breakfast is served in the courtyard garden. The property has a small in-house restaurant for guests, and is adjacent to the Baber Mahal Revisited complex which houses several of Kathmandu's better independent restaurants.",
      },
      {
        question: "How far is Baber Mahal Vilas from Thamel?",
        answer:
          "About 2 km south of Thamel — a 10-minute taxi (NPR 200–300). The hotel is much closer to Kathmandu Durbar Square (10-minute walk) and Freak Street (5 minutes), making it better positioned for exploring the old city than Thamel-based options.",
      },
    ],
  },

  {
    slug: "hotel-vajra",
    name: "Hotel Vajra",
    areaSlug: "swayambhunath",
    stars: 4,
    priceFromUsd: 85,
    priceTier: "MID_RANGE" as PriceTier,
    tagline: "A Buddhist arts hotel at the foot of the Monkey Temple",
    descriptionShort:
      "A 52-room Newari-style hotel on Swayambhunath hill with an open-air theatre, thangka gallery, rooftop views and deep commitment to Buddhist arts and culture.",
    description: `Hotel Vajra was conceived in the 1980s by an American scholar of Tibetan Buddhism and a Nepali architect as a deliberate alternative to conventional hospitality — a place where guests could engage with Buddhist art, philosophy and performance rather than simply sleep and eat. The result, built in authentic Newari brick with carved wood throughout, has become one of Kathmandu's most idiosyncratic and beloved hotels.

The property climbs the western flank of Swayambhunath hill in a series of terraces connected by stone steps. A working thangka painting studio occupies the ground floor; an open-air theatre hosts Nepali classical dance, music and masked drama performances several times weekly. The library, filled with Tibetan and Sanskrit texts, is open to guests throughout the day. A small gallery sells authentic thangka paintings produced on-site.

The 52 rooms range from simple Kathmandu Garden rooms (compact, excellent value) to the upper-floor Swayambhunath View rooms with rooftop access and views over the stupa dome and across the valley. All rooms have carved wooden furniture, local textile details and the satisfying substance of genuine masonry walls.

The Lunakurt restaurant serves well-regarded Nepali and international food in a dining room hung with thangka paintings and lit by butter lamps in the evenings. The rooftop bar serves Everest beer and local Raksi (grain spirit) with perhaps the finest casual view in Kathmandu.

Hotel Vajra is not for guests who prioritise amenities over atmosphere. It is for travellers who understand that staying in a building that actively supports Nepali classical arts is itself a form of cultural participation.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7148,
    longitude: 85.2921,
    totalRooms: 52,
    yearBuilt: 1981,
    ourScore: 8.7,
    websiteUrl: "https://www.hotelvajra.com",
    rooms: [
      {
        name: "Kathmandu Garden Room",
        description:
          "Compact rooms at 20 m² with carved furniture, Nepali textiles and views over the lower garden courtyard. Excellent value.",
        maxOccupancy: 2,
        bedType: "Double or Twin",
        sizeM2: 20,
        priceFromUsd: 85,
      },
      {
        name: "Swayambhunath View Room",
        description:
          "Upper floors with rooftop access and direct views over the Swayambhunath stupa and the Kathmandu Valley.",
        maxOccupancy: 2,
        bedType: "Double",
        sizeM2: 25,
        priceFromUsd: 115,
      },
      {
        name: "Vajra Suite",
        description:
          "The hotel's most spacious rooms, 45 m², with a private sitting terrace, premium thangka collection and valley panorama.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 45,
        priceFromUsd: 190,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","tour-desk","trekking-info",
      "airport-transfer","laundry","rooftop-terrace","garden","yoga","meditation",
    ],
    tagSlugs: ["boutique-hotel","spiritual","cultural","art-and-craft","solo-traveller"],
    policy: {
      checkinFrom: "13:00",
      checkinUntil: "22:00",
      checkoutFrom: "06:00",
      checkoutUntil: "11:00",
      cancellationHours: 48,
      cancellationPolicy: "Free cancellation up to 48 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: false,
      languagesSpoken: ["en", "ne", "fr", "de"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Hotel Vajra worth the price?",
        answer:
          "For culturally-minded travellers, it is genuinely outstanding value. An authentic Newari building, Buddhist arts programming (dance, thangka, lectures), rooftop views over Swayambhunath, and a working arts studio — all for $85–115 per night. There is nothing quite like it in Kathmandu.",
      },
      {
        question: "What is the best room type at Hotel Vajra?",
        answer:
          "The Swayambhunath View Rooms for the combination of rooftop access and stupa views at a very reasonable premium. The Kathmandu Garden rooms are excellent value if budget is a priority.",
      },
      {
        question: "Does Hotel Vajra have an airport shuttle?",
        answer:
          "Private transfers can be arranged. The hotel is approximately 7 km from Tribhuvan International Airport — 20–35 minutes by car. Swayambhunath Stupa is a 10-minute walk uphill.",
      },
      {
        question: "What restaurants are at Hotel Vajra?",
        answer:
          "The Lunakurt restaurant serves Nepali and international food in a dining room hung with thangka paintings — atmospheric and well-regarded. The rooftop bar serves local beers and spirits with valley views.",
      },
      {
        question: "How far is Hotel Vajra from Thamel?",
        answer:
          "About 2 km west of Thamel — a 10-minute taxi (NPR 200–250) or a 25-minute walk. The hotel's hillside location means Swayambhunath Stupa is immediately accessible without the taxi fare that guests at central hotels face.",
      },
    ],
  },

  {
    slug: "kathmandu-guest-house",
    name: "Kathmandu Guest House",
    areaSlug: "thamel",
    stars: 4,
    priceFromUsd: 70,
    priceTier: "MID_RANGE" as PriceTier,
    tagline: "The original Thamel institution since 1967",
    descriptionShort:
      "Kathmandu's most famous guesthouse, at the spiritual centre of Thamel since 1967, with 120 rooms across heritage and garden wings, a pool and three decades of traveller lore.",
    description: `The Kathmandu Guest House has a legitimate claim to being the most historically significant hotel in Nepal. When it opened in 1967, it was one of the first purpose-built guesthouses for foreign travellers in Kathmandu, occupying a Rana mansion at what is now the heart of Thamel. Over the following decade it became the base of operations for some of the most important Himalayan expeditions of the 20th century, hosting Sir Edmund Hillary's parties, Peter Matthiessen during the journey that produced The Snow Leopard, and the first generation of trekkers who would go on to establish Nepal's outdoor tourism industry.

The current property has expanded considerably from its origins, with a modern Garden Wing added in 2000 and a Heritage Wing renovation completed in 2015. The original Rana mansion at the centre — the lobby, bar and dining room — retains extraordinary atmosphere: the old register books listing Hillary and Matthiessen and dozens of other historic names are displayed in the lobby, and the dining room's wooden-beamed ceiling and carved windows have changed relatively little since the 1970s.

The 120 rooms range from compact Heritage rooms in the original building to contemporary Garden rooms with pool access. The outdoor pool, set in a walled garden at the rear, is one of Thamel's best-kept secrets — guests of other hotels often pay the day rate to use it.

At $70 per night for a Heritage room, the Kathmandu Guest House offers Thamel's most central location, genuine historical character, pool access and a breakfast that most guests agree is one of the better hotel breakfasts in the city. Its four-star classification reflects investment in infrastructure rather than luxury — but the combination of history, location and value is unmatched in the area.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1540541338537-1220059e4456?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7151,
    longitude: 85.3136,
    totalRooms: 120,
    yearBuilt: 1967,
    yearRenovated: 2015,
    ourScore: 8.4,
    websiteUrl: "https://www.ktmgh.com",
    rooms: [
      {
        name: "Heritage Room",
        description:
          "In the original Rana mansion building. Compact rooms with high ceilings, carved windows and unmistakable 1960s guesthouse atmosphere.",
        maxOccupancy: 2,
        bedType: "Double or Twin",
        sizeM2: 22,
        priceFromUsd: 70,
      },
      {
        name: "Garden Room",
        description:
          "Modern 2000 wing with pool-facing garden views, contemporary furnishings and improved soundproofing.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 28,
        priceFromUsd: 90,
      },
      {
        name: "Deluxe Pool View Suite",
        description:
          "Top-floor rooms with private balcony overlooking the pool garden. The best combination of space and location in the property.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 45,
        priceFromUsd: 150,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","swimming-pool","tour-desk",
      "trekking-info","airport-transfer","laundry","garden","currency-exchange",
    ],
    tagSlugs: ["guesthouse","historical","solo-traveller","backpacker","local-favourite"],
    policy: {
      checkinFrom: "12:00",
      checkinUntil: "23:59",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: false,
      parkingAvailable: false,
      languagesSpoken: ["en", "ne", "fr", "de", "ja"],
      currenciesAccepted: ["USD", "EUR", "GBP", "NPR"],
    },
    faqs: [
      {
        question: "Is Kathmandu Guest House worth the price?",
        answer:
          "For location and history, absolutely. The central Thamel position means everything — restaurants, trekking gear shops, tour operators and nightlife — is within 5 minutes on foot. The pool is one of Thamel's best. At $70–90 it's excellent value for a four-star property with genuine historical significance.",
      },
      {
        question: "What is the best room type at Kathmandu Guest House?",
        answer:
          "The Garden Rooms offer the best balance of comfort and value — quieter than the Heritage Wing (which faces the street), with pool garden views and more modern fittings. The Heritage rooms are worth choosing if the historical atmosphere is the point of your stay.",
      },
      {
        question: "Does Kathmandu Guest House have an airport shuttle?",
        answer:
          "Yes, airport transfers are available at standard Thamel taxi rates. The hotel is approximately 6 km from Tribhuvan International Airport — 20–35 minutes.",
      },
      {
        question: "What restaurants are at Kathmandu Guest House?",
        answer:
          "The in-house restaurant in the original Rana dining room serves breakfast, lunch and dinner (Nepali, Indian and continental). It's well-regarded for its breakfast buffet. The attached Garden Café serves lighter meals and coffee through the day.",
      },
      {
        question: "How far is Kathmandu Guest House from Thamel?",
        answer:
          "It is at Thamel Chowk — the geographical and social centre of Thamel. Everything in the district is within a 5–10 minute walk.",
      },
    ],
  },

  {
    slug: "park-village-resort",
    name: "Park Village Resort",
    areaSlug: "thamel",
    stars: 4,
    priceFromUsd: 100,
    priceTier: "UPSCALE" as PriceTier,
    tagline: "A garden and forest retreat on Thamel's northern edge",
    descriptionShort:
      "A 66-room garden resort bordering a small forest on Thamel's northern fringe, with a pool, organic vegetable garden and bird-rich grounds — without the noise of central Thamel.",
    description: `Park Village Resort occupies the northern fringe of the Thamel district, where the tourist quarter gives way to the quieter residential streets leading toward Naxal and Lazimpat. The hotel is set within two acres of private gardens that include a mature stand of trees attracting a surprising diversity of birdlife — kingfishers, hoopoes and various sunbirds are regularly spotted from the pool terrace.

The resort was built in 1997 and subsequently expanded, with its garden orientation and low-rise architecture producing a property whose atmosphere feels far removed from central Thamel despite being 10 minutes' walk from Thamel Chowk. The outdoor pool set within the gardens, with mountain views on clear mornings, is one of the best garden pool settings in the district.

The 66 rooms are distributed across two wings. The Garden Wing (ground floor) has direct access to the gardens; the Valley View Wing (upper floors) has mountain views but no direct garden access. Room quality is honest four-star: contemporary fittings, reliable hot water, fast WiFi and comfortable beds. The kitchen garden behind the main building supplies the restaurant with seasonal vegetables and herbs.

The Radhe Radhe restaurant serves Nepali, Indian and continental food with ingredients drawn substantially from the hotel's own garden — the dal bhat is among the better versions available in a Thamel hotel.

Park Village suits travellers who want the convenience of a Thamel location without the street noise, and families who appreciate garden space and the natural setting. The birdwatching from breakfast has converted more than a few guests who arrived expecting just another city hotel.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7185,
    longitude: 85.3098,
    totalRooms: 66,
    yearBuilt: 1997,
    ourScore: 8.1,
    websiteUrl: "https://www.parkvillage.com.np",
    rooms: [
      {
        name: "Garden Room",
        description:
          "Ground-floor rooms with direct garden access. 28 m², contemporary fittings, private patio.",
        maxOccupancy: 2,
        bedType: "King or Twin",
        sizeM2: 28,
        priceFromUsd: 100,
      },
      {
        name: "Valley View Room",
        description:
          "Upper floor with Himalayan-facing windows on clear days. 30 m², improved soundproofing from street.",
        maxOccupancy: 2,
        bedType: "King",
        sizeM2: 30,
        priceFromUsd: 125,
      },
      {
        name: "Junior Suite",
        description:
          "Separate lounge, large balcony overlooking the garden and pool. 52 m², soaking tub.",
        maxOccupancy: 3,
        bedType: "King",
        sizeM2: 52,
        priceFromUsd: 210,
      },
    ],
    amenitySlugs: [
      "wifi-free","24h-reception","restaurant","bar","swimming-pool","tour-desk",
      "trekking-info","airport-transfer","laundry","garden","yoga",
    ],
    tagSlugs: ["resort","eco-friendly","quiet-and-peaceful","family","wildlife"],
    policy: {
      checkinFrom: "14:00",
      checkinUntil: "23:00",
      checkoutFrom: "06:00",
      checkoutUntil: "12:00",
      cancellationHours: 24,
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      prepaymentRequired: false,
      petsAllowed: false,
      breakfastIncluded: true,
      parkingAvailable: true,
      parkingPriceUsd: 0,
      languagesSpoken: ["en", "ne"],
      currenciesAccepted: ["USD", "EUR", "NPR"],
    },
    faqs: [
      {
        question: "Is Park Village Resort worth the price?",
        answer:
          "Yes, especially for families and garden-oriented travellers. The combination of garden pool, birdlife, organic kitchen garden and breakfast included at $100 per night is strong value for the Thamel area. The 10-minute walk to Thamel Chowk keeps it connected without the noise.",
      },
      {
        question: "What is the best room type at Park Village Resort?",
        answer:
          "The Garden Rooms with direct patio access are the strongest choice — the ability to step straight into the garden from your room at 6am, coffee in hand, to watch the kingfishers is genuinely special. Valley View rooms suit those who want mountain views over garden access.",
      },
      {
        question: "Does Park Village Resort have an airport shuttle?",
        answer:
          "Yes, airport transfers are available. The resort is approximately 7 km from Tribhuvan International Airport — 20–35 minutes.",
      },
      {
        question: "What restaurants are at Park Village Resort?",
        answer:
          "Radhe Radhe restaurant serves Nepali, Indian and continental cuisine, with produce sourced from the hotel's organic kitchen garden. The dal bhat and garden salads are recommended. Breakfast is included and features both local and continental options.",
      },
      {
        question: "How far is Park Village Resort from Thamel?",
        answer:
          "About 750m north of Thamel Chowk — a 10-minute walk through the gradually quieting lanes toward Naxal. A very short tuk-tuk ride (NPR 100–150) is available after dark.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────

async function seedHotel(
  data: (typeof fiveStarHotels)[0] | (typeof fourStarHotels)[0],
  areaMap: Map<string, string>,
  amenityMap: Map<string, string>,
  tagMap: Map<string, string>,
) {
  const areaId = areaMap.get(data.areaSlug);

  const propertyData = {
    slug: data.slug,
    status: "PUBLISHED" as Status,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    descriptionShort: data.descriptionShort,
    stars: data.stars,
    priceTier: data.priceTier,
    priceFromUsd: data.priceFromUsd,
    areaId,
    coverImageUrl: data.coverImageUrl,
    latitude: "latitude" in data ? data.latitude : undefined,
    longitude: "longitude" in data ? data.longitude : undefined,
    totalRooms: "totalRooms" in data ? data.totalRooms : undefined,
    yearBuilt: "yearBuilt" in data ? data.yearBuilt : undefined,
    yearRenovated: "yearRenovated" in data ? (data as any).yearRenovated : undefined,
    brandChain: "brandChain" in data ? (data as any).brandChain : undefined,
    ourScore: "ourScore" in data ? data.ourScore : undefined,
    websiteUrl: "websiteUrl" in data ? data.websiteUrl : undefined,
    featured: data.stars === 5,
    verified: true,
    publishedAt: new Date(),
    languagesSpoken: data.policy.languagesSpoken,
    currenciesAccepted: data.policy.currenciesAccepted,
    checkinTime: data.policy.checkinFrom,
    checkoutTime: data.policy.checkoutUntil,
    metaTitle: `${data.name} — Kathmandu Hotel Review, Rates & Tips | kathmandu.im`,
    metaDescription: data.descriptionShort,
  };

  // 1. Upsert property — exclude coverImageUrl from update so sketch-generated images are never overwritten
  const { coverImageUrl: _cover, ...propertyDataWithoutImage } = propertyData;
  const property = await prisma.property.upsert({
    where: { slug: data.slug },
    update: propertyDataWithoutImage,
    create: propertyData,
  });

  // 2. Upsert policy
  const policyData = {
    checkinFrom: data.policy.checkinFrom,
    checkinUntil: data.policy.checkinUntil,
    checkoutFrom: data.policy.checkoutFrom,
    checkoutUntil: data.policy.checkoutUntil,
    cancellationPolicy: data.policy.cancellationPolicy,
    cancellationHours: data.policy.cancellationHours,
    prepaymentRequired: data.policy.prepaymentRequired,
    petsAllowed: data.policy.petsAllowed,
    breakfastIncluded: data.policy.breakfastIncluded,
    parkingAvailable: data.policy.parkingAvailable,
    parkingPriceUsd: "parkingPriceUsd" in data.policy ? data.policy.parkingPriceUsd : undefined,
    languagesSpoken: data.policy.languagesSpoken,
    currenciesAccepted: data.policy.currenciesAccepted,
  };

  await prisma.policySet.upsert({
    where: { propertyId: property.id },
    update: policyData,
    create: { propertyId: property.id, ...policyData },
  });

  // 3. Room types (delete + recreate for idempotency)
  await prisma.roomType.deleteMany({ where: { propertyId: property.id } });
  await prisma.roomType.createMany({
    data: data.rooms.map((r) => ({ ...r, propertyId: property.id })),
  });

  // 4. Amenities
  await connectAmenities(prisma, property.id, data.amenitySlugs, amenityMap);

  // 5. Tags
  await connectPropertyTags(prisma, property.id, data.tagSlugs, tagMap);

  // 6. FAQs
  await upsertFAQs(prisma, "PROPERTY", "propertyId", property.id, data.faqs);

  return property;
}

export async function seedHotels() {
  console.log("🏨 Seeding hotels...");

  const [amenityMap, tagMap, areaMap] = await Promise.all([
    buildAmenityMap(prisma),
    buildTagMap(prisma),
    buildAreaMap(prisma),
  ]);

  const all = [...fiveStarHotels, ...fourStarHotels];
  let count = 0;

  for (const hotel of all) {
    await seedHotel(hotel, areaMap, amenityMap, tagMap);
    count++;
    process.stdout.write(`  ✓ ${hotel.name}\n`);
  }

  console.log(`✅ Hotels seeded: ${count} properties`);
}
