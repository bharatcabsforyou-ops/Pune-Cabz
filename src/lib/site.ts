const DEFAULT_HERO_VIDEO_CDN =
  "https://assets.mixkit.co/videos/preview/mixkit-view-from-the-windshield-of-a-car-driving-4249-large.mp4";

export const site = {
  name: "Pune Cabz",
  phone: "+91 62058 78945",
  phoneHref: "tel:+916205878945",
  email: "support@punecabz.in",
  emailHref: "mailto:support@punecabz.in",
  address: "Koregaon Park, Pune",
  addressLine: "Lane 7, North Main Road, Koregaon Park",
  city: "Pune, Maharashtra 411001",
  whatsapp: "916205878945",
  whatsappHref:
    "https://wa.me/916205878945?text=Hi%20Pune%20Cabz%2C%20I%20need%20help%20with%20a%20ride.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Koregaon+Park+Pune",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=73.880%2C18.528%2C73.910%2C18.548&layer=mapnik&marker=18.5362%2C73.8939",
  /** Hero video: env override, or local mp4 in dev, or CDN on Vercel production */
  heroVideoUrl:
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
    (process.env.NODE_ENV === "production" ? DEFAULT_HERO_VIDEO_CDN : "/hero-bg.mp4"),
};
