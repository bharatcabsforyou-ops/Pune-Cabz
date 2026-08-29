"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import { images } from "@/lib/images";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-8 pt-6 sm:pb-10 sm:pt-8">
      <Container className="relative">
        <div className="grid grid-cols-1 page-grid page-grid-2 items-center">
          <div className="min-w-0 max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand"
            >
              About us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-4 text-[1.85rem] font-extrabold leading-[1.15] tracking-tight text-navy sm:text-5xl"
            >
              Building trust,
              <br />
              <span className="text-gradient-brand">one ride at a time.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 text-[15px] leading-relaxed text-navy/60"
            >
              Pune Cabz started with a simple idea: half-empty cars and full
              trains should not exist in the same city. Today we connect verified
              drivers and riders across Pune and Maharashtra - and split the cost
              fairly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark sm:px-6 sm:py-3"
              >
                Book your cars
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm ring-1 ring-black/5 hover:bg-soft sm:px-6 sm:py-3"
              >
                Contact us
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="min-w-0"
          >
            <Image
              src={images.film1}
              alt="Pune Cabz in Pune city"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-2xl bg-white shadow-lg shadow-navy/10 ring-1 ring-black/5"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
