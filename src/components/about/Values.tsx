"use client";

import { Handshake, IndianRupee, Leaf, ShieldCheck } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust and safety",
    text: "ID checks, in-app ratings, and 24/7 support so every ride feels safe.",
  },
  {
    icon: Handshake,
    title: "Community first",
    text: "Built by riders and drivers, for riders and drivers across Maharashtra.",
  },
  {
    icon: IndianRupee,
    title: "Fair pricing",
    text: "Costs are shared, not marked up - no surge, no hidden fees.",
  },
  {
    icon: Leaf,
    title: "Fewer empty seats",
    text: "Every shared seat is one fewer car on the Pune-Mumbai stretch.",
  },
];

export default function Values() {
  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">What we stand for</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Four principles on every ride
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
            These guide the product we ship and the way we treat people in the car.
          </p>
        </Reveal>

        <StaggerGroup className="page-section-head grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title}>
              <article className="flex h-full flex-col rounded-2xl border border-black/5 bg-soft p-6 text-left">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/25">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="text-2xl font-extrabold tabular-nums text-brand/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold tracking-tight text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
