"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Compass,
  MapPinned,
  Mountain,
  Palmtree,
  Sparkles,
  Sun,
  Users,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { images } from "@/lib/images";
import { publicTripsFromDb, type TourismTrip } from "@/lib/tourism";

const highlights = [
  {
    icon: Mountain,
    label: "Hill stations",
    desc: "Lonavala, Mahabaleshwar, Matheran",
    tone: "from-sky-500/15 to-sky-500/5",
    iconBg: "bg-sky-500",
  },
  {
    icon: Palmtree,
    label: "Coastal drives",
    desc: "Konkan, Goa, Alibag beaches",
    tone: "from-emerald-500/15 to-emerald-500/5",
    iconBg: "bg-emerald-500",
  },
  {
    icon: CalendarDays,
    label: "Weekend getaways",
    desc: "Leave Friday, back Sunday night",
    tone: "from-amber-500/15 to-amber-500/5",
    iconBg: "bg-amber-500",
  },
  {
    icon: CarFront,
    label: "Private outstation cabs",
    desc: "Sedan to Innova, your schedule",
    tone: "from-brand/15 to-brand/5",
    iconBg: "bg-brand",
  },
];

const stats = [
  { value: "20+", label: "destinations" },
  { value: "AC", label: "comfort cabs" },
  { value: "24/7", label: "trip support" },
];

function TripImage({
  src,
  alt,
  className,
  sizes,
  fill,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
}) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill={fill} sizes={sizes} className={className} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}

function tripTypeTone(type: string) {
  const key = type.toLowerCase();
  if (key.includes("hill")) return "bg-sky-500/10 text-sky-700 ring-sky-500/20";
  if (key.includes("coast")) return "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20";
  if (key.includes("weekend")) return "bg-amber-500/10 text-amber-700 ring-amber-500/20";
  if (key.includes("city")) return "bg-violet-500/10 text-violet-700 ring-violet-500/20";
  return "bg-brand/10 text-brand ring-brand/20";
}

