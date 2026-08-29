"use client";

import Image from "next/image";
import { BadgeCheck, Quote, Star } from "lucide-react";
import Container from "./Container";
import FeatureIcon from "./FeatureIcon";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";

export default function Testimonial() {
  return (
    <section className="bg-surface page-section">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-navy/[0.04] blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto]">
              <div className="border-b border-black/[0.06] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3">
                  <FeatureIcon icon={Quote} iconClassName="fill-current" strokeWidth={0} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">
                      Rider story
                    </p>
                    <h2 className="text-xl font-extrabold text-navy sm:text-2xl">
                      Only on Pune Cabz
                    </h2>
                  </div>
                </div>

                <blockquote className="mt-5 border-l-4 border-brand/80 pl-4 text-[15px] leading-relaxed text-navy/75 sm:text-base sm:leading-relaxed">
                  &ldquo;Carpooling&apos;s great: I pay a little money to get where I&apos;m
                  going on time, in comfort, and in AC! And I know it&apos;s nice for the driver
                  to get a little financial help when they&apos;re travelling alone.&rdquo;
                </blockquote>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200/80">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                    <span className="ml-1">5.0</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified rider
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy/55 ring-1 ring-black/[0.06]">
                    Pune · since 2023
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8 lg:min-w-[240px] lg:p-8">
                <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-brand/15 ring-offset-4 ring-offset-white sm:h-32 sm:w-32">
                  <Image
                    src={images.portraitKabir}
                    alt="Kabir Malhotra — Pune Cabz rider"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-navy">Kabir Malhotra</p>
                  <p className="mt-0.5 text-sm text-navy/50">Regular Pune Cabz rider</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
