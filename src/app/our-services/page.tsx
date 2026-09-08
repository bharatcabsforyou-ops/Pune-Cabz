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
import { useT, type MessageKey } from "@/lib/i18n";
import { useSiteImage } from "@/lib/content-overrides";

const glance: { featureKey: MessageKey; offerKey: MessageKey }[] = [
  { featureKey: "glance.rideOptions", offerKey: "glance.rideOptionsOffer" },
  { featureKey: "glance.services", offerKey: "glance.servicesOffer" },
  { featureKey: "glance.reach", offerKey: "glance.reachOffer" },
  { featureKey: "glance.promise", offerKey: "glance.promiseOffer" },
];

const day: {
  icon: typeof MessageCircle;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  {
    icon: MessageCircle,
    titleKey: "services.day.before.title",
    textKey: "services.day.before.text",
  },
  {
    icon: MapPinned,
    titleKey: "services.day.location.title",
    textKey: "services.day.location.text",
  },
  {
    icon: Clock3,
    titleKey: "services.day.road.title",
    textKey: "services.day.road.text",
  },
  {
    icon: Luggage,
    titleKey: "services.day.drop.title",
    textKey: "services.day.drop.text",
  },
];

const faqs: { qKey: MessageKey; aKey: MessageKey }[] = [
  { qKey: "services.faq.q1", aKey: "services.faq.a1" },
  { qKey: "services.faq.q2", aKey: "services.faq.a2" },
  { qKey: "services.faq.q3", aKey: "services.faq.a3" },
  { qKey: "services.faq.q4", aKey: "services.faq.a4" },
];

const chips: {
  icon: typeof MapPinned;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  {
    icon: MapPinned,
    titleKey: "services.chip.local.title",
    textKey: "services.chip.local.text",
  },
  {
    icon: Plane,
    titleKey: "services.chip.airport.title",
    textKey: "services.chip.airport.text",
  },
  {
    icon: Users,
    titleKey: "services.chip.group.title",
    textKey: "services.chip.group.text",
  },
];

export default function HowItWorksPage() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  const heroImage = useSiteImage("services.hero", images.film2);
  const faqImage = useSiteImage("services.faq", images.travelHills);

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
                {t("nav.ourServices")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="section-title mt-4 text-[1.85rem] sm:text-5xl"
              >
                {t("services.hero.title")}
                <br />
                <span className="text-gradient-brand">{t("services.hero.titleAccent")}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="section-desc mt-5 text-left"
              >
                {t("services.hero.desc")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link href="/book" className="btn-primary px-6 py-3">
                  {t("common.bookRideNow")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/safety" className="btn-secondary px-6 py-3">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  {t("services.hero.safetyCta")}
                </Link>
              </motion.div>
            </div>

            <PhotoCard
              src={heroImage}
              alt={t("services.hero.imageAlt")}
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
            <p className="section-eyebrow">{t("glance.eyebrow")}</p>
            <h2 className="section-title">{t("glance.title")}</h2>
            <p className="section-desc">{t("services.glance.desc")}</p>
          </Reveal>

          <Reveal className="page-section-head mx-auto max-w-3xl overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
            <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 border-b border-brand/15 bg-brand/[0.04] px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-brand sm:px-6">
              <span>{t("glance.feature")}</span>
              <span>{t("glance.offer")}</span>
            </div>
            <ul className="divide-y divide-black/[0.05]">
              {glance.map((row) => (
                <li
                  key={row.featureKey}
                  className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 px-5 py-4 sm:px-6"
                >
                  <span className="text-sm font-semibold text-navy">{t(row.featureKey)}</span>
                  <span className="text-sm leading-snug text-navy/60">{t(row.offerKey)}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <StaggerGroup className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {chips.map(({ icon: Icon, titleKey, textKey }) => (
              <StaggerItem key={titleKey}>
                <article className="feature-row h-full">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-navy">{t(titleKey)}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-navy/55">{t(textKey)}</p>
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
              <p className="section-eyebrow">{t("services.day.eyebrow")}</p>
              <h2 className="section-title mt-2 text-left">{t("services.day.title")}</h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-navy/55">
                {t("services.day.desc")}
              </p>
              <div className="feature-row mt-6">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="text-sm leading-relaxed text-navy/65">{t("services.day.fareNote")}</p>
              </div>
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
              {day.map(({ icon: Icon, titleKey, textKey }, i) => (
                <StaggerItem key={titleKey}>
                  <article className="feature-row h-full">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand/80">
                        {t("services.day.step", { n: i + 1 })}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-navy">{t(titleKey)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy/55">{t(textKey)}</p>
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
                src={faqImage}
                alt={t("services.faq.imageAlt")}
                variant="banner"
              />
            </Reveal>

            <Reveal direction="right">
              <p className="section-eyebrow">{t("services.faq.eyebrow")}</p>
              <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                <CircleHelp className="h-6 w-6" />
              </span>
              <h2 className="section-title mt-4 text-left">{t("services.faq.title")}</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy/55">
                {t("services.faq.desc")}
              </p>

              <div className="mt-6 space-y-3">
                {faqs.map((item, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={item.qKey} className="faq-item">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="pr-2 text-sm font-semibold text-navy sm:text-[15px]">
                          {t(item.qKey)}
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
                            <p className="px-5 pb-4 text-sm leading-relaxed text-navy/60">
                              {t(item.aKey)}
                            </p>
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
                {t("services.cta.title")}
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
                {t("services.cta.desc")}
              </p>
              <Link
                href="/book"
                className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02] hover:bg-white/95"
              >
                {t("common.bookRideNow")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
