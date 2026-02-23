/**
 * kathmandu.im — Attractions seed
 * 25 Kathmandu Valley tourist attractions
 * Run via: npm run db:seed
 */

import { PrismaClient, ListingType, Status } from "@prisma/client";
import {
  buildTagMap,
  buildAreaMap,
  connectListingTags,
  upsertFAQs,
} from "./_helpers";

const prisma = new PrismaClient();

const attractions = [
  // ─── UNESCO World Heritage Sites ───────────────────────────────────────────

  {
    slug: "pashupatinath-temple",
    name: "Pashupatinath Temple",
    nameLocal: "पशुपतिनाथ मन्दिर",
    listingType: "TEMPLE" as ListingType,
    areaSlug: "pashupatinath",
    tagline: "Nepal's holiest Hindu shrine on the banks of the Bagmati",
    descriptionShort:
      "The most sacred Hindu temple in Nepal and a UNESCO World Heritage Site, Pashupatinath's riverside ghats and golden pagoda draw pilgrims and visitors from across South Asia.",
    description: `Pashupatinath Temple is the spiritual heart of Nepal. Dedicated to Lord Shiva in his manifestation as Pashupati — Lord of Animals — the complex stretches along both banks of the sacred Bagmati River, encompassing 492 temples, shrines, ashrams and cremation ghats within its bounds.

The main temple, dating in its present form to the 17th century though the site's sanctity extends over two thousand years, is a double-roofed pagoda of gilded copper. Its interior sanctum houses a sacred Shiva lingam said to be self-manifested (swayambhu) and is one of the twelve Jyotirlinga shrines in the Hindu world. Non-Hindus are not permitted inside the main temple, but the exterior and the extensive riverside complex are fully accessible.

The Bagmati ghats are where Kathmandu's most profound daily rituals unfold. Cremation ceremonies take place on the Arya Ghat continuously, attended by sadhus — wandering Hindu ascetics, their bodies smeared with ash, their hair matted and orange-robed — who meditate and pose for photographs on the eastern bank. The ghats also host the Maha Shivaratri festival each February/March, when hundreds of thousands of pilgrims converge from across the subcontinent.

Beyond the cremation ghats, Pashupatinath's grounds contain some of Kathmandu's most beautiful smaller temples: the Vatsala shrine, the rows of Shiva lingams along the riverside, and the Gorakhnath temple with its views down the Bagmati valley.`,
    history: `The site of Pashupatinath has been sacred for at least two thousand years. The earliest written references appear in the Nepalese chronicles (Vamsavali) around the 5th century CE, though tradition holds the temple's origins to be far older — connected to the legendary King Supuspa. The main temple's current form dates primarily from the late Licchavi and early Malla periods (7th–14th centuries), with significant reconstruction by King Bhupatindra Malla in the 17th century after earlier structures were damaged.

The temple was inscribed as a UNESCO World Heritage Site in 1979 as part of the Kathmandu Valley complex. The 2015 earthquake caused significant damage to peripheral structures within the complex, most of which have been restored through a joint Nepal-India restoration programme completed in 2021.`,
    highlights: [
      "Nepal's most sacred Hindu temple, dedicated to Lord Shiva",
      "UNESCO World Heritage Site since 1979",
      "Active cremation ghats on the Bagmati River",
      "Permanent community of sadhus (Hindu ascetics) on the eastern bank",
      "492 temples and shrines within the complex",
      "Site of Maha Shivaratri — one of South Asia's largest festivals",
      "The most atmospheric dawn visit in Kathmandu Valley",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Newari pagoda",
    deityOrSubject: "Lord Shiva (as Pashupati, Lord of Animals)",
    isFree: false,
    admissionLocal: "Free for Hindu pilgrims",
    admissionForeigner: "NPR 1,000",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "04:00",
        closes: "22:00",
      },
    ],
    bestMonths: [2, 3, 10, 11],
    visitorTips: {
      bestTime: "Dawn (5–7am) for the most atmospheric ghats experience with morning rituals",
      howToGetThere: "20-min taxi from Thamel (NPR 400–500); 10-min from Boudhanath",
      whatToWear: "Remove shoes at all temple entrances; dress modestly (shoulders and knees covered)",
      timeNeeded: "2–3 hours minimum",
      photography: "Photography is permitted in the riverside areas; do not photograph cremation ceremonies without explicit consent from bereaved families",
    },
    insiderTip: "Visit the Gorakhnath temple on the hill above the eastern bank — 95% of visitors miss it. The views down the Bagmati valley from there are excellent, and the cluster of small shrines around it sees almost no tourist traffic even at peak hours.",
    eventCalendar: [
      { name: "Maha Shivaratri", month: 2, description: "Nepal's largest Hindu festival draws 500,000+ pilgrims; sadhus from across India camp in the grounds for weeks." },
      { name: "Teej", month: 8, description: "Hindu women's festival with thousands of women in red saris fasting and celebrating at the temple." },
      { name: "Bala Chaturdashi", month: 11, description: "Night-long vigil and dawn procession in memory of deceased relatives." },
    ],
    nearbyAttractions: ["Boudhanath Stupa", "Guhyeshwari Temple", "Kopan Monastery"],
    ourScore: 9.3,
    featured: true,
    tagSlugs: ["spiritual","cultural","unesco-heritage","photography","pilgrim"],
    faqs: [
      {
        question: "Can foreigners enter Pashupatinath Temple?",
        answer: "Non-Hindus cannot enter the main Pashupatinath temple building itself — the inner sanctum is restricted to Hindu devotees only. However, the extensive riverside complex, ghats, secondary temples and the eastern bank (where sadhus reside) are fully open to all visitors. The entry fee of NPR 1,000 covers the full complex and there is plenty to explore for 2–3 hours without entering the main temple.",
      },
      {
        question: "What time should I visit Pashupatinath Temple?",
        answer: "Dawn (5:00–7:00am) is the most atmospheric time — morning puja rituals, priests performing aarti at the riverside, and the ghats active with bathers and worshippers. Avoid midday when crowds peak. The evening aarti ceremony at sunset (around 6pm) is also beautiful and relatively uncrowded compared to Varanasi's equivalent.",
      },
      {
        question: "Is it respectful to watch cremations at Pashupatinath?",
        answer: "Cremation is a public ritual in Hindu tradition and observation by respectful visitors is generally accepted. Maintain a respectful distance, do not photograph bereaved families without permission, keep voices low, and do not point. The experience is profound rather than morbid — it is treated as a sacred transition rather than a cause for grief.",
      },
      {
        question: "How much does it cost to visit Pashupatinath?",
        answer: "NPR 1,000 for foreign nationals (approximately $7.50). Free for Nepali citizens and Hindu pilgrims from any country. The ticket covers the entire complex for a full day.",
      },
      {
        question: "How far is Pashupatinath from Thamel?",
        answer: "Approximately 5 km east of Thamel — a 20-minute taxi (NPR 400–500) or a 30-minute microbus ride from Ratna Park. It is 2 km from Boudhanath Stupa, making the two sites natural companions for a half-day visit.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7109,
    longitude: 85.3487,
    touristType: ["pilgrim", "cultural", "photography"],
  },

  {
    slug: "boudhanath-stupa",
    name: "Boudhanath Stupa",
    nameLocal: "बौद्धनाथ स्तूप",
    listingType: "STUPA" as ListingType,
    areaSlug: "boudhanath",
    tagline: "The world's largest stupa and the soul of Tibetan Buddhism outside Tibet",
    descriptionShort:
      "At 36 metres tall with a 100-metre diameter, Boudhanath is the largest stupa in Nepal and one of the greatest Buddhist monuments on earth — a living pilgrimage site active since the 7th century.",
    description: `Boudhanath Stupa rises from the Kathmandu Valley floor like a white hemisphere balanced on concentric platforms, its golden spire painted with the all-seeing eyes of Buddha gazing in the four cardinal directions. At 36 metres tall and with a circumambulation path over 100 metres in diameter, it is the largest stupa in Nepal and one of the most important Buddhist monuments in the world.

The stupa is not a relic or a museum piece — it is a living pilgrimage site used daily. From before sunrise, Tibetan monks, nuns, elderly devotees and young children perform the kora (clockwise circumambulation), spinning prayer wheels set into the stupa's base as they walk. The air smells of butter lamps and juniper incense; mantras drift from monastery windows surrounding the stupa plaza. At dawn, the experience has a meditative intensity unlike anything else in Kathmandu.

The stupa's surroundings have grown into one of the most concentrated Buddhist communities outside Tibet. Over 50 Tibetan monasteries ring the stupa plaza, established by Tibetan refugees following the 1959 Chinese occupation. Many offer meditation courses, dharma teachings and puja attendance to visiting guests. The rooftop cafes surrounding the plaza serve Tibetan butter tea and momos with aerial views of the stupa dome.

The 2015 Gorkha earthquake damaged the stupa's upper spire significantly. A comprehensive restoration completed in 2016, funded by the Boudhanath Area Development Committee, returned the monument to its full glory — the newly gilded spire was re-consecrated in an extraordinary ceremony attended by over 10,000 devotees.`,
    history: `The founding of Boudhanath is attributed to the 7th century CE — one tradition credits the Tibetan Emperor Songtsen Gampo, another credits a woman named Kangma who petitioned the Licchavi king for land and built the stupa from the proceeds of selling her horse. The stupa's current form dates primarily from the medieval period, with the great base platforms added by Malla-era kings.

Boudhanath was inscribed as a UNESCO World Heritage Site in 1979. It sits at a point on an ancient trade route between Tibet and India, which explains its historical importance as a place where merchants of all faiths would pause to make offerings before crossing the Himalayan passes northward.`,
    highlights: [
      "Largest stupa in Nepal at 36 metres height, 100-metre diameter",
      "UNESCO World Heritage Site since 1979",
      "Living pilgrimage site active since the 7th century CE",
      "Over 50 Tibetan Buddhist monasteries surrounding the plaza",
      "Dawn kora with monks is among Asia's great spiritual experiences",
      "Rooftop cafes with aerial views of the stupa dome",
      "Hub of Tibetan refugee community since 1959",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Tibetan mandala stupa",
    deityOrSubject: "Dipankara Buddha",
    isFree: false,
    admissionLocal: "Free",
    admissionForeigner: "NPR 400",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "05:00",
        closes: "21:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Dawn (5:30–7:30am) for the kora with monks and minimum tourist crowds",
      howToGetThere: "15-min taxi from Thamel (NPR 350–500); tempo from Ratna Park",
      whatToWear: "Dress modestly; walk clockwise around the stupa (this is important)",
      timeNeeded: "1.5–2 hours for the stupa; add another hour for monastery visits",
      photography: "The rooftop of any surrounding cafe gives the best aerial shots of the full dome",
    },
    insiderTip: "The inner kora path at the stupa's base — accessed through a low doorway on the southern side — is almost unknown to first-time visitors. At 4–5am, this passage is filled with monks on their first circuit of the day, butter lamps guttering in niches, the smell of incense overwhelming. It is one of the most intense sensory experiences in Nepal.",
    eventCalendar: [
      { name: "Buddha Jayanti", month: 5, description: "Full-moon celebration of Buddha's birth, enlightenment and death draws massive gatherings around the stupa." },
      { name: "Losar (Tibetan New Year)", month: 2, description: "The most important Tibetan festival; elaborate monastery ceremonies and stupa circumambulation over three days." },
      { name: "Saga Dawa", month: 5, description: "Month-long festival culminating in a huge procession carrying a sacred thangka around the stupa." },
    ],
    nearbyAttractions: ["Pashupatinath Temple", "Kopan Monastery", "Gokarna Forest"],
    ourScore: 9.5,
    featured: true,
    tagSlugs: ["spiritual","cultural","unesco-heritage","photography","pilgrim"],
    faqs: [
      {
        question: "What time is best to visit Boudhanath Stupa?",
        answer: "Dawn — between 5:30 and 7:30am — is the single best time. The monks' morning kora is underway, butter lamps are lit in every niche, and tourist numbers are a fraction of the midday peak. The rooftop cafes open from around 6am and serve excellent tea and breakfast. Evening (6–8pm) is the second-best time, when the stupa is lit and the evening kora creates a beautiful atmosphere.",
      },
      {
        question: "How much does it cost to visit Boudhanath Stupa?",
        answer: "NPR 400 for foreign nationals (approximately $3). Free for Nepali citizens. The ticket office opens from around 7am; early-morning visitors (before 7am) can usually enter the plaza without a ticket since the office isn't staffed yet.",
      },
      {
        question: "Can I visit Buddhist monasteries around Boudhanath?",
        answer: "Yes — most of the 50+ monasteries surrounding the stupa are open to respectful visitors during daytime hours (typically 7am–12pm and 2pm–6pm). Some offer formal meditation courses and dharma talks; Kopan Monastery on the hill above the stupa runs internationally-attended courses. Remove shoes before entering any monastery hall.",
      },
      {
        question: "Is Boudhanath worth visiting?",
        answer: "It is one of the unmissable experiences in Nepal. The combination of architectural scale, spiritual atmosphere and living Buddhist community is found nowhere else in South Asia at this level. Allow at least a full morning rather than a quick photo stop.",
      },
      {
        question: "How far is Boudhanath from Thamel?",
        answer: "Approximately 5 km north-east — a 15-minute taxi (NPR 350–500). From Pashupatinath it is 2 km west — a 10-minute taxi or 30-minute walk.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7215,
    longitude: 85.3620,
    touristType: ["pilgrim", "cultural", "family"],
  },

  {
    slug: "swayambhunath-stupa",
    name: "Swayambhunath Stupa",
    nameLocal: "स्वयम्भूनाथ",
    listingType: "STUPA" as ListingType,
    areaSlug: "swayambhunath",
    tagline: "The Monkey Temple — 2,500 years of Buddhist worship above the valley",
    descriptionShort:
      "Perched on a forested hill above Kathmandu, Swayambhunath is one of the world's oldest Buddhist sites with panoramic valley views, resident monkeys and a stupa visible from across the city.",
    description: `Swayambhunath sits atop a steep wooded hill that rises 77 metres above the Kathmandu Valley floor, its white dome and golden spire visible from almost every part of the city. The climb to the summit — 365 stone steps, one for each day of the year — is lined with prayer wheels, statues of the Buddha and Bodhisattvas, and increasingly close encounters with the resident rhesus monkeys who have lived on the hill for centuries and are considered sacred.

The stupa at the summit is one of the oldest in the world, with devotional activity recorded here dating back at least 2,500 years. The dome represents the cosmos; the four pairs of Buddha eyes on the spire's base watch over the valley in every direction; the thirteen rings of the spire represent the stages of enlightenment. Tibetan, Newari and Vajrayana Buddhist traditions all converge here, filling the hilltop with an eclectic mix of prayer flags, butter lamps, bronze Buddhas and painted mandalas.

The views from the hilltop are spectacular on clear days — the entire Kathmandu Valley spreads in every direction, with the Himalayan range visible to the north. Sunrise and early morning visits, before the tour buses arrive from 9am, offer the hilltop largely to local devotees and the monkeys.`,
    history: `The Swayambhu Mahachaitya (the stupa's full name) is documented in a 5th century CE inscription that refers to it as already ancient. Legend holds that the Kathmandu Valley was once a lake, and that the original lotus containing the primordial Buddha light of Swayambhu rose from the water here when the Bodhisattva Manjushri drained the lake by cutting the Chobar Gorge. The current stupa was significantly restored and enlarged in the 17th century by Pratap Malla.`,
    highlights: [
      "One of the world's oldest Buddhist stupas — 2,500+ years of devotion",
      "Panoramic views over the entire Kathmandu Valley",
      "365-step staircase lined with prayer wheels and Buddhist statuary",
      "Sacred resident monkey colony (treat monkeys with caution)",
      "UNESCO World Heritage Site — Kathmandu Valley (1979)",
      "Sunrise visits offer the hilltop almost entirely to local devotees",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Vajrayana Buddhist stupa with Newari elements",
    deityOrSubject: "Primordial Buddha (Adi-Buddha / Swayambhu)",
    isFree: false,
    admissionLocal: "Free",
    admissionForeigner: "NPR 200",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "05:00",
        closes: "21:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Sunrise (6–8am) for the best light, fewest tourists and active morning puja",
      howToGetThere: "15-min taxi from Thamel (NPR 250–350) or 30-min walk",
      whatToWear: "Comfortable shoes for the 365 steps; modest clothing",
      timeNeeded: "1.5–2 hours",
      photography: "Best light for the stupa face is in the morning; the valley panorama is best from the northwest corner of the hilltop",
    },
    insiderTip: "The western staircase (on the far side of the hill from the main entrance) sees almost no tourists and has a more intimate, less commercial atmosphere. Take a taxi to the main entrance, visit the stupa, then descend via the western steps to the Manjushri shrine and walk around the base of the hill back to the road.",
    eventCalendar: [
      { name: "Losar (Tibetan New Year)", month: 2, description: "Major celebration at the stupa with monastery ceremonies and masked dances." },
      { name: "Buddha Jayanti", month: 5, description: "Thousands of devotees circumambulate the stupa through the night." },
    ],
    nearbyAttractions: ["National Museum of Nepal", "Thamel", "Hotel Vajra"],
    ourScore: 9.1,
    featured: true,
    tagSlugs: ["spiritual","cultural","unesco-heritage","photography","instagrammable"],
    faqs: [
      {
        question: "Is the Monkey Temple (Swayambhunath) safe to visit?",
        answer: "Yes, it is very safe. The monkeys are accustomed to humans but can be bold about food — do not carry visible snacks and keep bags closed. Be particularly careful with bags on the main staircase where monkeys have been known to snatch items. Beyond the monkeys, it is a normal tourist site with no safety concerns.",
      },
      {
        question: "How much does it cost to visit Swayambhunath?",
        answer: "NPR 200 for foreign nationals (approximately $1.50). Free for Nepali citizens.",
      },
      {
        question: "How do I get to Swayambhunath from Thamel?",
        answer: "A 15-minute taxi (NPR 250–350) is the most convenient option. The western end of Thamel is actually close enough to walk — approximately 30 minutes through pleasant residential streets. There is also a vehicle road to the eastern base of the hill if you prefer not to climb the main 365 steps.",
      },
      {
        question: "What is the best time to visit Swayambhunath?",
        answer: "Early morning (6–8am) for sunrise light, active puja and minimal crowds. The hilltop becomes busy with tour groups from 9am onwards. Sunset is also beautiful but the stupa faces west so the late afternoon light can be harsh for photography.",
      },
      {
        question: "How long does it take to visit Swayambhunath?",
        answer: "Allow 1.5 to 2 hours for the stupa complex and hilltop. The main staircase takes about 10–15 minutes to climb at a comfortable pace. Add time if you want to explore the smaller shrines and monasteries on the hilltop perimeter.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7149,
    longitude: 85.2904,
    touristType: ["cultural", "family", "photography"],
  },

  {
    slug: "kathmandu-durbar-square",
    name: "Kathmandu Durbar Square",
    nameLocal: "हनुमान ढोका दरबार",
    listingType: "HISTORIC_SITE" as ListingType,
    areaSlug: "durbar-square",
    tagline: "The ancient royal heart of Kathmandu",
    descriptionShort:
      "Kathmandu Durbar Square — Hanuman Dhoka — is the former royal palace complex at the city's historic core, with 50+ temples, the Kumari Ghar (Living Goddess palace) and extraordinary Newari architecture.",
    description: `Kathmandu Durbar Square — formally Hanuman Dhoka Durbar Square — is the historic and ceremonial heart of the city. For over a thousand years this plaza was the seat of the Shah and Malla kings, surrounded by temples, palaces and administrative buildings that form one of the densest concentrations of medieval architecture in Asia.

The square encompasses the old Royal Palace (Hanuman Dhoka), the Kumari Ghar where the living goddess Kumari resides, and dozens of temples of varying scales. The most prominent are the Jagannath Temple with its erotic wood carvings on its supporting struts — a Newari tradition representing the power of sexuality against lightning — and the Taleju Temple, accessible only to Hindus but visible from the square's perimeter.

The 2015 Gorkha earthquake caused devastating damage to the square. The nine-storey Basantapur Tower collapsed entirely; numerous smaller temples were destroyed or severely damaged. Restoration work funded by the Government of Nepal, UNESCO and various international partners continues — some structures have been beautifully restored while others remain under repair, giving the square a layered quality of old, restored and damaged that is itself historically instructive.`,
    history: `The earliest structures at Hanuman Dhoka date from the Licchavi period (3rd–9th centuries CE), though most of the visible buildings are from the Malla period (12th–18th centuries). The last Malla king of Kathmandu, Jaya Prakash Malla, was defeated by Prithvi Narayan Shah in 1768, who made the square the capital of his unified Nepal. The Shah dynasty used the palace until the 19th century when the government moved to Singha Durbar.`,
    highlights: [
      "Former royal palace of Malla and Shah kings",
      "UNESCO World Heritage Site — Kathmandu Valley (1979)",
      "Kumari Ghar — residence of the living goddess Kumari",
      "Jagannath Temple with renowned erotic wood carvings",
      "Active post-earthquake restoration (ongoing from 2015)",
      "Hanuman Dhoka Museum with royal artefacts",
      "Most concentrated medieval architecture in South Asia",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Newari pagoda and Shikhara styles",
    isFree: false,
    admissionLocal: "NPR 150",
    admissionForeigner: "NPR 1,000 (covers Patan Durbar Square same day)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Early morning (7–9am) before the organized tour groups arrive from 10am",
      howToGetThere: "10-min walk from Thamel; microbus from New Bus Park",
      whatToWear: "Casual; remove shoes at all temple entrances",
      timeNeeded: "2–3 hours",
      photography: "The best light on the main pagodas is early morning from the eastern side of the square",
    },
    insiderTip: "Hire a local guide from the official guide station at the square entrance rather than a freelancer. The restoration stories — which structures collapsed in 2015, how they were rebuilt, what original materials were recovered — are far more interesting when explained with knowledge. Guides here typically charge NPR 800–1,200 for a 2-hour tour.",
    eventCalendar: [
      { name: "Indra Jatra", month: 9, description: "Kathmandu's greatest festival: 8 days of chariot processions, masked dances and the Kumari's public appearance." },
      { name: "Holi", month: 3, description: "The festival of colours is celebrated with particular exuberance in and around Durbar Square." },
    ],
    nearbyAttractions: ["Thamel", "Kumari Ghar", "Asan Tole Bazaar", "Freak Street"],
    ourScore: 9.0,
    featured: true,
    tagSlugs: ["unesco-heritage","historical","cultural","photography","art-and-craft"],
    faqs: [
      {
        question: "How much does it cost to visit Kathmandu Durbar Square?",
        answer: "NPR 1,000 for foreign nationals. This ticket also covers Patan Durbar Square on the same day — so if you plan to visit both, go to Kathmandu first and keep your ticket. Free for Nepali citizens.",
      },
      {
        question: "How long should I spend at Kathmandu Durbar Square?",
        answer: "Allow 2–3 hours minimum. The square itself takes an hour or two, but the surrounding lanes — Freak Street to the south, Asan Tole to the north, the narrow lanes of the old city in all directions — reward unhurried exploration.",
      },
      {
        question: "Is Kathmandu Durbar Square still damaged from the 2015 earthquake?",
        answer: "Partly. Some structures have been beautifully restored; others remain scaffolded or awaiting restoration. The square is fully open and worth visiting — the ongoing restoration is itself interesting, and the restored sections show the quality of Newari craftsmanship at its best.",
      },
      {
        question: "Can I see the Kumari (living goddess) at Durbar Square?",
        answer: "The Kumari appears briefly at her window in the Kumari Ghar, usually responding to crowds that gather in the courtyard below. There is no fixed schedule. Waiting 30–60 minutes in the courtyard usually results in a brief appearance, though this is not guaranteed.",
      },
      {
        question: "Is Kathmandu Durbar Square walkable from Thamel?",
        answer: "Yes — it is a 10–15 minute walk south from Thamel Chowk through the increasingly traditional lanes of the old city. The walk itself is part of the experience.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7043,
    longitude: 85.3073,
    touristType: ["cultural", "family", "photography"],
  },

  {
    slug: "patan-durbar-square",
    name: "Patan Durbar Square",
    nameLocal: "पाटन दरबार",
    listingType: "HISTORIC_SITE" as ListingType,
    areaSlug: "patan",
    tagline: "The finest medieval square in South Asia",
    descriptionShort:
      "Patan Durbar Square is widely considered the best-preserved royal square in the Kathmandu Valley, with its exquisite Malla-era temples, the superb Patan Museum and unrivalled bronze casting tradition.",
    description: `Many seasoned travellers to the Kathmandu Valley rate Patan Durbar Square above its counterpart in Kathmandu — and the argument is defensible. While Kathmandu's square is larger and more storied, Patan's is better preserved, more architecturally coherent, and anchored by what is undisputedly the finest museum in Nepal.

The square's western side is dominated by the Royal Palace, a three-winged Malla masterpiece built over the 17th century. Its three courtyards — Mul Chowk, Sundari Chowk and Keshav Narayan Chowk — contain some of the most detailed stone carving and gilded metalwork in Nepal. The Patan Museum occupies Keshav Narayan Chowk, its galleries presenting the valley's Hindu and Buddhist art in exceptional context.

Facing the palace, the eastern side of the square is lined with a procession of temples of different styles: the Krishnamandir (a 17th-century stone Shikhara-style temple unique in the valley), the Vishwanath Temple with its twin elephants, the Bhimsen Temple for traders, and the Char Narayan Temple with its exquisite wood carvings.`,
    history: `Patan (ancient name: Yala or Lalitpur, 'City of Fine Arts') was one of the three medieval kingdoms of the Kathmandu Valley, ruled by Malla kings from the 12th to 18th centuries. The durbar square reached its architectural peak under the reign of Siddhinarsingh Malla (1620–1661), who built or rebuilt most of the major structures visible today. The 2015 earthquake caused less structural damage here than at Kathmandu's square, though the Char Narayan and Hari Shankar temples required significant repair.`,
    highlights: [
      "Better-preserved medieval architecture than Kathmandu Durbar Square",
      "The Patan Museum — the finest museum in Nepal",
      "Krishna Mandir — unique Shikhara-style stone temple (17th century)",
      "Bronze casting workshops in surrounding lanes",
      "UNESCO World Heritage Site since 1979",
      "Royal Palace courtyards with extraordinary gilded metalwork",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Newari pagoda and Shikhara styles",
    isFree: false,
    admissionLocal: "NPR 100",
    admissionForeigner: "NPR 1,000 (shared ticket with Kathmandu Durbar Square)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning (8–11am); afternoon light is harsh and the square becomes crowded",
      howToGetThere: "15-min taxi from Thamel (NPR 400–600)",
      whatToWear: "Comfortable shoes; dress modestly",
      timeNeeded: "3–4 hours including the Patan Museum",
      photography: "The Krishna Mandir and the Vishwanath Temple have excellent morning light from the east",
    },
    insiderTip: "Budget at least 90 minutes for the Patan Museum — the temple metalwork galleries on the upper floors are among the finest collections of Hindu and Buddhist bronze art in the world, and the building itself (a restored Malla palace courtyard) is beautiful.",
    eventCalendar: [
      { name: "Rato Machhindranath Chariot Festival", month: 5, description: "Kathmandu Valley's longest festival — a massive chariot is pulled through Patan over several weeks." },
      { name: "Krishna Jayanti", month: 8, description: "Birth of Lord Krishna celebrated with all-night singing and oil lamp illuminations at Krishna Mandir." },
    ],
    nearbyAttractions: ["Patan Museum", "Godawari Botanical Garden", "Jhamsikhel"],
    ourScore: 9.3,
    featured: true,
    tagSlugs: ["unesco-heritage","historical","cultural","art-and-craft","photography"],
    faqs: [
      {
        question: "Is Patan Durbar Square better than Kathmandu Durbar Square?",
        answer: "They are different rather than one better than the other. Patan is better preserved, quieter, and has the superior Patan Museum. Kathmandu is larger, more historically significant as the capital, and has the Kumari (living goddess). Most visitors who have time see both — the shared ticket makes it economically sensible.",
      },
      {
        question: "How much does it cost to visit Patan Durbar Square?",
        answer: "NPR 1,000 for foreign nationals — the same ticket covers Kathmandu Durbar Square on the same day. If you already bought a ticket at Kathmandu Durbar Square, keep it and show it here.",
      },
      {
        question: "Is the Patan Museum worth visiting?",
        answer: "It is the single best museum in Nepal and one of the finest in South Asia for Hindu and Buddhist art. Allow 90 minutes minimum. The context it gives to the temples you are seeing outside makes the rest of your Patan visit significantly richer.",
      },
      {
        question: "How far is Patan from Thamel?",
        answer: "About 4 km south — a 15–25 minute taxi (NPR 400–600). Patan is technically a separate city (Lalitpur) across the Bagmati River from Kathmandu.",
      },
      {
        question: "Can I walk around Patan beyond the Durbar Square?",
        answer: "Absolutely — the streets surrounding the square are full of active bronze workshops, traditional Newari houses, hidden courtyards and small temples. The area called Manga Hiti (just east of the square) has an ancient sunken stone waterspout used for centuries. A 2-hour walk through the old city is rewarding.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6728,
    longitude: 85.3249,
    touristType: ["cultural", "family", "art-and-craft"],
  },

  {
    slug: "bhaktapur-durbar-square",
    name: "Bhaktapur Durbar Square",
    nameLocal: "भक्तपुर दरबार",
    listingType: "HISTORIC_SITE" as ListingType,
    areaSlug: "bhaktapur",
    tagline: "Nepal's best-preserved medieval city — a living open-air museum",
    descriptionShort:
      "Bhaktapur's walled medieval city is the finest preserved example of Newari culture in Nepal, with the 55-Window Palace, Nyatapola Temple and pottery square — all 30 km from Kathmandu.",
    description: `Bhaktapur is the most complete medieval city in Nepal. While Kathmandu and Patan have been substantially modernised around their historic cores, Bhaktapur retains the character of a living Newari city — the lanes are narrow, the brick is old, the people dress traditionally for festivals, and the pottery square is still actively producing goods for local use.

The Durbar Square itself is anchored by the 55-Window Palace — a Malla royal palace whose long facade of intricately carved windows is a masterpiece of Newari woodcarving. Across the square stands the Vatsala Temple (for years confused in travel literature but now correctly identified) and the Lion's Gate with its massive guardian figures.

A short walk leads to Taumadhi Square, dominated by the magnificent five-storey Nyatapola Temple — the tallest temple in Nepal at 30 metres, built in 1702 and never damaged by an earthquake. The climb up its steep steps between the tiers of stone guardians (wrestlers, elephants, lions, griffins and goddesses of increasing power) is one of the most cinematic approaches to any building in Nepal.`,
    history: `Bhaktapur (Bhadgaon) was the capital of the Kathmandu Valley under the Malla kings from the 12th to 15th centuries, before the valley split into three rival kingdoms. Its artistic golden age coincided with the reign of Bhupatindra Malla (1696–1722), who is credited with building the 55-Window Palace, Nyatapola Temple and several other major structures. The city suffered significant 2015 earthquake damage, particularly to the Vatsala Temple, but restoration is largely complete.`,
    highlights: [
      "55-Window Palace — masterpiece of Newari woodcarving",
      "Nyatapola Temple — Nepal's tallest pagoda at 30 metres",
      "UNESCO World Heritage Site since 1979",
      "Active pottery square — traditional wheel-throwing still practised",
      "Best-preserved medieval streetscapes in Nepal",
      "Famous for Juju Dhau (king yoghurt) and bara (lentil pancakes)",
      "Significantly less crowded than Kathmandu or Patan",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Newari pagoda",
    isFree: false,
    admissionLocal: "Free for Nepali citizens",
    admissionForeigner: "NPR 1,800 (day pass — best value of all valley squares)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Full day visit — too much to see in half a day. Start early to avoid afternoon heat.",
      howToGetThere: "45-min bus from Old Bus Park (NPR 30); taxi NPR 1,200–1,500 from Thamel",
      whatToWear: "Comfortable walking shoes; the streets are uneven brick",
      timeNeeded: "Full day (6+ hours)",
      photography: "Nyatapola Temple is best photographed from the upper tier of Taumadhi Square's cafes; pottery square has excellent morning light",
    },
    insiderTip: "Buy a bowl of Juju Dhau (the famous Bhaktapur king yoghurt, served in unglazed clay bowls) from the vendors near the pottery square. The clay bowl both chills the yoghurt and imparts a subtle earthy flavour — you cannot find this outside Bhaktapur, and it is extraordinary.",
    eventCalendar: [
      { name: "Bisket Jatra", month: 4, description: "Bhaktapur's New Year festival: a massive chariot tug-of-war through narrow streets that must be witnessed to be believed." },
      { name: "Gai Jatra", month: 8, description: "Festival of cows and recently deceased: processions of men in cow costumes through the medieval streets." },
    ],
    nearbyAttractions: ["Changu Narayan Temple", "Nagarkot Sunrise Viewpoint", "Pottery Square"],
    ourScore: 9.4,
    featured: true,
    tagSlugs: ["unesco-heritage","historical","cultural","art-and-craft","photography"],
    faqs: [
      {
        question: "How much does it cost to visit Bhaktapur?",
        answer: "NPR 1,800 for foreign nationals — a day pass covering the entire old city. This is higher than Kathmandu or Patan squares but covers the whole medieval city, not just one square. It represents very good value for a full-day visit.",
      },
      {
        question: "Is Bhaktapur worth the trip from Kathmandu?",
        answer: "It is one of the unmissable experiences in Nepal. Most travellers who visit rate it as the highlight of their Kathmandu Valley itinerary — the preserved medieval atmosphere, the Nyatapola Temple, the pottery square and the food (Juju Dhau, bara) combine into a day that simply cannot be replicated elsewhere.",
      },
      {
        question: "How do I get from Kathmandu to Bhaktapur?",
        answer: "Local bus from Old Bus Park (NPR 30, 45–60 minutes — an experience in itself). Taxi from Thamel (NPR 1,200–1,500, 45 minutes). Microbus from Ratna Park (NPR 25–30). The road journey through Bhaktapur's outskirts is somewhat grim; the destination makes it worth it.",
      },
      {
        question: "Can I stay overnight in Bhaktapur?",
        answer: "Yes — several guesthouses in the old city (around Taumadhi and Dattatraya squares) let you experience the streets in the evening after day-trippers leave. This is highly recommended; the squares at dusk and dawn, with local life continuing around the temples, are extraordinarily atmospheric.",
      },
      {
        question: "What is the best food to try in Bhaktapur?",
        answer: "Juju Dhau (king yoghurt, served in clay bowls near the pottery square), bara (thick lentil pancakes filled with egg and minced meat), and chatamari (rice crepe). All are Newari specialities made best in Bhaktapur.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1580889240888-6b5b8b4cb3cf?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6722,
    longitude: 85.4289,
    touristType: ["cultural", "family", "photography"],
  },

  {
    slug: "changu-narayan-temple",
    name: "Changu Narayan Temple",
    nameLocal: "चाँगु नारायण",
    listingType: "TEMPLE" as ListingType,
    areaSlug: "bhaktapur",
    tagline: "Nepal's oldest temple and finest example of Licchavi art",
    descriptionShort:
      "A UNESCO World Heritage Site atop a forested ridge east of Bhaktapur, Changu Narayan is Nepal's oldest surviving temple with extraordinary 5th–8th century stone carvings that predate any other art in the valley.",
    description: `Changu Narayan sits at the end of a wooded ridge east of Bhaktapur, reached by a 30-minute uphill walk through traditional villages and paddy terraces. The effort is well rewarded: the temple complex at the summit contains the oldest and finest stone carvings in Nepal, produced during the Licchavi dynasty between the 4th and 9th centuries CE.

The main temple, dedicated to Vishnu, is a gilded double-roofed pagoda of extraordinary richness. Its courtyard is filled with stone sculptures of remarkable quality: the 5th-century standing Vishnu with his garuda vehicle, the Vaikuntha Vishnu with his multiple heads, and a rare 6th-century inscription commissioned by King Manadeva I — the oldest dated inscription found in Nepal and a primary source for early Nepali history.

What distinguishes Changu Narayan from the valley's other heritage sites is the near-total absence of mass tourism. Where Boudhanath and Pashupatinath see thousands of visitors daily, Changu Narayan receives perhaps a hundred. The access involves a genuine walk (or a taxi to the ridge end); the courtyard has a contemplative, working-temple atmosphere unchanged in centuries.`,
    history: `The site's history begins at least with the 4th-century Licchavi period. The inscription of King Manadeva I (464 CE) records the king's victories and is the oldest written document in the Kathmandu Valley. The temple was substantially rebuilt in the 17th century after fire damage, but the surrounding stone sculptures survived from the Licchavi and early Malla periods.`,
    highlights: [
      "Nepal's oldest surviving temple (4th century CE origins)",
      "Oldest dated stone inscription in Nepal (464 CE, King Manadeva I)",
      "UNESCO World Heritage Site — Kathmandu Valley (1979)",
      "5th–8th century Licchavi stone sculptures — the finest in Nepal",
      "Almost no tourist crowds despite World Heritage status",
      "Excellent views over the eastern Kathmandu Valley",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Newari double-roofed pagoda",
    deityOrSubject: "Lord Vishnu",
    isFree: false,
    admissionLocal: "Free",
    admissionForeigner: "NPR 300",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "06:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning (8–11am) for good light and active temple atmosphere",
      howToGetThere: "45-min bus to Bhaktapur then taxi to Changu village (NPR 300–400); or direct taxi from Thamel (NPR 1,500–1,800)",
      whatToWear: "Comfortable shoes for the 30-minute uphill walk",
      timeNeeded: "2–3 hours including the walk and temple exploration",
      photography: "The courtyard sculptures are best photographed in the morning; the ridge views are best at any time of day",
    },
    insiderTip: "The small Changu Narayan Museum in a traditional house adjacent to the temple has a modest but well-curated collection of temple artefacts and historical photographs. It is almost always empty and the resident caretaker is genuinely knowledgeable about the Licchavi period sculpture.",
    eventCalendar: [
      { name: "Changu Narayan Jatra", month: 4, description: "Annual chariot festival of the main deity." },
    ],
    nearbyAttractions: ["Bhaktapur Durbar Square", "Nagarkot Viewpoint"],
    ourScore: 8.8,
    featured: false,
    tagSlugs: ["spiritual","historical","unesco-heritage","off-the-beaten-path","cultural"],
    faqs: [
      {
        question: "Is Changu Narayan Temple worth visiting?",
        answer: "For anyone interested in ancient art and history, it is essential. The 5th–8th century Licchavi sculptures are the oldest and finest stone carvings in Nepal, predating anything at Pashupatinath or the Durbar Squares. The near-absence of crowds makes the experience unusually contemplative.",
      },
      {
        question: "How do I get to Changu Narayan?",
        answer: "Take a bus or taxi to Bhaktapur, then a local taxi to the base of the Changu ridge (NPR 300–400). Walk 30 minutes uphill through terraced fields and Newari villages. Alternatively, a direct taxi from Thamel costs NPR 1,500–1,800 return.",
      },
      {
        question: "How far is Changu Narayan from Kathmandu?",
        answer: "About 22 km east of Kathmandu, near Bhaktapur. It is naturally combined with a Bhaktapur visit into a full-day eastern valley itinerary.",
      },
      {
        question: "What are the famous sculptures at Changu Narayan?",
        answer: "The 5th-century standing Vishnu (Trivikrama Vishnu) is the most celebrated, showing the god in his three-stride cosmic form. The Vaikuntha Vishnu with four heads and the Narasimha (man-lion) Vishnu are equally remarkable. The King Manadeva inscription near the temple entrance is the oldest written document in Nepal.",
      },
      {
        question: "Can I combine Changu Narayan with Bhaktapur in one day?",
        answer: "Yes — this is the standard approach. Changu Narayan in the morning (90 minutes), then descend to Bhaktapur for the afternoon. Start early (7–8am from Kathmandu) to have comfortable time at both sites.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7149,
    longitude: 85.4442,
    touristType: ["cultural", "historical", "photography"],
  },

  // ─── Temples & Spiritual Sites ────────────────────────────────────────────

  {
    slug: "budhanilkantha-temple",
    name: "Budhanilkantha Temple",
    nameLocal: "बुद्धनीलकण्ठ",
    listingType: "TEMPLE" as ListingType,
    areaSlug: "thamel",
    tagline: "The sleeping Vishnu — Nepal's most extraordinary outdoor sculpture",
    descriptionShort:
      "Budhanilkantha houses a 1,500-year-old Licchavi stone sculpture of Vishnu reclining on the cosmic ocean — one of the finest outdoor sculptures in Asia and a major Hindu pilgrimage site.",
    description: `Budhanilkantha's central object of veneration is among the most remarkable works of art in all of Asia: a 5-metre reclining Vishnu carved from a single black stone boulder in the 7th century CE, set within an ornamental pond representing the cosmic ocean. The god lies in yogic sleep (yoga nidra), his feet pointing south, attended by stone devotees and serpents, draped in marigold garlands — endlessly.

The temple receives a constant stream of Hindu pilgrims who come to receive the darshan (divine presence) of the sleeping god. The atmosphere around the pond is active and devotional rather than tourist-oriented: priests perform puja at the image's head, pilgrims touch the feet (accessible from the side path), and the smell of incense and marigolds is permanent.

Non-Hindus can observe the image from the surrounding walkway. The site is active from pre-dawn when priests begin their morning rituals.`,
    highlights: [
      "7th-century Licchavi reclining Vishnu — one of Asia's finest sculptures",
      "5-metre figure carved from single black basalt boulder",
      "Active pilgrimage site visited by Hindu devotees daily",
      "One of four Narayana sites that Nepal's kings were forbidden to visit",
      "Beautiful garden setting with the Shivapuri hills as backdrop",
    ],
    significance: "One of the four sacred Narayana sites of the Kathmandu Valley",
    architecturalStyle: "Licchavi period",
    deityOrSubject: "Lord Vishnu (Narayan) in yogic sleep",
    isFree: false,
    admissionLocal: "Free",
    admissionForeigner: "NPR 250",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "04:00",
        closes: "20:00",
      },
    ],
    bestMonths: [10, 11, 3, 4, 5],
    visitorTips: {
      bestTime: "Early morning (6–8am) during morning puja",
      howToGetThere: "30-min taxi from Thamel (NPR 500–700)",
      whatToWear: "Remove shoes at the temple gate; dress modestly",
      timeNeeded: "45 minutes to 1 hour",
      photography: "The full figure is best photographed from the raised walkway on the north side of the pond",
    },
    insiderTip: "This site is easily combined with a morning visit to Shivapuri Nagarjun National Park (the trail entrance is a short taxi ride away). Budhanilkantha first (7am), then enter Shivapuri for a 2–3 hour hike, back to Thamel for lunch — an excellent half day.",
    eventCalendar: [
      { name: "Haribodhini Ekadashi", month: 11, description: "The day Vishnu wakes from his cosmic sleep — the most important pilgrimage day of the year, drawing enormous crowds." },
    ],
    nearbyAttractions: ["Shivapuri Nagarjun National Park"],
    ourScore: 8.5,
    featured: false,
    tagSlugs: ["spiritual","historical","cultural","off-the-beaten-path","photography"],
    faqs: [
      {
        question: "Can foreigners visit Budhanilkantha Temple?",
        answer: "Non-Hindus can observe the main Vishnu image from the surrounding walkway but cannot enter the inner ritual area immediately around the pond. The sculpture is clearly visible and the entry fee (NPR 250) is good value for the quality of the art.",
      },
      {
        question: "How far is Budhanilkantha from Thamel?",
        answer: "About 9 km north of Thamel, at the foot of the Shivapuri hills — approximately 30 minutes by taxi (NPR 500–700).",
      },
      {
        question: "Why can Nepal's kings not visit Budhanilkantha?",
        answer: "According to Hindu tradition, the King of Nepal is considered an incarnation of Vishnu. For a manifestation of Vishnu to look upon another Vishnu image is believed to bring the king's death. This prohibition applied to all Shah dynasty kings and was taken seriously — it is one of the stranger royal prohibitions in Himalayan history.",
      },
      {
        question: "Is Budhanilkantha worth visiting?",
        answer: "Yes, particularly for those with an interest in ancient art. The 7th-century sculpture is genuinely extraordinary — the scale, craftsmanship and setting beside the decorative pond create an experience very different from the valley's more visited sites.",
      },
      {
        question: "What is the best time to visit Budhanilkantha?",
        answer: "Early morning (6–8am) when priests perform morning puja with incense and flowers. The pilgrimage atmosphere before the day-trippers arrive is the most authentic experience.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7742,
    longitude: 85.3620,
    touristType: ["pilgrim", "cultural", "photography"],
  },

  {
    slug: "kopan-monastery",
    name: "Kopan Monastery",
    nameLocal: "कोपन गुम्बा",
    listingType: "MONASTERY" as ListingType,
    areaSlug: "boudhanath",
    tagline: "Learn Tibetan Buddhist meditation above Kathmandu Valley",
    descriptionShort:
      "Kopan Monastery on the hill above Boudhanath has welcomed Western students of Tibetan Buddhism since the 1970s, offering world-renowned meditation courses alongside daily monastery life with exceptional valley views.",
    description: `Kopan Monastery sits on a hill north of Boudhanath, its white walls and ochre rooflines visible from the stupa plaza below. Founded by Lamas Yeshe and Zopa Rinpoche in 1969, it has become one of the most internationally attended centres for Tibetan Buddhism in the world, drawing students from every continent to its November meditation course and year-round study programmes.

The monastery is a working community of around 360 monks and nuns, many of them young Tibetan boys from across the Himalayan region. Visitors can observe morning and evening prayers in the main shrine hall (which contains a spectacular golden Buddha), walk the gardens, visit the bookshop and cafe, and on most days speak with resident teachers.

The monthly meditation courses, particularly the November course, have introduced thousands of Westerners to Tibetan Buddhist practice over five decades. Alumni include meditators who subsequently ordained as monks, former students who established dharma centres across Europe and North America, and ordinary travellers whose Kopan visit changed the direction of their lives.`,
    highlights: [
      "World-renowned Tibetan Buddhist study and meditation centre",
      "Founded 1969 by Lamas Yeshe and Zopa Rinpoche",
      "360 resident monks and nuns",
      "Panoramic views over Boudhanath Stupa and Kathmandu Valley",
      "Monthly and annual meditation courses open to all",
      "Vegetarian restaurant and bookshop open to day visitors",
    ],
    significance: "One of the most important Tibetan Buddhist centres outside Tibet",
    deityOrSubject: "Tibetan Buddhism (Gelugpa school)",
    isFree: true,
    admissionForeigner: "Free (donations welcome)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning (7–10am) to observe morning puja; or afternoon for the cafe and views",
      howToGetThere: "20-min taxi from Thamel (NPR 400–500); 10 min from Boudhanath",
      whatToWear: "Dress modestly; remove shoes before entering shrine halls",
      timeNeeded: "2–3 hours as a day visit; several days or weeks for courses",
      photography: "The view of Boudhanath Stupa from the Kopan hilltop is one of the best in the valley",
    },
    insiderTip: "The Kopan bookshop has one of the best selections of Tibetan Buddhist texts in Kathmandu — including some rare out-of-print Lama Yeshe and Zopa teachings not available elsewhere. Even if you have no interest in Buddhism, the vegetarian cafe serves excellent momos and butter tea with that extraordinary valley view.",
    eventCalendar: [
      { name: "Annual November Course", month: 11, description: "The most attended Tibetan Buddhist meditation course in the world — 10-day residential programme. Applications required months in advance." },
      { name: "Losar Celebrations", month: 2, description: "Tibetan New Year ceremonies with elaborate rituals, offerings and community gathering." },
    ],
    nearbyAttractions: ["Boudhanath Stupa", "Pashupatinath Temple"],
    ourScore: 8.9,
    featured: false,
    tagSlugs: ["spiritual","meditation-yoga","cultural","quiet-and-peaceful","off-the-beaten-path"],
    faqs: [
      {
        question: "Can I visit Kopan Monastery as a day visitor?",
        answer: "Yes — day visitors are welcome during opening hours. You can explore the grounds, visit the main shrine hall (shoes off), eat at the vegetarian cafe, browse the bookshop and observe monastery life. Morning puja sessions are open to respectful observers.",
      },
      {
        question: "How do I join a Kopan Monastery meditation course?",
        answer: "Register through the official Kopan website (kopanmonastery.com). The November course (10 days) is the most famous and popular — it typically fills several months in advance. Shorter courses run throughout the year. Residential accommodation is available on-site.",
      },
      {
        question: "How far is Kopan Monastery from Boudhanath?",
        answer: "About 2 km north, on the hill overlooking the stupa — a 10-minute taxi or a 25-minute uphill walk from the Boudhanath plaza. The view of the stupa from Kopan is excellent.",
      },
      {
        question: "Is Kopan Monastery Buddhist or Hindu?",
        answer: "Tibetan Buddhist — specifically of the Gelugpa school (the same tradition as the Dalai Lama). It welcomes visitors and students of all faiths and none.",
      },
      {
        question: "What should I wear to visit Kopan Monastery?",
        answer: "Modest clothing — shoulders and knees covered. Remove shoes before entering any shrine hall. There is no dress code for the cafe and gardens.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1609946860441-a51ffcf22208?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7388,
    longitude: 85.3711,
    touristType: ["pilgrim", "solo-traveller", "meditation-yoga"],
  },

  {
    slug: "kumari-ghar",
    name: "Kumari Ghar (Living Goddess)",
    nameLocal: "कुमारी घर",
    listingType: "CULTURAL_SITE" as ListingType,
    areaSlug: "durbar-square",
    tagline: "Home of Kathmandu's living goddess — a girl worshipped as a deity",
    descriptionShort:
      "The Kumari Ghar in Kathmandu Durbar Square is the palace of the Royal Kumari — a pre-pubescent girl selected through elaborate rituals to embody the goddess Taleju and worshipped as a living deity.",
    description: `The Kumari Ghar — Palace of the Living Goddess — stands at the southern edge of Kathmandu Durbar Square, its three-storey facade of intricately carved windows concealing the daily life of one of Nepal's most unusual religious figures: the Kumari, a young girl (typically aged 4–11) who is selected through elaborate religious rituals to embody the goddess Taleju and is worshipped as a living deity.

The selection process involves identifying a girl from the Newar Shakya goldsmith caste who meets 32 specific physical attributes, confirms fearlessness in a darkened room during a buffalo sacrifice ceremony, and passes a series of other tests. Once selected, she lives in the Kumari Ghar, rarely venturing outside (carried when she does, to prevent her divine feet touching impure ground), attended by caretakers, and consulted by politicians and businesspeople seeking divine blessing.

Visitors gather in the courtyard below her window and occasionally she appears — a child in heavy make-up, her hair piled high, the third-eye mark on her forehead, gazing down with the disconcertingly adult gaze that all Kumaris seem to develop. She becomes an ordinary person again when puberty begins.

The Kumari Ghar itself (built 1757) is worth examining carefully: the carved wooden window screens are among the finest in Kathmandu, and the ground-floor courtyard has beautifully detailed stone strut carvings.`,
    highlights: [
      "Home of the Royal Kumari — Nepal's living Hindu goddess",
      "Extraordinary 18th-century carved wood architecture",
      "Kumari may appear at window — one of Kathmandu's most extraordinary encounters",
      "The selection and role of the Kumari is unique in world religion",
      "Intricate stone and wood carving on the courtyard struts",
    ],
    significance: "Seat of the Royal Kumari since 1757",
    architecturalStyle: "Newari courtyard palace (1757)",
    deityOrSubject: "Kumari (Taleju goddess incarnate)",
    isFree: false,
    admissionLocal: "NPR 150 (included in Durbar Square ticket)",
    admissionForeigner: "NPR 1,000 (included in Durbar Square ticket)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    bestMonths: [10, 11, 3, 4, 9],
    visitorTips: {
      bestTime: "Mornings (10–11am) when the Kumari is most likely to appear",
      howToGetThere: "Included in Kathmandu Durbar Square (10-min walk from Thamel)",
      whatToWear: "Dress modestly; no photography of the Kumari when she appears",
      timeNeeded: "30–60 minutes (waiting included)",
      photography: "Do not photograph the Kumari directly when she appears — it is considered disrespectful and she may withdraw",
    },
    insiderTip: "The Kumari also appears publicly during major festivals — most spectacularly during Indra Jatra (September) when she is carried in a chariot through the city. If your visit coincides with Indra Jatra, this procession (and the chariot festival more broadly) is one of the great spectacles of South Asian religious life.",
    eventCalendar: [
      { name: "Indra Jatra", month: 9, description: "The Kumari rides in a chariot through Kathmandu — the most important public appearance of the year." },
    ],
    nearbyAttractions: ["Kathmandu Durbar Square", "Freak Street", "Asan Tole Bazaar"],
    ourScore: 8.7,
    featured: false,
    tagSlugs: ["cultural","spiritual","historical","photography","instagrammable"],
    faqs: [
      {
        question: "Can I see the Kumari (living goddess) in Kathmandu?",
        answer: "She appears at her window irregularly — usually in response to people gathering in the courtyard. Morning visits (10–11am on weekdays) are most likely to coincide with an appearance. Wait quietly in the courtyard; she typically appears for a minute or two. Do not photograph her when she does.",
      },
      {
        question: "How is the Kumari selected?",
        answer: "From girls of the Newar Shakya caste aged approximately 4, meeting 32 physical attributes (specific eye shape, teeth, voice quality etc.). Candidates undergo tests including spending a night in a dark room with the heads of sacrificed buffalo — a test of fearlessness. The selected Kumari is then installed through elaborate rituals.",
      },
      {
        question: "What happens to the Kumari when she grows up?",
        answer: "She returns to normal life when she reaches puberty (or if she bleeds from any wound, which is considered a departure of the goddess). Former Kumaris receive a government pension. There is a common folk belief that Nepali men avoid marrying former Kumaris (said to bring bad luck), though former Kumaris dispute this and several have married happily.",
      },
      {
        question: "Is visiting the Kumari Ghar included in the Durbar Square ticket?",
        answer: "Yes — the Kumari Ghar is within Kathmandu Durbar Square and covered by the NPR 1,000 entrance ticket.",
      },
      {
        question: "Is taking photos of the Kumari allowed?",
        answer: "Do not photograph the Kumari when she appears at the window. Photography of the building exterior and courtyard is generally permitted.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7040,
    longitude: 85.3072,
    touristType: ["cultural", "family", "photography"],
  },

  // ─── Museums & Gardens ────────────────────────────────────────────────────

  {
    slug: "garden-of-dreams",
    name: "Garden of Dreams",
    nameLocal: "सपनाको बगैंचा",
    listingType: "PARK" as ListingType,
    areaSlug: "thamel",
    tagline: "A neo-classical garden oasis beside the chaos of Thamel",
    descriptionShort:
      "Restored to its 1920s Edwardian glory, the Garden of Dreams is a walled neo-classical garden in the heart of Kathmandu — the most peaceful spot within 10 minutes of Thamel.",
    description: `The Garden of Dreams is an act of improbable urban survival. Built between 1920 and 1924 by Field Marshal Kaiser Shumsher Rana as his personal pleasure garden, it fell into decades of neglect after the fall of the Rana oligarchy in 1951, its pavilions crumbling and its planting beds turned to weeds. A Nepal-Austria restoration project completed in 2007 brought it back with extraordinary fidelity — the three original pavilions, the amphitheatre, the pergolas and the ornamental pools are all intact, and the planting follows the original Edwardian scheme.

The result is a remarkable 6,895-square-metre oasis of calm enclosed within high walls a 5-minute walk from Thamel's most frenetic junction. The contrast is vertiginous: you step through the gate and the motorbike noise, the shop touts and the diesel fumes dissolve. The garden is birdsong, the rustle of jacaranda, and the sound of water.

The Kaiser Cafe, operated within the garden by the Kaiser Hotel, serves excellent coffee, cakes and light meals in either the pavilion interior or on the garden terrace. It has become one of Kathmandu's best places for a slow afternoon.`,
    highlights: [
      "Restored 1920s Rana-era neo-classical garden",
      "The most peaceful green space near Thamel",
      "Three original Edwardian pavilions fully restored",
      "Kaiser Cafe — excellent coffee and light meals",
      "Ornamental pools, pergolas and amphitheatre",
      "5-minute walk from Thamel Chowk",
    ],
    significance: "Best-preserved Rana-era private garden in Nepal",
    architecturalStyle: "Edwardian / neo-classical with Himalayan detailing",
    isFree: false,
    admissionLocal: "NPR 200",
    admissionForeigner: "NPR 400",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    bestMonths: [3, 4, 10, 11],
    visitorTips: {
      bestTime: "Late afternoon (3–5pm) when the light is warm and crowds thinner",
      howToGetThere: "5-min walk from Thamel Chowk, next to Kaiser Library",
      whatToWear: "Casual",
      timeNeeded: "1–2 hours",
      photography: "The pavilions are most photogenic in the late afternoon light; the ornamental pool reflections are excellent at any time",
    },
    insiderTip: "The NPR 400 entry fee is redeemable against food and drink at the Kaiser Cafe — in practice a free entry for anyone who plans to have coffee. The cafe's carrot cake is considered among the best in Kathmandu.",
    eventCalendar: [
      { name: "Garden Evening Events", month: 10, description: "Occasional jazz and acoustic music evenings in the amphitheatre during the October-November peak season." },
    ],
    nearbyAttractions: ["Thamel", "Kathmandu Durbar Square"],
    ourScore: 8.6,
    featured: false,
    tagSlugs: ["cultural","quiet-and-peaceful","romantic","historical","kid-friendly"],
    faqs: [
      {
        question: "Is the Garden of Dreams worth visiting?",
        answer: "Yes — particularly if you are based in Thamel and need a break from the city's intensity. For the cost of a coffee (which offsets the entry fee), you get 1–2 hours in a beautifully restored Edwardian garden. The most peaceful experience available within walking distance of Thamel.",
      },
      {
        question: "What is the Garden of Dreams entry fee?",
        answer: "NPR 400 for foreign nationals. The entry fee is partially redeemable against purchases at the Kaiser Cafe inside.",
      },
      {
        question: "Can I have lunch or coffee at the Garden of Dreams?",
        answer: "Yes — the Kaiser Cafe operates inside the garden with seating in the restored pavilion and on the garden terrace. It serves coffee, cakes, sandwiches and light meals of good quality.",
      },
      {
        question: "How far is the Garden of Dreams from Thamel?",
        answer: "A 5-minute walk from Thamel Chowk — it is immediately adjacent to the Kaiser Library on the road leading towards the Royal Palace.",
      },
      {
        question: "When is the best time to visit the Garden of Dreams?",
        answer: "Late afternoon (3–5pm) for warm light and typically thinner crowds than midday. Spring (March–April) is beautiful when the garden is in full bloom.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7128,
    longitude: 85.3149,
    touristType: ["couple", "solo-traveller", "family"],
  },

  {
    slug: "patan-museum",
    name: "Patan Museum",
    nameLocal: "पाटन संग्रहालय",
    listingType: "MUSEUM" as ListingType,
    areaSlug: "patan",
    tagline: "The finest museum in Nepal — housed in a royal Malla palace",
    descriptionShort:
      "The Patan Museum occupies a restored 17th-century royal palace courtyard in Patan Durbar Square and presents the Kathmandu Valley's Hindu and Buddhist art in the finest museological setting in Nepal.",
    description: `The Patan Museum is the finest museum in Nepal by a clear margin. Established in the restored Keshav Narayan Chowk — one of the three courtyards of the Patan Royal Palace — it presents the art and material culture of the Kathmandu Valley in a setting of extraordinary architectural beauty, with interpretive texts that are both scholarly and accessible to the general visitor.

The ground floor galleries trace the development of metal-casting in the valley from the Licchavi period forward, with particular strength in the bronze and brass implements of Hindu and Buddhist ritual. The upper floors present thematic collections of deity iconography — Vishnu, Shiva, the Buddhist Bodhisattvas — with detailed explanations of iconographic meaning that transform apparently similar figures into individually meaningful beings.

The building itself is a work of art. The Nepal government, UNESCO and the Austrian Development Cooperation funded a meticulous restoration in the 1990s that returned the palace courtyard to its Malla-era splendour: the carved wood windows, the gilded finials, the stone reliefs. Looking up from the museum courtyard at the three tiers of the palace is one of the architectural experiences of South Asia.

The museum is small enough to explore completely in 90–120 minutes, making it ideal as a prelude to exploring Patan Durbar Square itself.`,
    highlights: [
      "The finest museum in Nepal",
      "Housed in a beautifully restored 17th-century Malla palace courtyard",
      "Outstanding collection of Hindu and Buddhist bronzes",
      "Excellent interpretive text making iconography accessible",
      "Located within Patan Durbar Square (shared ticket)",
    ],
    significance: "Best museum in Nepal; UNESCO-assisted restoration benchmark",
    architecturalStyle: "Restored Malla palace (17th century)",
    isFree: false,
    admissionLocal: "NPR 100",
    admissionForeigner: "Included in Patan Durbar Square ticket (NPR 1,000)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "10:30",
        closes: "17:30",
      },
      {
        dayOfWeek: ["Saturday","Sunday"],
        opens: "10:30",
        closes: "17:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning opening to avoid afternoon school groups",
      howToGetThere: "Within Patan Durbar Square (15-min taxi from Thamel)",
      whatToWear: "Casual",
      timeNeeded: "90 minutes to 2 hours",
      photography: "Photography is restricted inside the gallery halls; the palace courtyard exterior can be photographed freely",
    },
    insiderTip: "The museum shop has one of the best academic book selections on Nepali and Himalayan art in the country — including the definitive Pal catalogue of Patan bronzes. Worth browsing even if you buy nothing.",
    eventCalendar: [],
    nearbyAttractions: ["Patan Durbar Square", "Godawari Botanical Garden"],
    ourScore: 9.2,
    featured: false,
    tagSlugs: ["cultural","historical","art-and-craft","educational","quiet-and-peaceful"],
    faqs: [
      {
        question: "Is the Patan Museum worth visiting?",
        answer: "It is essential for anyone with any interest in Asian art or the Kathmandu Valley's history. The collection of Hindu and Buddhist bronzes is world-class, the building is extraordinary, and the interpretive text gives context that makes the outdoor temples far more meaningful.",
      },
      {
        question: "What are the opening hours of the Patan Museum?",
        answer: "10:30am to 5:30pm Sunday to Friday; 10:30am to 5:00pm Saturday. Closed on government holidays.",
      },
      {
        question: "Is the Patan Museum included in the Patan Durbar Square ticket?",
        answer: "Yes — the Patan Durbar Square ticket (NPR 1,000 for foreigners) covers the Patan Museum.",
      },
      {
        question: "How long does it take to see the Patan Museum?",
        answer: "90 minutes is enough to see all galleries at a comfortable pace. Allow 2 hours if you want to read the interpretive texts thoroughly.",
      },
      {
        question: "What is the Patan Museum famous for?",
        answer: "Its bronze and brass metalwork collection (the finest in Nepal) and its restoration — the building itself (Keshav Narayan Chowk, a 17th-century Malla palace courtyard) is considered one of the most successful museum building restorations in South Asia.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6728,
    longitude: 85.3246,
    touristType: ["cultural", "solo-traveller", "art-and-craft"],
  },

  // ─── Markets, Streets & Viewpoints ────────────────────────────────────────

  {
    slug: "asan-tole",
    name: "Asan Tole Bazaar",
    nameLocal: "असन टोल",
    listingType: "MARKET" as ListingType,
    areaSlug: "durbar-square",
    tagline: "The oldest and most atmospheric bazaar in Kathmandu",
    descriptionShort:
      "Asan Tole is Kathmandu's ancient grain market — a circular intersection where six medieval lanes converge, still functioning as a daily spice and goods market surrounded by shrines and traditional Newari houses.",
    description: `Asan Tole is the commercial heart of old Kathmandu — an intersection where six medieval trade routes converge in a small circular plaza surrounded by traditional Newari merchant houses, street shrines, and stalls that have been selling spices, grains, vegetables and household goods for centuries.

Unlike the tourist-facing markets of Thamel, Asan functions primarily as a real market for Kathmandu's residents. The morning hours bring vendors heaping sacks of dried chilli, turmeric, ginger and Szechuan pepper alongside piles of rice, lentils and dried fish. The surrounding permanent shops sell everything from traditional Newari metalware to cheap Chinese goods.

Several important temples are embedded directly into the market: the Annapurna Temple (whose goddess protects grain and is propitiated by vendors daily), the Ichangu Narayan shrine, and various small platforms occupied by stone deities receiving daily offerings of flowers, sindur powder and mustard oil.

The best time to visit is early morning (6–9am) when the wholesale vegetable and grain trade is at its peak — porters arrive with huge baskets carried on tumplines, vendors arrange their wares, priests perform morning puja, and the combined sensory intensity of the old bazaar is at its highest.`,
    highlights: [
      "Oldest functioning market in Kathmandu",
      "Junction of six ancient trade routes",
      "Active spice and grain wholesale market",
      "Annapurna Temple embedded in the market fabric",
      "Traditional Newari merchant architecture",
      "Extraordinary sensory experience at early morning peak",
    ],
    isFree: true,
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "05:00",
        closes: "20:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Early morning 6–9am for peak market activity and best photography",
      howToGetThere: "15-min walk from Thamel; or part of Durbar Square walking route",
      whatToWear: "Casual; be aware of narrow lanes and motorbikes",
      timeNeeded: "30–45 minutes",
      photography: "The narrow lanes radiating from the central junction create excellent depth-of-field street photography opportunities",
    },
    insiderTip: "Turn left out of Asan into the narrow lane heading east toward Indra Chowk — this 200-metre stretch of old merchant houses, bead sellers and fabric shops is among the best-preserved Newari commercial streetscape in the city and sees far fewer tourists than the main Asan plaza.",
    eventCalendar: [
      { name: "Annapurna Puja", month: 10, description: "Annual festival at the Annapurna Temple — the market association performs elaborate rituals." },
    ],
    nearbyAttractions: ["Kathmandu Durbar Square", "Indra Chowk", "Freak Street"],
    ourScore: 8.4,
    featured: false,
    tagSlugs: ["cultural","historical","food-and-drink","photography","local-favourite"],
    faqs: [
      {
        question: "What is Asan Tole famous for?",
        answer: "It is the oldest and most atmospheric market in Kathmandu — an ancient grain and spice market at the intersection of six medieval trade routes, still functioning as a real daily market for local residents. The Annapurna Temple at its centre and the traditional Newari merchant architecture make it one of the most photogenic spots in the old city.",
      },
      {
        question: "Is Asan Tole free to visit?",
        answer: "Yes, completely free.",
      },
      {
        question: "What can I buy at Asan Tole?",
        answer: "Spices (Szechuan pepper, chilli, turmeric), grains, dried goods, incense, traditional metalware, religious items and beads. It is a working market for locals rather than a tourist market.",
      },
      {
        question: "How do I get to Asan Tole from Thamel?",
        answer: "A 15-minute walk south through the increasingly traditional lanes — this walk is itself part of the experience. From Durbar Square it is 5–10 minutes walk north-east.",
      },
      {
        question: "What is the best time to visit Asan Tole?",
        answer: "Early morning (6–9am) when the wholesale trade is active and the market is at its most atmospheric. By mid-morning the character shifts somewhat as tourist foot traffic increases.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1601576084861-5de423553c0f?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7073,
    longitude: 85.3099,
    touristType: ["cultural", "photography", "solo-traveller"],
  },

  {
    slug: "nagarkot-viewpoint",
    name: "Nagarkot Sunrise Viewpoint",
    nameLocal: "नागरकोट",
    listingType: "VIEWPOINT" as ListingType,
    areaSlug: "bhaktapur",
    tagline: "Nepal's most accessible panoramic Himalayan viewpoint",
    descriptionShort:
      "Nagarkot at 2,175 metres offers one of the most celebrated mountain panoramas in Nepal — a 360-degree arc from Dhaulagiri to Kanchenjunga including Everest, best seen at sunrise from the viewing towers.",
    description: `Nagarkot sits at 2,175 metres on a ridgeline east of Bhaktapur, offering what is arguably the most accessible significant Himalayan viewpoint in Nepal. On a clear morning, the panorama extends from Dhaulagiri (8,167m) in the west to Kanchenjunga (8,586m) in the east — a 360-kilometre arc of Himalayan summits that includes Everest (8,849m), Lhotse, Makalu, the Annapurna range, Manaslu, Langtang and dozens of lesser peaks.

The viewpoint is best experienced as an overnight — arriving in the afternoon, watching sunset over the valley and Himalayan silhouettes, staying in one of the many simple guesthouses on the ridge, then rising at 5am for the sunrise spectacle when the first rays turn the snowfields gold and the peaks emerge sequentially from pre-dawn shadow.

The journey from Kathmandu (32 km, approximately 1.5 hours by taxi) combined with an overnight stay makes Nagarkot a natural two-day extension to a Kathmandu city itinerary — particularly effective between October and March when clear mornings are reliable.`,
    highlights: [
      "Views from Dhaulagiri to Kanchenjunga including Everest",
      "Sunrise over the Himalayas at 2,175m elevation",
      "Most accessible significant viewpoint in Nepal (32 km from Kathmandu)",
      "Hiking trails through terraced fields and forests",
      "Natural base for combining with Bhaktapur (45 min away)",
    ],
    isFree: true,
    admissionForeigner: "Free (some viewpoint towers charge NPR 50–100)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "04:00",
        closes: "20:00",
      },
    ],
    bestMonths: [10, 11, 12, 1, 2, 3],
    visitorTips: {
      bestTime: "Sunrise (5:30–7:00am, October–March) for clear mountain views",
      howToGetThere: "Taxi from Thamel NPR 2,500–3,500 return (1.5 hours each way); local bus from Bhaktapur",
      whatToWear: "Warm layers — mornings can be well below 10°C even in October",
      timeNeeded: "Overnight recommended; day trip possible but misses the sunrise",
      photography: "The best panoramic shot requires a wide-angle lens; the pre-dawn light on the peaks is extraordinary",
    },
    insiderTip: "Rather than returning by the same taxi road, hire a guide and walk the 2–3 hour trail from Nagarkot down to Changu Narayan Temple — through rhododendron forest, terraced fields and traditional villages. This is one of the best short walks near Kathmandu and ends at an outstanding heritage site.",
    eventCalendar: [],
    nearbyAttractions: ["Bhaktapur Durbar Square", "Changu Narayan Temple"],
    ourScore: 9.0,
    featured: false,
    tagSlugs: ["photography","trekking","instagrammable","autumn","winter"],
    faqs: [
      {
        question: "Can you see Everest from Nagarkot?",
        answer: "Yes, on clear days between October and March, Everest is visible to the east in a group of high peaks. It is not dramatically prominent from this angle but identifiable with a guide or binoculars. The broader panorama — from Dhaulagiri to Kanchenjunga — is the main attraction rather than Everest specifically.",
      },
      {
        question: "Should I stay overnight at Nagarkot?",
        answer: "Yes, strongly recommended. The sunrise (requiring a 5am start) is the main event, and arriving as a day-tripper means either a 3am departure from Kathmandu or missing the best moment. Most guesthouses on the ridge are simple but comfortable and charge USD 20–50 for a double room.",
      },
      {
        question: "How do I get to Nagarkot from Kathmandu?",
        answer: "Taxi: NPR 2,500–3,500 one-way, 1.5 hours. Local bus: from Bhaktapur old bus park, NPR 60–80, 45 minutes. Most hotels can arrange a shared taxi to Nagarkot for guests at competitive rates.",
      },
      {
        question: "What months are best for clear views at Nagarkot?",
        answer: "October to March for the most consistently clear mornings. October–November (post-monsoon) and February–March are generally the best. The monsoon (June–September) brings heavy cloud and the views are largely obscured. December–January gives clear views but cold nights (occasionally below 0°C).",
      },
      {
        question: "Is there anything to do at Nagarkot besides the viewpoint?",
        answer: "Several day hikes through terraced fields and forest. The Nagarkot to Changu Narayan walk (2–3 hours) is the best. There are also mountain bike tours descending to Bhaktapur. Most guesthouses can arrange guides.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7158,
    longitude: 85.5212,
    touristType: ["photography", "trekking", "couple"],
  },

  // ─── Nature & Trekking Access Points ──────────────────────────────────────

  {
    slug: "shivapuri-nagarjun-park",
    name: "Shivapuri Nagarjun National Park",
    nameLocal: "शिवपुरी नागार्जुन राष्ट्रिय निकुञ्ज",
    listingType: "NATURAL_SITE" as ListingType,
    areaSlug: "thamel",
    tagline: "Kathmandu's green lung — easy hiking and bird-watching on the city's doorstep",
    descriptionShort:
      "A 159 sq km national park on Kathmandu's northern boundary offering short hikes to Shivapuri Peak (2,732m) with Himalayan views, outstanding birding and fresh air — 30 minutes from Thamel.",
    description: `Shivapuri Nagarjun National Park is Kathmandu's most accessible natural escape — a 159 square kilometre forest preserve on the city's northern rim that rises from 1,350 metres at the valley edge to 2,732 metres at Shivapuri Peak. The hike to the summit and back takes 4–5 hours and requires no technical ability; the reward is a panoramic Himalayan view and a complete change of environment from the city below.

The park is one of Nepal's best birding sites, with over 300 species recorded within its boundaries. The forest is a mix of oak, rhododendron and pine, rising through subtropical to temperate zones, and hosts leopard, Himalayan black bear, wild boar and over 100 species of butterfly alongside the birds. The Bagmati River, Kathmandu's sacred waterway, rises within the park.

Beyond Shivapuri Peak, shorter trails lead to Nagi Gompa (a Tibetan nunnery with valley views), Baghdwar (the Bagmati source spring) and various viewpoints reachable in 1–2 hours. The park is heavily visited by Kathmandu residents on weekends as a recreational forest.`,
    highlights: [
      "159 sq km national park on Kathmandu's northern doorstep",
      "Shivapuri Peak at 2,732m — 4-5 hour hike with Himalayan views",
      "300+ bird species — one of Nepal's best birding sites",
      "Nagi Gompa — active Tibetan nunnery with valley views",
      "Bagmati River source spring at Baghdwar",
      "Leopard and Himalayan black bear habitat",
    ],
    isFree: false,
    admissionLocal: "NPR 50",
    admissionForeigner: "NPR 250 (foreigners), NPR 350 (SAARC nationals)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "06:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 3, 4, 5],
    visitorTips: {
      bestTime: "Early morning year-round; October–April for clearest Himalayan views",
      howToGetThere: "30-min taxi from Thamel to Sundarijal or Budhanilkantha entrance (NPR 500–700)",
      whatToWear: "Hiking boots or good walking shoes; layers for the summit; sunscreen",
      timeNeeded: "Half day (3–4h for a short hike) to full day (Shivapuri summit)",
      photography: "The ridge trail 30 minutes below Shivapuri summit offers an excellent 180-degree Himalayan panorama",
    },
    insiderTip: "The Sundarijal entrance (eastern side) is the less-visited route to Chisapani and the Helambu trekking circuit. If you want to get into the forest with almost no other hikers, enter from Sundarijal on a weekday morning.",
    eventCalendar: [],
    nearbyAttractions: ["Budhanilkantha Temple", "Kopan Monastery"],
    ourScore: 8.7,
    featured: false,
    tagSlugs: ["trekking","wildlife","eco-friendly","photography","adventure"],
    faqs: [
      {
        question: "Is Shivapuri National Park worth visiting?",
        answer: "For a half-day nature break from the city, it is excellent. The Shivapuri summit hike (4–5 hours return) gives mountain views comparable to longer treks, the birding is outstanding, and the forest air is a significant relief from Kathmandu's pollution.",
      },
      {
        question: "How do I get to Shivapuri National Park?",
        answer: "Taxi to the Budhanilkantha or Sundarijal entrance (NPR 500–700 from Thamel, approximately 30 minutes). The park has multiple entrance gates; Budhanilkantha is the most commonly used for the Shivapuri summit trail.",
      },
      {
        question: "How long is the hike to Shivapuri Peak?",
        answer: "4–5 hours return from the Budhanilkantha entrance (about 10 km total). The terrain is forested trail with some steep sections. No technical equipment required. A guide (available at the entrance for NPR 1,000–1,500) is helpful for navigation.",
      },
      {
        question: "What wildlife can I see in Shivapuri National Park?",
        answer: "Birds are the main wildlife attraction — 300+ species including pheasants, laughingthrushes, sunbirds and numerous migratory species. Mammals include leopard (rarely seen), Himalayan black bear (occasionally glimpsed at dusk), wild boar and rhesus monkeys. Butterflies (100+ species) are abundant from March to June.",
      },
      {
        question: "Can I combine Shivapuri with Budhanilkantha Temple?",
        answer: "Yes — and this is a natural combination. Budhanilkantha Temple (7am), then enter Shivapuri for a 3–4 hour hike, back to Thamel for lunch. Both sites are within a 10-minute taxi ride of each other.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.8031,
    longitude: 85.3692,
    difficulty: "MODERATE",
    touristType: ["trekking", "wildlife", "solo-traveller"],
  },

  // ─── Temples & Spiritual (remaining) ─────────────────────────────────────

  {
    slug: "dakshinkali-temple",
    name: "Dakshinkali Temple",
    nameLocal: "दक्षिणकाली मन्दिर",
    listingType: "TEMPLE" as ListingType,
    areaSlug: "kirtipur",
    tagline: "Nepal's most powerful goddess temple — sacred, dramatic and unforgettable",
    descriptionShort:
      "Dakshinkali is Nepal's most revered Kali temple, set in a gorge 22 km south of Kathmandu where animal sacrifice rituals take place on Tuesdays and Saturdays — one of the most intense religious experiences in South Asia.",
    description: `Dakshinkali Temple occupies a dramatic gorge where the Bagmati and Nakhu rivers meet, enclosed by forested hills 22 km south-west of Kathmandu. It is dedicated to Kali — the fearsome goddess of time and death — in her most powerful aspect, and is considered the most potent deity of its kind in Nepal.

The temple sits in a cleft of rock at the river's edge. On Tuesdays and Saturdays, animal sacrifice (primarily chickens and goats, occasionally buffalo) is performed by devotees seeking the goddess's blessings for health, business success and protection from evil. The ritual involves blessing the animal, offering it to the goddess, and the meat being cooked and consumed in a community meal in the riverside picnic area below the temple — a practice that has continued for centuries and is conducted with devotional seriousness rather than spectacle.

For visitors prepared for the visceral reality of active Hindu sacrifice, Dakshinkali is one of the most authentic religious experiences in Nepal — unmediated, unchanged by tourism, and deeply connected to the Newar agricultural tradition it has served for centuries. The forested gorge setting is itself beautiful, and the surrounding hills offer short walks.`,
    history: `The temple's founding is attributed to the 14th-century Malla king Pratap Malla, who is said to have been instructed in a dream to establish a Kali shrine at this confluence. The current temple structure was built in the 20th century but follows traditional Newari architectural forms.`,
    highlights: [
      "Nepal's most powerful Kali goddess temple",
      "Active animal sacrifice on Tuesdays and Saturdays",
      "Beautiful forested river gorge setting",
      "Authentic, tourist-unmediated Hindu pilgrimage atmosphere",
      "Short forest walks in the surrounding Pharping hills",
    ],
    significance: "Most powerful Kali deity site in Nepal",
    deityOrSubject: "Goddess Kali (Dakshinkali)",
    architecturalStyle: "Traditional Newari",
    isFree: true,
    admissionForeigner: "Free (taxi fare to reach the site)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Tuesday", "Saturday"],
        opens: "05:00",
        closes: "12:00",
        description: "Sacrifice days — main ritual activity",
      },
      {
        dayOfWeek: ["Monday","Wednesday","Thursday","Friday","Sunday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Tuesday or Saturday morning (6–9am) for sacrifice ritual; other days for peaceful visits",
      howToGetThere: "45-min taxi from Thamel (NPR 1,500–2,000 return); local bus from Ratna Park",
      whatToWear: "Remove shoes at temple; dress modestly; be prepared for blood if visiting on Tuesday/Saturday",
      timeNeeded: "1.5–2 hours",
      photography: "Do not photograph the sacrifice ritual without consent; the gorge setting is very photogenic",
    },
    insiderTip: "Combine with Pharping village (10 minutes away) — a small Newari and Tibetan Buddhist settlement with several important cave meditation retreats, including the Asura Cave associated with Guru Rinpoche, and Yangleshö monastery. A half-day Dakshinkali + Pharping itinerary is one of the most rewarding off-centre excursions from Kathmandu.",
    eventCalendar: [
      { name: "Dashain Sacrifice", month: 10, description: "During the major Dashain festival, thousands of animals are sacrificed over several days — the largest sacrifice ceremony in Nepal." },
    ],
    nearbyAttractions: ["Champadevi Hill Trek", "Kirtipur"],
    ourScore: 8.3,
    featured: false,
    tagSlugs: ["spiritual","cultural","off-the-beaten-path","pilgrim","photography"],
    faqs: [
      {
        question: "Is Dakshinkali Temple safe for tourists?",
        answer: "Yes, it is safe. The temple and surrounding area are well-maintained. Visitors should be prepared for animal sacrifice if visiting on Tuesday or Saturday — this is not hidden or kept from visitors but openly conducted as part of a centuries-old devotional practice.",
      },
      {
        question: "Should I visit Dakshinkali on a Tuesday or Saturday?",
        answer: "Only if you want to observe the sacrifice ritual. Both days are dramatically more active than other days but involve the sight and smell of animal sacrifice. If you want to visit the temple in a more contemplative atmosphere, any other day is recommended.",
      },
      {
        question: "How far is Dakshinkali from Kathmandu?",
        answer: "22 km south-west of Thamel — approximately 45 minutes by taxi. Return taxi from Thamel costs NPR 1,500–2,000.",
      },
      {
        question: "Is Dakshinkali free to visit?",
        answer: "The temple itself is free. The main cost is transportation (taxi or bus from Kathmandu).",
      },
      {
        question: "Can I combine Dakshinkali with other sites?",
        answer: "Yes — Pharping village (10 min by taxi) has important Buddhist cave meditation sites and is an excellent half-day combination. Kirtipur town (30 min) is a well-preserved medieval Newari hilltop settlement.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6219,
    longitude: 85.2761,
    touristType: ["pilgrim", "cultural", "photography"],
  },

  {
    slug: "namo-buddha",
    name: "Namo Buddha",
    nameLocal: "नमो बुद्ध",
    listingType: "STUPA" as ListingType,
    areaSlug: "bhaktapur",
    tagline: "A hilltop stupa of profound legend, 40 km from Kathmandu",
    descriptionShort:
      "Namo Buddha is one of the three most sacred Buddhist sites in Nepal — a hilltop stupa marking the spot where, in a previous life, the Buddha offered his body to a starving tigress to save her cubs.",
    description: `Namo Buddha sits at 1,750 metres on a forested ridge east of Kathmandu, 40 km from the capital and about 15 km south-east of Dhulikhel. It is one of the three most sacred Buddhist sites in Nepal (alongside Boudhanath and Swayambhunath), and carries the distinction of a specific legend of exceptional power.

According to Buddhist tradition, in one of his previous lives, Prince Mahasattva encountered a tigress on this hill who was dying of hunger along with her cubs. In an act of supreme compassion (mahakaruna), the prince offered his own body as food for the animal. This act of selfless sacrifice is considered one of the defining illustrations of the Bodhisattva ideal — total giving for the welfare of all beings. A stone carving at the site depicts the scene in detail.

The hilltop complex combines a stupa, a Thrangu Tashi Yangtse monastery (established 1978 and now one of the important Tibetan Buddhist institutions in Nepal), prayer flag forests and extraordinary views across the terraced valleys toward the high Himalaya. The monastery welcomes visitors and offers a simple guesthouse for those who wish to spend a night in the silence of the ridge.`,
    highlights: [
      "One of three most sacred Buddhist sites in Nepal",
      "Site of the Bodhisattva's supreme self-sacrifice legend",
      "Thrangu Tashi Yangtse Monastery — active and welcoming to visitors",
      "Panoramic views across terraced valleys to the Himalaya",
      "Prayer flag forests and tranquil hilltop atmosphere",
      "Excellent overnight destination for silence and meditation",
    ],
    significance: "One of the most sacred Bodhisattva sites in Buddhist tradition",
    deityOrSubject: "Bodhisattva Mahasattva (previous life of Shakyamuni Buddha)",
    architecturalStyle: "Tibetan stupa",
    isFree: true,
    admissionForeigner: "Free (donation to monastery appreciated)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "06:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning (7–10am) for monastery puja and best mountain light",
      howToGetThere: "1h30m taxi from Thamel via Dhulikhel (NPR 3,000–4,000 return); or by bus to Dhulikhel then local taxi",
      whatToWear: "Remove shoes at monastery; bring warm layers (1,750m can be cool)",
      timeNeeded: "Half day including travel; overnight for a full experience",
      photography: "The prayer flag forests and valley views are excellent; the carved Bodhisattva panel is best photographed in soft morning light",
    },
    insiderTip: "The walk from Dhulikhel to Namo Buddha takes 3–4 hours through terraced farmland and forest — one of the finest short walking routes in Nepal. It passes through traditional Tamang villages and offers mountain views throughout. Many visitors drive to Namo Buddha and miss this exceptional walk; take the time if you have it.",
    eventCalendar: [
      { name: "Buddha Jayanti", month: 5, description: "Large gathering at the stupa for the celebration of the Buddha's birth." },
    ],
    nearbyAttractions: ["Bhaktapur Durbar Square", "Changu Narayan Temple", "Nagarkot Viewpoint"],
    ourScore: 8.8,
    featured: false,
    tagSlugs: ["spiritual","meditation-yoga","quiet-and-peaceful","trekking","off-the-beaten-path"],
    faqs: [
      {
        question: "Is Namo Buddha worth the trip from Kathmandu?",
        answer: "For Buddhist travellers or those seeking a contemplative hilltop experience, yes — strongly. The site's spiritual significance, the monastery atmosphere and the views make it one of the most rewarding day trips or overnights from Kathmandu.",
      },
      {
        question: "How do I get to Namo Buddha from Kathmandu?",
        answer: "Taxi via Dhulikhel: approximately 1h30m, NPR 3,000–4,000 return. Bus to Dhulikhel (NPR 60–80) then local taxi or walk (3–4 hours, highly recommended).",
      },
      {
        question: "Can I stay overnight at Namo Buddha?",
        answer: "Yes — the Thrangu monastery guesthouse offers simple accommodation. It is one of the most peaceful overnight options near Kathmandu and the early morning atmosphere at the stupa, before any day visitors arrive, is exceptional.",
      },
      {
        question: "What is the legend of Namo Buddha?",
        answer: "In one of his previous lives, Prince Mahasattva encountered a dying tigress and her starving cubs on this hill. He offered his own body as food — cutting his flesh and feeding it to the animals — out of pure compassion. This act is celebrated as the perfect expression of the Bodhisattva ideal. A stone panel at the site depicts the scene.",
      },
      {
        question: "Is there a monastery at Namo Buddha?",
        answer: "Yes — Thrangu Tashi Yangtse Monastery, established in 1978, is one of the important Kagyu-school Tibetan Buddhist institutions in Nepal. It welcomes visitors, hosts meditation courses and has a simple guesthouse.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1609946860441-a51ffcf22208?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6019,
    longitude: 85.5091,
    touristType: ["pilgrim", "solo-traveller", "meditation-yoga"],
  },

  // ─── Museums & Gardens (remaining) ───────────────────────────────────────

  {
    slug: "national-museum-nepal",
    name: "National Museum of Nepal",
    nameLocal: "राष्ट्रिय संग्रहालय",
    listingType: "MUSEUM" as ListingType,
    areaSlug: "swayambhunath",
    tagline: "Nepal's largest museum — art, history and natural science at Swayambhunath",
    descriptionShort:
      "The National Museum of Nepal at Chhauni holds the country's most comprehensive collections of Nepalese art, historical weapons, royal portraits and natural history, in buildings from the Rana era.",
    description: `The National Museum of Nepal occupies a Rana-era building compound at Chhauni, a 10-minute walk from Swayambhunath. It is the largest museum in Nepal and the broadest in scope, with collections spanning Neolithic tools, Licchavi and Malla-era sculpture, Rana dynasty weapons and regalia, Thanka paintings, Buddhist art and natural history specimens.

The Art Museum building (the original armoury) is the strongest section, with an outstanding collection of stone sculpture from the valley's Hindu and Buddhist traditions. Pieces span the Licchavi period (4th–9th century) through the late Malla period — including some items not seen in the specialist Patan Museum. The Buddhist Art Museum next door focuses on thangka painting, gilt bronze and manuscript illumination.

The Natural History Museum covers Nepal's extraordinary biodiversity — the country contains eight of the world's fourteen 8,000m peaks and spans climatic zones from subtropical to arctic — with specimens including Himalayan mammals, insects and pressed botanical specimens from expeditions across the country.

The museum's main limitation is interpretation: signage is often minimal or Nepali-only, making a guided visit or advance reading useful preparation. Despite this, the quality and range of the collections reward a half-day visit.`,
    highlights: [
      "Nepal's largest museum with broadest collection scope",
      "Outstanding Licchavi and Malla-era stone sculpture",
      "Buddhist Art Museum with thangka and manuscript collections",
      "Rana-era armoury building with historical weapons",
      "Natural history covering Nepal's exceptional biodiversity",
    ],
    significance: "Nepal's national museum, founded 1928",
    architecturalStyle: "Rana-era armoury complex",
    isFree: false,
    admissionLocal: "NPR 150",
    admissionForeigner: "NPR 400 (combined ticket for all buildings)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Wednesday","Thursday","Friday","Sunday"],
        opens: "10:30",
        closes: "17:30",
      },
      {
        dayOfWeek: ["Saturday"],
        opens: "10:30",
        closes: "14:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning when light is good for the sculpture galleries",
      howToGetThere: "10-min walk from Swayambhunath; 20-min taxi from Thamel",
      whatToWear: "Casual",
      timeNeeded: "2–3 hours",
      photography: "Photography is permitted in most galleries; flash is prohibited",
    },
    insiderTip: "The Natural History Museum building at the rear of the compound is systematically skipped by most visitors. The entomology collection (insects of Nepal) is genuinely extraordinary — Nepal has over 11,000 insect species and the pinned specimens include some visually spectacular Himalayan butterflies and beetles rarely seen outside specialist collections.",
    eventCalendar: [],
    nearbyAttractions: ["Swayambhunath Stupa", "Thamel"],
    ourScore: 7.9,
    featured: false,
    tagSlugs: ["cultural","historical","art-and-craft","educational","wildlife"],
    faqs: [
      {
        question: "Is the National Museum of Nepal worth visiting?",
        answer: "For visitors with a genuine interest in Nepalese art history, yes — the stone sculpture collection rivals the Patan Museum in breadth if not in context. For general visitors, the Patan Museum is a better single-museum choice due to its superior interpretation. The National Museum rewards those who visit both.",
      },
      {
        question: "What are the opening hours of the National Museum of Nepal?",
        answer: "Wednesday to Friday and Sunday: 10:30am to 5:30pm. Saturday: 10:30am to 2:00pm. Closed Monday, Tuesday and government holidays.",
      },
      {
        question: "How far is the National Museum from Swayambhunath?",
        answer: "A 10-minute walk from Swayambhunath Stupa, making the two an easy combination. From Thamel it is about 20 minutes by taxi (NPR 250–350).",
      },
      {
        question: "What is the admission fee for the National Museum of Nepal?",
        answer: "NPR 400 for foreign nationals — a combined ticket covering all museum buildings (Art Museum, Buddhist Art Museum, Natural History Museum, History Museum).",
      },
      {
        question: "Can I combine the National Museum with Swayambhunath?",
        answer: "Yes — they are 10 minutes apart on foot and make a natural half-day combination. Visit Swayambhunath first (especially if going for sunrise), then the National Museum when it opens at 10:30am.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7139,
    longitude: 85.2967,
    touristType: ["cultural", "solo-traveller", "art-and-craft"],
  },

  {
    slug: "godawari-botanical-garden",
    name: "Godawari Botanical Garden",
    nameLocal: "गोदावरी वनस्पति उद्यान",
    listingType: "PARK" as ListingType,
    areaSlug: "patan",
    tagline: "Nepal's premier botanical garden at the foot of Phulchoki Hill",
    descriptionShort:
      "The Godawari Botanical Garden covers 82 acres at 1,524 metres south of Patan, with Nepal's most comprehensive collection of Himalayan plants, a Japanese garden, orchid house and trails into adjacent forest.",
    description: `The Godawari Botanical Garden, 24 km south of Kathmandu at the foot of Phulchoki Hill, is Nepal's most important botanical garden and one of the better-designed open green spaces in the valley. Established in 1962 at 1,524 metres elevation, it covers 82 acres with themed sections including a rose garden, rock garden, Japanese garden, ornamental pond, cactus house and an orchid house with over 250 native species.

The garden's botanical significance lies in its collection of Himalayan plant species — herbs, shrubs and trees from Nepal's diverse climatic zones, from subtropical Terai to alpine meadow. The labelling is reasonably thorough by Nepali museum standards, and the garden functions as an active research institution as well as a public space.

Beyond the formal garden, a network of trails leads into the adjacent forest on Phulchoki Hill — a botanically rich area where some of Nepal's finest rhododendron stands bloom in March and April. The garden is popular with Kathmandu residents for weekend picnics; weekday visits offer a much quieter experience.`,
    highlights: [
      "Nepal's premier botanical garden — 82 acres at 1,524m",
      "250+ native orchid species in the orchid house",
      "Japanese garden and ornamental pond",
      "Outstanding rhododendron displays (March–April)",
      "Forest trails extending into Phulchoki Hill",
      "Bird-rich grounds with 150+ recorded species",
    ],
    isFree: false,
    admissionLocal: "NPR 30",
    admissionForeigner: "NPR 200",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    bestMonths: [3, 4, 10, 11],
    visitorTips: {
      bestTime: "March–April for rhododendron bloom; October–November for clear views and mild weather",
      howToGetThere: "45-min taxi from Thamel (NPR 1,200–1,500); or bus to Godawari then short walk",
      whatToWear: "Comfortable walking shoes; layers if planning forest trails",
      timeNeeded: "2–3 hours for garden; half day if combining with Phulchoki trail",
      photography: "The orchid house and Japanese garden have the strongest photographic interest",
    },
    insiderTip: "The garden is a premier birding site that most visitors completely overlook — over 150 species have been recorded here and in the adjacent forest. Bring binoculars and arrive at opening time on a weekday for serious birding. The sunbirds in the ornamental garden are reliably present and extraordinarily colourful.",
    eventCalendar: [
      { name: "National Flower Show", month: 4, description: "Annual flower exhibition held in the garden, showcasing Nepal's cultivated and wild flora." },
    ],
    nearbyAttractions: ["Patan Durbar Square", "Phulchoki Hill", "Patan Museum"],
    ourScore: 7.8,
    featured: false,
    tagSlugs: ["wildlife","eco-friendly","quiet-and-peaceful","photography","family"],
    faqs: [
      {
        question: "Is Godawari Botanical Garden worth visiting?",
        answer: "For nature lovers, gardeners and birders, yes. The orchid house and rhododendron season (March–April) are the highlights. For general sightseers, the Garden of Dreams in Thamel is more convenient and similarly pleasant.",
      },
      {
        question: "What is the best time to visit Godawari Botanical Garden?",
        answer: "March to April for rhododendron bloom and spring flowers. October to November for clear mountain views and pleasant weather. The garden is open year-round.",
      },
      {
        question: "How far is Godawari from Patan?",
        answer: "About 15 km south of Patan — 30–40 minutes by taxi. From Thamel it is about 45 minutes.",
      },
      {
        question: "Can I hike from Godawari Botanical Garden?",
        answer: "Yes — trails from the garden's upper boundary lead into the Phulchoki forest. The full Phulchoki Hill summit (2,762m) takes 3–4 hours return and offers excellent birding and a mountain panorama.",
      },
      {
        question: "What birds can I see at Godawari Botanical Garden?",
        answer: "Over 150 species have been recorded, including Mrs Gould's sunbird, Nepal's endemic spiny babbler, various laughingthrushes, woodpeckers, and (in the adjacent forest) Himalayan monals — Nepal's national bird. Mornings are best for birding.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.5978,
    longitude: 85.3761,
    touristType: ["family", "wildlife", "eco-friendly"],
  },

  // ─── Markets, Streets & Viewpoints (remaining) ───────────────────────────

  {
    slug: "thamel-walk",
    name: "Thamel",
    nameLocal: "थमेल",
    listingType: "CULTURAL_SITE" as ListingType,
    areaSlug: "thamel",
    tagline: "Kathmandu's legendary traveller district — chaotic, essential and endlessly alive",
    descriptionShort:
      "Thamel has been Nepal's traveller hub since the 1970s — a dense network of lanes packed with guesthouses, restaurants, trekking gear shops, rooftop bars and an energy unlike anywhere else in Asia.",
    description: `Thamel is where Nepal's encounter with international tourism began and where it remains most concentrated. In the 1970s, when Kathmandu was a stopping point on the hippie trail from Kabul to Goa, the first guesthouses appeared in these lanes. Today the district is larger, louder and more commercially intense than ever — a kilometre-square of compressed commerce, accommodation and entertainment that supports the entire Nepali tourism industry.

Walking through Thamel is an experience in itself: the lanes are narrow enough that cars and motorbikes squeeze past pedestrians continuously; shop fronts overflow with down jackets, pashmina shawls, singing bowls, thangka paintings, trekking poles and Buddhist prayer flags; restaurants offer everything from authentic Nepali dal bhat to surprisingly competent Italian pizza. The energy — part chaos, part carnival — is specific to this place and not found anywhere else in Nepal.

For all its commercialism, Thamel retains considerable character. The Chhetrapati section to the south is more local in feel; the lanes around the Kathmandu Guest House have the most historical texture; the upper floors of the rooftop restaurants and bars, particularly around Thamel Chowk, offer one of the world's great people-watching perches at sunset.

Thamel is also the most practical base in Nepal: every trekking permit, every guided tour, every domestic flight booking, every piece of gear can be arranged within a 10-minute radius.`,
    highlights: [
      "Nepal's international traveller hub since the 1970s",
      "Best selection of trekking gear and outdoor equipment in South Asia",
      "100+ restaurants covering every cuisine",
      "Rooftop bars with city views and live music",
      "Most concentrated tour and trekking agency district in Nepal",
      "Base for hippie trail history (if you know where to look)",
    ],
    isFree: true,
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "23:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Evening for rooftop bars and restaurant atmosphere; morning for gear shopping",
      howToGetThere: "Central Kathmandu — 20–35 min taxi from Tribhuvan Airport",
      whatToWear: "Casual; be aware of occasional motorbike in narrow lanes",
      timeNeeded: "Ongoing — most visitors are based here",
      photography: "Early morning light on the lane facades; rooftop views at sunset",
    },
    insiderTip: "The best-value trekking gear is not in the main Thamel lanes but in the parallel streets one block west — specifically around Jyatha and the lower Chhetrapati lanes where the same-quality gear sells for 20–40% less and the haggling is more relaxed.",
    eventCalendar: [
      { name: "Holi", month: 3, description: "Thamel goes fully colour-crazy during Holi — water balloons and coloured powder from every direction." },
    ],
    nearbyAttractions: ["Garden of Dreams", "Kathmandu Durbar Square", "Asan Tole Bazaar"],
    ourScore: 8.2,
    featured: true,
    tagSlugs: ["cultural","food-and-drink","nightlife","shopping","solo-traveller"],
    faqs: [
      {
        question: "Is Thamel safe at night?",
        answer: "Generally yes — Thamel is busy and reasonably well-lit until midnight and populated enough to be safe. Standard urban precautions apply: don't carry large amounts of cash, be cautious with strangers offering very insistent 'help', and know your guesthouse's address. The lanes are narrow and dark beyond the main drag — taxis are always available late at night.",
      },
      {
        question: "Where should I eat in Thamel?",
        answer: "For Nepali food: any restaurant serving dal bhat (the national dish) at NPR 300–500 will generally be honest. For international food: OR2K (rooftop, Middle Eastern), Pumpernickel Bakery (breakfast and cakes) and Third Eye (Indian) are long-running reliable choices. Avoid places with aggressive touts at the door.",
      },
      {
        question: "What can I buy in Thamel?",
        answer: "Trekking and outdoor gear (excellent quality, best prices for brands in Nepal), pashmina scarves, thangka paintings, singing bowls, Tibetan Buddhist items, silver jewellery, locally-produced spices and tea. Bargaining is expected everywhere except fixed-price shops.",
      },
      {
        question: "How do I get to Thamel from the airport?",
        answer: "Pre-paid taxi from Tribhuvan International Airport (TIA) costs NPR 700–900 and takes 20–35 minutes depending on traffic. Agree the price before getting in.",
      },
      {
        question: "Is Thamel walkable to Kathmandu's main sights?",
        answer: "Yes — Kathmandu Durbar Square (15-min walk south), Garden of Dreams (5 min east), Asan Tole (20 min south) and the Nepal Museum (20 min west). Pashupatinath and Boudhanath require a 20-minute taxi each.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7151,
    longitude: 85.3122,
    touristType: ["solo-traveller", "backpacker", "couple"],
  },

  {
    slug: "freak-street",
    name: "Freak Street (Jhochhen Tole)",
    nameLocal: "झोछें टोल",
    listingType: "HISTORIC_SITE" as ListingType,
    areaSlug: "durbar-square",
    tagline: "The original hippie heartland of Asia — now peaceful, historical and authentic",
    descriptionShort:
      "Jhochhen Tole (Freak Street) was the epicentre of the hippie trail in the 1970s — the street where cannabis was legally sold and the counterculture of the world converged. Today it is quiet, characterful and genuinely authentic.",
    description: `Freak Street — the nickname given by travellers to Jhochhen Tole — was the most famous street in Asia during the 1970s. At a time when cannabis was legally available in government shops and the Nepalese government had not yet considered tourism regulation, the street's cheap guesthouses and chilled cafes attracted a generation of travellers from Allen Ginsberg to Peter Matthiessen, from the Beatles' entourage to the generation of trekkers who would define Nepal's outdoor tourism industry.

Nepal banned cannabis in 1973 under US pressure and the hippie era faded, with the traveller scene gradually migrating to Thamel. Today Jhochhen Tole is quiet, unhurried and genuinely atmospheric in a way that Thamel, with its commercial intensity, cannot match. The old guesthouse facades remain; the small Tibetan carpet shops and Newari restaurants maintain a pace set by decades of low-key trade rather than tourist maximisation.

The street's proximity to Kathmandu Durbar Square and Freak Street Square (Basantapur) makes it a natural extension of any Durbar Square visit — turn south from the square's main plaza and you step directly into the most historically interesting quarter of old Kathmandu's traveller district.`,
    highlights: [
      "Epicentre of the 1970s Asian hippie trail",
      "Completely preserved pre-tourist-boom streetscape",
      "Atmospheric Tibetan carpet shops and local restaurants",
      "Adjacent to Kathmandu Durbar Square",
      "Far quieter and more authentic than Thamel",
      "Historical plaques and original 1970s guesthouse facades",
    ],
    significance: "Cultural epicentre of 1970s Asian hippie trail",
    isFree: true,
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "22:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning or late afternoon for the best light and local atmosphere",
      howToGetThere: "5-min walk south from Kathmandu Durbar Square",
      whatToWear: "Casual",
      timeNeeded: "45 minutes to 1 hour",
      photography: "The facades of the original guesthouses retain their 1970s signage in several cases — excellent documentary photography",
    },
    insiderTip: "The Snowman Cafe on Freak Street has been operating since the early 1970s — one of the oldest continuously operating traveller cafes in Asia. The apple pie recipe is said to be unchanged since 1972. Sit upstairs for the best view down the street.",
    eventCalendar: [],
    nearbyAttractions: ["Kathmandu Durbar Square", "Kumari Ghar", "Asan Tole Bazaar"],
    ourScore: 7.9,
    featured: false,
    tagSlugs: ["historical","cultural","off-the-beaten-path","hidden-gem","local-favourite"],
    faqs: [
      {
        question: "What is Freak Street in Kathmandu?",
        answer: "Jhochhen Tole — called Freak Street by Western travellers — was the centre of the 1970s hippie trail in Asia, when Kathmandu was a gathering point for counterculture travellers from across the world. Government cannabis shops operated here until 1973. Today it is a quiet, historically intact street adjacent to Durbar Square.",
      },
      {
        question: "Is Freak Street worth visiting?",
        answer: "For historically-minded travellers and those who want to see old Kathmandu as it was before Thamel's commercialisation, yes. It is quiet, authentic and combined naturally with Durbar Square. Do not come expecting nightlife or commercial energy — it has none.",
      },
      {
        question: "Where is Freak Street?",
        answer: "Directly south of Kathmandu Durbar Square — turn south from the main plaza and walk 100 metres. It is also accessible by walking south from Thamel (20 minutes).",
      },
      {
        question: "Is cannabis still legal on Freak Street?",
        answer: "No — Nepal banned cannabis in 1973. The street's historical association with cannabis is historical, not current.",
      },
      {
        question: "What can I do on Freak Street today?",
        answer: "Browse Tibetan carpet and antique shops, eat at one of the Newari or Tibetan restaurants, have coffee at the historic Snowman Cafe, and simply walk the preserved 1970s streetscape. It is a contemplative, low-key experience rather than an active one.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1601576084861-5de423553c0f?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7027,
    longitude: 85.3072,
    touristType: ["solo-traveller", "cultural", "photography"],
  },

  {
    slug: "indra-chowk",
    name: "Indra Chowk",
    nameLocal: "इन्द्र चोक",
    listingType: "MARKET" as ListingType,
    areaSlug: "durbar-square",
    tagline: "A bead and fabric market at the ancient crossroads of old Kathmandu",
    descriptionShort:
      "Indra Chowk is the most colourful intersection in old Kathmandu — a bead market where glass, crystal and semiprecious stone beads have been traded since the medieval period, presided over by the Akash Bhairab shrine.",
    description: `Indra Chowk is a crossroads in old Kathmandu where the ancient trade routes from Tibet and India met, and where the city's bead trade has been concentrated since at least the medieval Malla period. The intersection is named after Indra — the Vedic god of rain and the sky — whose festival (Indra Jatra) transforms this junction and the surrounding neighbourhood for eight days each September.

The ground-floor shops lining Indra Chowk specialise in the glass bead trade: thousands of strands of beads in every colour, size and material hang in dense curtains from the shopfronts — Venetian glass, Czech crystal, Tibetan dzi beads, carved bone, turquoise, coral and semiprecious stone from across the Himalayan trade network. These beads are sold wholesale to the Newari and Tharu women who wear them as traditional jewellery and retail to tourists as necklaces and souvenirs.

The upper floor of the main Indra Chowk building houses a Vishnu shrine accessible by an external staircase; the southern wall of the junction features a large brass Akash Bhairab (the sky-god form of Shiva) whose terrifying face peers down from an upper-floor niche, protected by a cage during non-festival periods. During Indra Jatra, this figure is displayed publicly and the surrounding streets fill with processional chariot routes.`,
    highlights: [
      "Centre of Kathmandu's centuries-old bead trade",
      "Thousands of bead varieties from glass to semiprecious stone",
      "Akash Bhairab shrine on the upper floor",
      "Historic crossroads of ancient Tibetan-Indian trade routes",
      "Epicentre of Indra Jatra festival each September",
    ],
    isFree: true,
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
    bestMonths: [9, 10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning (7–10am) for wholesale trade atmosphere; September for Indra Jatra",
      howToGetThere: "15-min walk from Thamel; 5-min walk from Kathmandu Durbar Square",
      whatToWear: "Casual; be aware of narrow lanes and vehicles",
      timeNeeded: "30–45 minutes",
      photography: "The bead curtains against dark shopfront interiors create striking photography; best in morning light",
    },
    insiderTip: "The fabric market in the lanes behind Indra Chowk (toward Kel Tole) has one of the best selections of traditional Nepali dhaka fabric — the hand-woven geometric textile used for traditional dress — at much better prices than tourist-facing shops in Thamel.",
    eventCalendar: [
      { name: "Indra Jatra", month: 9, description: "8-day festival of the sky god centred on this junction: the Akash Bhairab is publicly displayed, chariot processions pass through, and the Kumari makes her public appearance." },
    ],
    nearbyAttractions: ["Asan Tole Bazaar", "Kathmandu Durbar Square", "Freak Street"],
    ourScore: 7.8,
    featured: false,
    tagSlugs: ["cultural","historical","shopping","photography","local-favourite"],
    faqs: [
      {
        question: "What is Indra Chowk famous for?",
        answer: "Its bead market — thousands of strands of glass, crystal, Tibetan dzi and semiprecious stone beads that have been traded here since the medieval period. Also for the Akash Bhairab shrine and as the epicentre of the Indra Jatra festival each September.",
      },
      {
        question: "Can I buy beads at Indra Chowk?",
        answer: "Yes — the surrounding shops sell beads by the strand, by the kilogram or as finished necklaces. Prices are significantly lower than tourist shops in Thamel. Glass bead strands start at NPR 50–100; Tibetan dzi beads can be much more expensive depending on age and quality.",
      },
      {
        question: "How far is Indra Chowk from Durbar Square?",
        answer: "About 500 metres north-east — a 5-minute walk through the old city lanes.",
      },
      {
        question: "What is Indra Jatra?",
        answer: "Indra Jatra is Kathmandu's greatest festival — an 8-day celebration in September (timing varies by lunar calendar) honouring the sky god Indra. Highlights include chariot processions through the city, public display of the Akash Bhairab, masked dance performances, and the Kumari's public chariot procession through the old city.",
      },
      {
        question: "Is there anything to see beyond beads at Indra Chowk?",
        answer: "The Akash Bhairab shrine on the upper floor (accessible by external staircase), the traditional merchant houses surrounding the junction, and the exceptionally photogenic bead shops. The lanes behind the market (toward Kel Tole) have dhaka fabric shops worth exploring.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1601576084861-5de423553c0f?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7063,
    longitude: 85.3095,
    touristType: ["cultural", "shopping", "photography"],
  },

  // ─── Nature & Trekking Access Points (remaining) ─────────────────────────

  {
    slug: "gokarna-forest",
    name: "Gokarna Forest",
    nameLocal: "गोकर्ण जंगल",
    listingType: "NATURAL_SITE" as ListingType,
    areaSlug: "boudhanath",
    tagline: "Royal forest and biodiversity reserve east of Kathmandu",
    descriptionShort:
      "The Gokarna Royal Forest is a 1,500-acre protected wildlife reserve with spotted deer, peacocks, 200+ bird species and walking trails — home to the Gokarna Forest Resort's golf course.",
    description: `The Gokarna Forest is a former royal hunting reserve east of Kathmandu, now managed as a wildlife preserve and home to the Gokarna Forest Resort's 18-hole golf course. The 1,500 acres of mixed sal, oak and pine forest support a remarkable concentration of wildlife for a site within 25 minutes of a major city: spotted deer (their numbers are genuinely impressive), common peacock, barking deer and over 200 recorded bird species.

The forest is accessible to non-golfers through the Gokarna Forest Resort (day visitor entry fee applies), with walking trails through the woodland that offer a genuine wildlife experience. Morning visits yield deer near the forest edges; the birds are most active at dawn and dusk.

The Gokarna Mahadev Temple, a significant Shiva temple on the western edge of the forest complex, adds cultural weight to a visit — the temple is an important pilgrimage site for Newar Hindus and its setting beside a river gorge within the forest is dramatic.`,
    highlights: [
      "1,500-acre former royal forest reserve",
      "Spotted deer, peacocks and 200+ bird species",
      "Nepal's only 18-hole championship golf course",
      "Gokarna Mahadev Temple — important riverside Shiva shrine",
      "25 minutes from Thamel — the easiest wildlife experience near Kathmandu",
    ],
    isFree: false,
    admissionForeigner: "Day visitor fee via Gokarna Forest Resort (NPR 500–800)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "06:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Early morning (6–9am) for deer and bird activity",
      howToGetThere: "25-min taxi from Thamel (NPR 600–800); turn off the Sankhu road at Gokarna",
      whatToWear: "Light layers; good walking shoes",
      timeNeeded: "2–3 hours",
      photography: "The spotted deer are most approachable in the early morning on the forest edge near the fairways",
    },
    insiderTip: "The Gokarna Mahadev Temple is 10 minutes' drive from the forest resort entrance and is included in any Gokarna visit. The temple sits above a river gorge and has beautiful carved wooden architecture — it's an important Newar pilgrimage site but almost entirely off the tourist circuit.",
    eventCalendar: [
      { name: "Gokarna Aunsi", month: 8, description: "Father's Day equivalent for those whose fathers have died — major pilgrimage to Gokarna Mahadev Temple." },
    ],
    nearbyAttractions: ["Boudhanath Stupa", "Kopan Monastery", "Pashupatinath Temple"],
    ourScore: 8.1,
    featured: false,
    tagSlugs: ["wildlife","eco-friendly","quiet-and-peaceful","photography","off-the-beaten-path"],
    faqs: [
      {
        question: "Can I visit Gokarna Forest without staying at the resort?",
        answer: "Day visitor access is available through the Gokarna Forest Resort (day pass required, NPR 500–800 approx). This gives access to the walking trails and wildlife areas. Golf requires separate green fees.",
      },
      {
        question: "What wildlife can I see at Gokarna Forest?",
        answer: "Spotted deer are the signature animal and are reliably seen on early morning visits — the population is healthy and they are reasonably approachable. Peacocks are common. Birds (200+ species) include eagles, kingfishers, sunbirds and various forest species. Leopard are present but extremely rarely sighted.",
      },
      {
        question: "How far is Gokarna Forest from Boudhanath?",
        answer: "About 5 km east of Boudhanath — a 15-minute taxi. The two sites make a natural half-day combination: Boudhanath stupa at dawn, then Gokarna Forest for wildlife and the Mahadev temple.",
      },
      {
        question: "Is there a golf course at Gokarna Forest?",
        answer: "Yes — Nepal's only 18-hole championship golf course operates within the Gokarna Forest Reserve. Green fees are available to non-resort guests.",
      },
      {
        question: "What is the Gokarna Mahadev Temple?",
        answer: "An important Shiva temple on the western edge of the forest, above a river gorge. It is a major Newar pilgrimage site (especially during Gokarna Aunsi festival) with fine carved wooden architecture. Admission is free.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7374,
    longitude: 85.3789,
    touristType: ["wildlife", "family", "eco-friendly"],
  },

  {
    slug: "champadevi-hill",
    name: "Champadevi Hill Trek",
    nameLocal: "चम्पादेवी",
    listingType: "NATURAL_SITE" as ListingType,
    areaSlug: "kirtipur",
    tagline: "A rewarding half-day hike to the south valley rim with panoramic views",
    descriptionShort:
      "Champadevi Hill (2,278m) south of Kirtipur offers one of the best short hikes near Kathmandu — a 3–4 hour round trip through oak forest to a hilltop shrine with views across the entire valley.",
    description: `Champadevi Hill rises to 2,278 metres on the southern rim of the Kathmandu Valley, accessible from Pharping or Kirtipur with a 3–4 hour round-trip hike through oak and rhododendron forest. The hilltop shrine of Champadevi — a small temple to a powerful local goddess — has been a pilgrimage destination for Newar Hindus for centuries, and the forest trails that approach it are among the most pleasant near Kathmandu.

The route from Pharping village gains about 700 metres of elevation through increasingly dense forest, passing through several Newari and Tamang settlements before reaching the open ridge. The views at the top encompass the entire Kathmandu Valley — from the city to the south, across to the northern Himalayan barrier — and on clear October to March mornings, the Annapurna and Dhaulagiri ranges are visible.

Unlike Shivapuri (the northern valley rim), Champadevi receives far fewer visitors and the southern valley trails feel genuinely wild. The forest is good for birds and the occasional deer; at dusk in the autumn season, the lights of Kathmandu spreading across the valley floor below are extraordinary.`,
    highlights: [
      "Best short hike on the southern valley rim",
      "Champadevi Goddess shrine at 2,278m",
      "Panoramic views of the entire Kathmandu Valley",
      "Oak and rhododendron forest with good birding",
      "Far less visited than Shivapuri or Nagarkot",
      "Starting point near historically interesting Pharping village",
    ],
    difficulty: "MODERATE",
    isFree: true,
    admissionForeigner: "Free",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "05:00",
        closes: "18:00",
      },
    ],
    bestMonths: [10, 11, 12, 2, 3, 4],
    visitorTips: {
      bestTime: "Early morning start (6–7am) for clear views before cloud builds",
      howToGetThere: "45-min taxi to Pharping from Thamel (NPR 1,200–1,500); trek starts from Pharping",
      whatToWear: "Hiking boots or good trail shoes; layers; sun protection",
      timeNeeded: "4–5 hours total including travel",
      photography: "The views from the summit ridge are best in the first 2 hours after sunrise; the forest trail in rhododendron season (March) is extraordinarily photogenic",
    },
    insiderTip: "Combine with Dakshinkali Temple (15 min from Pharping by taxi) and the Vajra Yogini cave shrine in Pharping itself — a Tibetan Buddhist cave used by Guru Rinpoche in the 8th century. A Champadevi hike + Pharping + Dakshinkali makes one of the best full-day cultural-natural day trips in the valley.",
    eventCalendar: [
      { name: "Champadevi Jatra", month: 4, description: "Annual festival at the hilltop shrine drawing pilgrims from surrounding villages." },
    ],
    nearbyAttractions: ["Dakshinkali Temple", "Kirtipur", "Pharping"],
    ourScore: 8.3,
    featured: false,
    tagSlugs: ["trekking","wildlife","off-the-beaten-path","photography","adventure"],
    faqs: [
      {
        question: "How hard is the Champadevi Hill hike?",
        answer: "Moderate. The ascent gains about 700m over 5–6 km from Pharping. A reasonably fit person in regular walking shoes can manage it in 2–2.5 hours of ascent. Trail conditions are generally good but can be muddy after rain.",
      },
      {
        question: "How do I get to the Champadevi trailhead?",
        answer: "Taxi from Thamel to Pharping: NPR 1,200–1,500, approximately 45 minutes (22 km south-west of Kathmandu). The trail starts at the upper edge of Pharping village.",
      },
      {
        question: "Is a guide needed for Champadevi Hill?",
        answer: "A guide is helpful for the first visit — the trails fork and some junctions are not well-marked. Local guides can be arranged in Pharping village at NPR 1,000–1,500. GPS tracks are also available on apps like OsmAnd.",
      },
      {
        question: "What are the views from Champadevi Hill?",
        answer: "On clear days (October–March), the panorama covers the entire Kathmandu Valley and extends to the Annapurna and Dhaulagiri ranges to the west. The Kathmandu cityscape spread across the valley floor is particularly striking in the late afternoon light.",
      },
      {
        question: "Can I combine Champadevi with Dakshinkali Temple?",
        answer: "Yes — Dakshinkali is 15 minutes by taxi from the Pharping trailhead. Hike Champadevi in the morning, then visit Dakshinkali on the way back to Kathmandu. If visiting on a Tuesday or Saturday, the temple will be at its most active.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6219,
    longitude: 85.2531,
    touristType: ["trekking", "solo-traveller", "photography"],
  },

  {
    slug: "phulchoki-hill",
    name: "Phulchoki Hill",
    nameLocal: "फूलचोकी डाँडा",
    listingType: "NATURAL_SITE" as ListingType,
    areaSlug: "patan",
    tagline: "The highest hill surrounding Kathmandu — supreme birding and rhododendron forests",
    descriptionShort:
      "Phulchoki (2,762m) is the highest hill on the Kathmandu Valley rim — famous for Nepal's finest rhododendron forests in March–April, outstanding Himalayan birding and sweeping valley-to-Himalaya views.",
    description: `Phulchoki — 'Place of Flowers' — is the highest point on the rim of the Kathmandu Valley at 2,762 metres, south-east of Godawari. The name is earned: in March and April, the upper slopes are covered in one of the most spectacular rhododendron forests in Nepal, with trees reaching 15 metres in height and flowering in reds, pinks and whites across the entire hillside.

Beyond the rhododendrons, Phulchoki is Nepal's premier birding site near Kathmandu. Over 300 species have been recorded on the hill, including the superb Nepal's endemic spiny babbler (found only in Nepal), Satyr tragopan (one of the most spectacular pheasants in the world), Himalayan monal (the national bird), various laughingthrushes and numerous migratory species in spring and autumn. Dedicated birders come from across the world to add the spiny babbler to their lists.

The summit at 2,762m offers views across the valley to the Himalayan range and south toward the Indian plains. A small shrine at the top marks the Phulchoki Mai (the hill goddess) — a local pilgrimage destination. The road to the summit, while rough, is passable by 4WD, making this accessible without a full trekking commitment.`,
    highlights: [
      "Highest point on Kathmandu Valley rim at 2,762m",
      "Nepal's finest rhododendron forests — spectacular in March–April",
      "300+ bird species — best birding hill near Kathmandu",
      "Nepal's endemic spiny babbler reliably recorded here",
      "Himalayan monal (national bird) and Satyr tragopan",
      "Panoramic views from valley floor to Himalayan range",
    ],
    difficulty: "MODERATE",
    isFree: true,
    admissionForeigner: "Free (Godawari Botanical Garden entry NPR 200 if entering through garden)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "05:00",
        closes: "18:00",
      },
    ],
    bestMonths: [3, 4, 10, 11],
    visitorTips: {
      bestTime: "March–April for rhododendrons; October–November for clear Himalayan views; year-round for birding",
      howToGetThere: "50-min taxi from Thamel via Godawari (NPR 1,500–2,000); 4WD can drive to near the summit",
      whatToWear: "Warm layers — summit can be 10°C colder than Kathmandu; hiking boots",
      timeNeeded: "Half day to full day",
      photography: "Rhododendron forest in March–April is extraordinary; summit views best on clear winter mornings",
    },
    insiderTip: "The spiny babbler — Nepal's only endemic bird, found nowhere else on earth — is reliably seen in the scrub zone between the forest and the lower fields on the trail up from Godawari. Arrive at the trail entrance by 6am, go slowly and quietly through the first 200 metres of forest edge, and you have a very good chance of a sighting that birders from Europe and North America travel specifically to Nepal to achieve.",
    eventCalendar: [
      { name: "Phulchoki Mai Jatra", month: 4, description: "Festival at the hilltop goddess shrine, attended by local Newar pilgrims." },
    ],
    nearbyAttractions: ["Godawari Botanical Garden", "Patan Durbar Square"],
    ourScore: 8.6,
    featured: false,
    tagSlugs: ["wildlife","trekking","eco-friendly","photography","off-the-beaten-path"],
    faqs: [
      {
        question: "Why is Phulchoki famous for birding?",
        answer: "Phulchoki has the richest bird diversity of any hill near Kathmandu, with 300+ species. Critically, it is the most reliable site in the world to see Nepal's only endemic bird — the spiny babbler — alongside spectacular pheasants (Satyr tragopan, Himalayan monal) and numerous Himalayan songbird species. International birders regularly include it as a primary target.",
      },
      {
        question: "When are the rhododendrons in bloom on Phulchoki?",
        answer: "Peak bloom is March to mid-April, depending on annual weather patterns. The upper slopes above 2,200m have the densest concentrations. This is also excellent timing for spring bird migration, making a March visit to Phulchoki outstanding for both.",
      },
      {
        question: "How do I get to Phulchoki Hill?",
        answer: "Taxi from Thamel to Godawari: approximately 50 minutes, NPR 1,500–2,000. From Godawari Botanical Garden, a trail leads up through the forest (3–4 hours to summit). Alternatively, a rough 4WD road reaches close to the summit — jeep hire from Godawari is approximately NPR 3,000–4,000.",
      },
      {
        question: "Is Phulchoki suitable for beginners?",
        answer: "The trail is moderate — a 1,200m elevation gain from Godawari over 8–10 km. A reasonably fit person can manage it. The 4WD road option allows those with limited trekking ability to reach the upper forest for birding without the full climb.",
      },
      {
        question: "Can I combine Phulchoki with Godawari Botanical Garden?",
        answer: "Yes — Godawari is the natural starting point for the Phulchoki hike and has excellent birding in its own right. A full day: Godawari Botanical Garden (1.5 hours) then hike to Phulchoki summit (3–4 hours up, 2–3 hours down) makes a superb nature day trip from Kathmandu.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.5811,
    longitude: 85.4189,
    touristType: ["wildlife", "trekking", "photography"],
  },

  // ─── Bars & Nightlife ──────────────────────────────────────────────────────

  {
    slug: "purple-haze-rooftop",
    name: "Purple Haze Rock Bar",
    listingType: "BAR" as ListingType,
    areaSlug: "thamel",
    tagline: "Thamel's legendary rock music bar with rooftop views",
    descriptionShort:
      "Purple Haze is Thamel's most famous rock bar — two floors of live music, cold beer and a rooftop terrace that has been the starting point for countless traveller nights out since the 1990s.",
    description: `Purple Haze Rock Bar occupies a prime corner position in the heart of Thamel, its neon signage visible from most approaches to the backpacker district. It is, by most measures, the most famous bar in Kathmandu among international travellers — a reputation earned over three decades of serving cold Everest beer to trekkers, climbers, overlanders and tourists.

The bar runs across two floors plus a rooftop terrace. The ground floor is the music zone: live bands play most evenings from around 8pm, covering classic rock, blues and occasionally Nepali fusion, to a crowd that mingles freely across ages and nationalities. The first floor is quieter, with pool tables and a better view of Thamel's street-level chaos through large windows. The rooftop offers open air, cocktails and a backdrop of Thamel rooftops at night.

The menu covers bar staples — burgers, momos, nachos — at prices reasonable by Thamel standards. The beer selection is adequate (Everest, Tuborg, Carlsberg on draught), with a long cocktail list catering to the evening crowd.

Purple Haze is not a sophisticated bar. It is excellent for exactly what it does: loud music, cold drinks, reliable food, and the kind of sociable atmosphere that makes solo travel easy.`,
    highlights: [
      "Thamel's most famous international rock bar since the 1990s",
      "Live rock and blues bands most evenings from 8pm",
      "Three levels including rooftop terrace",
      "Good for solo travellers — easy to meet people",
      "Draft Everest beer and extensive cocktail list",
    ],
    isFree: true,
    admissionForeigner: "No cover charge",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "11:00",
        closes: "02:00",
      },
    ],
    bestMonths: [10, 11, 3, 4, 12, 1, 2],
    visitorTips: {
      bestTime: "Evening from 8pm when live music starts; weekends are busiest",
      howToGetThere: "Central Thamel — 5-minute walk from most Thamel hotels",
      whatToWear: "Casual; no dress code",
      timeNeeded: "2–4 hours",
      photography: "Good rooftop shots of Thamel at night",
    },
    insiderTip: "Arrive by 7:30pm to secure a rooftop table on weekends — they fill quickly once the live music starts. The house cocktails are better value than the bottled spirits.",
    nearbyAttractions: ["Garden of Dreams", "Thamel"],
    ourScore: 7.8,
    featured: false,
    tagSlugs: ["nightlife","backpacker","social","music-and-dance"],
    faqs: [
      {
        question: "Is there a cover charge at Purple Haze?",
        answer: "No cover charge. Revenue comes from drinks and food. Minimum spend policies occasionally apply on busy nights.",
      },
      {
        question: "What time does live music start at Purple Haze?",
        answer: "Live bands typically start around 8pm and play until midnight or later. Check the board at the entrance for the evening's schedule.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7154,
    longitude: 85.3123,
    touristType: ["backpacker", "social", "nightlife"],
  },

  {
    slug: "sam-s-bar",
    name: "Sam's Bar",
    listingType: "BAR" as ListingType,
    areaSlug: "thamel",
    tagline: "Thamel's classic backpacker institution since the 1970s",
    descriptionShort:
      "Sam's Bar is one of Thamel's oldest surviving backpacker bars — a no-frills, sociable spot with cheap beers, good momos and the kind of eclectic traveller mix that defines old Thamel.",
    description: `Sam's Bar has been a fixture of Thamel's backpacker scene since the early days of Nepal's tourism industry. Where Purple Haze trades on volume and live music, Sam's trades on atmosphere and longevity — it feels less manufactured, more genuinely worn-in, with mismatched furniture, walls covered in traveller stickers and postcards, and a clientele that ranges from first-time backpackers to veterans returning for the fifth time.

The beer is cold, the momos are good and cheap, and the staff are friendly without being pushy. Sam's is the kind of bar where you arrive for one drink and stay for four, because someone at the next table has just come back from Everest Base Camp and wants to talk about it.

There's no live music and no pretension. The sound system plays rock classics at a volume that allows conversation. It is, in the best possible way, exactly what it looks like from the street: a classic traveller bar.`,
    highlights: [
      "One of Thamel's oldest surviving traveller bars",
      "No-frills, authentic backpacker atmosphere",
      "Cheap beer and excellent momos",
      "Great for meeting other travellers",
      "Open late most nights",
    ],
    isFree: true,
    admissionForeigner: "No cover charge",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "10:00",
        closes: "01:00",
      },
    ],
    bestMonths: [10, 11, 3, 4, 12, 1, 2],
    visitorTips: {
      bestTime: "Evenings from 7pm onwards",
      howToGetThere: "Central Thamel — ask any guesthouse for directions",
      whatToWear: "Completely casual",
      timeNeeded: "2–3 hours",
      photography: "Interior shots capture the backpacker atmosphere well",
    },
    insiderTip: "Order the buff momos (buffalo dumplings) — they're consistently one of the best value bar snacks in Thamel. Pair with a large Everest beer for under $4.",
    nearbyAttractions: ["Garden of Dreams", "Thamel"],
    ourScore: 7.5,
    featured: false,
    tagSlugs: ["nightlife","backpacker","social","budget-friendly"],
    faqs: [
      {
        question: "What makes Sam's Bar different from other Thamel bars?",
        answer: "Age and authenticity. Sam's has been around longer than most Thamel establishments and retains the unpolished, sociable atmosphere of old-school traveller Nepal. It prioritises conversation over spectacle.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7160,
    longitude: 85.3130,
    touristType: ["backpacker", "social", "budget"],
  },

  {
    slug: "dwarika-s-rooftop-bar",
    name: "Dwarika's Rooftop Bar",
    listingType: "ROOFTOP_BAR" as ListingType,
    areaSlug: "lazimpat",
    tagline: "Rooftop cocktails above a UNESCO-listed heritage hotel",
    descriptionShort:
      "The rooftop bar at Dwarika's Heritage Hotel offers Kathmandu's most refined sundowner experience — handcrafted cocktails, heritage architecture salvaged from old Newari buildings, and city views.",
    description: `Dwarika's Heritage Hotel is one of the great hotels of Asia — a meticulously assembled collection of carved Newari wood and stone salvaged from historic buildings across the Kathmandu Valley, arranged around courtyards and fountains. The rooftop bar takes this extraordinary setting and adds the pragmatic pleasure of well-made cocktails and a city panorama.

The bar is quieter and more sophisticated than Thamel's options. The clientele tends toward well-travelled adults, hotel guests, and Nepali professionals rather than backpackers. The cocktail list draws on local ingredients — Himalayan herbs, local honey, Nepali spirits — and the bartenders know their craft.

The view from the rooftop encompasses a swath of Kathmandu from Lazimpat to the southern valley, with the Shivapuri hills beyond. At dusk, when the city lights begin and the air cools, it is genuinely special — the best sundowner in the city for those who want atmosphere without noise.

Non-guests are welcome. Pricing reflects the quality — cocktails run $10–$15, beer slightly less. Worth it.`,
    highlights: [
      "Rooftop bar of one of Asia's finest heritage hotels",
      "Craft cocktails using local Himalayan ingredients",
      "Panoramic Kathmandu views at sunset",
      "Sophisticated alternative to Thamel nightlife",
      "Preserved 15th–19th century Newari architectural elements throughout",
    ],
    isFree: true,
    admissionForeigner: "No cover; drinks $10–$15",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "17:00",
        closes: "23:00",
      },
    ],
    bestMonths: [10, 11, 3, 4, 12],
    visitorTips: {
      bestTime: "Sunset (4:30–6:30pm) — arrive 30 minutes before for the best table",
      howToGetThere: "15-min walk from Thamel or short taxi (NPR 200); Battisputali area of Lazimpat",
      whatToWear: "Smart casual — the heritage hotel context calls for slightly more than Thamel casual",
      timeNeeded: "1–2 hours",
      photography: "Best city panorama shots of Kathmandu from a rooftop",
    },
    insiderTip: "Ask the bartender for the Himalayan Old Fashioned — made with Khukuri rum aged in local barrels and Himalayan honey syrup. It's not on the standard menu but is their best drink.",
    nearbyAttractions: ["Pashupatinath Temple"],
    ourScore: 8.8,
    featured: false,
    tagSlugs: ["luxury","rooftop","romantic","nightlife","cocktails"],
    faqs: [
      {
        question: "Do you need to be a hotel guest to use Dwarika's Rooftop Bar?",
        answer: "No — the rooftop bar is open to non-guests. Reservations are not usually required but are recommended on weekend evenings.",
      },
      {
        question: "What is the price range at Dwarika's Rooftop Bar?",
        answer: "Cocktails range from approximately $10–$15, craft beer $5–$8, soft drinks $3–$5. Expensive by Kathmandu standards, but the setting justifies the price.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7175,
    longitude: 85.3252,
    touristType: ["luxury", "romantic", "cultural"],
  },

  {
    slug: "club-fire-thamel",
    name: "Club Fire",
    listingType: "BAR" as ListingType,
    areaSlug: "thamel",
    tagline: "Thamel's most popular nightclub — dance floor until 3am",
    descriptionShort:
      "Club Fire is consistently Kathmandu's busiest nightclub — a large basement venue in central Thamel with a proper dance floor, DJ nights and a mixed crowd of tourists and locals.",
    description: `Club Fire is where Thamel's night ends for those who want to dance. A large basement club by Kathmandu standards, it operates from around 9pm until 3am most nights, with DJs spinning a mix of Nepali pop, Bollywood, EDM and hip hop to a crowd that mixes international travellers with young Nepali professionals and students.

The venue is bigger and louder than anything else in Thamel. The production values are decent — a proper sound system, adequate lighting, a genuine dance floor rather than a cleared dining room. Thursday through Saturday nights fill quickly and the door operates a selective entry policy in peak season.

Entry typically costs NPR 500–800 which includes a drink. The bar is well-stocked and prices are reasonable by club standards. The crowd skews young (mid-20s to mid-30s) and the atmosphere is genuinely energetic on busy nights.

For those wanting to experience Kathmandu's nightlife beyond the bar-and-live-music circuit, Club Fire is the obvious choice.`,
    highlights: [
      "Kathmandu's most popular nightclub",
      "Proper dance floor and DJ nights",
      "Mixed tourist and local crowd",
      "Open until 3am most nights",
      "Regular themed nights and events",
    ],
    isFree: false,
    admissionForeigner: "NPR 500–800 (includes one drink)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "21:00",
        closes: "03:00",
      },
    ],
    bestMonths: [10, 11, 3, 4, 12, 1, 2],
    visitorTips: {
      bestTime: "Thursday–Saturday from 10pm; avoid Monday–Wednesday when it's quiet",
      howToGetThere: "Central Thamel — basement venue, look for the sign",
      whatToWear: "Smart casual; no flip-flops on busy nights",
      timeNeeded: "2–4 hours",
      photography: "Check club policy before photographing",
    },
    insiderTip: "The cover charge is often negotiable if you arrive before 10pm — staff are more relaxed about entry fees before the venue fills. Once inside, the Nepali-made Khukuri rum cocktails are better value than imported spirits.",
    nearbyAttractions: ["Garden of Dreams", "Thamel"],
    ourScore: 7.2,
    featured: false,
    tagSlugs: ["nightlife","social","music-and-dance","backpacker"],
    faqs: [
      {
        question: "What type of music plays at Club Fire?",
        answer: "A mix of Nepali pop, Bollywood, EDM and international hip hop, depending on the DJ and night. Nepali and Bollywood tracks dominate when the local crowd is larger; EDM and Western music increases when tourist numbers are high.",
      },
      {
        question: "What is the cover charge at Club Fire?",
        answer: "Typically NPR 500–800 (approximately $4–$6), which includes one drink. The charge is higher on weekend nights and during peak tourist season.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7162,
    longitude: 85.3128,
    touristType: ["backpacker", "social", "nightlife"],
  },

  {
    slug: "places-bar-kathmandu",
    name: "Places Bar",
    listingType: "ROOFTOP_BAR" as ListingType,
    areaSlug: "thamel",
    tagline: "Panoramic rooftop cocktails above Thamel",
    descriptionShort:
      "Places Bar sits on a high Thamel rooftop with panoramic views across the city — a good-value rooftop experience with cocktails, cold beer and a relaxed atmosphere one floor above the Thamel chaos.",
    description: `Places Bar occupies one of the higher rooftops in Thamel, giving it a genuine panoramic advantage over its ground-floor competitors. The view north toward Shivapuri, east toward Boudhanath and south across the city's low skyline is substantial — on clear days (October–November, March–April), the first snowy peaks of the Himalayan rim appear above the valley edge.

The bar operates with the informality appropriate to its Thamel location. Seating is a mixture of low tables with cushions and standard chairs. The cocktail menu runs to 30+ options at prices well below what equivalent drinks cost in the heritage hotel bars. The food menu covers bar staples competently.

Places is the sweet spot between Thamel's purely backpacker bars and the expensive hotel rooftops: genuine views, reasonable prices, decent cocktails, and a relaxed atmosphere that accommodates couples, groups, and solo travellers equally.`,
    highlights: [
      "High rooftop with panoramic city and valley views",
      "Himalayan peaks visible on clear October–April days",
      "Good-value cocktails vs heritage hotel prices",
      "Relaxed atmosphere for all traveller types",
      "One of Thamel's best sunset spots",
    ],
    isFree: true,
    admissionForeigner: "No cover charge",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "11:00",
        closes: "23:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Late afternoon (4–6pm) for sunset views; clear-weather October and November for mountain visibility",
      howToGetThere: "Upper Thamel — ask at your guesthouse for current directions as the exact entrance shifts",
      whatToWear: "Casual",
      timeNeeded: "1.5–2 hours",
      photography: "Best 360-degree city views in Thamel; Himalayan peaks visible on clear days",
    },
    insiderTip: "The views north are best in the first half of the day before afternoon haze builds. For the Himalayan horizon, arrive before noon on a clear October or November morning — the mountains disappear by 2pm most days.",
    nearbyAttractions: ["Garden of Dreams", "Thamel"],
    ourScore: 7.6,
    featured: false,
    tagSlugs: ["rooftop","views","nightlife","social","photography"],
    faqs: [
      {
        question: "Can you see the Himalayas from Places Bar?",
        answer: "On clear days in October, November, March and April, yes — the first snowy peaks of the Himalayan rim are visible to the north. Morning visits offer the clearest views before afternoon haze develops. The views are good but not as dramatic as dedicated viewpoints like Nagarkot or Chandragiri.",
      },
      {
        question: "Is Places Bar good for couples?",
        answer: "Yes — it's one of Thamel's better sunset spots for couples who want views without the noise of a nightclub. The atmosphere is relaxed rather than party-focused.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7158,
    longitude: 85.3118,
    touristType: ["backpacker", "romantic", "photography"],
  },

  // ─── Additional Museums ────────────────────────────────────────────────────

  {
    slug: "narayanhiti-palace-museum",
    name: "Narayanhiti Palace Museum",
    nameLocal: "नारायणहिटी दरबार संग्रहालय",
    listingType: "MUSEUM" as ListingType,
    areaSlug: "lazimpat",
    tagline: "Nepal's former Royal Palace — witness to the 2001 royal massacre",
    descriptionShort:
      "The Narayanhiti Palace was the official residence of Nepal's Shah dynasty kings until the monarchy's abolition in 2008. Now open as a museum, it preserves throne rooms, state apartments and the site of the 2001 royal massacre.",
    description: `Narayanhiti Palace was the seat of Nepal's Shah monarchy from 1963 until the abolition of the kingdom in 2008 and stands as one of Kathmandu's most historically charged buildings. The palace that now serves as a museum was built in 1963–70 by King Mahendra — a concrete brutalist structure that replaced an older palace on the site, named after the Narayan temple and the Hiti (water conduit) that once stood here.

The museum preserves the palace interiors largely as they were during the final years of the monarchy: state rooms with ornate thrones, royal portraits from the Shah dynasty, gifts received from foreign heads of state, ceremonial weapons, carriages and palanquins, state dining rooms and the private apartments of the royal family.

The most historically significant room is the billiard room where the 2001 Royal Massacre took place — when Crown Prince Dipendra, apparently in a drug and alcohol-fuelled rage following a family dispute, shot ten members of the royal family including King Birendra and Queen Aishwarya before turning the gun on himself. The massacre ended the direct line of the Shah dynasty and contributed to the political instability that culminated in the abolition of the monarchy seven years later. The room is included in the museum tour.

Narayanhiti occupies a prime central Kathmandu location — directly opposite the Thamel entrance road — and is one of the city's most undervisited significant sites.`,
    history: `The palace site has been a royal residence since the late Malla period, though the current building dates from 1963–70. The name derives from a Narayan (Vishnu) temple that stood here and a hiti (stone spout) that was a significant water source. King Mahendra commissioned the current structure from a Nepali architect, incorporating elements of traditional Newari design into a broadly modernist building.

The palace witnessed the end of Nepal's 240-year Shah dynasty. Following the 2001 massacre and the death of King Gyanendra's predecessors, Gyanendra ascended the throne but his rule proved controversial, particularly his 2005 royal coup that dissolved parliament. The Comprehensive Peace Agreement of 2006 and the subsequent Constituent Assembly election in 2008 voted to abolish the monarchy. The palace was converted to a museum and opened to the public in 2009.`,
    highlights: [
      "Former official residence of Nepal's Shah dynasty kings",
      "Throne rooms, state apartments and royal regalia preserved in situ",
      "Site of the 2001 Royal Massacre — history's most dramatic royal tragedy",
      "Gifts from world leaders spanning the 20th century",
      "Royal carriages, ceremonial weapons and personal effects of the royal family",
      "One of Kathmandu's most undervisited significant museums",
    ],
    significance: "Former Royal Palace of the Shah dynasty (1963–2008)",
    architecturalStyle: "Modernist with Newari elements (1963–70)",
    isFree: false,
    admissionLocal: "NPR 100",
    admissionForeigner: "NPR 500",
    openingHoursSpec: [
      {
        dayOfWeek: ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "11:00",
        closes: "17:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning opening (11am–1pm) when guide tours are most available",
      howToGetThere: "5-minute walk from the Thamel entrance gate; central Kathmandu opposite Thamel",
      whatToWear: "Modest dress appropriate for a royal palace museum; no shorts",
      timeNeeded: "1.5–2 hours",
      photography: "Photography is restricted inside — check with guides on entry",
    },
    insiderTip: "Request a guided tour at the entrance (included in the ticket) — the guides provide context about the royal family and the 2001 massacre that makes the rooms significantly more meaningful than visiting independently.",
    nearbyAttractions: ["Garden of Dreams", "Thamel"],
    ourScore: 8.2,
    featured: false,
    tagSlugs: ["historical","cultural","museum","royal-history"],
    faqs: [
      {
        question: "What happened at Narayanhiti Palace in 2001?",
        answer: "On 1 June 2001, Crown Prince Dipendra shot dead ten members of the royal family — including King Birendra and Queen Aishwarya — in the palace billiard room, before shooting himself. Dipendra survived for three days in a coma (during which he was technically king) before dying. The massacre ended the direct Shah dynasty line and contributed to Nepal's abolition of the monarchy in 2008.",
      },
      {
        question: "Is Narayanhiti Palace Museum worth visiting?",
        answer: "Yes — particularly for those interested in Nepal's recent political history. The palace interiors are genuinely impressive, the royal regalia collection is extensive, and the historical narrative of the Shah dynasty's end is one of modern history's most extraordinary stories.",
      },
      {
        question: "Is the billiard room where the massacre occurred accessible?",
        answer: "The billiard room is included in the standard museum tour. It has been restored to its original state; there are no graphic exhibits, but guides provide an account of the events that occurred there.",
      },
      {
        question: "When is Narayanhiti Palace Museum closed?",
        answer: "The museum is closed on Mondays and on major public holidays. Opening hours are 11am–5pm (last entry 4pm) Tuesday through Sunday.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7172,
    longitude: 85.3194,
    touristType: ["cultural", "historical", "photography"],
  },

  {
    slug: "hanuman-dhoka-museum",
    name: "Hanuman Dhoka Palace Museum",
    nameLocal: "हनुमानढोका दरबार संग्रहालय",
    listingType: "MUSEUM" as ListingType,
    areaSlug: "durbar-square",
    tagline: "Royal museum inside the medieval Malla and Shah palace complex",
    descriptionShort:
      "The Hanuman Dhoka Palace Museum occupies the historic royal palace within Kathmandu Durbar Square — a labyrinth of courtyards, towers and galleries holding royal regalia, weaponry and portraits from Nepal's Malla and Shah dynasties.",
    description: `The Hanuman Dhoka — named for the guardian Hanuman statue at its main gate — was the seat of Kathmandu's Malla kings and later the Shah dynasty's coronation site. The palace complex that survives today is a remarkable accumulation of construction from the 12th through 19th centuries: medieval Newari courtyards with carved wooden pillars and struts, Malla-era audience halls, and later Rana additions.

The museum within the palace comprises several distinct sections accessible through a single ticket. The Tribhuvan Museum commemorates King Tribhuvan, who led Nepal's 1951 democratic revolution that ended Rana autocracy — his personal effects, state rooms and the famous window from which he contacted the Indian Embassy to request asylum are preserved here. The Mahendra Museum covers his successor's reign. Further galleries display royal regalia, weaponry, coronation robes and royal portraits spanning five centuries.

The palace's multiple courtyards are themselves the greatest exhibit: Nasal Chowk, where coronations took place, retains its original carved pillars and latticed windows; Mohan Chowk and Sundari Chowk have ornamental bathing tanks dating to the Malla period. The nine-storey Basantapur Tower — the highest point of the complex — offers aerial views of Durbar Square and the Kathmandu Valley.

The palace was significantly damaged in the 2015 earthquake and restoration is ongoing; some sections remain closed, but the main museum galleries and key courtyards are open.`,
    highlights: [
      "Medieval royal palace complex spanning 12th–19th centuries",
      "Malla and Shah dynasty royal regalia and state portraits",
      "Nasal Chowk — Nepal's coronation courtyard",
      "Nine-storey Basantapur Tower with panoramic views",
      "Tribhuvan Museum — the 1951 democratic revolution story",
      "One of the finest collections of Newari carved architecture in situ",
    ],
    significance: "UNESCO World Heritage Site — Kathmandu Valley (1979)",
    architecturalStyle: "Newari palace complex — 12th to 19th century",
    isFree: false,
    admissionLocal: "NPR 150",
    admissionForeigner: "NPR 1,000 (includes Durbar Square)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Morning (9–11am) before tour groups arrive",
      howToGetThere: "Within Kathmandu Durbar Square — 10-minute walk from Thamel through New Road",
      whatToWear: "Dress modestly; remove shoes inside some gallery areas",
      timeNeeded: "2–3 hours for the full complex",
      photography: "Photography permitted in courtyards; restrictions apply in some galleries",
    },
    insiderTip: "Climb the Basantapur Tower — the entry is included in the museum ticket and the views from the top are among the best in central Kathmandu. The carved windows on each floor are extraordinary details most visitors rush past.",
    nearbyAttractions: ["Kumari Ghar (Living Goddess)", "Kathmandu Durbar Square", "Asan Tole Bazaar"],
    ourScore: 8.3,
    featured: false,
    tagSlugs: ["historical","cultural","museum","unesco-heritage","royal-history"],
    faqs: [
      {
        question: "What is the difference between Hanuman Dhoka and Kathmandu Durbar Square?",
        answer: "Kathmandu Durbar Square is the broader public square containing multiple temples, palaces and monuments. Hanuman Dhoka refers specifically to the royal palace complex within the square — the museum occupies this palace. A single NPR 1,000 ticket covers the entire Durbar Square area including the museum.",
      },
      {
        question: "How much earthquake damage did Hanuman Dhoka sustain?",
        answer: "The 2015 earthquake damaged several structures in the Durbar Square complex significantly, including the Kasthamandap (which collapsed entirely and has since been rebuilt) and parts of the palace. The main museum galleries and key courtyards are open; some peripheral areas remain under restoration.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1598977286459-9cdf6e5be3f7?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7042,
    longitude: 85.3068,
    touristType: ["cultural", "historical", "photography"],
  },

  {
    slug: "natural-history-museum",
    name: "Natural History Museum",
    nameLocal: "प्राकृतिक इतिहास संग्रहालय",
    listingType: "MUSEUM" as ListingType,
    areaSlug: "swayambhunath",
    tagline: "Nepal's natural world — butterflies, birds and Himalayan specimens",
    descriptionShort:
      "The Natural History Museum at Swayambhunath holds Nepal's most comprehensive collection of native fauna — Himalayan wildlife specimens, an extraordinary butterfly collection, bird taxidermy and geological exhibits.",
    description: `Nepal's Natural History Museum sits beside the Swayambhunath complex, operated by Tribhuvan University. It is one of Kathmandu's least-visited museums and one of its most rewarding for those interested in the natural world — particularly the extraordinary biodiversity of Nepal's ecosystems, which compress tropical terai forest, temperate midlands and high-alpine Himalayan habitat into a country smaller than Germany.

The museum's strongest sections are its entomology and ornithology collections. The butterfly gallery holds hundreds of mounted specimens representing Nepal's remarkable lepidoptera diversity — the country hosts over 650 butterfly species, the highest density in the region. The bird collection includes mounted specimens of Nepal's 850+ recorded bird species, including the Himalayan Monal (Nepal's national bird) in its full iridescent plumage.

Mammal specimens include snow leopard, red panda, clouded leopard and various Himalayan deer and antelope species, alongside a modest collection of Himalayan geological specimens and mineralogy.

The museum is small by international standards and the displays are not dramatically curated — this is a university natural history museum rather than a commercial attraction. But the quality of the collections, particularly the insects and birds, is genuinely impressive, and for naturalists heading into the field in Nepal, it provides excellent preparation.`,
    highlights: [
      "Most comprehensive collection of Nepal's native fauna",
      "Butterfly gallery — 650+ species from tropical terai to alpine zones",
      "Bird collection covering all of Nepal's 850+ recorded species",
      "Snow leopard, red panda and Himalayan mammal specimens",
      "Operated by Tribhuvan University — scholarly depth",
      "Located beside Swayambhunath — combine with stupa visit",
    ],
    significance: "Nepal's primary natural history collection, Tribhuvan University",
    isFree: false,
    admissionLocal: "NPR 50",
    admissionForeigner: "NPR 200",
    openingHoursSpec: [
      {
        dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "10:00",
        closes: "17:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Any time — it's indoors and uncrowded",
      howToGetThere: "Immediately below Swayambhunath Stupa — combine with a stupa visit; 20-min taxi from Thamel",
      whatToWear: "Casual",
      timeNeeded: "1–1.5 hours",
      photography: "Photography permitted throughout",
    },
    insiderTip: "The butterfly collection is genuinely world-class — the range from lowland jungle species to alpine meadow varieties illustrates Nepal's extraordinary ecological compression more clearly than any textbook. If you're birdwatching in Nepal, the bird gallery gives you an invaluable visual reference for field identification.",
    nearbyAttractions: ["Swayambhunath Stupa"],
    ourScore: 7.4,
    featured: false,
    tagSlugs: ["museum","wildlife","off-the-beaten-path","kid-friendly"],
    faqs: [
      {
        question: "Is the Natural History Museum suitable for children?",
        answer: "Yes — children are typically fascinated by the butterfly and insect collections and the large mammal specimens. The museum is small enough not to overwhelm younger visitors. Entry costs are minimal.",
      },
      {
        question: "Is the Natural History Museum worth visiting?",
        answer: "For naturalists, birdwatchers and anyone curious about Nepal's remarkable biodiversity, yes — genuinely. For general tourists, it's a good complement to the Swayambhunath visit rather than a standalone destination.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.7149,
    longitude: 85.2900,
    touristType: ["wildlife", "family", "photography"],
  },

  {
    slug: "woodcarving-museum-bhaktapur",
    name: "Woodcarving Museum",
    nameLocal: "काष्ठकला संग्रहालय",
    listingType: "MUSEUM" as ListingType,
    areaSlug: "bhaktapur",
    tagline: "The finest collection of traditional Newari woodcarving in existence",
    descriptionShort:
      "Bhaktapur's Woodcarving Museum holds the finest collection of traditional Newari woodcarving outside the temples themselves — intricate peacock windows, deity carvings and architectural elements spanning eight centuries.",
    description: `The Woodcarving Museum in Bhaktapur occupies a traditional Newari building within the Durbar Square complex and holds what is arguably the finest collection of Newari carved woodwork under a single roof anywhere in the world.

Newari woodcarving is one of the great craft traditions of Asia — the intricately carved window screens, deity panels, temple struts and door frames of the Kathmandu Valley represent a technical and artistic tradition stretching from the Licchavi period (4th–9th centuries) through the Malla era into the present day. The carved peacock window of Bhaktapur — reproduced on Nepal's old currency — is the tradition's most famous single work.

The museum's collection includes architectural elements salvaged from temples and palaces, devotional carvings from private houses, door frames carved with deities and narrative scenes, window screens in various stages of completion, and comparative examples showing the evolution of style across centuries. The building itself — a restored Newari courtyard house — is an exhibit in its own right.

A key function of the museum is its connection to living craft: Bhaktapur remains one of the last places where Newari woodcarving is practiced as a living tradition rather than a tourist souvenir industry, and the museum provides context for the workshops and artisans still working in the old city's alleys.`,
    highlights: [
      "World's finest collection of traditional Newari woodcarving",
      "Original peacock window-style carvings (Bhaktapur's most famous motif)",
      "Architectural elements spanning 8 centuries of craft history",
      "Building itself is a restored historic Newari courtyard house",
      "Context for Bhaktapur's living woodcarving tradition",
      "Located within Bhaktapur Durbar Square complex",
    ],
    significance: "Primary repository of Newari woodcarving heritage",
    architecturalStyle: "Traditional Newari courtyard house",
    isFree: false,
    admissionLocal: "NPR 50",
    admissionForeigner: "NPR 100 (Bhaktapur entry ticket covers most sites)",
    openingHoursSpec: [
      {
        dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "10:00",
        closes: "17:00",
      },
    ],
    bestMonths: [10, 11, 3, 4],
    visitorTips: {
      bestTime: "Combine with a full Bhaktapur Durbar Square visit in the morning",
      howToGetThere: "Within Bhaktapur Durbar Square — 30-40 minute taxi from Kathmandu (NPR 700–1000)",
      whatToWear: "Casual",
      timeNeeded: "45 minutes to 1 hour",
      photography: "Photography permitted; close-up detail shots of the carvings are rewarding",
    },
    insiderTip: "After the museum, walk into the surrounding alleys of Bhaktapur's old city and look for woodcarvers' workshops — several families still practice the craft commercially. The museum gives you the visual vocabulary to understand what you're watching.",
    nearbyAttractions: ["Bhaktapur Durbar Square", "Pottery Square Bhaktapur"],
    ourScore: 8.0,
    featured: false,
    tagSlugs: ["museum","cultural","historical","art-and-craft"],
    faqs: [
      {
        question: "What is the famous peacock window of Bhaktapur?",
        answer: "The Royal Peacock Window (at the Palace of 55 Windows) is the most famous example of Newari woodcarving — an intricately carved window screen depicting a peacock surrounded by deities and foliage, considered the finest piece of woodcarving in Nepal. It appeared on old Nepali currency and is the symbol of Bhaktapur's craft tradition. The woodcarving museum holds similar examples and provides essential context.",
      },
      {
        question: "Is the Woodcarving Museum in Bhaktapur worth visiting?",
        answer: "Yes — particularly alongside a walk through Bhaktapur's old city, where carved temples and doorways are visible on every street. The museum provides historical context and close-up access to pieces not accessible on temple facades.",
      },
      {
        question: "How far is Bhaktapur from Kathmandu?",
        answer: "About 13 km east of Kathmandu centre — 30–40 minutes by taxi (NPR 700–1,000 each way) or 45 minutes by local bus from Ratna Park (NPR 25). Bhaktapur charges a separate entry fee (NPR 1,500 for foreigners) which covers the Durbar Square complex and most museums.",
      },
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1612197527762-8cfb4453b39e?auto=format&fit=crop&w=1200&q=80",
    latitude: 27.6726,
    longitude: 85.4278,
    touristType: ["cultural", "historical", "photography"],
  },
];

// ─────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────

async function seedAttraction(
  data: (typeof attractions)[0],
  areaMap: Map<string, string>,
  tagMap: Map<string, string>,
) {
  const areaId = areaMap.get(data.areaSlug);

  const listingData: any = {
    slug: data.slug,
    status: "PUBLISHED" as Status,
    listingType: data.listingType,
    name: data.name,
    nameLocal: data.nameLocal ?? null,
    tagline: data.tagline ?? null,
    description: data.description,
    descriptionShort: data.descriptionShort,
    areaId,
    coverImageUrl: data.coverImageUrl,
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
    isFree: data.isFree,
    admissionLocal: data.admissionLocal ?? null,
    admissionForeigner: data.admissionForeigner ?? null,
    openingHoursSpec: data.openingHoursSpec ?? null,
    bestMonths: data.bestMonths ?? [],
    highlights: data.highlights ?? [],
    visitorTips: data.visitorTips ?? {},
    nearbyAttractions: data.nearbyAttractions ?? [],
    insiderTip: data.insiderTip ?? null,
    significance: data.significance ?? null,
    architecturalStyle: data.architecturalStyle ?? null,
    deityOrSubject: data.deityOrSubject ?? null,
    eventCalendar: data.eventCalendar ?? [],
    history: data.history ?? null,
    touristType: data.touristType ?? [],
    difficulty: (data as any).difficulty ?? null,
    ourScore: data.ourScore ?? null,
    featured: data.featured,
    verified: true,
    publishedAt: new Date(),
    metaTitle: `${data.name} — Kathmandu Visitor Guide | kathmandu.im`,
    metaDescription: data.descriptionShort,
  };

  const listing = await prisma.listing.upsert({
    where: { slug: data.slug },
    update: listingData,
    create: listingData,
  });

  await connectListingTags(prisma, listing.id, data.tagSlugs, tagMap);
  await upsertFAQs(prisma, "LISTING", "listingId", listing.id, data.faqs);

  return listing;
}

export async function seedAttractions() {
  console.log("🏛  Seeding attractions...");

  const [tagMap, areaMap] = await Promise.all([
    buildTagMap(prisma),
    buildAreaMap(prisma),
  ]);

  let count = 0;
  for (const attraction of attractions) {
    await seedAttraction(attraction, areaMap, tagMap);
    count++;
    process.stdout.write(`  ✓ ${attraction.name}\n`);
  }

  console.log(`✅ Attractions seeded: ${count} listings`);
}
