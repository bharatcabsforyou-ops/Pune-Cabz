"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPinned, Navigation } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { touristPlaces, type TouristPlace } from "@/data/tourist-places";

function categoryTone(category: TouristPlace["category"]) {
  switch (category) {
    case "Hill station":
      return "bg-sky-500/10 text-sky-700";
    case "Coastal":
      return "bg-emerald-500/10 text-emerald-700";
    case "Pilgrimage":
      return "bg-amber-500/10 text-amber-800";
    case "Monsoon":
      return "bg-cyan-500/10 text-cyan-800";
    case "Heritage":
      return "bg-violet-500/10 text-violet-700";
    default:
      return "bg-brand/10 text-brand";
  }
}

function PlaceCard({ place }: { place: TouristPlace }) {
  const bookHref = `/book?to=${encodeURIComponent(place.name)}&from=${encodeURIComponent("Pune")}`;

  return (
    <article
      id={place.id}
      className="pro-card-interactive group flex h-full flex-col overflow-hidden scroll-mt-28"
    >
      <div className="relative h-32 overflow-hidden bg-soft sm:h-36">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
        <span
          className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm backdrop-blur-sm ${categoryTone(place.category)}`}
        >
          {place.category}
        </span>
        <h3 className="absolute bottom-2.5 left-2.5 right-2.5 text-base font-extrabold tracking-tight text-white drop-shadow">
          {place.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="line-clamp-1 text-[11px] font-semibold text-brand">{place.tagline}</p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-navy/55">
          {place.description}
        </p>

        <div className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-navy/55">
          <Navigation className="mt-0.5 h-3 w-3 shrink-0 text-brand" />
          <span>
            <span className="font-bold text-navy/70">Pune</span> {place.fromPune}
          </span>
        </div>

        <p className="mt-2 line-clamp-1 text-[11px] text-navy/45">
          {place.stops.slice(0, 3).join(" · ")}
          {place.stops.length > 3 ? "…" : ""}
        </p>

        <Link href={bookHref} className="btn-primary mt-auto inline-flex h-9 w-full px-3 text-xs">
          Book cab
          <ArrowRight className="h-3.5 w-3.5" />
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
            Tour packages
          </p>
          <h2 className="section-title">Popular destinations</h2>
          <p className="section-desc">
            Compact trip cards with distance, top stops, and instant cab booking.
          </p>
        </Reveal>

        <Reveal className="mt-5 flex flex-wrap justify-center gap-1.5">
          {categories.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                filter === type
                  ? "bg-brand/10 text-brand ring-1 ring-brand/25"
                  : "bg-soft text-navy/70 ring-1 ring-black/[0.04] hover:text-navy"
              }`}
            >
              {type}
            </button>
          ))}
        </Reveal>

        <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
