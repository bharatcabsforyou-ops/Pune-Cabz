"use client";

import Link from "next/link";
import { ArrowRight, CarFront } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { useT } from "@/lib/i18n";

export default function HomeCta() {
  const t = useT();

  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal>
          <div className="cta-panel px-6 py-9 text-center sm:px-10 sm:py-11">
            <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand shadow-md">
              <CarFront className="h-6 w-6" />
            </span>
            <h2 className="relative mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {t("homeCta.title")}
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
              {t("homeCta.body")}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02] hover:bg-white/95"
              >
                {t("homeCta.book")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/35 backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                {t("homeCta.howItWorks")}
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
