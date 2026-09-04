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
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const services = [
  {
    icon: Clock3,
    title: "On time",
    text: "Punctual pickups so you reach on schedule — every trip.",
  },
  {
    icon: IndianRupee,
    title: "Transparent fare",
    text: "Clear per-km rates with no hidden markups or surprise charges.",
  },
  {
    icon: BadgeCheck,
    title: "Professional drivers",
    text: "Highly experienced, professional drivers for a smooth ride.",
  },
  {
    icon: CarFront,
    title: "Neat & clean vehicles",
    text: "Well-maintained cabs with the latest models in our fleet.",
  },
  {
    icon: Sparkles,
    title: "Easy booking & refunds",
    text: "Simple booking with clear refund policies when plans change.",
  },
  {
    icon: Headphones,
    title: "24×7 assistance",
    text: "Round-the-clock support whenever you need help on the road.",
  },
];

export default function HowItWorks({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={clsx("relative overflow-hidden bg-white page-section", className)}>
      <Container className="relative">
        <Reveal className="section-head">
          <p className="section-eyebrow">Our Services</p>
          <h2 className="section-title">Why travel with Pune Cabz</h2>
          <p className="section-desc">
            Reliable cabs across Pune and beyond — on time, transparent, and always
            supported.
          </p>
        </Reveal>

        <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title}>
              <article className="pro-card group flex h-full flex-col p-4 text-left sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <FeatureIcon icon={Icon} size="lg" />
                  <span className="text-xl font-extrabold tabular-nums text-brand/15 transition-colors group-hover:text-brand/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold tracking-tight text-navy">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy/55 sm:text-[13px]">{text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
