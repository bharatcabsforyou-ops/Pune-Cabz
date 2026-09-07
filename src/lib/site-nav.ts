import type { MessageKey } from "@/lib/i18n/en";

export const aboutNavLinks: { href: string; labelKey: MessageKey }[] = [
  { href: "/about", labelKey: "nav.aboutPuneCabz" },
  { href: "/about/fleet", labelKey: "nav.fleet" },
  { href: "/hotels", labelKey: "nav.hotelsFlights" },
  { href: "/about/testimonials", labelKey: "nav.testimonials" },
  { href: "/about/faq", labelKey: "nav.faq" },
  { href: "/about/blog", labelKey: "nav.blog" },
  { href: "/about/career", labelKey: "nav.career" },
  { href: "/about/terms", labelKey: "nav.terms" },
  { href: "/about/safety", labelKey: "nav.safety" },
];

export const mainNavLinks: { href: string; labelKey: MessageKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/our-services", labelKey: "nav.ourServices" },
  { href: "/tourism", labelKey: "nav.touristPlaces" },
  { href: "/packages", labelKey: "nav.packages" },
  { href: "/contact", labelKey: "nav.contactUs" },
];

export function isAboutPath(pathname: string) {
  return (
    pathname === "/about" ||
    pathname.startsWith("/about/") ||
    pathname === "/hotels"
  );
}

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
