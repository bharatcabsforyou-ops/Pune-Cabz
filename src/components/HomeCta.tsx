"use client";

import Link from "next/link";
import { ArrowRight, CarFront } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";

export default function HomeCta() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand to-brand-light px-6 py-10 text-center shadow-xl shadow-brand/20 sm:px-12 sm:py-14">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand shadow-md">
              <CarFront className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Your next ride is one search away
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
              Pune to Mumbai, Nashik, Goa, and beyond. Verified drivers, shared fares, no surge.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg hover:bg-white/95"
              >
                Book your cars
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/35 hover:bg-white/25"
              >
                How it works
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
