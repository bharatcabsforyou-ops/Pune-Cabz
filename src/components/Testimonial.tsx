"use client";

import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";

const glance = [
  { feature: "Ride Options", offer: "7+ vehicle categories" },
  { feature: "Services", offer: "Local, Outstation, Airport & Group Travel" },
  { feature: "Our Reach", offer: "Across Maharashtra and Pan-India" },
  { feature: "The Promise", offer: "Safe, comfortable, dependable travel" },
];

export default function Testimonial() {
  return (
    <section className="border-t border-black/[0.04] bg-soft page-section">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            {/* At a Glance */}
            <article className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                At a glance
              </p>
              <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">
                PuneCabz at a Glance
              </h2>

              <ul className="mt-6 divide-y divide-black/[0.05]">
                {glance.map((row) => (
                  <li
                    key={row.feature}
                    className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="shrink-0 text-sm font-semibold text-navy">
                      {row.feature}
                    </span>
                    <span className="text-right text-sm leading-snug text-navy/55">
                      {row.offer}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-black/[0.05] pt-4 text-sm text-navy/50">
                You pick the destination; we&apos;ll take care of the drive.
              </p>
            </article>

            {/* Rider story */}
            <article className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Rider story
              </p>
              <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">
                Only on Pune Cabz
              </h2>

              <blockquote className="mt-5 text-[15px] leading-relaxed text-navy/65">
                &ldquo;Carpooling&apos;s great: I pay a little money to get where I&apos;m
                going on time, in comfort, and in AC! And I know it&apos;s nice for the
                driver to get a little financial help when they&apos;re travelling
                alone.&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-black/[0.05] pt-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={images.portraitKabir}
                    alt="Kabir Malhotra"
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-navy">Kabir Malhotra</p>
                  <p className="text-xs text-navy/45">Regular Pune Cabz rider</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            </article>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
