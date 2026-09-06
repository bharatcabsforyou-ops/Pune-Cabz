"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
import { touristPlaces } from "@/data/tourist-places";
import type { PopularRoute } from "@/lib/popular-routes";

type LocationChip = {
  from: string;
  to: string;
  label: string;
};

function buildLocations(routes: PopularRoute[]): LocationChip[] {
  const seen = new Set<string>();
  const out: LocationChip[] = [];

  const push = (from: string, to: string) => {
    const key = `${from}|${to}`.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({
      from,
      to,
      label: `${from} to ${to} Cab`,
    });
  };

  for (const route of routes) {
    push(route.fromCity, route.toCity);
  }

  for (const place of touristPlaces) {
    push("Pune", place.name);
  }

  return out;
}

export default function HomePromiseMarquee() {
  const { routes: fromApi } = usePopularRoutes();
  const routes =
    fromApi.length > 0
      ? fromApi
      : (defaultRoutes as Omit<PopularRoute, "id">[]).map((route, i) => ({
          ...route,
          id: `default-${i}`,
        }));

  const locations = buildLocations(routes);
  if (locations.length === 0) return null;

  const loop = [...locations, ...locations];

  return (
    <section className="overflow-hidden border-y border-black/[0.04] bg-white py-5 sm:py-6">
      <Container>
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
          Popular destinations
        </p>
        <h2 className="mt-1.5 text-center text-lg font-extrabold tracking-tight text-navy sm:text-xl">
          Book a cab to these locations
        </h2>
      </Container>

      <div className="rides-marquee relative mt-4">
        <div className="rides-marquee-track locations-marquee-track gap-2.5 py-0.5">
          {loop.map((loc, i) => (
            <Link
              key={`${loc.label}-${i}`}
              href={`/book?from=${encodeURIComponent(loc.from)}&to=${encodeURIComponent(loc.to)}`}
              className="flex min-w-max shrink-0 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-colors hover:border-brand/35 hover:text-brand"
            >
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2.5} />
              {loc.label}
            </Link>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:w-12" />
      </div>
    </section>
  );
}
