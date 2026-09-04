"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import HeroMediaBackground from "./HeroMediaBackground";
import BookCabForm from "./BookCabForm";

const stats = [
  { value: "80+", label: "cities" },
  { value: "5+", label: "years" },
  { value: "12", label: "vehicles" },
  { value: "24×7", label: "support" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#141012]">
      <HeroMediaBackground />

      <Container className="relative z-10 pt-3 pb-5 sm:pt-4 sm:pb-6 lg:pt-5 lg:pb-7">
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-7 xl:grid-cols-[minmax(0,1fr)_450px]">
          <div className="min-w-0 max-w-2xl pt-0.5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge-pill px-3 py-1.5 text-sm font-semibold sm:text-[15px]"
            >
              Pune, Maharashtra
            </motion.p>

            <h1 className="mt-3 text-[2.25rem] font-extrabold leading-[1.08] tracking-tight sm:mt-3.5 sm:text-5xl lg:text-[3.5rem]">
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="block text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              >
                Travel together.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-1 block text-brand drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              >
                Spend smarter.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="mt-3 text-[15px] font-semibold text-white/90 sm:text-base drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]"
            >
              Local, outstation & airport cabs — book in minutes on WhatsApp.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-white/92 sm:mt-3 sm:text-base lg:text-[17px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.25)]"
            >
              Verified drivers, GPS-enabled cabs, and upfront fares on real routes —
              Pune to Mumbai, Nashik, Lonavala, Konkan, Goa and beyond. No hidden
              charges. Instant confirmation.
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
