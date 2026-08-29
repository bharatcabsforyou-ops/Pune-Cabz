"use client";

import { motion } from "framer-motion";
import { Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import Container from "../Container";
import PhotoCard from "../PhotoCard";
import WhatsAppIcon from "../WhatsAppIcon";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const highlights = [
  { icon: Clock3, label: "Reply in 1 business day", text: "Email and form messages" },
  { icon: MessageCircle, label: "WhatsApp 9am-9pm IST", text: "Fastest way to reach us" },
  { icon: ShieldCheck, label: "24/7 in-ride support", text: "SOS on every active trip" },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-soft pb-0 pt-10 sm:pt-16">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-brand-light/20 blur-3xl" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 pb-12 lg:grid-cols-2 lg:gap-14 lg:pb-16">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand"
            >
              Contact us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-4 text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl"
            >
              Talk to us.
              <br />
              <span className="text-gradient-brand">We actually reply.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 text-[15px] leading-relaxed text-navy/60"
            >
              Ride issues, account help, or a partnership idea - pick a channel
              below or send a message. Our Pune team is on it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#25D366]/25"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href="#write"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-sm ring-1 ring-black/5 hover:bg-soft"
              >
                Send a message
              </a>
            </motion.div>
          </div>

          <PhotoCard src={images.contactTiles} alt="Get in touch with Pune Cabz" priority />
        </div>
      </Container>

      <div className="border-t border-black/5 bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label, text }) => (
              <div key={label} className="rounded-2xl bg-soft px-5 py-4 text-left">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="mt-3 text-sm font-bold text-navy">{label}</p>
                <p className="mt-1 text-[13px] text-navy/55">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
