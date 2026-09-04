"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import { images } from "@/lib/images";

export default function AboutHero() {
  return (
    <section className="page-hero">
      <Container className="relative">
        <div className="grid grid-cols-1 page-grid page-grid-2 items-center">
          <div className="min-w-0 max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-eyebrow"
            >
              About us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="section-title mt-4 text-[1.85rem] sm:text-5xl"
            >
              Welcome to
              <br />
              <span className="text-gradient-brand">PuneCabz.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="section-desc mt-5 text-left"
            >
              Your trusted cab service in Pune — committed to making every journey
              safe, comfortable, reliable, and convenient across the city and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link href="/book" className="btn-primary px-5 py-2.5 sm:px-6 sm:py-3">
                Book your cars
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-secondary px-5 py-2.5 sm:px-6 sm:py-3">
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
            <div className="pro-card-static overflow-hidden p-0">
              <Image
                src={images.film1}
                alt="Pune Cabz in Pune city"
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
