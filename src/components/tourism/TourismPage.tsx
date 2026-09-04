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
  Sun,
  Users,
  ShieldCheck,
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
    tone: "from-sky-500/15 to-sky-500/5",
    iconBg: "bg-sky-500",
  },
  {
    icon: Palmtree,
    label: "Coastal drives",
    desc: "Alibag beaches & sea forts",
    tone: "from-emerald-500/15 to-emerald-500/5",
    iconBg: "bg-emerald-500",
  },
  {
    icon: CalendarDays,
    label: "Monsoon ghats",
    desc: "Tamhini Ghat & Malshej Ghat",
    tone: "from-cyan-500/15 to-cyan-500/5",
    iconBg: "bg-cyan-500",
  },
  {
    icon: CarFront,
    label: "Pilgrimage trips",
    desc: "Jejuri, Balaji & Prati Shirdi",
    tone: "from-brand/15 to-brand/5",
    iconBg: "bg-brand",
  },
];

const stats = [
  { value: `${touristPlaces.length}+`, label: "places" },
  { value: "AC", label: "comfort cabs" },
  { value: "24/7", label: "trip support" },
];

export default function TourismPage() {
  return (
    <>
      <section className="page-hero">
        <Container className="relative">
          <div className="grid grid-cols-1 items-center page-grid page-grid-2">
            <div className="min-w-0 max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-eyebrow inline-flex items-center gap-2"
              >
                <Compass className="h-3.5 w-3.5" />
                Tour Places
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="section-title mt-4 text-[1.9rem] sm:text-5xl lg:text-[3.25rem]"
              >
                See Maharashtra.
                <br />
                <span className="text-gradient-brand">We drive.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="section-desc mt-5 text-left sm:text-base"
              >
                From Lonavala and Tamhini Ghat to Alibag, Jejuri and Prati Shirdi —
                door-to-door cabs with distances, top stops, and flexible timing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-navy"
              >
                {stats.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-baseline gap-1.5 rounded-full bg-brand/[0.06] px-3 py-1.5 ring-1 ring-brand/10"
                  >
                    <span className="text-lg font-extrabold text-brand">{s.value}</span>
                    <span className="text-navy/50">{s.label}</span>
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link href="/book" className="btn-primary px-6 py-3">
                  Book your cab
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#destinations" className="btn-secondary px-6 py-3">
                  View destinations
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="relative min-w-0"
            >
              <div className="pro-card-static overflow-hidden p-0">
                <Image
                  src={images.travelHills}
                  alt="Hill station tourism trip from Pune"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-y border-black/[0.04] bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">Your kind of trip</p>
            <h2 className="section-title">Hills, coast, monsoon & darshan</h2>
          </Reveal>

          <StaggerGroup className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, label, desc, tone, iconBg }) => (
              <StaggerItem key={label}>
                <div className={`pro-card no-hover h-full bg-gradient-to-br ${tone} p-5`}>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} text-white shadow-md`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy">{label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/55">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-t border-black/[0.04] bg-soft py-8 sm:py-10">
        <Container>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                icon: Sun,
                title: "Pick your date",
                text: "Leave when it suits you — no fixed tour bus timing.",
              },
              {
                icon: Users,
                title: "Choose your cab",
                text: "Sedan, SUV, or Innova for family and luggage.",
              },
              {
                icon: ShieldCheck,
                title: "Ride with trust",
                text: "Verified drivers, live location, and 24/7 support.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="feature-row">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
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
    </>
  );
}
