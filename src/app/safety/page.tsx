"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  IdCard,
  MapPinned,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Container from "@/components/Container";
import PhotoCard from "@/components/PhotoCard";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const features = [
  {
    icon: IdCard,
    title: "ID verification",
    text: "Every member confirms a government ID and a live selfie before their first ride.",
  },
  {
    icon: Star,
    title: "Ratings that matter",
    text: "Drivers and passengers rate each other. Low-rated profiles get reviewed by our team.",
  },
  {
    icon: MapPinned,
    title: "Share live location",
    text: "Send a live trip link to family so they can follow your route until you arrive.",
  },
  {
    icon: PhoneCall,
    title: "SOS and 24/7 help",
    text: "One tap to call emergency services or reach Pune Cabz support during an active ride.",
  },
  {
    icon: Users,
    title: "Women-preferred rides",
    text: "Filter for women drivers or mixed groups when you want extra comfort on the road.",
  },
  {
    icon: Headphones,
    title: "Human support",
    text: "Real people on WhatsApp, phone, and email - not a bot - when something is off.",
  },
];

const stages = [
  {
    step: "01",
    title: "Before you book",
    text: "See verified ID status, ratings, car type, and pickup notes. Book only when the profile looks right.",
  },
  {
    step: "02",
    title: "During the ride",
    text: "Share live location, stay in in-app chat, and use SOS if you need help on the road.",
  },
  {
    step: "03",
    title: "After drop",
    text: "Rate the other person. Honest ratings keep the next Pune Cabz ride safer for everyone.",
  },
];

const actions = [
  "End the trip if you feel unsafe and move to a public place.",
  "Call us or WhatsApp with the ride details. We pause the other profile while we look into it.",
  "If it is an emergency, call 112 first - then tell Pune Cabz so we can follow up.",
];

export default function SafetyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-soft pb-12 pt-10 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-brand-light/20 blur-3xl" />

        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand"
              >
                <BadgeCheck className="h-3.5 w-3.5" />
                Trust and safety
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-4 text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl"
              >
                Ride safer,
                <br />
                <span className="text-gradient-brand">every kilometre.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 text-[15px] leading-relaxed text-navy/60"
              >
                Identity checks, live trip sharing, and a support team that picks
                up. Sharing a car with someone new should still feel like a good
                idea.
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
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-sm ring-1 ring-black/5 hover:bg-soft"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  Talk to support
                </a>
              </motion.div>
            </div>

            <PhotoCard
              src={images.handshake}
              alt="Trusted Pune Cabz community"
              badge="verified"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="border-y border-black/5 bg-white py-8">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Verified IDs", text: "Government ID and selfie before the first ride" },
              { label: "4.8 community rating", text: "Drivers and passengers rate every trip" },
              { label: "24/7 human help", text: "WhatsApp, phone, and SOS on active rides" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="rounded-2xl bg-soft px-5 py-4 text-left">
                  <p className="text-sm font-bold text-navy">{item.label}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-navy/55">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Built in</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Protection on every booking
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
              Safety is not a banner. It is how Pune Cabz is designed from search
              to drop.
            </p>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <StaggerItem key={title}>
                <article className="flex h-full flex-col rounded-2xl border border-black/5 bg-soft p-6 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/25">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
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

      <section className="bg-soft py-14 sm:py-16">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">From search to seat</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              How we keep you safer
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
              Checks before you confirm. Tools while you travel. Follow-up after
              you arrive.
            </p>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {stages.map(({ step, title, text }) => (
              <StaggerItem key={title}>
                <article className="h-full rounded-2xl border border-black/5 bg-white p-7 text-left shadow-sm">
                  <p className="text-2xl font-extrabold tabular-nums text-brand">{step}</p>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/25">
                <ShieldAlert className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                If something feels off
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
                Do not wait it out. Your safety comes first - we will handle the
                booking after you are somewhere public.
              </p>
              <ol className="mt-6 space-y-3">
                {actions.map((item, i) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy/70">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-[11px] font-bold text-brand">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call helpline
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp support
                </a>
              </div>
            </Reveal>
            <Reveal direction="right">
              <PhotoCard src={images.friendsTable} alt="Travelling together with trust" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-soft py-12 sm:py-16">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-black/5 bg-white p-7 sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy">
                  Ready to ride with checks in place?
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-navy/60">
                  Book a verified seat across Pune and Maharashtra - or read how
                  the booking flow works before you go.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark"
                >
                  Book your cars
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 rounded-full bg-soft px-6 py-3 text-sm font-semibold text-navy"
                >
                  How it works
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
