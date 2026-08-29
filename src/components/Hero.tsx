"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";
import SearchBar from "./SearchBar";
import HomeRoutesCarousel from "./HomeRoutesCarousel";
import { images } from "@/lib/images";

const stats = [
  { value: "5000+", label: "members" },
  { value: "20+", label: "cities" },
  { value: "4.8★", label: "rating" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#1a1214]">
      <div className="absolute inset-0">
        {reduceMotion ? (
          <Image
            src={images.heroBg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] brightness-[1.08] contrast-[1.04] saturate-[1.06]"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover brightness-[1.12] contrast-[1.05] saturate-[1.08]"
            autoPlay
            muted
            loop
            playsInline
            poster={images.heroBg}
          >
            <source
              src="https://pixabay.com/videos/download/video-22544_medium.mp4"
              type="video/mp4"
            />
            <source src={images.heroVideo} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a1214]/88 via-[#1a1214]/55 to-[#1a1214]/20" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      <Container className="relative z-10 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-10 xl:grid-cols-[1fr_minmax(0,580px)] xl:gap-14">
          <div className="max-w-xl pt-1 lg:pt-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-white/85"
            >
              Pune, Maharashtra
            </motion.p>

            <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="block"
              >
                Travel together.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-1 block text-brand-light"
              >
                Spend smarter.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-4 max-w-md text-[14px] leading-relaxed text-white/88 sm:mt-5 sm:text-[15px]"
            >
              Verified drivers, shared seats, and honest prices on real routes -
              Pune to Mumbai, Nashik, Konkan and beyond.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42 }}
              className="mt-5 flex flex-wrap gap-x-0 gap-y-1 text-[13px] font-semibold text-white sm:mt-6 sm:text-[15px]"
            >
              {stats.map((s, i) => (
                <span key={s.label} className="inline-flex items-center">
                  {i > 0 && <span className="mx-2 text-white/25 sm:mx-2.5">·</span>}
                  {s.value}{" "}
                  <span className="ml-1 font-medium text-white/60">{s.label}</span>
                </span>
              ))}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full min-w-0 lg:justify-self-end"
          >
            <HomeRoutesCarousel variant="hero" autoPlay />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-10 w-full min-w-0 sm:mt-12 lg:mt-14"
        >
          <SearchBar variant="hero" />
        </motion.div>
      </Container>
    </section>
  );
}
