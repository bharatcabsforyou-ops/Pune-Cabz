export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=${width}`;
}

/** Local route artwork with embedded text — must not be cropped */
export function isBrandedRouteBanner(src: string) {
  return /\/image\d+\.(jpeg|png)$/i.test(src);
}

export const films = [
  { src: "/image1.jpeg",  title: "Pune city",             caption: "Shaniwar Wada to your doorstep" },
  { src: "/image2.jpeg",  title: "Pune to Mumbai",         caption: "Comfortable rides. Every time." },
  { src: "/image3.png",   title: "Pune to Nashik",         caption: "Every ride. Every time." },
  { src: "/image4.jpeg",  title: "Pune to Konkan",         caption: "Scenic routes. Smooth rides." },
  { src: "/iamge5.png",   title: "Pune to Mahabaleshwar",  caption: "Scenic journeys. Unforgettable memories." },
  { src: "/image6.png",   title: "Pune to Lonavala",       caption: "Hill escapes made easy." },
  { src: "/image7.png",   title: "Pune to Shirdi",         caption: "Peaceful journeys to sacred places." },
  { src: "/image8.png",   title: "Pune to Kolhapur",       caption: "Smooth rides across Maharashtra." },
  { src: "/image9.png",   title: "Pune to Aurangabad",     caption: "Heritage routes, reliable cabs." },
  { src: "/image10.png",  title: "Pune to Goa",            caption: "Coastal drives done right." },
  { src: "/image11.png",  title: "Pune to Satara",         caption: "Your comfort, our priority." },
] as const;

/**
 * Travel visuals — local branded route images load reliably on all networks.
 */
export const travel = {
  highway:     "/image2.jpeg",
  hills:       "/iamge5.png",
  coast:       "/image4.jpeg",
  city:        "/image1.jpeg",
  cab:         "/image2.jpeg",
  scenicRoad:  "/image3.png",
  driveView:   "/image6.png",
  mountainRoad:"/image7.png",
  openRoad:    "/image8.png",
  heritage:    "/image9.png",
  coastal:     "/image10.png",
  satara:      "/image11.png",
} as const;

export const images = {
  logo: "/logo2.png",
  /** Cropped actual logo with transparent bg for white navbar */
  logoNav: "/logo2-nav.png",
  heroBg: "/hero-bg.jpg",
  heroVideo: "/hero-bg.mp4",
  film1:  "/image1.jpeg",
  film2:  "/image2.jpeg",
  film3:  "/image3.png",
  film4:  "/image4.jpeg",
  film5:  "/iamge5.png",
  film6:  "/image6.png",
  film7:  "/image7.png",
  film8:  "/image8.png",
  film9:  "/image9.png",
  film10: "/image10.png",
  film11: "/image11.png",
  heroDrive:   "/image1.jpeg",
  everydayCar: "/image4.jpeg",
  cityStreet:  "/image3.png",
  bridge:      "/image2.jpeg",

  travelHighway:    travel.highway,
  travelHills:      travel.hills,
  travelCoast:      travel.coast,
  travelCity:       travel.city,
  travelCab:        travel.cab,
  travelScenicRoad: travel.scenicRoad,
  travelDriveView:  travel.driveView,
  travelMountainRoad: travel.mountainRoad,
  travelOpenRoad:   travel.openRoad,
  travelHeritage:   travel.heritage,
  travelCoastal:    travel.coastal,
  travelSatara:     travel.satara,

  teamLaptops: unsplash("1522071820081-009f0129c71c"),
  teamPresent: unsplash("1556761175-5973dc0f32e7"),
  teamHighFive: unsplash("1600880292203-757bb62b4baf"),
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
  building: unsplash("1487958449943-2429e8be8625"),
};
