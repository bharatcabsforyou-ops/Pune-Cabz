"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Compass,
  Palmtree,
  ShieldCheck,
  Sun,
  Users,
  Mountain,
} from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import TouristPlacesGuide from "./TouristPlacesGuide";
import { images } from "@/lib/images";
import { touristPlaces } from "@/data/tourist-places";

const highlights = [
  {
    icon: Mountain,
    label: "Hill stations",
    desc: "Lonavala, Mahabaleshwar, Matheran, Lavasa",
  },
  {
    icon: Palmtree,
    label: "Coastal drives",
    desc: "Alibag beaches & sea forts",
  },
  {
    icon: CalendarDays,
    label: "Monsoon ghats",
    desc: "Tamhini Ghat & Malshej Ghat",
  },
  {
    icon: CarFront,
    label: "Pilgrimage trips",
    desc: "Jejuri, Balaji & Prati Shirdi",
  },
];

const stats = [
  { value: "30+", label: "destinations" },
  { value: "6+", label: "years" },
  { value: "10", label: "vehicles" },
];

export default function TourismPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-black/[0.04] bg-[#12090b]">
        <div className="absolute inset-0">
          <Image
            src={images.travelHills}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-[#12090b]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12090b] via-[#12090b]/45 to-[#12090b]/55" />
        </div>

        <Container className="relative py-10 sm:py-12 lg:py-14">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-light"
            >
              <Compass className="h-3.5 w-3.5" />
              Tourist places
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="mt-2.5 text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              See Maharashtra.{" "}
              <span className="text-brand-light">We drive.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]"
            >
              Lonavala to Alibag, Tamhini to Shirdi — door-to-door cabs with clear
              distances, top stops, and flexible timing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2"
            >
              {stats.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-baseline gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm"
                >
                  <span className="font-extrabold text-brand-light">{s.value}</span>
                  <span className="text-white/55">{s.label}</span>
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2.5"
            >
              <Link href="/book" className="btn-primary px-5 py-2.5 shadow-lg shadow-brand/30">
                Book a ride Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/18"
              >
                View destinations
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-b border-black/[0.04] bg-white py-10 sm:py-12">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">Your kind of trip</p>
            <h2 className="section-title">Hills, coast, monsoon & darshan</h2>
          </Reveal>

          <StaggerGroup className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <StaggerItem key={label}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-soft p-5 transition-all duration-300 hover:border-brand/20 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(220,31,38,0.35)]">
                  <span className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-brand/[0.06] transition-transform duration-500 group-hover:scale-125" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/25">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="relative mt-4 text-base font-bold text-navy">{label}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-navy/55">{desc}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-b border-black/[0.04] bg-soft py-8 sm:py-10">
        <Container>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                icon: Sun,
                step: "01",
                title: "Pick your date",
                text: "Leave when it suits you — no fixed tour bus timing.",
              },
              {
                icon: Users,
                step: "02",
                title: "Choose your cab",
                text: "Sedan, SUV, Innova or cab — whichever suits your requirements and luggage.",
              },
              {
                icon: ShieldCheck,
                step: "03",
                title: "Ride with trust",
                text: "Verified drivers, live location, and 24×7 support.",
              },
            ].map(({ icon: Icon, step, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-black/[0.05] bg-white px-4 py-4 sm:px-5 sm:py-5"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-brand/70">{step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/55">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TouristPlacesGuide />

      <section className="bg-white page-section">
        <Container>
          <Reveal>
            <div className="cta-panel px-6 py-10 text-center sm:px-10 sm:py-12">
              <h2 className="relative text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready for your next getaway?
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
                Pick a destination, choose Sedan, SUV, Innova or cab, and we&apos;ll
                handle the drive — hills, coast, or darshan.
              </p>
              <Link
                href="/book"
                className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02] hover:bg-white/95"
              >
                Book a ride Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
