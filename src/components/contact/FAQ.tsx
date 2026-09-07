"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Car, CreditCard, Shield, Clock } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { useT, type MessageKey } from "@/lib/i18n";
import { site } from "@/lib/site";

type CategoryId = "booking" | "payment" | "safety" | "support";

const categories: {
  id: CategoryId;
  labelKey: MessageKey;
  icon: typeof Car;
  color: string;
}[] = [
  { id: "booking", labelKey: "faq.cat.booking", icon: Car, color: "bg-brand/[0.07] text-brand" },
  { id: "payment", labelKey: "faq.cat.payment", icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
  { id: "safety", labelKey: "faq.cat.safety", icon: Shield, color: "bg-blue-50 text-blue-600" },
  { id: "support", labelKey: "faq.cat.support", icon: Clock, color: "bg-amber-50 text-amber-600" },
];

const faqs: { qKey: MessageKey; aKey: MessageKey; cat: CategoryId }[] = [
  { qKey: "faq.q1", aKey: "faq.a1", cat: "booking" },
  { qKey: "faq.q2", aKey: "faq.a2", cat: "booking" },
  { qKey: "faq.q3", aKey: "faq.a3", cat: "booking" },
  { qKey: "faq.q4", aKey: "faq.a4", cat: "booking" },
  { qKey: "faq.q5", aKey: "faq.a5", cat: "support" },
  { qKey: "faq.q6", aKey: "faq.a6", cat: "support" },
  { qKey: "faq.q7", aKey: "faq.a7", cat: "booking" },
  { qKey: "faq.q8", aKey: "faq.a8", cat: "payment" },
  { qKey: "faq.q9", aKey: "faq.a9", cat: "payment" },
  { qKey: "faq.q10", aKey: "faq.a10", cat: "payment" },
  { qKey: "faq.q11", aKey: "faq.a11", cat: "safety" },
];

export default function FAQ() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const filtered = activeCategory
    ? faqs.filter((f) => f.cat === activeCategory)
    : faqs;

  return (
    <section className="bg-white py-8 sm:py-9">
      <Container>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => {
                setActiveCategory(null);
                setOpen(null);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-700 transition-all duration-200 border ${
                activeCategory === null
                  ? "bg-brand text-white border-brand shadow-sm"
                  : "bg-white text-navy/60 border-black/[0.07] hover:border-brand/30 hover:text-navy"
              }`}
            >
              {t("faq.all")}
            </button>
            {categories.map(({ id, labelKey, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveCategory(activeCategory === id ? null : id);
                  setOpen(null);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 border ${
                  activeCategory === id
                    ? "bg-brand text-white border-brand shadow-sm"
                    : "bg-white text-navy/60 border-black/[0.07] hover:border-brand/30 hover:text-navy"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(labelKey)}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto max-w-2xl space-y-2.5">
          {filtered.map((item, i) => {
            const isOpen = open === i;
            const cat = categories.find((c) => c.id === item.cat);
            return (
              <Reveal key={item.qKey} delay={i * 0.04}>
                <div className="faq-item">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {cat && (
                        <span
                          className={`mt-0.5 shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-lg ${cat.color}`}
                        >
                          <cat.icon className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span className="text-sm font-semibold text-navy sm:text-[15px] leading-snug">
                        {t(item.qKey)}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 mt-0.5 text-navy/35"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 pl-14">
                          <p className="text-sm leading-relaxed text-navy/60">
                            {t(item.aKey)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-black/[0.06] bg-gradient-to-br from-white to-soft-dark p-6 text-center shadow-[var(--card-shadow)]">
            <p className="text-sm font-semibold text-navy">{t("faq.still.title")}</p>
            <p className="mt-1 text-sm text-navy/55">{t("faq.still.desc")}</p>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-flex btn-shine"
            >
              {t("common.chatOnWhatsApp")}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
