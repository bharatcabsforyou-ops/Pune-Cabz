"use client";

import Image from "next/image";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { films } from "@/lib/images";

export default function JourneyShowcase() {
  return (
    <div>
      {films.map((film, i) => {
        const reverse = i % 2 === 1;
        return (
          <section
            key={film.src}
            className={clsx("page-section", i % 2 === 0 ? "bg-white" : "bg-surface")}
          >
            <Container>
              <div className="grid grid-cols-1 page-grid page-grid-2 items-center">
                <Reveal
                  direction={reverse ? "right" : "left"}
                  className={clsx(reverse && "lg:order-2")}
                >
                  <div className="overflow-hidden rounded-[1.6rem] bg-navy shadow-2xl shadow-navy/15 ring-1 ring-black/5">
                    <Image
                      src={film.src}
                      alt={`${film.title} - Pune Cabz`}
                      width={1536}
                      height={1024}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </Reveal>

                <Reveal direction={reverse ? "left" : "right"} className={clsx(reverse && "lg:order-1")}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                    Route 0{i + 1} / 05
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                    {film.title}
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy/60">
                    {film.caption} Book a verified seat or offer yours - same highway, shared cost.
                  </p>
                  <a
                    href="/#search"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                  >
                    Search this route
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
