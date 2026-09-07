"use client";

import { MapPinned, Sparkles } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { RouteCardBook, RoutesGridSkeleton } from "@/components/routes/RouteCard";
import { useT } from "@/lib/i18n";
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
  const t = useT();

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
            <p className="mt-4 text-lg font-bold text-navy">{t("bookGallery.empty")}</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-navy/55">
              {filterActive ? t("bookGallery.emptyFilter") : t("bookGallery.emptyAdmin")}
            </p>
            {filterActive && allCount ? (
              <p className="mt-2 text-xs text-navy/40">
                {t("bookGallery.totalAvailable", { count: allCount })}
              </p>
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
              {t("bookGallery.eyebrow")}
            </span>
            <h2 className="section-title mt-4 text-left">{t("bookGallery.title")}</h2>
            <p className="section-desc mt-3 text-left">
              {filterActive
                ? t("bookGallery.showing", { count: routes.length })
                : t("bookGallery.desc")}
            </p>
          </div>
          <div className="pro-card-static shrink-0 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-navy/35">
              {t("bookGallery.available")}
            </p>
            <p className="text-xl font-extrabold tabular-nums text-navy">
              {routes.length}
              <span className="ml-1.5 text-sm font-semibold text-navy/40">
                {routes.length === 1 ? t("bookGallery.routeOne") : t("bookGallery.routeMany")}
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
