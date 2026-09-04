"use client";

import { Clock3, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import Container from "../Container";
import FeatureIcon from "../FeatureIcon";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";

const goals = [
  {
    icon: ShieldCheck,
    title: "Safe travel",
    text: "High safety standards on every ride, so customers travel with confidence.",
  },
  {
    icon: Clock3,
    title: "On-time rides",
    text: "Timely pickups and reliable schedules for daily, airport, and outstation trips.",
  },
  {
    icon: HeartHandshake,
    title: "Customer first",
    text: "Flexible, transparent service shaped around real travel needs in Pune.",
  },
  {
    icon: Target,
    title: "Trusted brand",
    text: "Professional service with modern booking — a cab partner people choose again.",
  },
];

export default function Values() {
  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="section-head max-w-3xl">
          <p className="section-eyebrow">Our Goal</p>
          <h2 className="section-title">
            Safe, reliable, affordable, and hassle-free transportation
          </h2>
          <p className="section-desc max-w-2xl">
            Our goal is to provide safe, reliable, affordable, and hassle-free
            transportation for every customer.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-6 max-w-3xl text-center text-[15px] leading-relaxed text-navy/60 sm:mt-8">
          <p>
            We aim to build a trusted cab service brand in Pune by combining professional
            service with modern technology and a customer-first approach. We continuously
            work to improve our services, maintain high safety standards, provide timely
            rides, and make every journey comfortable.
          </p>
          <p className="mt-4">
            Our vision is simple: to make travelling easier, safer, and more convenient
            for everyone. We want every customer to reach their destination comfortably
            and on time — and to choose us again for their next journey.
          </p>
        </Reveal>

        <StaggerGroup className="page-section-head grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title}>
              <article className="pro-card flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <FeatureIcon icon={Icon} size="lg" />
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
