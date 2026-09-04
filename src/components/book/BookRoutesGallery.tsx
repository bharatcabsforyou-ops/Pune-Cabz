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
            <span className="section-eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Popular routes
            </span>
            <h2 className="section-title mt-4 text-left">Popular routes from Pune</h2>
            <p className="section-desc mt-3 text-left">
              {filterActive
                ? `Showing ${routes.length} matching route${routes.length === 1 ? "" : "s"}. Tap WhatsApp to book instantly.`
                : "Verified intercity rides — tap a card and book instantly on WhatsApp."}
            </p>
          </div>
          <div className="pro-card-static shrink-0 px-4 py-3">
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
