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
                refunds, plus 24×7 assistance across 80+ cities.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link href="/book" className="btn-primary px-6 py-3">
                  Book your cars
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
            <p className="section-eyebrow">Two sides, one app</p>
            <h2 className="section-title">Ride as you like</h2>
            <p className="section-desc">
              Passengers and drivers use the same flow - just different seats.
            </p>
          </Reveal>

          <StaggerGroup className="page-section-head grid grid-cols-1 gap-4 lg:grid-cols-2">
            {roles.map(({ icon: Icon, title, intro, points }) => (
              <StaggerItem key={title}>
                <article className="pro-card flex h-full flex-col p-5 sm:p-6">
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
                  Fair shared pricing covers fuel and tolls only. You see the fare
                  before you confirm.
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
                alt="Pune to Nashik hill route with Pune Cabz"
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
                Search a route, pick a verified ride, and travel together - Pune
                to Mumbai, Nashik, Goa, and beyond.
              </p>
              <Link
                href="/book"
                className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02] hover:bg-white/95"
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
