"use client";

import { BadgeCheck, Headphones, IdCard, LockKeyhole } from "lucide-react";
import Container from "./Container";
import FeatureIcon from "./FeatureIcon";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const items = [
  { icon: IdCard, label: "Government ID verified" },
  { icon: BadgeCheck, label: "Rated community" },
  { icon: Headphones, label: "24/7 ride support" },
  { icon: LockKeyhole, label: "Secure cost sharing" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-black/5 bg-white">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-3 py-5 lg:grid-cols-4 lg:gap-4 lg:py-6">
          {items.map(({ icon: Icon, label }) => (
            <StaggerItem key={label}>
              <div className="flex items-center gap-3 rounded-2xl border border-black/6 bg-surface px-3 py-2.5">
                <FeatureIcon icon={Icon} />
                <p className="text-sm font-semibold text-navy">{label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
