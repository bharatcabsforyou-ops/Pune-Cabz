"use client";

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
import RouteBannerImage from "./RouteBannerImage";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";

const reasons = [
  {
    icon: Clock3,
    title: "On time",
    text: "Punctual pickups you can plan around — city and outstation.",
  },
  {
    icon: IndianRupee,
    title: "Transparent fare",
    text: "Clear per-km packages with no hidden surprise charges.",
  },
  {
    icon: BadgeCheck,
    title: "Experienced drivers",
    text: "Professional, highly experienced drivers on every route.",
  },
  {
    icon: CarFront,
    title: "Neat & latest cars",
    text: "Clean, well-maintained vehicles from hatchback to Innova.",
  },
  {
    icon: Sparkles,
    title: "Easy booking & refunds",
    text: "Simple booking with clear refund policies when plans change.",
  },
  {
    icon: Headphones,
    title: "24×7 assistance",
    text: "Round-the-clock support whenever you need help.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">Our Services</p>
          <h2 className="section-title">Built for every Pune journey</h2>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal direction="left" className="pro-card-static relative min-w-0 overflow-hidden p-0">
            <RouteBannerImage
              src={images.travelHighway}
              alt="Highway travel across Maharashtra with Pune Cabz"
              rounded="none"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-navy shadow-sm ring-1 ring-black/[0.05]">
              80+ cities
            </span>
          </Reveal>

          <div className="flex flex-col gap-2.5">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="feature-row group">
                <FeatureIcon icon={Icon} size="md" className="shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-navy">{title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-navy/55">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
