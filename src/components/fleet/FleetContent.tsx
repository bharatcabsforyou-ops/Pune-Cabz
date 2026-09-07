"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AboutSubHero from "@/components/about/AboutSubHero";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useT, type MessageKey } from "@/lib/i18n";
import { site } from "@/lib/site";

const fleet: {
  name: string;
  seats: string;
  noteKey: MessageKey;
  image: string;
}[] = [
  {
    name: "Hatchback",
    seats: "4 + 1",
    noteKey: "fleet.note.hatchback",
    image: "/image2.jpeg",
  },
  {
    name: "Sedan",
    seats: "4 + 1",
    noteKey: "fleet.note.sedan",
    image: "/image1.jpeg",
  },
  {
    name: "SUV",
    seats: "6 + 1",
    noteKey: "fleet.note.suv",
    image: "/image8.png",
  },
  {
    name: "Premium SUV",
    seats: "6–8 + 1",
    noteKey: "fleet.note.premiumSuv",
    image: "/image3.png",
  },
  {
    name: "Tempo Traveller",
    seats: "9–17",
    noteKey: "fleet.note.tempo",
    image: "/image6.png",
  },
  {
    name: "Urbania",
    seats: "9–17",
    noteKey: "fleet.note.urbania",
    image: "/image6.png",
  },
  {
    name: "Bus",
    seats: "17–60",
    noteKey: "fleet.note.bus",
    image: "/image9.png",
  },
];

function bookHref(name: string) {
  const text = `Hi Pune Cabz, I want to book a ${name}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function FleetContent() {
  const t = useT();

  return (
    <>
      <AboutSubHero
        eyebrow={t("fleet.eyebrow")}
        title={t("fleet.title")}
        description={t("fleet.desc")}
        image="/image8.png"
        imageAlt="Pune Cabz fleet of vehicles"
      />
      <section className="bg-white page-section">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map(({ name, seats, noteKey, image }) => (
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
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/55">
                      {t(noteKey)}
                    </p>
                    <a
                      href={bookHref(name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-shine mt-5 inline-flex w-full items-center justify-center px-4 py-2.5 text-sm"
                    >
                      {t("fleet.bookNow")}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/packages" className="btn-primary inline-flex px-6 py-3">
              {t("fleet.viewPackages")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book" className="btn-secondary inline-flex px-6 py-3">
              {t("common.bookRideNow")}
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
