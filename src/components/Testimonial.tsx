"use client";

import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";

const glance = [
  { feature: "Ride Options", offer: "7+ vehicle categories" },
  { feature: "Services", offer: "Local, Outstation, Airport, and Group Travel" },
  { feature: "Our Reach", offer: "Across Maharashtra and Pan-India" },
  { feature: "The Promise", offer: "Safe, comfortable, and dependable travel" },
];

export default function Testimonial() {
  return (
    <section className="border-t border-black/[0.04] bg-soft page-section">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <article className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
              <div className="border-b border-brand/15 bg-brand/[0.04] px-6 py-5 sm:px-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  At a glance
                </p>
                <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">
                  PuneCabz at a Glance
                </h2>
              </div>

              <div className="px-6 py-2 sm:px-7">
                <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 border-b border-black/[0.06] py-3 text-[11px] font-bold uppercase tracking-wider text-navy/40">
                  <span>Feature</span>
                  <span>What We Offer</span>
                </div>
                <ul className="divide-y divide-black/[0.05]">
                  {glance.map((row) => (
                    <li
                      key={row.feature}
                      className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 py-3.5"
                    >
                      <span className="text-sm font-semibold text-navy">{row.feature}</span>
                      <span className="text-sm leading-snug text-navy/60">{row.offer}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-black/[0.05] py-4 text-sm text-navy/50">
                  You pick the destination; we&apos;ll take care of the drive.
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Rider story
              </p>
              <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">
                Only on Pune Cabz
              </h2>

              <blockquote className="mt-5 text-[15px] leading-relaxed text-navy/65">
                &ldquo;Booked an Innova for Pune to Mumbai early morning. Driver arrived on
                time, the cab was clean and AC was perfect, and the fare matched what we
                confirmed on <span className="text-whatsapp">WhatsApp</span> — no extras at drop.&rdquo;
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
