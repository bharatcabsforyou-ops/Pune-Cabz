"use client";

import { MapPinned } from "lucide-react";
import Container from "../Container";
import FeatureIcon from "../FeatureIcon";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { useT } from "@/lib/i18n";

const hubs = [
  { city: "Pune", tag: "HQ" },
  { city: "Mumbai", tag: "West" },
  { city: "Nashik", tag: "West" },
  { city: "Chatrapati Sambhajinagar", tag: "Marathwada" },
  { city: "Kolhapur", tag: "South MH" },
  { city: "Satara", tag: "West" },
  { city: "Goa", tag: "Coast" },
  { city: "Nagpur", tag: "Vidarbha" },
];

export default function ContactHubs() {
  const t = useT();

  return (
    <section className="bg-soft py-8 sm:py-9">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">{t("hubs.eyebrow")}</p>
          <h2 className="section-title text-2xl sm:text-3xl">{t("hubs.title")}</h2>
          <p className="section-desc mt-2">{t("hubs.desc")}</p>
        </Reveal>

        <StaggerGroup className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {hubs.map(({ city, tag }) => (
            <StaggerItem key={city} className="h-full">
              <div className="feature-row h-full !p-3">
                <FeatureIcon icon={MapPinned} size="sm" />
                <div>
                  <p className="text-sm font-bold text-navy">{city}</p>
                  <p className="text-xs font-medium text-navy/45">{tag}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
