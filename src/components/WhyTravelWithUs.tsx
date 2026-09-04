"use client";

import {
  Headphones,
  MapPinned,
  ShieldCheck,
  Sofa,
  UsersRound,
} from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Safe and Secure",
    text: "Traveling solo? We prioritize your peace of mind with responsible drivers and clear communication every step of the way.",
  },
  {
    icon: MapPinned,
    title: "Anywhere You Need to Go",
    text: "From a quick airport drop-off in Pune to a multi-day interstate holiday — logistics made hassle-free.",
  },
  {
    icon: UsersRound,
    title: "Room for Everyone",
    text: "Whether it is just you, your family, or a large group of colleagues, we have the perfect ride for your crew.",
  },
  {
    icon: Headphones,
    title: "Always Here to Help",
    text: "Our support team stays with you from booking to arrival, so your trip goes smoothly.",
  },
  {
    icon: Sofa,
    title: "Stretch Out and Relax",
    text: "Spacious vehicles set up so even the longest journeys feel comfortable and easy.",
  },
];

export default function WhyTravelWithUs() {
  return (
    <section className="border-t border-black/[0.04] bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">Why us</p>
          <h2 className="section-title">Why Ride With Us?</h2>
          <p className="section-desc">
            You pick the destination; we&apos;ll take care of the drive.
          </p>
        </Reveal>

        <StaggerGroup className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <article className="group h-full rounded-2xl border border-black/[0.06] bg-white p-5 transition-colors hover:border-brand/20 sm:p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/[0.08] text-brand">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-[15px] font-bold tracking-tight text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/55">{text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
