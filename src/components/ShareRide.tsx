"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CarFront } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";

export default function ShareRide() {
  return (
    <section className="bg-white py-4">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-16 sm:py-20">
            <Image
              src={images.film4}
              alt=""
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy/85" />
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Share your ride. Cut your costs.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
                Carpool as a driver to turn your empty seats into lower travel
                costs. It&apos;s simple: publish your ride and get passengers to
                share your fuel and toll expenses.
              </p>
              <motion.a
                whileHover={{ scale: 1.04, gap: "0.7rem" }}
                whileTap={{ scale: 0.97 }}
                href="#"
                className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg shadow-black/20 transition-colors hover:bg-soft"
              >
                <CarFront className="h-4 w-4" />
                Share your ride
              </motion.a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
