"use client";

import { ChevronRight, MapPin } from "lucide-react";
import Container from "./Container";

const rides = [
  { from: "Mumbai", to: "Pune" },
  { from: "Nashik", to: "Pune" },
  { from: "Pune", to: "Aurangabad" },
  { from: "Pune", to: "Kolhapur" },
  { from: "Pune", to: "Lonavala" },
  { from: "Pune", to: "Goa" },
  { from: "Pune", to: "Satara" },
  { from: "Pune", to: "Shirdi" },
];

const loop = [...rides, ...rides];

export default function TopRides() {
  return (
    <section className="overflow-hidden border-b border-brand/10 bg-gradient-to-b from-white to-surface py-7 sm:py-8">
      <Container>
        <h2 className="text-lg font-extrabold text-navy sm:text-xl">
          Top carpool rides
        </h2>
      </Container>

      <div className="rides-marquee relative mt-4">
        <div className="rides-marquee-track">
          {loop.map(({ from, to }, i) => (
            <a
              key={`${from}-${to}-${i}`}
              href="/#search"
              className="flex min-w-[220px] shrink-0 items-center justify-between gap-3 rounded-xl border border-brand/10 bg-white px-4 py-2.5 text-sm font-bold text-navy shadow-sm shadow-brand/5"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span>
                  {from} <span className="text-brand">&rarr;</span> {to}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-navy/40" />
            </a>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:w-12" />
      </div>
    </section>
  );
}
