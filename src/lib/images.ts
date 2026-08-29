function unsplash(id: string, width = 1400) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${width}`;
}

export const films = [
  { src: "/image1.jpg", title: "Pune city", caption: "Shaniwar Wada to your doorstep" },
  { src: "/image2.jpg", title: "Pune to Mumbai", caption: "Comfortable rides. Every time." },
  { src: "/image3.jpg", title: "Pune to Nashik", caption: "Every ride. Every time." },
  { src: "/image4.jpg", title: "Pune to Konkan", caption: "Scenic routes. Smooth rides." },
  { src: "/image5.jpg", title: "Pune to Mahabaleshwar", caption: "Scenic journeys. Unforgettable memories." },
] as const;

export const images = {
  logo: "/logo.png",
  heroBg: "/hero-bg.jpg",
  heroVideo: "/hero-bg.mp4",
  film1: "/image1.jpg",
  film2: "/image2.jpg",
  film3: "/image3.jpg",
  film4: "/image4.jpg",
  film5: "/image5.jpg",
  heroDrive: "/image1.jpg",
  everydayCar: "/image4.jpg",
  cityStreet: "/image3.jpg",
  bridge: "/image2.jpg",

  teamLaptops: unsplash("1522071820081-009f0129c71c"),
  teamCabin: unsplash("1521737604893-d14cc237f11d"),
  teamPresent: unsplash("1556761175-5973dc0f32e7"),
  teamHighFive: unsplash("1600880292203-757bb62b4baf"),
  handshake: unsplash("1521791136064-7986c2920216"),
  friendsTable: unsplash("1543269865-cbf427effbad"),

  portraitPriya: unsplash("1531123897727-8f129e1688ce"),
  portraitAnjali: unsplash("1573497019940-1c28c88b4f3e"),
  portraitArjun: unsplash("1519085360753-af0119f7cbe7"),
  portraitVikram: unsplash("1560250097-0b93528c311a"),
  portraitMeera: unsplash("1580489944761-15a19d654956"),
  portraitNeha: unsplash("1607746882042-944635dfe10e"),
  portraitRohan: unsplash("1633332755192-727a05c4013d"),
  portraitKabir: unsplash("1595152772835-219674b2a8a6"),
  portraitAmit: unsplash("1600180758890-6b94519a8ba6"),
  portraitDivya: unsplash("1548142813-c348350df52b"),

  worldMap: unsplash("1524661135-423995f22d0b"),
  contactTiles: unsplash("1596524430615-b46475ddff6e"),
  building: unsplash("1487958449943-2429e8be8625"),
};
