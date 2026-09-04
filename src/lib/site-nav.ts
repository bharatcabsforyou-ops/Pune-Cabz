export const aboutNavLinks = [
  { href: "/about", label: "About Pune Cabz" },
  { href: "/about/fleet", label: "Fleet" },
  { href: "/hotels", label: "Hotels & Flights" },
  { href: "/about/testimonials", label: "Testimonials" },
  { href: "/about/faq", label: "FAQ" },
  { href: "/about/blog", label: "Blog" },
  { href: "/about/career", label: "Career" },
  { href: "/about/terms", label: "Terms & Conditions" },
  { href: "/about/safety", label: "Safety" },
] as const;

export const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "Our Services" },
  { href: "/tourism", label: "Tour Places" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact us" },
] as const;

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
