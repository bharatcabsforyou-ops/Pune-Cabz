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
import { useT, type MessageKey } from "@/lib/i18n";
import { useSiteImage } from "@/lib/content-overrides";

const highlights: {
  icon: typeof Mountain;
  labelKey: MessageKey;
  descKey: MessageKey;
}[] = [
  {
    icon: Mountain,
    labelKey: "tourism.highlight.hills",
    descKey: "tourism.highlight.hillsDesc",
  },
  {
    icon: Palmtree,
    labelKey: "tourism.highlight.coast",
    descKey: "tourism.highlight.coastDesc",
  },
  {
    icon: CalendarDays,
    labelKey: "tourism.highlight.monsoon",
    descKey: "tourism.highlight.monsoonDesc",
  },
  {
    icon: CarFront,
    labelKey: "tourism.highlight.pilgrim",
    descKey: "tourism.highlight.pilgrimDesc",
  },
];

const stats: { value: string; labelKey: MessageKey }[] = [
  { value: "30+", labelKey: "tourism.stat.destinations" },
  { value: "6+", labelKey: "tourism.stat.years" },
  { value: "10", labelKey: "tourism.stat.vehicles" },
];

const steps: {
  icon: typeof Sun;
  step: string;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  {
    icon: Sun,
    step: "01",
    titleKey: "tourism.step1.title",
    textKey: "tourism.step1.text",
  },
  {
    icon: Users,
    step: "02",
    titleKey: "tourism.step2.title",
    textKey: "tourism.step2.text",
  },
  {
    icon: ShieldCheck,
    step: "03",
    titleKey: "tourism.step3.title",
    textKey: "tourism.step3.text",
  },
];

export default function TourismPage() {
  const t = useT();
  const heroImage = useSiteImage("tourism.hero", images.travelHills);

  return (
    <>
      <section className="relative overflow-hidden border-b border-black/[0.04] bg-[#12090b]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
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
              {t("tourism.eyebrow")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="mt-2.5 text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              {t("tourism.title")}{" "}
              <span className="text-brand-light">{t("tourism.titleAccent")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]"
            >
              {t("tourism.desc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2"
            >
              {stats.map((s) => (
                <span
                  key={s.labelKey}
                  className="inline-flex items-baseline gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm"
                >
                  <span className="font-extrabold text-brand-light">{s.value}</span>
                  <span className="text-white/55">{t(s.labelKey)}</span>
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
                {t("common.bookRideNow")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/18"
              >
                {t("tourism.viewDestinations")}
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-b border-black/[0.04] bg-white py-10 sm:py-12">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">{t("tourism.kind.eyebrow")}</p>
            <h2 className="section-title">{t("tourism.kind.title")}</h2>
          </Reveal>

          <StaggerGroup className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, labelKey, descKey }, i) => (
              <StaggerItem key={labelKey}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-soft p-5 transition-all duration-300 hover:border-brand/20 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(220,31,38,0.35)]">
                  <span className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-brand/[0.06] transition-transform duration-500 group-hover:scale-125" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/25">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="relative mt-4 text-base font-bold text-navy">{t(labelKey)}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-navy/55">{t(descKey)}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-b border-black/[0.04] bg-soft py-8 sm:py-10">
        <Container>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {steps.map(({ icon: Icon, step, titleKey, textKey }) => (
              <div
                key={titleKey}
                className="flex gap-4 rounded-2xl border border-black/[0.05] bg-white px-4 py-4 sm:px-5 sm:py-5"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.08] text-brand ring-1 ring-brand/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-brand/70">{step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy">{t(titleKey)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/55">{t(textKey)}</p>
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
                {t("tourism.ready")}
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
                {t("tourism.readyDesc")}
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
