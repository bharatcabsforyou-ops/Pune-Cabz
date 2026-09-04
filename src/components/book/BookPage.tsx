"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import HeroMediaBackground from "../HeroMediaBackground";
import BookCabForm from "../BookCabForm";
import BookRoutesGallery from "@/components/book/BookRoutesGallery";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
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
      <section className="relative isolate overflow-hidden bg-[#141012]">
        <HeroMediaBackground />

        <Container className="relative z-10 pb-4 pt-4 sm:pb-6 sm:pt-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">

            {/* LEFT — text */}
            <div className="flex flex-1 flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 badge-pill"
              >
                <MapPinned className="h-3.5 w-3.5" />
                Book your cars
              </motion.div>

              <h1 className="mt-3 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.8rem] drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
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
                className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/80 sm:text-[15px]"
              >
                Set from, to, and date — or pick a popular route below. Instant chat with Pune Cabz
                for fare and confirmation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {points.map(({ icon: Icon, label }) => (
                  <span key={label} className="stat-chip">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/55"
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
            </div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="w-full lg:w-[440px] lg:shrink-0"
            >
              <BookCabForm
                from={from}
                to={to}
                onFromChange={setFrom}
                onToChange={setTo}
              />
            </motion.div>

          </div>
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
