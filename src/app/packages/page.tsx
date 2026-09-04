import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Users } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Packages - Pune Cabz",
  description:
    "Pune Cabz cab packages — hatchback, sedan, SUV, Innova and bus rates per km. Book now on WhatsApp.",
};

const packages = [
  {
    name: "Hatchback",
    vehicles: "Etios, Swift, WagonR",
    type: "Hatchback (4 + 1)",
    seats: "4 + 1",
    rate: "₹11/KM",
    image: "/image1.jpeg",
    bookable: true,
    highlight: false,
  },
  {
    name: "Sedan",
    vehicles: "Dzire, Accent, Aura, Amaze, Etios",
    type: "Sedan (4 + 1)",
    seats: "4 + 1",
    rate: "₹12/KM",
    image: "/image2.jpeg",
    bookable: true,
    highlight: true,
  },
  {
    name: "SUV",
    vehicles: "Ertiga, Rumion",
    type: "SUV (6 + 1)",
    seats: "6 + 1",
    rate: "₹15/KM",
    image: "/image3.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Kia Carens",
    vehicles: "Kia Carens",
    type: "Premium SUV (6 + 1)",
    seats: "6 + 1",
    rate: "₹17/KM",
    image: "/image4.jpeg",
    bookable: true,
    highlight: false,
  },
  {
    name: "Toyota Innova",
    vehicles: "Toyota Innova",
    type: "Premium SUV (7 + 1)",
    seats: "7 + 1",
    rate: "₹18/KM",
    image: "/iamge5.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Innova Crysta",
    vehicles: "Toyota Innova Crysta",
    type: "Premium SUV (6 + 1)",
    seats: "6 + 1",
    rate: "₹20/KM",
    image: "/image6.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Innova Crysta",
    vehicles: "Toyota Innova Crysta",
    type: "Premium SUV (7 + 1)",
    seats: "7 + 1",
    rate: "₹22/KM",
    image: "/image8.png",
    bookable: true,
    highlight: true,
  },
  {
    name: "Scorpio / Tavera",
    vehicles: "Mahindra Scorpio, Chevrolet Tavera",
    type: "Premium SUV (8 + 1)",
    seats: "8 + 1",
    rate: "₹18/KM",
    image: "/image10.png",
    bookable: true,
    highlight: false,
  },
  {
    name: "Bus",
    vehicles: "AC / Non-AC",
    type: "17 to 60 Seater",
    seats: "17–60",
    rate: "On Call",
    image: "/image9.png",
    bookable: false,
    highlight: false,
  },
];

function bookHref(name: string, type: string, rate: string) {
  const text = `Hi Pune Cabz, I want to book a ${name} (${type}) at ${rate}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function PackagesPage() {
  return (
    <>
      <section className="page-hero border-b border-black/[0.04]">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">Packages</p>
            <h1 className="section-title">Tour packages & cab rates</h1>
            <p className="section-desc">
              Clear per-km fares for every vehicle — book on WhatsApp in minutes.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white page-section">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((row, i) => (
              <StaggerItem key={`${row.name}-${row.type}-${i}`}>
                <article
                  className={`pro-card flex h-full flex-col overflow-hidden ${
                    row.highlight ? "ring-1 ring-brand/25" : ""
                  }`}
                >
                  {/* car image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-soft-dark">
                    <Image
                      src={row.image}
                      alt={row.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    {row.highlight ? (
                      <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                        Popular
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-extrabold tracking-tight text-navy">
                      {row.name}
                    </h2>
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

                    <p className="mt-4 text-2xl font-extrabold tracking-tight text-brand">
                      {row.rate}
                    </p>

                    <div className="mt-auto pt-4">
                      {row.bookable ? (
                        <a
                          href={bookHref(row.name, row.type, row.rate)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex h-10 w-full px-4 text-sm"
                        >
                          Book Now
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <a
                          href={site.phoneHref}
                          className="btn-secondary inline-flex h-10 w-full gap-1.5 px-4 text-sm"
                        >
                          <Phone className="h-4 w-4" />
                          Call for quote
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-8 text-center text-sm text-navy/50">
            Rates are indicative per km. Tolls, parking, driver allowance and taxes as per{" "}
            <Link href="/about/terms" className="font-semibold text-brand hover:underline">
              Terms & Conditions
            </Link>
            .
          </Reveal>
        </Container>
      </section>
    </>
  );
}
