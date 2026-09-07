"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import SocialIcon, { type SocialName } from "./SocialIcon";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { aboutNavLinks } from "@/lib/site-nav";
import { useT, type MessageKey } from "@/lib/i18n";

const socials: { name: SocialName; href: string; labelKey: MessageKey }[] = [
  { name: "whatsapp", href: site.whatsappHref, labelKey: "footer.social.whatsapp" },
  { name: "instagram", href: site.instagram, labelKey: "footer.social.instagram" },
  { name: "facebook", href: "#", labelKey: "footer.social.facebook" },
  { name: "youtube", href: "#", labelKey: "footer.social.youtube" },
];

export default function Footer() {
  const t = useT();

  const columns: {
    titleKey: MessageKey;
    links: { labelKey: MessageKey; href: string }[];
  }[] = [
    {
      titleKey: "footer.col.travel",
      links: [
        { labelKey: "footer.route.mumbaiPune", href: "/#search" },
        { labelKey: "footer.route.nashikPune", href: "/#search" },
        { labelKey: "footer.route.puneGoa", href: "/#search" },
        { labelKey: "footer.route.puneLonavala", href: "/#search" },
      ],
    },
    {
      titleKey: "footer.col.destinations",
      links: [
        { labelKey: "footer.dest.pune", href: "/#search" },
        { labelKey: "footer.dest.mumbai", href: "/#search" },
        { labelKey: "footer.dest.nashik", href: "/#search" },
        { labelKey: "footer.dest.mahabaleshwar", href: "/tourism" },
      ],
    },
    {
      titleKey: "footer.col.company",
      links: [
        { labelKey: "nav.packages", href: "/packages" },
        { labelKey: "nav.ourServices", href: "/our-services" },
        { labelKey: "nav.touristPlaces", href: "/tourism" },
        { labelKey: "nav.contactUs", href: "/contact" },
      ],
    },
    {
      titleKey: "footer.col.about",
      links: aboutNavLinks.map((l) => ({ labelKey: l.labelKey, href: l.href })),
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy">
      <Image
        src={images.heroBg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center sm:object-[70%_center]"
      />
      <div className="absolute inset-0 bg-navy/78 sm:bg-gradient-to-r sm:from-navy/80 sm:via-navy/68 sm:to-navy/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/82 via-navy/20 to-navy/40 sm:from-navy/75 sm:via-transparent sm:to-navy/20" />

      <Container className="relative py-8 pb-28 sm:py-9 sm:pb-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo dark />
            </Link>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/70">
              {t("footer.tagline")}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t("footer.travellersChoice")}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand"
              >
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.titleKey}>
              <h3 className="text-sm font-bold tracking-tight text-brand">
                {t(col.titleKey)}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={`${col.titleKey}-${link.href}-${link.labelKey}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-center gap-4 border-t border-white/15 pt-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-left">
          <p className="text-sm text-white/55">
            <a href="/about/terms" className="hover:text-white">
              {t("footer.terms")}
            </a>
            <span className="mx-2 text-white/25">·</span>
            {t("footer.copyright")}
          </p>
          <div className="flex gap-2">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={t(item.labelKey)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white hover:bg-brand"
              >
                <SocialIcon name={item.name} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
