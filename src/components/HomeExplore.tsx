"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import RouteBannerImage from "./RouteBannerImage";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { images } from "@/lib/images";
import { useT, type MessageKey } from "@/lib/i18n";

const cards: {
  titleKey: MessageKey;
  textKey: MessageKey;
  ctaKey: MessageKey;
  href: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    titleKey: "explore.book.title",
    textKey: "explore.book.text",
    ctaKey: "explore.book.cta",
    href: "/book",
    image: images.travelCab,
    imageAlt: "Book an intercity cab with Pune Cabz",
  },
  {
    titleKey: "explore.tourism.title",
    textKey: "explore.tourism.text",
    ctaKey: "explore.tourism.cta",
    href: "/tourism",
    image: images.travelHills,
    imageAlt: "Scenic hill station trip from Pune",
  },
  {
    titleKey: "explore.safe.title",
    textKey: "explore.safe.text",
    ctaKey: "explore.safe.cta",
    href: "/safety",
    image: images.travelOpenRoad,
    imageAlt: "Safe highway travel with verified drivers",
  },
];

export default function HomeExplore() {
  const t = useT();

  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">{t("explore.eyebrow")}</p>
          <h2 className="section-title">{t("explore.title")}</h2>
          <p className="section-desc">{t("explore.desc")}</p>
        </Reveal>

        <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {cards.map(({ titleKey, textKey, ctaKey, href, image, imageAlt }) => (
            <StaggerItem key={titleKey}>
              <Link href={href} className="pro-card-interactive group">
                <RouteBannerImage src={image} alt={imageAlt} rounded="none" />
                <div className="card-body p-4">
                  <h3 className="text-[15px] font-bold text-navy">{t(titleKey)}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy/55">{t(textKey)}</p>
                  <span className="card-cta mt-3">
                    {t(ctaKey)}
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
