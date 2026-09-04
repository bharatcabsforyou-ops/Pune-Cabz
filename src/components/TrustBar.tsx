"use client";

import { BadgeCheck, CarFront, Clock3, Headphones } from "lucide-react";
import Container from "./Container";
import FeatureIcon from "./FeatureIcon";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const items = [
  { icon: Clock3, label: "On-time pickups" },
  { icon: BadgeCheck, label: "Transparent fares" },
  { icon: CarFront, label: "Clean latest cars" },
  { icon: Headphones, label: "24×7 assistance" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-black/[0.04] bg-white">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-2.5 py-5 lg:grid-cols-4 lg:gap-3 lg:py-6">
          {items.map(({ icon: Icon, label }) => (
            <StaggerItem key={label}>
              <div className="pro-card flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                <FeatureIcon icon={Icon} size="sm" />
                <p className="text-xs font-semibold leading-snug text-navy sm:text-sm">{label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
