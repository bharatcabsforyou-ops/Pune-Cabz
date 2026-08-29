"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleHelp } from "lucide-react";
import Container from "../Container";
import PhotoCard from "../PhotoCard";
import Reveal from "../motion/Reveal";
import { images } from "@/lib/images";

const faqs = [
  {
    q: "How does driver and rider verification work?",
    a: "Every member confirms their identity with a government ID and a live selfie check before their first ride. Drivers additionally verify their licence and vehicle documents.",
  },
  {
    q: "How is the ride price calculated?",
    a: "Drivers set a price that covers fuel and tolls, split across the seats they offer. Pune Cabz does not add surge pricing or markups - you see exactly what the driver sees.",
  },
  {
    q: "Is it safe to ride with a stranger?",
    a: "Every profile carries a rating and review history, and rides can be shared live with friends or family. Our support team is reachable 24/7 during any active ride.",
  },
  {
    q: "How do I become a driver?",
    a: "Sign up, add your vehicle and licence details, and publish your first ride in minutes. There is no fee to list - you only ever share costs with your passengers.",
  },
  {
    q: "How fast will support reply?",
    a: "WhatsApp and phone are staffed 9am-9pm IST. Email is answered within one business day. During an active ride, SOS and in-app help are monitored around the clock.",
  },
  {
    q: "Can I visit the office without an appointment?",
    a: "Yes for general queries during office hours. For partnerships or press, email us first so the right person is available when you arrive at Koregaon Park.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal direction="left" className="lg:sticky lg:top-24">
            <PhotoCard
              src={images.friendsTable}
              alt="Riders helping each other with questions"
            />
          </Reveal>

          <Reveal direction="right">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Questions</p>
            <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-brand">
              <CircleHelp className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Frequently asked
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy/60">
              Still stuck? Use the form or WhatsApp - we do not leave threads hanging.
            </p>

            <div className="mt-8 space-y-3">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-2xl border border-black/5 bg-soft text-left"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="pr-2 text-sm font-semibold text-navy sm:text-[15px]">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-navy/40"
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
                          <p className="px-5 pb-4 text-sm leading-relaxed text-navy/60">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
