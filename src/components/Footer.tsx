"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Container from "./Container";
import Logo from "./Logo";
import SocialIcon, { type SocialName } from "./SocialIcon";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

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
      { label: "How it works", href: "/how-it-works" },
      { label: "Safety", href: "/safety" },
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
    ],
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
      <div className="absolute inset-0 bg-navy/92 sm:bg-gradient-to-r sm:from-navy sm:via-navy/82 sm:to-navy/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/35 to-navy/55 sm:from-navy/90 sm:via-transparent sm:to-navy/30" />

      <Container className="relative py-8 pb-28 sm:py-9 sm:pb-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-8 lg:grid-cols-4">
          <Link href="/" className="col-span-2 shrink-0 lg:col-span-1">
            <Logo dark />
          </Link>

          {columns.map((col, index) => (
            <div
              key={col.title}
              className={clsx(index === columns.length - 1 && "col-span-2 sm:col-span-1 lg:col-span-1")}
            >
              <h3 className="text-sm font-bold tracking-tight text-brand sm:text-lg">{col.title}</h3>
              <ul
                className={clsx(
                  "mt-3 space-y-2",
                  index === columns.length - 1 &&
                    "grid grid-cols-2 gap-x-4 gap-y-2 space-y-0 sm:block sm:space-y-2"
                )}
              >
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
            <a href="#" className="hover:text-white">
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
