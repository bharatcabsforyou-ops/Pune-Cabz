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
          <div className="rounded-3xl bg-navy px-6 py-12 text-center sm:px-12 sm:py-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ride with Pune Cabz
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
              Search a verified seat, or talk to the team in Koregaon Park if you
              want to partner with us.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-brand-dark"
              >
                Book your cars
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy"
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
