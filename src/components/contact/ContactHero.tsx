"use client";

import { motion } from "framer-motion";
import { Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import Container from "../Container";
import FeatureIcon from "../FeatureIcon";
import WhatsAppIcon from "../WhatsAppIcon";
import { site } from "@/lib/site";
import BookCabForm from "@/components/BookCabForm";

const highlights = [
  { icon: Clock3, label: "Reply in 1 business day", text: "Email and form messages" },
  { icon: MessageCircle, label: "WhatsApp 9am-9pm IST", text: "Fastest way to reach us" },
  { icon: ShieldCheck, label: "24/7 in-ride support", text: "SOS on every active trip" },
];

export default function ContactHero() {
  return (
    <section className="page-hero pb-0">
      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-8 pb-8 lg:grid-cols-[1fr_420px] lg:pb-10">
          <div className="max-w-lg">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-eyebrow"
            >
              Contact us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="section-title mt-4 text-[1.85rem] sm:text-5xl"
            >
              Talk to us.
              <br />
              <span className="text-gradient-brand">We actually reply.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="section-desc mt-5 text-left"
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
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a href="#write" className="btn-secondary px-6 py-3">
                Send a message
              </a>
            </motion.div>
          </div>

          <div className="w-full">
            <BookCabForm />
          </div>
        </div>
      </Container>

      <div className="border-t border-black/[0.04] bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label, text }) => (
              <div key={label} className="feature-row">
                <FeatureIcon icon={Icon} size="sm" />
                <div>
                  <p className="text-sm font-bold text-navy">{label}</p>
                  <p className="mt-0.5 text-xs text-navy/55">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
