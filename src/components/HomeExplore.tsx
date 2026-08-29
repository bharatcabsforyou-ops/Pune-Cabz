"use client";

import Link from "next/link";
import { ArrowRight, CarFront, MapPinned, ShieldCheck } from "lucide-react";
import Container from "./Container";
import FeatureIcon from "./FeatureIcon";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const cards = [
  {
    icon: CarFront,
    title: "Book your cars",
    text: "City rides and intercity cabs. Sedan, SUV, Innova - search and go.",
    href: "/book",
    cta: "Search now",
  },
  {
    icon: MapPinned,
    title: "Tourism trips",
    text: "Hills, coast, and weekend getaways from Pune with verified drivers.",
    href: "/tourism",
    cta: "Explore routes",
  },
  {
    icon: ShieldCheck,
    title: "Ride safe",
    text: "ID checks, live trip sharing, and 24/7 support on every booking.",
    href: "/safety",
    cta: "See safety",
  },
];

export default function HomeExplore() {
  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Explore</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            More than a search bar
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
            Book a seat, plan a trip, or read how we keep every ride safer.
          </p>
        </Reveal>

        <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, href, cta }) => (
            <StaggerItem key={title}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-black/6 bg-surface p-5 transition-colors hover:border-black/10 hover:bg-white"
              >
                <FeatureIcon icon={Icon} size="lg" />
                <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/60">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
