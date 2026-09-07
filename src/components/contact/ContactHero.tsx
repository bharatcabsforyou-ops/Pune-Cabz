"use client";

import { motion } from "framer-motion";
import Container from "../Container";
import WhatsAppIcon from "../WhatsAppIcon";
import { site } from "@/lib/site";
import BookCabForm from "@/components/BookCabForm";
import { useT } from "@/lib/i18n";

export default function ContactHero() {
  const t = useT();

  return (
    <section className="relative overflow-hidden border-b border-black/[0.04] bg-white">
      <Container className="relative py-6 sm:py-8">
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,600px)] lg:gap-8">
          <div className="max-w-lg">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-eyebrow"
            >
              {t("contact.eyebrow")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="mt-2.5 text-[1.65rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-3xl lg:text-[2.35rem]"
            >
              {t("contact.title")}{" "}
              <span className="text-gradient-brand">{t("contact.titleAccent")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-2.5 text-sm leading-relaxed text-navy/60 sm:text-[15px]"
            >
              {t("contact.body")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="mt-4 flex flex-wrap gap-2.5"
            >
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 transition-colors hover:bg-[#1ebe57]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t("contact.chatWhatsApp")}
              </a>
              <a href={site.phoneHref} className="btn-secondary px-5 py-2.5">
                {t("contact.support247")}
              </a>
            </motion.div>
          </div>

          <div className="w-full min-w-0 lg:max-w-none">
            <BookCabForm variant="compact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
