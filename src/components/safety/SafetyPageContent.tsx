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
import FeatureIcon from "@/components/FeatureIcon";
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

export default function SafetyPageContent() {
  return (
    <>
      <section className="page-hero">
        <Container className="relative">
          <div className="grid grid-cols-1 items-center page-grid page-grid-2">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-eyebrow inline-flex items-center gap-1.5"
              >
                <BadgeCheck className="h-3.5 w-3.5" />
                Trust and safety
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="section-title mt-4 text-[1.85rem] sm:text-5xl"
              >
                Ride safer,
                <br />
                <span className="text-gradient-brand">every kilometre.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="section-desc mt-5 text-left"
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
                <Link href="/book" className="btn-primary px-6 py-3">
                  Book your cars
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-6 py-3"
                >
                  <WhatsAppIcon className="h-4 w-4 text-brand" />
                  Talk to support
                </a>
              </motion.div>
            </div>

            <PhotoCard
              src={images.travelDriveView}
              alt="Safe travel with verified Pune Cabz drivers"
              variant="banner"
              badge="verified"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="border-y border-black/[0.04] bg-white py-6 sm:py-8">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Verified IDs", text: "Government ID and selfie before the first ride" },
              { label: "4.8 community rating", text: "Drivers and passengers rate every trip" },
              { label: "24/7 human help", text: "WhatsApp, phone, and SOS on active rides" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="pro-card no-hover p-4 text-left sm:p-5">
                  <p className="text-sm font-bold text-navy">{item.label}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-navy/55">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-t border-black/[0.04] bg-white page-section">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">Built in</p>
            <h2 className="section-title">Protection on every booking</h2>
            <p className="section-desc">
              Safety is not a banner. It is how Pune Cabz is designed from search
              to drop.
            </p>
          </Reveal>

          <StaggerGroup className="page-section-head grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <StaggerItem key={title}>
                <article className="pro-card no-hover flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <FeatureIcon icon={Icon} size="lg" />
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

      <section className="border-t border-black/[0.04] bg-soft page-section">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">From search to seat</p>
            <h2 className="section-title">How we keep you safer</h2>
            <p className="section-desc">
              Checks before you confirm. Tools while you travel. Follow-up after
              you arrive.
            </p>
          </Reveal>

          <StaggerGroup className="page-section-head grid grid-cols-1 gap-3 lg:grid-cols-3">
            {stages.map(({ step, title, text }) => (
              <StaggerItem key={title}>
                <article className="pro-card h-full p-5 sm:p-6 text-left">
                  <p className="text-2xl font-extrabold tabular-nums text-brand">{step}</p>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white page-section">
        <Container>
          <div className="grid grid-cols-1 items-center page-grid page-grid-2">
            <Reveal>
              <FeatureIcon icon={ShieldAlert} size="lg" className="h-12 w-12" iconClassName="h-6 w-6" />
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
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call helpline
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
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

      <section className="bg-soft page-section">
        <Container>
          <Reveal>
            <div className="pro-card-static grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <FeatureIcon icon={ShieldCheck} size="lg" />
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy">
                  Ready to ride with checks in place?
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-navy/60">
                  Book a verified seat across Pune and Maharashtra - or read how
                  the booking flow works before you go.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Link href="/book" className="btn-primary px-6 py-3">
                  Book your cars
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/how-it-works" className="btn-secondary px-6 py-3">
                  Our Services
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
