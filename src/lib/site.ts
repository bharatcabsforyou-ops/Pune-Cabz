export const site = {
  name: "Pune Cabz",
  phone: "+91 95959 33899",
  phoneHref: "tel:+919595933899",
  email: "support@punecabz.in",
  emailHref: "mailto:support@punecabz.in",
  address: "Koregaon Park, Pune",
  addressLine: "Lane 7, North Main Road, Koregaon Park",
  city: "Pune, Maharashtra 411001",
  whatsapp: "919595933899",
  whatsappHref:
    "https://wa.me/919595933899?text=Hi%20Pune%20Cabz%2C%20I%20need%20help%20with%20a%20ride.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Koregaon+Park+Pune",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=73.880%2C18.528%2C73.910%2C18.548&layer=mapnik&marker=18.5362%2C73.8939",
  /** Hero background video — optional env override for external CDN */
  heroVideoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/hero-bg.mp4",
};
