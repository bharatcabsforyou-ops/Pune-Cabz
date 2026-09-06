"use client";

import { BadgeCheck, CarFront, Phone } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import WhatsAppIcon from "./WhatsAppIcon";

const steps = [
  {
    title: (
      <>
        Call or <span className="text-whatsapp">WhatsApp</span>
      </>
    ),
    text: "Tell us where you are going, when, and how many of you are travelling. One message is enough — no forms, no registration.",
    icons: "contact" as const,
  },
  {
    title: "Get a confirmed fare",
    text: "We pick the right vehicle and quote the exact fare on the spot. What we commit is what you pay — toll and parking as actual, nothing hidden.",
    icons: "fare" as const,
  },
  {
    title: "Cab at your door",
    text: "The driver reaches your address before the pre-decided time and waits. You get the vehicle number and driver contact in advance.",
    icons: "cab" as const,
  },
];

function StepIcons({ kind }: { kind: (typeof steps)[number]["icons"] }) {
  if (kind === "contact") {
    return (
      <span className="flex items-center gap-1.5">
        <Phone className="h-5 w-5 text-brand" strokeWidth={2.25} />
        <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
      </span>
    );
  }
  if (kind === "fare") {
    return <BadgeCheck className="h-6 w-6 text-brand" strokeWidth={2.25} />;
  }
  return <CarFront className="h-6 w-6 text-brand" strokeWidth={2.25} />;
}

export default function BookingProcess() {
  return (
    <section className="relative overflow-hidden border-t border-black/[0.04] bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">How it works</p>
          <h2 className="section-title">Book in three simple steps</h2>
          <p className="section-desc">
            Call or chat, lock the fare, and your cab arrives — that&apos;s it.
          </p>
        </Reveal>

        <div className="relative mt-10">
          {/* Connector — desktop */}
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px border-t-2 border-dashed border-brand/25 lg:block"
            aria-hidden
          />

          <StaggerGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={i} className="relative text-center">
                {/* Connector — mobile */}
                {i < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-[4.75rem] h-8 w-px -translate-x-1/2 border-l-2 border-dashed border-brand/25 sm:hidden"
                    aria-hidden
                  />
                )}

                <div className="relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full border border-dashed border-brand/30"
                    aria-hidden
                  />
                  <span
                    className="absolute inset-1.5 rounded-full border border-brand/20"
                    aria-hidden
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-10px_rgba(220,31,38,0.35)] ring-1 ring-brand/15">
                    <StepIcons kind={step.icons} />
                  </span>
                </div>

                <h3 className="mt-5 text-base font-extrabold tracking-tight text-navy sm:text-lg">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2.5 max-w-[17rem] text-sm leading-relaxed text-navy/55">
                  {step.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