function RouteTripCard({
  trip,
  featured = false,
  index = 0,
}: {
  trip: TourismTrip;
  featured?: boolean;
  index?: number;
}) {
  const isBanner = trip.imageUrl.startsWith("/image");

  return (
    <Link
      href="/book"
      className="group grid overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-md shadow-navy/5 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/10 sm:grid-cols-2"
    >
      <div className="relative min-h-[200px] overflow-hidden bg-[#1a1214] sm:min-h-[240px] lg:min-h-[272px]">
        <TripImage
          src={trip.imageUrl}
          alt={trip.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${
            isBanner ? "object-contain object-center p-0" : "object-cover object-center"
          }`}
        />
        {featured ? (
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
            Featured route
          </span>
        ) : (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold tabular-nums uppercase tracking-widest text-navy/50 shadow-sm ring-1 ring-black/5">
            Route {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-7 lg:p-9">
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ${tripTypeTone(trip.tripType)}`}
        >
          {trip.tripType}
        </span>
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-navy/45">
          <MapPinned className="h-3.5 w-3.5 text-brand" />
          From {trip.fromCity}
        </p>
        <h3 className="mt-2 text-xl font-extrabold tracking-tight text-navy sm:text-2xl lg:text-[1.75rem]">
          {trip.title}
        </h3>
        <p className="mt-2.5 max-w-md text-sm leading-relaxed text-navy/55 sm:text-[15px]">{trip.caption}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy/50">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4 shrink-0 text-brand" />
            Flexible departure
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CarFront className="h-4 w-4 shrink-0 text-brand" />
            AC outstation cab
          </span>
        </div>
        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors group-hover:bg-brand-dark sm:mt-7">
          Book this trip
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function DestinationsSection({ trips }: { trips: TourismTrip[] }) {
  const types = useMemo(() => {
    const all = ["All", ...new Set(trips.map((t) => t.tripType))];
    return all;
  }, [trips]);

  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return trips;
    return trips.filter((t) => t.tripType === filter);
  }, [trips, filter]);

  if (trips.length === 0) {
    return null;
  }

  return (
    <section id="destinations" className="scroll-mt-24 bg-surface py-14 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand shadow-sm ring-1 ring-black/5">
            <MapPinned className="h-3.5 w-3.5" />
            Destinations
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Pick your next getaway
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-navy/55 sm:text-base">
            Curated outstation routes from Pune — choose a destination and book your cab in minutes.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === type
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "bg-white text-navy ring-1 ring-black/5 hover:bg-white/80"
                }`}
              >
                {type}
                {type !== "All" ? (
                  <span className="ml-1.5 opacity-70">
                    ({trips.filter((t) => t.tripType === type).length})
                  </span>
                ) : (
                  <span className="ml-1.5 opacity-70">({trips.length})</span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-brand/20 bg-white px-6 py-16 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-brand/40" />
            <p className="mt-4 text-lg font-bold text-navy">No routes in this category</p>
            <p className="mt-2 text-sm text-navy/55">Try another filter or book a custom route.</p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
            >
              Show all routes
            </button>
          </div>
        ) : (
          <StaggerGroup className="mt-10 flex flex-col gap-5">
            {filtered.map((trip, i) => (
              <StaggerItem key={trip.id}>
                <RouteTripCard
                  trip={trip}
                  featured={filter === "All" && i === 0}
                  index={i}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </Container>
    </section>
  );
}

export default function TourismPage() {
  const [trips, setTrips] = useState<TourismTrip[]>([]);
  const [tripsLoaded, setTripsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/tourism")
      .then((res) => res.json())
      .then((data: { trips?: TourismTrip[] }) => {
        setTrips(publicTripsFromDb(data.trips ?? []));
      })
      .catch(() => setTrips([]))
      .finally(() => setTripsLoaded(true));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-soft pb-12 pt-8 sm:pb-16 sm:pt-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-24 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0 max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand"
              >
                <Compass className="h-3.5 w-3.5" />
                Tourism
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mt-4 text-[1.9rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
              >
                See Maharashtra.
                <br />
                <span className="text-gradient-brand">We drive.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="mt-5 max-w-lg text-[15px] leading-relaxed text-navy/60 sm:text-base"
              >
                Outstation cabs for hills, coast, and weekend getaways — leave when you want, travel
                with verified drivers in AC comfort.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-navy"
              >
                {stats.map((s) => (
                  <span key={s.label} className="inline-flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold text-brand">{s.value}</span>
                    <span className="text-navy/50">{s.label}</span>
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 hover:bg-brand-dark"
                >
                  Book your cab
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#destinations"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-sm ring-1 ring-black/5 hover:bg-surface"
                >
                  View destinations
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="relative min-w-0"
            >
              <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-navy/10 ring-1 ring-black/5">
                <Image
                  src={images.film5}
                  alt="Scenic Maharashtra outstation trip"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 sm:left-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
                  <Mountain className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-brand">Hill stations</p>
                  <p className="text-sm font-semibold text-navy">Mahabaleshwar & Lonavala</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42 }}
                className="absolute -right-2 top-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 sm:-right-4 sm:top-8"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <Palmtree className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-brand">Coastal drives</p>
                  <p className="text-sm font-semibold text-navy">Konkan & Goa routes</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Experience strip */}
      <section className="border-y border-black/5 bg-white py-10 sm:py-12">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Your kind of trip</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Hills, coast, or a long weekend
            </h2>
          </Reveal>

          <StaggerGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, label, desc, tone, iconBg }) => (
              <StaggerItem key={label}>
                <div
                  className={`h-full rounded-2xl border border-black/5 bg-gradient-to-br ${tone} p-5 shadow-sm`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} text-white shadow-md`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy">{label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/55">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* How it works mini */}
      <section className="bg-surface py-10 sm:py-12">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Sun, title: "Pick your date", text: "Leave when it suits you — no fixed tour bus timing." },
              { icon: Users, title: "Choose your cab", text: "Sedan, SUV, or Innova for family and luggage." },
              { icon: ShieldCheck, title: "Ride with trust", text: "Verified drivers, live location, and 24/7 support." },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-brand/8 bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/55">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {tripsLoaded ? <DestinationsSection trips={trips} /> : null}

      {/* CTA */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand to-brand-light px-6 py-10 text-center shadow-xl shadow-brand/20 sm:px-12 sm:py-14">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand shadow-md">
                <CarFront className="h-6 w-6" />
              </span>
              <h2 className="relative mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Plan a custom outstation trip
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
                Tell us where you want to go. We match you with a verified driver and a car that fits
                your group.
              </p>
              <Link
                href="/book"
                className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg hover:bg-white/95"
              >
                Book your cab
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
