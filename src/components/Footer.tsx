"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import SocialIcon, { type SocialName } from "./SocialIcon";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { aboutNavLinks } from "@/lib/site-nav";

const columns = [
  {
    title: "Travel with carpool",
    links: [
      { label: "Mumbai → Pune", href: "/#search" },
      { label: "Nashik → Pune", href: "/#search" },
      { label: "Pune → Goa", href: "/#search" },
      { label: "Pune → Lonavala", href: "/#search" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Pune", href: "/#search" },
      { label: "Mumbai", href: "/#search" },
      { label: "Nashik", href: "/#search" },
      { label: "Mahabaleshwar", href: "/tourism" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Packages", href: "/packages" },
      { label: "Our Services", href: "/how-it-works" },
      { label: "Tour Places", href: "/tourism" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "About",
    links: aboutNavLinks.map((l) => ({ label: l.label, href: l.href })),
  },
];

const socials: { name: SocialName; href: string; label: string }[] = [
  { name: "whatsapp", href: site.whatsappHref, label: "WhatsApp" },
  { name: "instagram", href: "#", label: "Instagram" },
  { name: "facebook", href: "#", label: "Facebook" },
  { name: "youtube", href: "#", label: "YouTube" },
];

export default function Footer() {
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
              Safe, comfortable cabs across Maharashtra &amp; beyond — book in
              minutes on WhatsApp.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Travellers Choice
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold tracking-tight text-brand">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
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
              Terms and Conditions
            </a>
            <span className="mx-2 text-white/25">·</span>
            © 2026 Pune Cabz
          </p>
          <div className="flex gap-2">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.name === "whatsapp" ? "_blank" : undefined}
                rel={item.name === "whatsapp" ? "noopener noreferrer" : undefined}
                aria-label={item.label}
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
