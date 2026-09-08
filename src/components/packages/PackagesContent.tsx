"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Users } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useT } from "@/lib/i18n";
import { site } from "@/lib/site";
import { useSiteImage } from "@/lib/content-overrides";

const packages = [
  {
    name: "Hatchback",
    vehicles: "Swift, WagonR",
    type: "Hatchback (4 + 1)",
    seats: "4 + 1",
    imageId: "packages.hatchback",
    fallback: "/image2.jpeg",
    bookable: true,
    highlight: false,
  },
  {
    name: "Sedan",
    vehicles: "Dzire, Accent, Aura, Amaze",
    type: "Sedan (4 + 1)",
    seats: "4 + 1",
    imageId: "packages.sedan",
    fallback: "/image1.jpeg",
    bookable: true,
    highlight: true,
  },
  {
    name: "SUV",
    vehicles: "Ertiga, Rumion",
    type: "SUV (6 + 1)",
    seats: "6 + 1",
    imageId: "packages.suv",
    fallback: "/image8.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Kia Carens",
    vehicles: "Kia Carens",
    type: "Premium SUV (6 + 1)",
    seats: "6 + 1",
    imageId: "packages.carens",
    fallback: "/image11.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Toyota Innova",
    vehicles: "Toyota Innova",
    type: "Premium SUV (7 + 1)",
    seats: "7 + 1",
    imageId: "packages.innova",
    fallback: "/image3.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Innova Crysta",
    vehicles: "Toyota Innova Crysta",
    type: "Premium SUV (6–7 + 1)",
    seats: "6–7 + 1",
    imageId: "packages.crysta",
    fallback: "/image3.png",
    bookable: true,
    highlight: true,
  },
  {
    name: "Scorpio / Tavera",
    vehicles: "Mahindra Scorpio, Chevrolet Tavera",
    type: "Premium SUV (8 + 1)",
    seats: "8 + 1",
    imageId: "packages.scorpio",
    fallback: "/image4.jpeg",
    bookable: true,
    highlight: false,
  },
  {
    name: "Tempo Traveller",
    vehicles: "Force Tempo Traveller",
    type: "Group (9–17)",
    seats: "9–17",
    imageId: "packages.tempo",
    fallback: "/image6.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Urbania",
    vehicles: "Force Urbania",
    type: "Premium Group (9–17)",
    seats: "9–17",
    imageId: "packages.urbania",
    fallback: "/image6.png",
    bookable: true,
    highlight: true,
  },
  {
    name: "Bus",
    vehicles: "AC / Non-AC",
    type: "17 to 60 Seater",
    seats: "17–60",
    imageId: "packages.bus",
    fallback: "/image9.png",
    bookable: false,
    highlight: false,
  },
];

function bookHref(name: string, type: string) {
  const text = `Hi Pune Cabz, I want to book a ${name} (${type}).`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

function PackageCard({ row }: { row: (typeof packages)[number] }) {
  const t = useT();
  const image = useSiteImage(row.imageId, row.fallback);

  return (
    <article
      className={`pro-card flex h-full flex-col overflow-hidden ${
        row.highlight ? "ring-1 ring-brand/25" : ""
      }`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-soft-dark">
        <Image
          src={image}
          alt={row.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        {row.highlight ? (
          <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
            {t("packages.popular")}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-extrabold tracking-tight text-navy">{row.name}</h2>
        <p className="mt-0.5 text-xs leading-snug text-navy/50">{row.vehicles}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-navy/65">
            <Users className="h-3 w-3 text-brand" />
            {row.seats}
          </span>
          <span className="rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-navy/65">
            {row.type}
          </span>
        </div>

        <div className="mt-auto pt-5">
          {row.bookable ? (
            <a
              href={bookHref(row.name, row.type)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex h-10 w-full px-4 text-sm"
            >
              {t("packages.bookNow")}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <a
              href={site.phoneHref}
              className="btn-secondary inline-flex h-10 w-full gap-1.5 px-4 text-sm"
            >
              <Phone className="h-4 w-4" />
              {t("packages.callQuote")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PackagesContent() {
  const t = useT();

  return (
    <>
      <section className="page-hero border-b border-black/[0.04]">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">{t("packages.eyebrow")}</p>
            <h1 className="section-title">{t("packages.title")}</h1>
            <p className="section-desc">{t("packages.desc")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white page-section">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((row, i) => (
              <StaggerItem key={`${row.name}-${row.type}-${i}`}>
                <PackageCard row={row} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-8 text-center text-sm text-navy/50">
            {t("packages.termsNote")}{" "}
            <Link href="/about/terms" className="font-semibold text-brand hover:underline">
              {t("packages.termsLink")}
            </Link>
            .
          </Reveal>
        </Container>
      </section>
    </>
  );
}
