"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CarFront,
  Clock3,
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
import { useT, type MessageKey } from "@/lib/i18n";

const points: { icon: typeof CarFront; labelKey: MessageKey }[] = [
  { icon: CarFront, labelKey: "book.chip.fleet" },
  { icon: ShieldCheck, labelKey: "book.chip.drivers" },
  { icon: Clock3, labelKey: "book.chip.sameDay" },
  { icon: MessageCircle, labelKey: "book.chip.whatsapp" },
];

export default function BookPage() {
  const t = useT();
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

        <Container className="relative z-10 py-3 sm:py-4">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex min-w-0 flex-1 flex-col justify-start">
              <h1 className="text-[1.55rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-[2.35rem] drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 }}
                  className="block"
                >
                  {t("book.chooseRoute")}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-0.5 block text-brand-light"
                >
                  {t("book.onWhatsApp")}
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="mt-2 max-w-xl text-sm leading-relaxed text-white/75"
              >
                {t("book.desc")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 }}
                className="mt-3 flex flex-wrap gap-1.5"
              >
                {points.map(({ icon: Icon, labelKey }) => (
                  <span key={labelKey} className="stat-chip px-2.5 py-1 text-xs">
                    <Icon className="h-3 w-3" />
                    {t(labelKey)}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="w-full min-w-0 lg:w-[520px] xl:w-[560px] lg:shrink-0"
            >
              <BookCabForm
                variant="compact"
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
