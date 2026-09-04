"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../Container";

export default function AboutSubHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}) {
  if (image) {
    return (
      <section className="relative border-b border-black/[0.06]">
        {/* image wrapper — drives the height naturally */}
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* uniform dark overlay for centered text */}
          <div className="absolute inset-0 bg-black/55" />
          {/* subtle vignette edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
        </div>

        {/* text — absolutely positioned over the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Container className="pb-0 sm:pb-0">
            <div className="max-w-2xl text-center mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
              >
                {eyebrow}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 }}
                className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl"
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-white/75"
              >
                {description}
              </motion.p>
            </div>
          </Container>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero border-b border-black/[0.04]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-eyebrow"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="section-title mt-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="section-desc mt-4"
          >
            {description}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
