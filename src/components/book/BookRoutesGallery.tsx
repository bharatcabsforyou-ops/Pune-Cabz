"use client";

import { MapPinned, Sparkles } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { RouteCardBook, RoutesGridSkeleton } from "@/components/routes/RouteCard";
import type { PopularRoute } from "@/lib/popular-routes";

export default function BookRoutesGallery({
  routes,
  allCount,
  loaded,
  selectedId,
  onSelect,
  filterActive = false,
}: {
  routes: PopularRoute[];
  allCount?: number;
  loaded: boolean;
  selectedId?: string | null;
  onSelect: (route: PopularRoute) => void;
  filterActive?: boolean;
}) {
  if (!loaded) {
    return (
      <section className="bg-white page-section">
        <Container>
          <RoutesGridSkeleton />
        </Container>
      </section>
    );
  }

  if (routes.length === 0) {
    return (
      <section className="bg-white page-section">
        <Container>
          <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-surface px-6 py-10 text-center">
            <MapPinned className="mx-auto h-9 w-9 text-brand/35" />
            <p className="mt-4 text-lg font-bold text-navy">No routes match your search</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-navy/55">
              {filterActive
                ? "Try a different from/to city, or clear the search to see all routes."
                : "Add routes from admin to show them here."}
            </p>
            {filterActive && allCount ? (
              <p className="mt-2 text-xs text-navy/40">{allCount} routes available in total</p>
            ) : null}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white page-section">
      <Container className="relative">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand ring-1 ring-brand/10">
              <Sparkles className="h-3.5 w-3.5" />
              Popular routes
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Popular routes from Pune
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-navy/55">
              {filterActive
                ? `Showing ${routes.length} matching route${routes.length === 1 ? "" : "s"}. Tap WhatsApp to book instantly.`
                : "Verified intercity rides — tap a card and book instantly on WhatsApp."}
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide text-navy/35">Available</p>
            <p className="text-xl font-extrabold tabular-nums text-navy">
              {routes.length}
              <span className="ml-1.5 text-sm font-semibold text-navy/40">
                route{routes.length === 1 ? "" : "s"}
              </span>
            </p>
          </div>
        </Reveal>

        <div className="page-section-head grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {routes.map((route, index) => (
            <RouteCardBook
              key={route.id}
              route={route}
              index={index}
              total={routes.length}
              active={selectedId === route.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
