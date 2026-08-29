"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CarFront,
  Clock3,
  MapPinned,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Container from "../Container";
import SearchBar from "../SearchBar";
import BookRoutesGallery from "@/components/book/BookRoutesGallery";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
import { images } from "@/lib/images";
import type { PopularRoute } from "@/lib/popular-routes";

const points = [
  { icon: CarFront, label: "Sedan, SUV & Innova" },
  { icon: ShieldCheck, label: "Verified drivers" },
  { icon: Clock3, label: "Same-day booking" },
  { icon: MessageCircle, label: "Book on WhatsApp" },
];

export default function BookPage() {
  const searchParams = useSearchParams();
  const queryFrom = searchParams.get("from") ?? "";
  const queryTo = searchParams.get("to") ?? "";
  const { routes: fromApi, loaded } = usePopularRoutes();

  const routes = useMemo(() => {
    if (fromApi.length > 0) return fromApi;
    return (defaultRoutes as Omit<PopularRoute, "id">[]).map((route, i) => ({
      ...route,
      id: `default-${i}`,
    }));
  }, [fromApi]);

  const [from, setFrom] = useState(queryFrom);
  const [to, setTo] = useState(queryTo);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const fromMatch =
        !from.trim() || route.fromCity.toLowerCase().includes(from.trim().toLowerCase());
      const toMatch =
        !to.trim() || route.toCity.toLowerCase().includes(to.trim().toLowerCase());
      return fromMatch && toMatch;
    });
  }, [routes, from, to]);

  useEffect(() => {
    if (queryFrom) setFrom(queryFrom);
    if (queryTo) setTo(queryTo);
  }, [queryFrom, queryTo]);

  useEffect(() => {
    if (!loaded || !queryFrom || !queryTo) return;
    const match = routes.find(
      (route) =>
        route.fromCity.toLowerCase() === queryFrom.toLowerCase() &&
        route.toCity.toLowerCase() === queryTo.toLowerCase()
    );
    if (match) setSelectedRouteId(match.id);
  }, [loaded, queryFrom, queryTo, routes]);

  const handleRouteSelect = useCallback((route: PopularRoute) => {
    setFrom(route.fromCity);
    setTo(route.toCity);
    setSelectedRouteId(route.id);
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1a1214]">
        <div className="absolute inset-0">
          <Image
            src={images.bridge}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[1.05] contrast-[1.04] saturate-[1.05]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a1214]/92 via-[#1a1214]/72 to-[#1a1214]/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1214]/85 via-transparent to-[#1a1214]/35" />
        <div className="hero-vignette pointer-events-none absolute inset-0" />

        <Container className="relative z-10 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm"
            >
              <MapPinned className="h-3.5 w-3.5 text-brand-light" />
              Book your cars
            </motion.div>

            <h1 className="mt-5 text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="block"
              >
                Choose a route.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mt-1 block text-brand-light"
              >
                Book on WhatsApp.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base"
            >
              Set from, to, and date — or pick a popular route below. Instant chat with Pune Cabz
              for fare and confirmation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-2.5"
            >
              {points.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-white/90 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-brand-light" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
            className="mt-6 w-full min-w-0"
          >
            <SearchBar
              variant="hero"
              from={from}
              to={to}
              onFromChange={setFrom}
              onToChange={setTo}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55"
          >
            <span>
              <strong className="font-bold text-white">{routes.length || "—"}</strong> live routes
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
            <span>
              From <strong className="font-bold text-white">₹199</strong>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
            <span>Pune · Mumbai · Nashik · Konkan & more</span>
          </motion.div>
        </Container>
      </section>

      <BookRoutesGallery
        routes={filteredRoutes}
        allCount={routes.length}
        loaded={loaded}
        selectedId={selectedRouteId}
        onSelect={handleRouteSelect}
        filterActive={Boolean(from.trim() || to.trim())}
      />
    </>
  );
}
