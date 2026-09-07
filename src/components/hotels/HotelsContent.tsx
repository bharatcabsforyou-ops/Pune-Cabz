"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, Plane, Star, Users } from "lucide-react";
import Container from "@/components/Container";
import FeatureIcon from "@/components/FeatureIcon";
import Reveal from "@/components/motion/Reveal";
import { useT, type MessageKey } from "@/lib/i18n";
import { site } from "@/lib/site";

const hotelOfferings: MessageKey[] = [
  "hotels.offer1",
  "hotels.offer2",
  "hotels.offer3",
  "hotels.offer4",
  "hotels.offer5",
];

const stats: { value: string; labelKey: MessageKey }[] = [
  { value: "500+", labelKey: "hotels.stat.hotels" },
  { value: "50+", labelKey: "hotels.stat.cities" },
  { value: "24/7", labelKey: "hotels.stat.support" },
  { value: "5★", labelKey: "hotels.stat.stays" },
];

const flightTags: MessageKey[] = [
  "hotels.tag.domestic",
  "hotels.tag.international",
  "hotels.tag.fares",
];

export default function HotelsContent() {
  const t = useT();

  return (
    <>
      <section className="relative border-b border-black/[0.06]">
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=1800"
            alt="Luxury hotel lobby"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                {t("hotels.eyebrow")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                {t("hotels.title")}
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                {t("hotels.desc")}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex px-6 py-2.5 btn-shine"
                >
                  {t("hotels.bookWhatsApp")}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {t("hotels.enquire")}
                </Link>
              </div>
            </div>
          </Container>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Container>
            <div className="flex flex-wrap justify-center gap-6 border-t border-white/10 bg-black/30 py-3 backdrop-blur-sm sm:gap-10">
              {stats.map((s) => (
                <div key={s.labelKey} className="text-center">
                  <p className="text-lg font-extrabold leading-none text-white">{s.value}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-white/60">{t(s.labelKey)}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>

      <section className="bg-white page-section">
        <Container>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <article className="pro-card no-hover h-full overflow-hidden text-left">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=900"
                    alt="Hotel room"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold text-white">{t("hotels.hotelBadge")}</span>
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-brand text-brand" />
                    ))}
                    <span className="text-xs text-navy/50 ml-1">{t("hotels.hotelStars")}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
                    {t("hotels.hotelServices")}
                  </h2>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-navy/60">
                    <p>{t("hotels.hotelP1")}</p>
                    <p>{t("hotels.hotelP2")}</p>
                  </div>
                  <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                    {t("hotels.keyOfferings")}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {hotelOfferings.map((key) => (
                      <li key={key} className="flex gap-2.5 text-sm leading-relaxed text-navy/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="pro-card no-hover h-full overflow-hidden text-left">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=900"
                    alt="Airplane flying above clouds"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-1.5">
                    <Plane className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold text-white">{t("hotels.flightBadge")}</span>
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="flex flex-wrap gap-2">
                    {flightTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand/[0.07] px-2.5 py-1 text-[11px] font-semibold text-brand"
                      >
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
                    {t("hotels.flightServices")}
                  </h2>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-navy/60">
                    <p>{t("hotels.flightP1")}</p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-black/[0.05] bg-soft p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <FeatureIcon icon={Users} size="md" className="shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-navy">{t("hotels.approachTitle")}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                          {t("hotels.approachDesc")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link href="/contact" className="btn-primary mt-5 inline-flex px-5 py-2.5">
                    {t("hotels.enquire")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-black/[0.04] bg-white page-section">
        <Container>
          <Reveal>
            <div className="cta-panel px-6 py-10 text-center sm:px-10 sm:py-12">
              <p className="section-eyebrow bg-white/15 text-white">{t("hotels.cta.eyebrow")}</p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {t("hotels.cta.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] text-white/75">
                {t("hotels.cta.desc")}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand shadow transition hover:bg-white/90"
                >
                  {t("hotels.bookWhatsApp")}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {t("hotels.bookCab")}
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
