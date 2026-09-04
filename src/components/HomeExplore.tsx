"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import RouteBannerImage from "./RouteBannerImage";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { images } from "@/lib/images";

const cards = [
  {
    title: "Book your cars",
    text: "City rides and intercity cabs. Sedan, SUV, Innova.",
    href: "/book",
    cta: "Search now",
    image: images.travelCab,
    imageAlt: "Book an intercity cab with Pune Cabz",
  },
  {
    title: "Tourism trips",
    text: "Hills, coast, and weekend getaways with verified drivers.",
    href: "/tourism",
    cta: "Explore routes",
    image: images.travelHills,
    imageAlt: "Scenic hill station trip from Pune",
  },
  {
    title: "Ride safe",
    text: "ID checks, live trip sharing, and 24/7 support.",
    href: "/safety",
    cta: "See safety",
    image: images.travelOpenRoad,
    imageAlt: "Safe highway travel with verified drivers",
  },
];

export default function HomeExplore() {
  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">Explore</p>
          <h2 className="section-title">More than a search bar</h2>
          <p className="section-desc">
            Book a seat, plan a trip, or read how we keep every ride safer.
          </p>
        </Reveal>

        <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {cards.map(({ title, text, href, cta, image, imageAlt }) => (
            <StaggerItem key={title}>
              <Link href={href} className="pro-card-interactive group">
                <RouteBannerImage src={image} alt={imageAlt} rounded="none" />
                <div className="card-body p-4">
                  <h3 className="text-[15px] font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy/55">{text}</p>
                  <span className="card-cta mt-3">
                    {cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
