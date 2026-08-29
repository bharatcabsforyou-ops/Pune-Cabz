"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  ChevronDown,
  CircleHelp,
  Clock3,
  Luggage,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import Container from "@/components/Container";
import FeatureIcon from "@/components/FeatureIcon";
import HowItWorks from "@/components/HowItWorks";
import PhotoCard from "@/components/PhotoCard";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { images } from "@/lib/images";

const roles = [
  {
    icon: UserRound,
    title: "For passengers",
    intro: "You need a seat. We match you with a verified car going your way.",
    points: [
      "Search any Pune or Maharashtra route by time and price",
      "See driver ratings, car type, and pickup notes before you book",
      "Pay only your share of fuel and tolls - no surge",
      "Share a live trip link with family until you arrive",
    ],
  },
  {
    icon: CarFront,
    title: "For drivers",
    intro: "You have empty seats. Fill them and split the cost of the same trip.",
    points: [
      "Publish a ride in under two minutes",
      "Choose who rides with you from verified profiles",
      "Keep the shared fare - there is no listing fee",
      "Build a rating that fills seats faster next time",
    ],
  },
];

const day = [
  {
    icon: MessageCircle,
    title: "Before pickup",
    text: "You get driver name, car, and a map pin. Chat in-app if you need to shift the time by a few minutes.",
  },
  {
    icon: MapPinned,
    title: "At the pin",
    text: "Arrive five minutes early. Confirm the number plate, say hello, and stow bags before you leave.",
  },
  {
    icon: Clock3,
    title: "On the road",
    text: "Share live location with family. AC, highway stops, and drop points stay as booked.",
  },
  {
    icon: Luggage,
    title: "After drop",
    text: "Rate each other. Fair ratings keep the next Pune Cabz ride safer for everyone.",
  },
];

const faqs = [
  {
    q: "How do I book a seat?",
    a: "Open Book your cars, enter from, to, and date, pick a verified ride, and confirm. You will get driver and pickup details right away.",
  },
  {
    q: "How is the price set?",
    a: "Drivers set a fare that covers fuel and tolls, split across seats. Pune Cabz does not add surge or hidden markups.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Cancel as early as you can so the seat can go to someone else. Last-minute no-shows can affect your rating.",
  },
  {
    q: "What luggage can I bring?",
    a: "One cabin bag plus a small backpack is standard. Mention extra bags in chat before you book so the driver can confirm space.",
  },
];

export default function HowItWorksPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="relative overflow-hidden bg-white pb-8 pt-6 sm:pb-10 sm:pt-8">
        <Container className="relative">
          <div className="grid grid-cols-1 items-center page-grid page-grid-2">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand"
              >
                How it works
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-4 text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl"
              >
                Search. Book.
                <br />
                <span className="text-gradient-brand">Share the road.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 text-[15px] leading-relaxed text-navy/60"
              >
                Pune Cabz is built for Pune and Maharashtra routes. Find a verified
                seat, split fuel and tolls, and travel with people who have been
                checked - not with a surprise fare at the gate.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark"
                >
                  Book your cars
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/safety"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-sm ring-1 ring-black/5 hover:bg-soft"
                >
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

      <section id="offer" className="scroll-mt-24 bg-soft page-section">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Two sides, one app</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Ride as you like
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
              Passengers and drivers use the same flow - just different seats.
            </p>
          </Reveal>

          <StaggerGroup className="page-section-head grid grid-cols-1 gap-5 lg:grid-cols-2">
            {roles.map(({ icon: Icon, title, intro, points }) => (
              <StaggerItem key={title}>
                <article className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 text-left shadow-sm">
                  <FeatureIcon icon={Icon} size="lg" className="h-12 w-12" iconClassName="h-6 w-6" />
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{intro}</p>
                  <ul className="mt-5 space-y-3">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-navy/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white page-section">
        <Container>
          <div className="grid grid-cols-1 page-grid items-start lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Trip day</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                What happens once you book
              </h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-navy/60">
                No guesswork at the curb. You always know where to stand, who is
                picking you up, and how to reach support.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-soft p-4">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="text-sm leading-relaxed text-navy/65">
                  Fair shared pricing covers fuel and tolls only. You see the fare
                  before you confirm.
                </p>
              </div>
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
              {day.map(({ icon: Icon, title, text }, i) => (
                <StaggerItem key={title}>
                  <article className="flex h-full gap-4 rounded-2xl border border-black/5 bg-soft p-5 text-left">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand/80">
                        Step {i + 1}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-navy">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy/60">{text}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <section className="bg-soft page-section">
        <Container>
          <div className="grid grid-cols-1 items-start page-grid page-grid-2">
            <Reveal direction="left" className="lg:sticky lg:top-24">
              <PhotoCard
                src={images.film3}
                alt="Pune to Nashik with Pune Cabz"
                variant="banner"
              />
            </Reveal>

            <Reveal direction="right">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Questions</p>
              <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                <CircleHelp className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                Before you book
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy/60">
                Short answers. If you still need help, WhatsApp us from any page.
              </p>

              <div className="mt-8 space-y-3">
                {faqs.map((item, i) => {
                  const isOpen = open === i;
                  return (
                    <div
                      key={item.q}
                      className="overflow-hidden rounded-2xl border border-black/5 bg-white text-left"
                    >
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
            <div className="rounded-3xl bg-navy px-6 py-12 text-center sm:px-12 sm:py-14">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready for the road?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
                Search a route, pick a verified ride, and travel together - Pune
                to Mumbai, Nashik, Goa, and beyond.
              </p>
              <Link
                href="/book"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-brand-dark"
              >
                Book your cars
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
