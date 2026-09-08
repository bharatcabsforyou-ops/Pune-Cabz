"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import Container from "./Container";
import HeroMediaBackground from "./HeroMediaBackground";
import BookCabForm from "./BookCabForm";
import { useLocale, useT } from "@/lib/i18n";

export default function Hero() {
  const t = useT();
  const { locale } = useLocale();
  const isDevanagari = locale === "hi" || locale === "mr";

  const stats = [
    { value: "30+", label: t("hero.stat.cities") },
    { value: "6+", label: t("hero.stat.years") },
    { value: "10", label: t("hero.stat.vehicles") },
    { value: "24×7", label: t("hero.stat.support") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#141012]">
      <HeroMediaBackground />

      <Container className="relative z-10 pt-3 pb-5 sm:pt-4 sm:pb-6 lg:pt-5 lg:pb-7">
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,560px)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(360px,600px)]">
          <div className="min-w-0 max-w-2xl pt-0.5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge-pill px-3 py-1.5 text-sm font-semibold sm:text-[15px]"
            >
              {t("hero.badge")}
            </motion.p>

            <h1
              lang={locale}
              className={clsx(
                "mt-3 flex flex-col items-start text-left font-extrabold sm:mt-3.5",
                isDevanagari
                  ? "gap-1.5 text-[2.05rem] leading-[1.3] tracking-normal sm:gap-2 sm:text-[2.75rem] sm:leading-[1.28] lg:text-[3.25rem] lg:leading-[1.26] [font-family:var(--font-devanagari),var(--font-jakarta),sans-serif]"
                  : "gap-1 text-[2.25rem] leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]"
              )}
            >
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="block w-full pl-0 text-left text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              >
                {t("hero.title1")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="block w-full pl-0 text-left text-brand drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              >
                {t("hero.title2")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className={clsx(
                "mt-3 font-semibold text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]",
                isDevanagari ? "text-[15px] leading-snug sm:text-base" : "text-[15px] sm:text-base"
              )}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className={clsx(
                "mt-2.5 max-w-lg text-white/92 sm:mt-3 drop-shadow-[0_1px_8px_rgba(0,0,0,0.25)]",
                isDevanagari
                  ? "text-[15px] leading-relaxed sm:text-base lg:text-[16px]"
                  : "text-[15px] leading-relaxed sm:text-base lg:text-[17px]"
              )}
            >
              {t("hero.body")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42 }}
              className="mt-4 flex flex-wrap gap-2 sm:mt-5"
            >
              {stats.map((s) => (
                <span key={s.label} className="stat-chip px-3.5 py-1.5 text-sm sm:text-[15px]">
                  {s.value}{" "}
                  <span className="font-medium text-white/75">{s.label}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, x: 12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="w-full min-w-0 lg:justify-self-end"
          >
            <BookCabForm variant="compact" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
