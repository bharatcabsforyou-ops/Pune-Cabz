"use client";

import Link from "next/link";
import { ArrowRight, Clock3, IndianRupee, MapPin } from "lucide-react";
import RouteBannerImage from "@/components/RouteBannerImage";
import RouteImage from "@/components/routes/RouteImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { isBrandedRouteBanner } from "@/lib/images";
import { logRouteInquiry, routeWhatsAppHref } from "@/lib/open-route-whatsapp";
import type { PopularRoute } from "@/lib/popular-routes";

export function routeBookHref(route: PopularRoute) {
  return `/book?from=${encodeURIComponent(route.fromCity)}&to=${encodeURIComponent(route.toCity)}#search`;
}

export function RouteCardGrid({ route }: { route: PopularRoute }) {
  return (
    <Link
      href={routeBookHref(route)}
      className="pro-card-interactive group flex h-full flex-col overflow-hidden"
    >
      <div
        className={
          isBrandedRouteBanner(route.imageUrl)
            ? "overflow-hidden bg-[#1a1214]"
            : "relative aspect-[16/10] overflow-hidden bg-surface"
        }
      >
        {isBrandedRouteBanner(route.imageUrl) ? (
          <RouteBannerImage
            src={route.imageUrl}
            alt={`${route.fromCity} to ${route.toCity}`}
            rounded="none"
          />
        ) : (
          <RouteImage src={route.imageUrl} alt={`${route.fromCity} to ${route.toCity}`} />
        )}
        {!isBrandedRouteBanner(route.imageUrl) ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand shadow-sm">
            {route.tag}
          </span>
        ) : null}
      </div>
      <div className="card-body flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-brand" />
            <p className="truncate text-base font-bold text-navy">
              {route.fromCity} <span className="text-brand">&rarr;</span> {route.toCity}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-navy/25 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-navy/55">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {route.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-navy">
            <IndianRupee className="h-3.5 w-3.5 text-brand" />
            from {route.fromPrice}
          </span>
        </div>
        <p className="card-cta mt-4 opacity-0 transition-opacity group-hover:opacity-100">
          Book this route →
        </p>
      </div>
    </Link>
  );
}

export function RouteCardBook({
  route,
  index,
  total,
  active,
  onSelect,
}: {
  route: PopularRoute;
  index: number;
  total: number;
  active?: boolean;
  onSelect: (route: PopularRoute) => void;
}) {
  const label = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <article
      className={`pro-card-interactive group flex h-full flex-col overflow-hidden ${
        active ? "border-brand/40 ring-2 ring-brand/15" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(route)}
        className={`relative w-full overflow-hidden text-left ${
          isBrandedRouteBanner(route.imageUrl) ? "bg-[#1a1214]" : "aspect-[16/10] bg-surface"
        }`}
      >
        {isBrandedRouteBanner(route.imageUrl) ? (
          <RouteBannerImage
            src={route.imageUrl}
            alt={`${route.fromCity} to ${route.toCity}`}
            rounded="none"
          />
        ) : (
          <>
            <RouteImage
              src={route.imageUrl}
              alt={`${route.fromCity} to ${route.toCity}`}
              className="transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand shadow-sm backdrop-blur-sm">
              {route.tag}
            </span>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-lg font-extrabold leading-tight text-white drop-shadow-sm">
                {route.fromCity}{" "}
                <span className="text-brand-light">→</span> {route.toCity}
              </p>
            </div>
          </>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-navy/75 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          {label} / {totalLabel}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-surface px-3 py-2.5 ring-1 ring-black/[0.04]">
            <p className="text-[10px] font-bold uppercase tracking-wide text-navy/40">Duration</p>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-bold text-navy">
              <Clock3 className="h-3.5 w-3.5 text-brand" />
              {route.duration}
            </p>
          </div>
          <div className="rounded-xl bg-brand/[0.06] px-3 py-2.5 ring-1 ring-brand/10">
            <p className="text-[10px] font-bold uppercase tracking-wide text-navy/40">From</p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-extrabold text-brand">
              <IndianRupee className="h-3.5 w-3.5" />
              {route.fromPrice}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <a
            href={routeWhatsAppHref(route)}
            onClick={() => logRouteInquiry(route)}
            className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book now on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => onSelect(route)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs font-semibold text-navy/70 transition-colors hover:border-brand/25 hover:text-brand"
          >
            Select route
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function RouteCardSidebar({
  route,
  active,
  onSelect,
}: {
  route: PopularRoute;
  active?: boolean;
  onSelect: (route: PopularRoute) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(route)}
      className={`group flex w-full gap-3 overflow-hidden rounded-xl border p-2.5 text-left transition-all ${
        active
          ? "border-brand/35 bg-brand/[0.05] shadow-sm ring-1 ring-brand/20"
          : "border-black/[0.05] bg-[#fafbfc] hover:border-brand/20 hover:bg-white hover:shadow-sm"
      }`}
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
        <RouteImage src={route.imageUrl} alt={`${route.fromCity} to ${route.toCity}`} />
        {active ? (
          <span className="absolute inset-x-0 bottom-0 bg-brand py-0.5 text-center text-[9px] font-bold uppercase text-white">
            Selected
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className="flex min-w-0 items-center gap-1 text-sm font-bold text-navy">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
            <span className="truncate">
              {route.fromCity} → {route.toCity}
            </span>
          </p>
          <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-bold uppercase text-brand">
            {route.tag}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[12px] text-navy/55">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" />
            {route.duration}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-navy">
            <IndianRupee className="h-3 w-3 text-brand" />
            from {route.fromPrice}
          </span>
        </div>
      </div>
    </button>
  );
}

export function RoutesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[1.35rem] border border-black/[0.04] bg-white shadow-sm"
        >
          <div className="aspect-[16/10] animate-pulse bg-surface" />
          <div className="space-y-3 p-5">
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 animate-pulse rounded-xl bg-surface" />
              <div className="h-14 animate-pulse rounded-xl bg-surface" />
            </div>
            <div className="h-11 animate-pulse rounded-xl bg-surface" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoutesSidebarSkeleton({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm ${className}`}
    >
      <div className="h-4 w-24 animate-pulse rounded bg-surface" />
      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-surface" />
        ))}
      </div>
    </aside>
  );
}
