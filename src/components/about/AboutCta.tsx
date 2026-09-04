"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";

export default function AboutCta() {
  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal>
          <div className="cta-panel px-6 py-9 text-center sm:px-10 sm:py-11">
            <h2 className="relative text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ride with Pune Cabz
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
              Search a verified seat, or talk to the team in Koregaon Park if you
              want to partner with us.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02] hover:bg-white/95"
              >
                Book your cars
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/35 backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
