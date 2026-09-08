"use client";

import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import Container from "./Container";
import PhotoCard from "./PhotoCard";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";
import { useT } from "@/lib/i18n";
import { useSiteImage } from "@/lib/content-overrides";

export default function NeverMiss() {
  const t = useT();
  const image = useSiteImage("home.neverMiss", images.film2);

  return (
    <section className="bg-white page-section">
      <Container>
        <div className="page-grid page-grid-2 items-center">
          <Reveal direction="left" className="relative">
            <PhotoCard src={image} alt="Pune to Mumbai with Pune Cabz" variant="banner" />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute -bottom-5 left-4 flex max-w-[260px] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 sm:left-6"
            >
              <div className="animate-pulse-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10">
                <Bell className="h-4.5 w-4.5 text-brand" />
              </div>
              <p className="text-[13px] font-medium leading-snug text-navy">
                {t("neverMiss.alert")}
                <span className="ml-1 text-navy/40">{t("neverMiss.now")}</span>
              </p>
            </motion.div>
          </Reveal>

          <Reveal direction="right">
            <h2 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              {t("neverMiss.title")}
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-navy/60">
              {t("neverMiss.desc")}
            </p>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/book"
              className="btn-shine mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark"
            >
              <Search className="h-4 w-4" />
              {t("neverMiss.cta")}
            </motion.a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
