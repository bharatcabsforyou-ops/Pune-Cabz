"use client";

import { MapPinned } from "lucide-react";
import Container from "../Container";
import FeatureIcon from "../FeatureIcon";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";

const hubs = [
  { city: "Pune", tag: "HQ" },
  { city: "Mumbai", tag: "West" },
  { city: "Nashik", tag: "West" },
  { city: "Aurangabad", tag: "Marathwada" },
  { city: "Kolhapur", tag: "South MH" },
  { city: "Satara", tag: "West" },
  { city: "Goa", tag: "Coast" },
  { city: "Nagpur", tag: "Vidarbha" },
];

export default function ContactHubs() {
  return (
    <section className="bg-soft page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">Coverage</p>
          <h2 className="section-title">Cities we serve</h2>
          <p className="section-desc">
            Support is based in Pune. Rides run across these hubs and the routes
            between them.
          </p>
        </Reveal>

        <StaggerGroup className="page-section-head grid grid-cols-2 gap-3 sm:grid-cols-4">
          {hubs.map(({ city, tag }) => (
            <StaggerItem key={city} className="h-full">
              <div className="feature-row h-full">
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
