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
import { useT, type MessageKey } from "@/lib/i18n";
import { site } from "@/lib/site";
import { useSiteImage } from "@/lib/content-overrides";

const features: {
  icon: typeof IdCard;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  { icon: IdCard, titleKey: "safety.f1.title", textKey: "safety.f1.text" },
  { icon: Star, titleKey: "safety.f2.title", textKey: "safety.f2.text" },
  { icon: MapPinned, titleKey: "safety.f3.title", textKey: "safety.f3.text" },
  { icon: PhoneCall, titleKey: "safety.f4.title", textKey: "safety.f4.text" },
  { icon: Users, titleKey: "safety.f5.title", textKey: "safety.f5.text" },
  { icon: Headphones, titleKey: "safety.f6.title", textKey: "safety.f6.text" },
];

const stages: {
  step: string;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  { step: "01", titleKey: "safety.s1.title", textKey: "safety.s1.text" },
  { step: "02", titleKey: "safety.s2.title", textKey: "safety.s2.text" },
  { step: "03", titleKey: "safety.s3.title", textKey: "safety.s3.text" },
];

const actionKeys: MessageKey[] = [
  "safety.off.a1",
  "safety.off.a2",
  "safety.off.a3",
];

const stats: { labelKey: MessageKey; textKey: MessageKey }[] = [
  { labelKey: "safety.stat1.label", textKey: "safety.stat1.text" },
  { labelKey: "safety.stat2.label", textKey: "safety.stat2.text" },
  { labelKey: "safety.stat3.label", textKey: "safety.stat3.text" },
];

export default function SafetyPageContent() {
  const t = useT();
  const heroImage = useSiteImage("safety.hero", images.travelDriveView);
  const friendsImage = useSiteImage("safety.friends", images.friendsTable);

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
                {t("safety.eyebrow")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="section-title mt-4 text-[1.85rem] sm:text-5xl"
              >
                {t("safety.title1")}
                <br />
                <span className="text-gradient-brand">{t("safety.title2")}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="section-desc mt-5 text-left"
              >
                {t("safety.desc")}
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
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-6 py-3"
                >
                  <WhatsAppIcon className="h-4 w-4 text-brand" />
                  {t("safety.talkSupport")}
                </a>
              </motion.div>
            </div>

            <PhotoCard
              src={heroImage}
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
            {stats.map((item) => (
              <StaggerItem key={item.labelKey}>
                <div className="pro-card no-hover p-4 text-left sm:p-5">
                  <p className="text-sm font-bold text-navy">{t(item.labelKey)}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-navy/55">
                    {t(item.textKey)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-t border-black/[0.04] bg-white page-section">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">{t("safety.built.eyebrow")}</p>
            <h2 className="section-title">{t("safety.built.title")}</h2>
            <p className="section-desc">{t("safety.built.desc")}</p>
          </Reveal>

          <StaggerGroup className="page-section-head grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, titleKey, textKey }, i) => (
              <StaggerItem key={titleKey}>
                <article className="pro-card no-hover flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <FeatureIcon icon={Icon} size="lg" />
                    <span className="text-2xl font-extrabold tabular-nums text-brand/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold tracking-tight text-navy">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">
                    {t(textKey)}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-t border-black/[0.04] bg-soft page-section">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">{t("safety.flow.eyebrow")}</p>
            <h2 className="section-title">{t("safety.flow.title")}</h2>
            <p className="section-desc">{t("safety.flow.desc")}</p>
          </Reveal>

          <StaggerGroup className="page-section-head grid grid-cols-1 gap-3 lg:grid-cols-3">
            {stages.map(({ step, titleKey, textKey }) => (
              <StaggerItem key={titleKey}>
                <article className="pro-card h-full p-5 sm:p-6 text-left">
                  <p className="text-2xl font-extrabold tabular-nums text-brand">{step}</p>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-navy">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">
                    {t(textKey)}
                  </p>
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
                {t("safety.off.title")}
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
                {t("safety.off.desc")}
              </p>
              <ol className="mt-6 space-y-3">
                {actionKeys.map((key, i) => (
                  <li key={key} className="flex gap-3 text-sm leading-relaxed text-navy/70">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-[11px] font-bold text-brand">
                      {i + 1}
                    </span>
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  <PhoneCall className="h-4 w-4" />
                  {t("safety.callHelpline")}
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t("safety.waSupport")}
                </a>
              </div>
            </Reveal>
            <Reveal direction="right">
              <PhotoCard src={friendsImage} alt="Travelling together with trust" />
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
                  {t("safety.cta.title")}
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-navy/60">
                  {t("safety.cta.desc")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Link href="/book" className="btn-primary px-6 py-3">
                  {t("common.bookRideNow")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/our-services" className="btn-secondary px-6 py-3">
                  {t("nav.ourServices")}
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
