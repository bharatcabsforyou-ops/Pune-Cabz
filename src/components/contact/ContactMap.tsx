"use client";

import { Clock, MapPin, Navigation, TrainFront } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { site } from "@/lib/site";

const facts = [
  { icon: MapPin, label: "Address", value: site.addressLine },
  { icon: Clock, label: "Office hours", value: "Mon-Sat · 10am-7pm IST" },
  { icon: TrainFront, label: "Nearest metro", value: "Bund Garden · ~10 min" },
];

export default function ContactMap() {
  return (
    <section id="office-map" className="scroll-mt-24 bg-white py-14 sm:py-16">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Headquarters</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Find us on the map
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
            Walk in for partnerships and press. Ride support is faster on WhatsApp
            or phone.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
          <Reveal direction="left" className="h-full lg:col-span-3">
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-black/10 bg-soft sm:min-h-[440px]">
              <iframe
                title="Pune Cabz office map"
                src={site.mapEmbed}
                className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-md ring-1 ring-black/5">
                Pune Cabz HQ
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="h-full lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl bg-navy p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Visit</p>
              <h3 className="mt-2 text-2xl font-extrabold">{site.address}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {site.addressLine}
                <br />
                {site.city}
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex gap-3 rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/45">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium leading-snug text-white/90">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-soft"
              >
                <Navigation className="h-4 w-4 text-brand" />
                Get directions
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
