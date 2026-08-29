"use client";

import {
  Globe2,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";

const features = [
  { title: "Customized Trips", text: "Tailored to your needs.", icon: MapPinned },
  { title: "Wide Destinations", text: "Across Maharashtra routes.", icon: Globe2 },
  { title: "No Hidden Charges", text: "Transparent pricing.", icon: ShieldCheck },
  { title: "Trusted by Clients", text: "100% satisfaction.", icon: Sparkles },
  { title: "Easy Inquiry", text: "Quick & simple process.", icon: MessageCircle },
];

export default function WhyTravelWithUs() {
  return (
    <section className="border-t border-black/[0.04] bg-white page-section">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold text-brand sm:text-3xl">Why Travel With Us?</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-navy/55">
            Trusted travel support with transparent service at every step.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-6 grid grid-cols-1 divide-y divide-black/[0.06] rounded-2xl border border-black/[0.06] bg-surface/60 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {features.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex flex-col items-center px-4 py-4 text-center sm:px-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-navy">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-navy/50">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
