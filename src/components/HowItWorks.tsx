"use client";

import clsx from "clsx";
import { CalendarCheck, CarFront, Search, Star } from "lucide-react";
import Container from "./Container";
import FeatureIcon from "./FeatureIcon";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const steps = [
  {
    icon: Search,
    title: "Search your route",
    text: "Enter from, to, and date. We show verified rides going your way - city hops and intercity.",
  },
  {
    icon: CarFront,
    title: "Pick a ride",
    text: "Compare time, fare, car type, and driver ratings. Book a seat in a few taps.",
  },
  {
    icon: CalendarCheck,
    title: "Meet and travel",
    text: "Chat in-app, meet at the pickup pin, and share the journey with a verified driver.",
  },
  {
    icon: Star,
    title: "Rate each other",
    text: "Leave a rating after drop-off so the next rider knows who they can trust.",
  },
];

export default function HowItWorks({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={clsx("relative overflow-hidden page-section", className ?? "bg-white")}>
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Simple by design</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            How Pune Cabz works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
            Four clear steps from search to seat. No surge. No hidden fees.
          </p>
        </Reveal>

        <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title}>
              <article className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 text-left shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <FeatureIcon icon={Icon} size="lg" />
                  <span className="text-2xl font-extrabold tabular-nums text-brand/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold tracking-tight text-navy">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/60">{text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
