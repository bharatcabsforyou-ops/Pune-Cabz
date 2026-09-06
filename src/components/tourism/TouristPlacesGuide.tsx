"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPinned, Navigation } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { touristPlaces, type TouristPlace } from "@/data/tourist-places";

function PlaceCard({ place }: { place: TouristPlace }) {
  const bookHref = `/book?to=${encodeURIComponent(place.name)}&from=${encodeURIComponent("Pune")}`;

  return (
    <article
      id={place.id}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_10px_30px_-22px_rgba(26,10,12,0.35)] transition-all duration-300 scroll-mt-28 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_22px_44px_-24px_rgba(220,31,38,0.4)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-[#1a1214]">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12090b]/90 via-[#12090b]/25 to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand shadow-sm">
          {place.category}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
          <h3 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
            {place.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs font-medium text-white/75">{place.tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-navy/60">{place.description}</p>

        <div className="mt-4 space-y-2 rounded-xl bg-soft px-3 py-2.5">
          <div className="flex items-start gap-2 text-xs leading-snug text-navy/60">
            <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
            <span>
              <span className="font-bold text-navy">From Pune</span> · {place.fromPune}
            </span>
          </div>
          <div className="flex items-start gap-2 text-xs leading-snug text-navy/55">
            <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
            <span className="line-clamp-1">
              {place.stops.slice(0, 3).join(" · ")}
              {place.stops.length > 3 ? "…" : ""}
            </span>
          </div>
        </div>

        <Link
          href={bookHref}
          className="btn-primary btn-shine mt-5 inline-flex h-10 w-full items-center justify-center gap-2 px-4 text-sm"
        >
          Book cab
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export default function TouristPlacesGuide() {
  const categories = useMemo(() => {
    return ["All", ...new Set(touristPlaces.map((p) => p.category))];
  }, []);

  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return touristPlaces;
    return touristPlaces.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="destinations" className="scroll-mt-24 bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow inline-flex items-center gap-2">
            <MapPinned className="h-3.5 w-3.5" />
            Tourist places
          </p>
          <h2 className="section-title">Popular destinations</h2>
          <p className="section-desc">
            Real places, clear distances, and instant cab booking from Pune.
          </p>
        </Reveal>

        <Reveal className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((type) => {
            const active = filter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  active
                    ? "bg-brand text-white shadow-md shadow-brand/25"
                    : "bg-soft text-navy/65 ring-1 ring-black/[0.05] hover:bg-white hover:text-navy hover:ring-brand/20"
                }`}
              >
                {type}
              </button>
            );
          })}
        </Reveal>

        <StaggerGroup className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((place) => (
            <StaggerItem key={place.id}>
              <PlaceCard place={place} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
