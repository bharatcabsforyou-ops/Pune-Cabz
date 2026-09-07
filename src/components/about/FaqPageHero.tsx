"use client";

import AboutSubHero from "@/components/about/AboutSubHero";
import { useT } from "@/lib/i18n";

export default function FaqPageHero() {
  const t = useT();

  return (
    <AboutSubHero
      eyebrow={t("faqPage.eyebrow")}
      title={t("faqPage.title")}
      description={t("faqPage.desc")}
      image="/image2.jpeg"
      imageAlt="Pune Cabz cab on the road"
    />
  );
}
