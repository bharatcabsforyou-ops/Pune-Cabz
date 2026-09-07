"use client";

import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";
import { useT, type MessageKey } from "@/lib/i18n";

const glance: { featureKey: MessageKey; offerKey: MessageKey }[] = [
  { featureKey: "glance.rideOptions", offerKey: "glance.rideOptionsOffer" },
  { featureKey: "glance.services", offerKey: "glance.servicesOffer" },
  { featureKey: "glance.reach", offerKey: "glance.reachOffer" },
  { featureKey: "glance.promise", offerKey: "glance.promiseOffer" },
];

export default function Testimonial() {
  const t = useT();

  return (
    <section className="border-t border-black/[0.04] bg-soft page-section">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <article className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
              <div className="border-b border-brand/15 bg-brand/[0.04] px-6 py-5 sm:px-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  {t("glance.eyebrow")}
                </p>
                <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">
                  {t("glance.title")}
                </h2>
              </div>

              <div className="px-6 py-2 sm:px-7">
                <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 border-b border-black/[0.06] py-3 text-[11px] font-bold uppercase tracking-wider text-navy/40">
                  <span>{t("glance.feature")}</span>
                  <span>{t("glance.offer")}</span>
                </div>
                <ul className="divide-y divide-black/[0.05]">
                  {glance.map((row) => (
                    <li
                      key={row.featureKey}
                      className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 py-3.5"
                    >
                      <span className="text-sm font-semibold text-navy">{t(row.featureKey)}</span>
                      <span className="text-sm leading-snug text-navy/60">{t(row.offerKey)}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-black/[0.05] py-4 text-sm text-navy/50">
                  {t("glance.footer")}
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                {t("glance.story.eyebrow")}
              </p>
              <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">
                {t("glance.story.title")}
              </h2>

              <blockquote className="mt-5 text-[15px] leading-relaxed text-navy/65">
                &ldquo;{t("glance.story.quote")}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-black/[0.05] pt-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={images.portraitKabir}
                    alt="Kabir Malhotra"
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-navy">Kabir Malhotra</p>
                  <p className="text-xs text-navy/45">{t("glance.story.role")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {t("glance.verified")}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
