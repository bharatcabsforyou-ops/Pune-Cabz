"use client";

import { IndianRupee, Snowflake, Timer } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const reasons = [
  {
    icon: Timer,
    title: "On time, every time",
    text: "Pickup windows you can actually plan around - city hops and intercity.",
  },
  {
    icon: Snowflake,
    title: "AC, spacious cabs",
    text: "Sedan to Innova. Room for bags, hills, and the Mumbai-Pune stretch.",
  },
  {
    icon: IndianRupee,
    title: "Fair shared fares",
    text: "Split fuel and tolls. No surge pricing, no surprise markups.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-12 sm:py-14">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Why Pune Cabz</p>
          <h2 className="mt-1.5 text-2xl font-extrabold text-navy sm:text-3xl">
            Built for real Maharashtra roads
          </h2>
        </Reveal>

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-brand/8 bg-surface p-5 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/60">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
