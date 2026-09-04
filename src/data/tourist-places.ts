import { unsplash } from "@/lib/images";

export type TouristPlace = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  whyCab?: string;
  fromPune: string;
  fromMumbai: string;
  stops: string[];
  category: "Hill station" | "Coastal" | "Pilgrimage" | "Monsoon" | "Heritage";
  image: string;
};

/** Order: Lonavala first, Tamhini Ghat right after Lonavala */
export const touristPlaces: TouristPlace[] = [
  {
    id: "lonavala",
    name: "Lonavala",
    tagline: "Escape to Lonavala: Your Perfect Weekend Road Trip",
    description:
      "Swap the city hustle for misty hills and a scenic drive. Nestled in the Sahyadri mountains, Lonavala is Maharashtra’s favorite hill station, famous for lush valleys, historic forts, and its iconic sweet chikki.",
    whyCab:
      "Enjoy the breathtaking views of the Mumbai-Pune Expressway from the comfort of the backseat. With our dedicated cab service, you get door-to-door pickups, a local driver to effortlessly navigate the ghat roads, and the freedom to hop between tourist spots and highway food joints entirely at your own pace.",
    fromPune: "~65–67 km (Approx. 1.5 hours)",
    fromMumbai: "~83–88 km (Approx. 2 hours)",
    stops: ["Tiger Point", "Bhushi Dam", "Lohagad Fort", "Pawna Lake"],
    category: "Hill station",
    image: unsplash("1506905925346-21bda4d32df4"),
  },
  {
    id: "tamhini-ghat",
    name: "Tamhini Ghat",
    tagline: "The Ultimate Monsoon Road Trip",
    description:
      "Stretching between Mulshi and the Konkan region, Tamhini Ghat is a breathtaking mountain pass that truly comes alive during the rainy season. Famous for its dramatic, cloud-kissed valleys, dense emerald forests, and roaring waterfalls at every turn, it is an absolute delight for nature lovers and road-trippers.",
    fromPune: "~70 km (Approx. 2 hours)",
    fromMumbai: "~140 km (Approx. 3.5 hours)",
    stops: [
      "Mulshi Lake",
      "Plus Valley viewpoint",
      "Roadside waterfalls",
      "Devkund Waterfall base",
      "Andharban trek base",
    ],
    category: "Monsoon",
    image: unsplash("1544551763-46a013bb70d5"),
  },
  {
    id: "panchgani",
    name: "Panchgani",
    tagline: "Volcanic plateaus & berry farms",
    description:
      "Famous for its massive volcanic plateaus and lush berry farms, Panchgani is a charming hill station offering fresh mountain air and stunning panoramic views. It’s the perfect retreat for nature lovers, families, and foodies alike.",
    fromPune: "~100 km (Approx. 2 hours)",
    fromMumbai: "~244 km (Approx. 4.5 hours)",
    stops: [
      "Table Land (Asia's second-longest mountain plateau)",
      "Sydney Point",
      "Parsi Point",
      "Mapro Garden",
    ],
    category: "Hill station",
    image: unsplash("1464822759023-fed622ff2c3b"),
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar",
    tagline: "Evergreen forests, cliffs & strawberry farms",
    description:
      "Perched high in the Western Ghats, Mahabaleshwar is famous for its sprawling evergreen forests, dramatic cliffs, historic temples, and legendary strawberry farms. It is the ultimate mountain getaway for families, couples, and weekend travelers.",
    fromPune: "~120 km (Approx. 3 hours)",
    fromMumbai: "~260 km (Approx. 5.5 hours)",
    stops: [
      "Arthur’s Seat",
      "Venna Lake",
      "Pratapgad Fort",
      "Elephant’s Head Point",
      "Old Mahabaleshwar Temple",
    ],
    category: "Hill station",
    image: unsplash("1441974231531-c6227db76b6e"),
  },
  {
    id: "wai",
    name: "Wai",
    tagline: "A Historic Temple Town & Bollywood's Favorite Backdrop",
    description:
      'Situated on the peaceful banks of the Krishna River, Wai is a beautiful heritage town celebrated for its ancient temples, scenic river ghats, and lush countryside. Often referred to as "Dakshin Kashi," its rustic, untouched charm has made it a highly popular shooting location for blockbuster Bollywood movies like Swades, Dabangg, and Chennai Express.',
    fromPune: "~85 km (Approx. 2 hours)",
    fromMumbai: "~230 km (Approx. 4.5 hours)",
    stops: [
      "Dholya Ganpati Temple",
      "Menawali Ghat (iconic film location)",
      "Dhom Dam (boating and camping)",
      "Nana Phadnavis Wada",
    ],
    category: "Heritage",
    image: unsplash("1548013146-72479768bada"),
  },
  {
    id: "alibag",
    name: "Alibag",
    tagline: "A Charming Coastal Escape",
    description:
      "Famous for its sun-kissed beaches, historic sea forts, and mouth-watering seafood, Alibaug is a relaxed coastal town perfect for a quick beach escape. With its laid-back vibe and coconut-tree-lined roads, it is the ultimate weekend getaway for beach bums and history lovers alike.",
    fromPune: "~145 km (Approx. 3.5 hours)",
    fromMumbai: "~95 km by road (Approx. 2.5 hours) or a quick Ro-Ro ferry ride",
    stops: [
      "Kolaba Fort (boat / low tide walk)",
      "Varsoli Beach water sports",
      "Nagaon Beach",
      "Murud-Janjira View Point",
      "Murud-Janjira Fort",
    ],
    category: "Coastal",
    image: unsplash("1507525428034-b723cf961d3e"),
  },
  {
    id: "matheran",
    name: "Matheran",
    tagline: "Asia's Only Automobile-Free Hill Station",
    description:
      "Step back in time at Matheran, a peaceful, vehicle-free eco-sensitive zone perched in the Sahyadri mountains. Famous for its red dirt paths, colonial-era architecture, and dense forest trails, it is the ultimate destination to detox from city noise and pollution.",
    fromPune: "~120 km (Approx. 3 hours)",
    fromMumbai: "~89 km (Approx. 2.5 hours)",
    stops: [
      "Charlotte Lake",
      "Panorama Point (360° views)",
      "Echo Point",
      "Neral-Matheran Toy Train",
    ],
    category: "Hill station",
    image: unsplash("1472214103451-9374bd1c798e"),
  },
  {
    id: "lavasa",
    name: "Lavasa",
    tagline: "India’s Very Own Italian Riviera",
    description:
      "Tucked away in the Mose Valley of the Western Ghats, Lavasa is India’s first planned hill city, beautifully modeled after the Italian town of Portofino. With its vibrant, colorful buildings set against a stunning lakeside promenade, it’s a picture-perfect destination for romantic getaways, family picnics, and leisurely weekends.",
    fromPune: "~65 km (Approx. 2 hours)",
    fromMumbai: "~187 km (Approx. 4.5 hours)",
    stops: [
      "Lakeside Promenade",
      "Dasve Viewpoint",
      "Temghar Dam",
      "Water sports on Dasve Lake",
    ],
    category: "Hill station",
    image: unsplash("1501785888041-af3ef285b470"),
  },
  {
    id: "malshej-ghat",
    name: "Malshej Ghat",
    tagline: "A Magical Monsoon Wonderland",
    description:
      "Nestled in the rugged ranges of the Western Ghats, Malshej Ghat is a breathtaking mountain pass renowned for its dramatic landscapes, misty valleys, and countless cascading waterfalls. It is a haven for nature enthusiasts, trekkers, and bird watchers—especially during the monsoon when the entire region bursts into vibrant greenery.",
    fromPune: "~120 km (Approx. 3 hours)",
    fromMumbai: "~126 km (Approx. 3.5 hours)",
    stops: [
      "Malshej Falls",
      "Pimpalgaon Joga Dam (seasonal flamingos)",
      "Harishchandragad Fort",
      "Ajoba Hill Fort",
    ],
    category: "Monsoon",
    image: unsplash("1439066615861-d1af74d74000"),
  },
  {
    id: "jejuri",
    name: "Jejuri",
    tagline: "The Golden Temple Town of Maharashtra",
    description:
      'Steeped in vibrant history and spiritual devotion, Jejuri is famously known as "Sonyachi Jejuri" (Golden Jejuri). Home to the revered Lord Khandoba Temple, the town transforms into a breathtaking cloud of golden yellow during festivals as devotees joyously toss sacred turmeric (bhandara) into the air. It is a culturally rich and visually stunning pilgrimage destination.',
    fromPune: "~50 km (Approx. 1.5 hours)",
    fromMumbai: "~200 km (Approx. 4 hours)",
    stops: [
      "Khandoba Temple (~400 steps)",
      "Deepmalas (stone light pillars)",
      "Malhar Gautameshwar Temple",
      "Purandar Fort",
    ],
    category: "Pilgrimage",
    image: unsplash("1469474968028-56623f02e42e"),
  },
  {
    id: "balaji-ketkawale",
    name: "Sri Balaji Mandir",
    tagline: "The Tirupati of Maharashtra",
    description:
      "Experience the divine aura of Tirumala right here in the Sahyadris. Located at Ketkawale, just a short drive from Narayanpur, the Prati Balaji Temple is a stunning, exact replica of the famous Tirupati Balaji Temple. Known for its immaculate cleanliness, intricate wooden carvings, and deeply peaceful ambiance, it offers a perfect spiritual day trip away from the city.",
    fromPune: "~45 km (Approx. 1.5 hours)",
    fromMumbai: "~195 km (Approx. 4 hours)",
    stops: [
      "Prati Balaji Temple (Tirupati-style Laddu & Mahaprasad)",
      "Ek Mukhi Datta Mandir, Narayanpur",
      "Baneshwar Shiva Temple",
    ],
    category: "Pilgrimage",
    image: unsplash("1621506289937-a8e4df240d0b"),
  },
  {
    id: "prati-shirdi",
    name: "Prati Shirdi (Shirgaon)",
    tagline: "A Peaceful Sai Baba Pilgrimage",
    description:
      "Experience the divine tranquility of Shirdi without the long overnight journey. Located in Shirgaon just off the Mumbai-Pune highway, Prati Shirdi is a stunning, exact replica of the original Sai Baba Temple. Complete with its own Gurusthan, Dwarkamai, and Chavadi, it offers devotees a deeply spiritual, pristine, and uncrowded atmosphere.",
    fromPune: "~30 km (Approx. 1 hour)",
    fromMumbai: "~115 km (Approx. 2.5 hours)",
    stops: [
      "Samadhi Mandir",
      "Gurusthan Neem Tree",
      "Dwarkamai Mosque",
      "Annachhatra Mahaprasad",
    ],
    category: "Pilgrimage",
    image: unsplash("1609137144813-7d9921338f24"),
  },
];
