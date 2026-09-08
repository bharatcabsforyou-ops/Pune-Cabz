import { en, type MessageKey } from "@/lib/i18n/en";
import type { Locale } from "@/lib/i18n/config";
import { images, unsplash } from "@/lib/images";

export type ContentPageId =
  | "home"
  | "about"
  | "services"
  | "packages"
  | "fleet"
  | "hotels"
  | "tourism"
  | "safety"
  | "faq"
  | "contact"
  | "book"
  | "site";

export type ContentField = {
  key: MessageKey;
  label: string;
  multiline?: boolean;
  section?: string;
};

export type ContentImageField = {
  /** Stored as img.{id} in site_content */
  id: string;
  label: string;
  defaultUrl: string;
  section?: string;
};

export type ContentPageDef = {
  id: ContentPageId;
  label: string;
  previewHref: string;
  previewLabel: string;
  description: string;
  fields: ContentField[];
  images?: ContentImageField[];
};

type PrefixGroup = {
  section: string;
  prefixes: string[];
};

export function contentImageKey(id: string) {
  return `img.${id}`;
}

export function isContentImageKey(key: string) {
  return key.startsWith("img.");
}

function humanLabel(key: MessageKey): string {
  const parts = key.split(".");
  const tail = parts.slice(1).join(" · ") || parts[0];
  return tail
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isMultiline(key: MessageKey, value: string): boolean {
  if (value.length > 72) return true;
  return /(desc|body|text|p\d|note|quote|a\d|offer|subtitle)$/i.test(key);
}

function matchesPrefix(key: string, prefix: string): boolean {
  return key === prefix || key.startsWith(`${prefix}.`);
}

/** Every MessageKey under these prefixes — nothing missing for that page. */
function fieldsFromGroups(groups: PrefixGroup[]): ContentField[] {
  const allKeys = Object.keys(en) as MessageKey[];
  const fields: ContentField[] = [];
  const used = new Set<MessageKey>();

  for (const group of groups) {
    for (const key of allKeys) {
      if (used.has(key)) continue;
      if (!group.prefixes.some((p) => matchesPrefix(key, p))) continue;
      used.add(key);
      fields.push({
        key,
        label: humanLabel(key),
        multiline: isMultiline(key, en[key]),
        section: group.section,
      });
    }
  }

  return fields;
}

/** All marketing + site copy editable from admin sidebar */
export const CONTENT_PAGES: ContentPageDef[] = [
  {
    id: "home",
    label: "Home",
    previewHref: "/",
    previewLabel: "Homepage",
    description: "Every homepage section — hero, trust, booking steps, why us, explore, routes, reviews, CTAs.",
    images: [
      { id: "home.heroBg", label: "Hero background", defaultUrl: images.heroBg, section: "Hero" },
      { id: "home.exploreBook", label: "Explore — Book card", defaultUrl: images.travelCab, section: "Explore" },
      {
        id: "home.exploreTourism",
        label: "Explore — Tourism card",
        defaultUrl: images.travelHills,
        section: "Explore",
      },
      {
        id: "home.exploreSafe",
        label: "Explore — Safety card",
        defaultUrl: images.travelOpenRoad,
        section: "Explore",
      },
      {
        id: "home.neverMiss",
        label: "Never miss a ride image",
        defaultUrl: images.film2,
        section: "Never miss a ride",
      },
    ],
    fields: fieldsFromGroups([
      { section: "Hero", prefixes: ["hero"] },
      { section: "Trust bar", prefixes: ["trustBar"] },
      { section: "Booking process", prefixes: ["bookingProcess"] },
      { section: "How it works", prefixes: ["howItWorks"] },
      { section: "Why travel / ride with us", prefixes: ["whyTravel"] },
      { section: "Why choose / services strip", prefixes: ["whyChoose"] },
      { section: "Destinations marquee", prefixes: ["marquee"] },
      { section: "Popular routes strip", prefixes: ["popular", "routes"] },
      { section: "Explore", prefixes: ["explore"] },
      { section: "Reviews", prefixes: ["reviews"] },
      { section: "Home CTA", prefixes: ["homeCta"] },
      { section: "Never miss a ride", prefixes: ["neverMiss"] },
      { section: "At a glance", prefixes: ["glance"] },
    ]),
  },
  {
    id: "about",
    label: "About",
    previewHref: "/about",
    previewLabel: "About",
    description: "About hero, story, goal & vision, stats, and CTA.",
    images: [
      { id: "about.hero", label: "About hero image", defaultUrl: images.film1, section: "About hero" },
      {
        id: "about.story",
        label: "Our story image",
        defaultUrl: unsplash("1485291571150-772bcfc10da5"),
        section: "Our story",
      },
    ],
    fields: fieldsFromGroups([
      { section: "About hero", prefixes: ["aboutHero"] },
      { section: "Our story", prefixes: ["about"] },
      { section: "Goal & vision", prefixes: ["values"] },
      { section: "Stats", prefixes: ["stats"] },
      { section: "About CTA", prefixes: ["aboutCta"] },
    ]),
  },
  {
    id: "services",
    label: "Our Services",
    previewHref: "/our-services",
    previewLabel: "Services",
    description: "Full services page — hero, chips, trip day, FAQ block, CTA.",
    images: [
      {
        id: "services.hero",
        label: "Services hero image",
        defaultUrl: images.film2,
        section: "Services page",
      },
      {
        id: "services.faq",
        label: "Services FAQ image",
        defaultUrl: images.travelHills,
        section: "Services page",
      },
    ],
    fields: fieldsFromGroups([{ section: "Services page", prefixes: ["services"] }]),
  },
  {
    id: "packages",
    label: "Packages",
    previewHref: "/packages",
    previewLabel: "Packages",
    description: "Packages page headings, buttons, and package card images.",
    images: [
      { id: "packages.hatchback", label: "Hatchback image", defaultUrl: "/image2.jpeg", section: "Package images" },
      { id: "packages.sedan", label: "Sedan image", defaultUrl: "/image1.jpeg", section: "Package images" },
      { id: "packages.suv", label: "SUV image", defaultUrl: "/image8.png", section: "Package images" },
      { id: "packages.carens", label: "Kia Carens image", defaultUrl: "/image11.png", section: "Package images" },
      { id: "packages.innova", label: "Toyota Innova image", defaultUrl: "/image3.png", section: "Package images" },
      { id: "packages.crysta", label: "Innova Crysta image", defaultUrl: "/image3.png", section: "Package images" },
      { id: "packages.scorpio", label: "Scorpio / Tavera image", defaultUrl: "/image4.jpeg", section: "Package images" },
      { id: "packages.tempo", label: "Tempo Traveller image", defaultUrl: "/image6.png", section: "Package images" },
      { id: "packages.urbania", label: "Urbania image", defaultUrl: "/image6.png", section: "Package images" },
      { id: "packages.bus", label: "Bus image", defaultUrl: "/image9.png", section: "Package images" },
    ],
    fields: fieldsFromGroups([{ section: "Packages page", prefixes: ["packages"] }]),
  },
  {
    id: "fleet",
    label: "Fleet",
    previewHref: "/about/fleet",
    previewLabel: "Fleet",
    description: "Fleet page headings, vehicle notes, and vehicle images.",
    images: [
      { id: "fleet.hero", label: "Fleet hero image", defaultUrl: "/image8.png", section: "Fleet page" },
      { id: "fleet.hatchback", label: "Hatchback image", defaultUrl: "/image2.jpeg", section: "Vehicle images" },
      { id: "fleet.sedan", label: "Sedan image", defaultUrl: "/image1.jpeg", section: "Vehicle images" },
      { id: "fleet.suv", label: "SUV image", defaultUrl: "/image8.png", section: "Vehicle images" },
      { id: "fleet.premiumSuv", label: "Premium SUV image", defaultUrl: "/image3.png", section: "Vehicle images" },
      { id: "fleet.tempo", label: "Tempo Traveller image", defaultUrl: "/image6.png", section: "Vehicle images" },
      { id: "fleet.urbania", label: "Urbania image", defaultUrl: "/image6.png", section: "Vehicle images" },
      { id: "fleet.bus", label: "Bus image", defaultUrl: "/image9.png", section: "Vehicle images" },
    ],
    fields: fieldsFromGroups([{ section: "Fleet page", prefixes: ["fleet"] }]),
  },
  {
    id: "hotels",
    label: "Hotels & Flights",
    previewHref: "/hotels",
    previewLabel: "Hotels",
    description: "Full hotels & flights page copy.",
    fields: fieldsFromGroups([{ section: "Hotels & flights", prefixes: ["hotels"] }]),
  },
  {
    id: "tourism",
    label: "Tourism copy",
    previewHref: "/tourism",
    previewLabel: "Tourism",
    description: "Tourism page headings and section text (destination cards are under Tourism trips).",
    images: [
      {
        id: "tourism.hero",
        label: "Tourism hero image",
        defaultUrl: images.travelHills,
        section: "Tourism page",
      },
    ],
    fields: fieldsFromGroups([{ section: "Tourism page", prefixes: ["tourism"] }]),
  },
  {
    id: "safety",
    label: "Safety",
    previewHref: "/about/safety",
    previewLabel: "Safety",
    description: "Full trust & safety page copy.",
    images: [
      {
        id: "safety.hero",
        label: "Safety hero image",
        defaultUrl: images.travelDriveView,
        section: "Safety page",
      },
      {
        id: "safety.friends",
        label: "Travelling together image",
        defaultUrl: images.friendsTable,
        section: "Safety page",
      },
    ],
    fields: fieldsFromGroups([{ section: "Safety page", prefixes: ["safety"] }]),
  },
  {
    id: "faq",
    label: "FAQ",
    previewHref: "/about/faq",
    previewLabel: "FAQ",
    description: "FAQ intro and all questions & answers.",
    fields: fieldsFromGroups([
      { section: "FAQ page", prefixes: ["faqPage"] },
      { section: "Questions & answers", prefixes: ["faq"] },
    ]),
  },
  {
    id: "contact",
    label: "Contact",
    previewHref: "/contact",
    previewLabel: "Contact",
    description: "Contact hero, cards, form labels, and cities we serve.",
    images: [
      {
        id: "contact.form",
        label: "Contact form side image",
        defaultUrl: images.travelDriveView,
        section: "Contact form",
      },
    ],
    fields: fieldsFromGroups([
      { section: "Contact hero & cards", prefixes: ["contact"] },
      { section: "Contact form", prefixes: ["contactForm"] },
      { section: "Cities we serve", prefixes: ["hubs"] },
    ]),
  },
  {
    id: "book",
    label: "Book page",
    previewHref: "/book",
    previewLabel: "Book",
    description: "Book page headings, route gallery text, and booking form labels.",
    fields: fieldsFromGroups([
      { section: "Book hero", prefixes: ["book"] },
      { section: "Route gallery", prefixes: ["bookGallery", "route"] },
      { section: "Booking form", prefixes: ["bookForm", "search"] },
    ]),
  },
  {
    id: "site",
    label: "Nav & Footer",
    previewHref: "/",
    previewLabel: "Site",
    description: "Navbar, footer, common buttons, and floating contact labels.",
    images: [
      { id: "site.logo", label: "Navbar logo", defaultUrl: images.logoNav, section: "Navbar" },
      { id: "site.footerBg", label: "Footer background", defaultUrl: images.heroBg, section: "Footer" },
    ],
    fields: fieldsFromGroups([
      { section: "Navbar", prefixes: ["nav"] },
      { section: "Footer", prefixes: ["footer"] },
      { section: "Common buttons", prefixes: ["common"] },
      { section: "Floating contact", prefixes: ["floats"] },
    ]),
  },
];

export function getContentPage(id: string): ContentPageDef | undefined {
  return CONTENT_PAGES.find((p) => p.id === id);
}

export function getDefaultSiteImages(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const page of CONTENT_PAGES) {
    for (const image of page.images ?? []) {
      map[image.id] = image.defaultUrl;
    }
  }
  return map;
}

export type ContentOverrides = Partial<Record<Locale, Partial<Record<string, string>>>>;

export function isContentPageId(id: string): id is ContentPageId {
  return CONTENT_PAGES.some((p) => p.id === id);
}

export function contentSectionId(pageId: ContentPageId): `page-${ContentPageId}` {
  return `page-${pageId}`;
}

export function parseContentSection(section: string): ContentPageId | null {
  if (!section.startsWith("page-")) return null;
  const id = section.slice(5);
  return isContentPageId(id) ? id : null;
}
