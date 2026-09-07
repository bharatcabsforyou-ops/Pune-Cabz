"use client";

import clsx from "clsx";
import {
  BadgeCheck,
  CarFront,
  Clock3,
  Headphones,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import Container from "./Container";
import FeatureIcon from "./FeatureIcon";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/en";

export default function HowItWorks({
  className,
}: {
  className?: string;
}) {
  const t = useT();

  const services: { icon: typeof Clock3; titleKey: MessageKey; textKey: MessageKey }[] = [
    {
      icon: Clock3,
      titleKey: "howItWorks.onTime.title",
      textKey: "howItWorks.onTime.text",
    },
    {
      icon: IndianRupee,
      titleKey: "howItWorks.transparentFare.title",
      textKey: "howItWorks.transparentFare.text",
    },
    {
      icon: BadgeCheck,
      titleKey: "howItWorks.professionalDrivers.title",
      textKey: "howItWorks.professionalDrivers.text",
    },
    {
      icon: CarFront,
      titleKey: "howItWorks.neatVehicles.title",
      textKey: "howItWorks.neatVehicles.text",
    },
    {
      icon: Sparkles,
      titleKey: "howItWorks.easyBooking.title",
      textKey: "howItWorks.easyBooking.text",
    },
    {
      icon: Headphones,
      titleKey: "howItWorks.assistance.title",
      textKey: "howItWorks.assistance.text",
    },
  ];

  return (
    <section className={clsx("relative overflow-hidden bg-white page-section", className)}>
      <Container className="relative">
        <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, titleKey, textKey }, i) => (
            <StaggerItem key={titleKey}>
              <article className="pro-card group flex h-full flex-col p-4 text-left sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <FeatureIcon icon={Icon} size="lg" />
                  <span className="text-xl font-extrabold tabular-nums text-brand/15 transition-colors group-hover:text-brand/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold tracking-tight text-navy">
                  {t(titleKey)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy/55 sm:text-[13px]">
                  {t(textKey)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
