"use client";

import {
  Headphones,
  MapPinned,
  ShieldCheck,
  Sofa,
  UsersRound,
  Wrench,
} from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/en";

export default function WhyTravelWithUs() {
  const t = useT();

  const reasons: { icon: typeof ShieldCheck; titleKey: MessageKey; textKey: MessageKey }[] = [
    {
      icon: ShieldCheck,
      titleKey: "whyTravel.safe.title",
      textKey: "whyTravel.safe.text",
    },
    {
      icon: MapPinned,
      titleKey: "whyTravel.anywhere.title",
      textKey: "whyTravel.anywhere.text",
    },
    {
      icon: UsersRound,
      titleKey: "whyTravel.room.title",
      textKey: "whyTravel.room.text",
    },
    {
      icon: Headphones,
      titleKey: "whyTravel.help.title",
      textKey: "whyTravel.help.text",
    },
    {
      icon: Sofa,
      titleKey: "whyTravel.relax.title",
      textKey: "whyTravel.relax.text",
    },
    {
      icon: Wrench,
      titleKey: "whyTravel.maintained.title",
      textKey: "whyTravel.maintained.text",
    },
  ];

  return (
    <section className="border-t border-black/[0.04] bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">{t("whyTravel.eyebrow")}</p>
          <h2 className="section-title">{t("whyTravel.title")}</h2>
          <p className="section-desc">{t("whyTravel.desc")}</p>
        </Reveal>

        <StaggerGroup className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, titleKey, textKey }) => (
            <StaggerItem key={titleKey}>
              <article className="group h-full rounded-2xl border border-black/[0.06] bg-white p-5 transition-colors hover:border-brand/20 sm:p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/[0.08] text-brand">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-[15px] font-bold tracking-tight text-navy">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/55">{t(textKey)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
