"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  Clock3,
  Luggage,
  MapPinned,
  MessageCircle,
  Plane,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import Container from "@/components/Container";
import HowItWorks from "@/components/HowItWorks";
import PhotoCard from "@/components/PhotoCard";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { images } from "@/lib/images";

const glance = [
  { feature: "Ride Options", offer: "7+ vehicle categories" },
  { feature: "Services", offer: "Local, Outstation, Airport, and Group Travel" },
  { feature: "Our Reach", offer: "Across Maharashtra and Pan-India" },
  { feature: "The Promise", offer: "Safe, comfortable, and dependable travel" },
];

const day = [
  {
    icon: MessageCircle,
    title: "Before pickup",
    text: "Confirm your cab on WhatsApp. You get driver name, vehicle, and pickup pin before the trip starts.",
  },
  {
    icon: MapPinned,
    title: "At your location",
    text: "Driver arrives few minutes early. Confirm the number plate, greet your driver, and stow bags before you leave.",
  },
  {
    icon: Clock3,
    title: "On the road",
    text: "Share live location with family. AC, highway stops, and drop points stay as booked.",
  },
  {
    icon: Luggage,
    title: "After drop",
    text: "Pay the confirmed fare and rate your ride. Clear support if anything needs attention.",
  },
];

const faqs = [
  {
    q: "How do I book a cab?",
    a: "Open Book a ride Now, enter from, to, and date, pick a vehicle, and confirm on WhatsApp. You will get driver and pickup details right away.",
  },
  {
    q: "How is the price set?",
    a: "Fares follow clear per-km packages by vehicle type. Tolls and extras are confirmed upfront — no hidden surge.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Cancel as early as you can so we can free the cab for another booking. Details are shared when you confirm.",
  },
  {
    q: "What luggage can I bring?",
    a: "One cabin bag plus a small backpack is standard in hatchback/sedan. Mention extra bags on WhatsApp so we assign the right vehicle.",
  },
];

export default function HowItWorksPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="page-hero">
        <Container className="relative">
          <div className="grid grid-cols-1 items-center page-grid page-grid-2">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-eyebrow"
              >
                Our Services
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="section-title mt-4 text-[1.85rem] sm:text-5xl"
              >
                On time.
                <br />
                <span className="text-gradient-brand">Transparent fare.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="section-desc mt-5 text-left"
              >
                Professional drivers, neat latest-model vehicles, easy booking and
                refunds, plus 24×7 assistance across 30+ cities.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link href="/book" className="btn-primary px-6 py-3">
                  Book a ride Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/safety" className="btn-secondary px-6 py-3">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  Safety first
                </Link>
              </motion.div>
            </div>

            <PhotoCard
              src={images.film2}
              alt="Pune to Mumbai with Pune Cabz"
              variant="banner"
              priority
            />
          </div>
        </Container>
      </section>

      <HowItWorks className="bg-white" />

      <section id="offer" className="scroll-mt-24 border-t border-black/[0.04] bg-white page-section">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">At a glance</p>
            <h2 className="section-title">PuneCabz at a Glance</h2>
            <p className="section-desc">
              Clear services, wider reach, and dependable travel across every route.
            </p>
          </Reveal>

          <Reveal className="page-section-head mx-auto max-w-3xl overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
            <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 border-b border-brand/15 bg-brand/[0.04] px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-brand sm:px-6">
              <span>Feature</span>
              <span>What We Offer</span>
            </div>
            <ul className="divide-y divide-black/[0.05]">
              {glance.map((row) => (
                <li
                  key={row.feature}
                  className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 px-5 py-4 sm:px-6"
                >
                  <span className="text-sm font-semibold text-navy">{row.feature}</span>
                  <span className="text-sm leading-snug text-navy/60">{row.offer}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <StaggerGroup className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: MapPinned, title: "Local & outstation", text: "City hops to long highway runs." },
              { icon: Plane, title: "Airport transfers", text: "On-time pickups for every flight." },
              { icon: Users, title: "Group travel", text: "SUV to bus for tours and events." },
            ].map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <article className="feature-row h-full">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-navy">{title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-navy/55">{text}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-t border-black/[0.04] bg-soft page-section">
        <Container>
          <div className="grid grid-cols-1 page-grid items-start lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="section-eyebrow">Trip day</p>
              <h2 className="section-title mt-2 text-left">What happens once you book</h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-navy/55">
                No guesswork at the curb. You always know where to stand, who is
                picking you up, and how to reach support.
              </p>
              <div className="feature-row mt-6">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="text-sm leading-relaxed text-navy/65">
                  Transparent per-km packages. You see the fare before you confirm on
                  WhatsApp.
                </p>
              </div>
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
              {day.map(({ icon: Icon, title, text }, i) => (
                <StaggerItem key={title}>
                  <article className="feature-row h-full">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand/80">
                        Step {i + 1}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-navy">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy/55">{text}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <section className="border-t border-black/[0.04] bg-white page-section">
        <Container>
          <div className="grid grid-cols-1 items-start page-grid page-grid-2">
            <Reveal direction="left" className="lg:sticky lg:top-24">
              <PhotoCard
                src={images.travelHills}
                alt="Pune to Lonavala hill route with Pune Cabz"
                variant="banner"
              />
            </Reveal>

            <Reveal direction="right">
              <p className="section-eyebrow">Questions</p>
              <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                <CircleHelp className="h-6 w-6" />
              </span>
              <h2 className="section-title mt-4 text-left">Before you book</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy/55">
                Short answers. If you still need help, WhatsApp us from any page.
              </p>

              <div className="mt-6 space-y-3">
                {faqs.map((item, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={item.q} className="faq-item">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="pr-2 text-sm font-semibold text-navy sm:text-[15px]">
                          {item.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="shrink-0 text-navy/40"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-4 text-sm leading-relaxed text-navy/60">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-white page-section">
        <Container>
          <Reveal>
            <div className="cta-panel px-6 py-9 text-center sm:px-10 sm:py-11">
              <h2 className="relative text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready for the road?
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
                Search a route, pick your cab, and travel with Pune Cabz — Pune to
                Mumbai, Nashik, Goa, and beyond.
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
