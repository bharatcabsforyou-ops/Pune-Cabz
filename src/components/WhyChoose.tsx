"use client";

import {
  BadgeCheck,
  CarFront,
  Clock3,
  Headphones,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import Container from "./Container";
import FeatureIcon from "./FeatureIcon";
import RouteBannerImage from "./RouteBannerImage";
import Reveal from "./motion/Reveal";
import { useT, type MessageKey } from "@/lib/i18n";

const reasons: { icon: typeof Clock3; titleKey: MessageKey; textKey: MessageKey }[] = [
  {
    icon: Clock3,
    titleKey: "whyChoose.onTime.title",
    textKey: "whyChoose.onTime.text",
  },
  {
    icon: IndianRupee,
    titleKey: "whyChoose.fare.title",
    textKey: "whyChoose.fare.text",
  },
  {
    icon: BadgeCheck,
    titleKey: "whyChoose.drivers.title",
    textKey: "whyChoose.drivers.text",
  },
  {
    icon: CarFront,
    titleKey: "whyChoose.cars.title",
    textKey: "whyChoose.cars.text",
  },
  {
    icon: Sparkles,
    titleKey: "whyChoose.booking.title",
    textKey: "whyChoose.booking.text",
  },
  {
    icon: Headphones,
    titleKey: "whyChoose.help.title",
    textKey: "whyChoose.help.text",
  },
];

export default function WhyChoose() {
  const t = useT();

  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">{t("whyChoose.eyebrow")}</p>
          <h2 className="section-title">{t("whyChoose.title")}</h2>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal direction="left" className="pro-card-static relative min-w-0 overflow-hidden p-0">
            <RouteBannerImage
              src="/image2.jpeg"
              alt="Highway travel across Maharashtra with Pune Cabz"
              rounded="none"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-navy shadow-sm ring-1 ring-black/[0.05]">
              {t("whyChoose.badge")}
            </span>
          </Reveal>

          <div className="flex flex-col gap-2.5">
            {reasons.map(({ icon: Icon, titleKey, textKey }) => (
              <div key={titleKey} className="feature-row group">
                <FeatureIcon icon={Icon} size="md" className="shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-navy">{t(titleKey)}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-navy/55">{t(textKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
