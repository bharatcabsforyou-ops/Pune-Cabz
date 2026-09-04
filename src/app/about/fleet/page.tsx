import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AboutSubHero from "@/components/about/AboutSubHero";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Fleet - Pune Cabz",
  description:
    "Pune Cabz vehicle fleet — hatchback, sedan, SUV, Innova Crysta, Scorpio and bus options.",
};

const fleet = [
  {
    name: "Hatchback",
    seats: "4 + 1",
    rate: "₹11/KM",
    note: "Etios, Swift, WagonR — ideal for city hops and light travel.",
    image: "/image1.jpeg",
  },
  {
    name: "Sedan",
    seats: "4 + 1",
    rate: "₹12/KM",
    note: "Dzire, Accent, Aura, Amaze, Etios — comfortable highway rides.",
    image: "/image2.jpeg",
  },
  {
    name: "SUV",
    seats: "6 + 1",
    rate: "₹15/KM",
    note: "Ertiga, Rumion — extra space for family and luggage.",
    image: "/image4.jpeg",
  },
  {
    name: "Premium SUV",
    seats: "6–8 + 1",
    rate: "From ₹17/KM",
    note: "Carens, Innova, Crysta, Scorpio, Tavera — premium outstation comfort.",
    image: "/image9.png",
  },
  {
    name: "Bus",
    seats: "17–60",
    rate: "On Call",
    note: "AC / Non-AC group travel for tours, events, and large parties.",
    image: "/image11.png",
  },
];

export default function FleetPage() {
  return (
    <>
      <AboutSubHero
        eyebrow="Our Fleet"
        title="Every cab you need. Clear rates."
        description="From hatchback to bus — neat, latest-model cabs with professional drivers across Pune and Maharashtra."
        image="/image4.jpeg"
        imageAlt="Pune Cabz fleet of vehicles"
      />
      <section className="bg-white page-section">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map(({ name, seats, rate, note, image }) => (
              <StaggerItem key={name}>
                <article className="pro-card flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-soft-dark">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-navy">{name}</h2>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full bg-brand/[0.07] px-2.5 py-1 text-brand">
                        {seats}
                      </span>
                      <span className="rounded-full bg-soft px-2.5 py-1 text-navy/60">{rate}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/55">{note}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/packages" className="btn-primary inline-flex px-6 py-3">
              View packages
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book" className="btn-secondary inline-flex px-6 py-3">
              Book your cars
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
