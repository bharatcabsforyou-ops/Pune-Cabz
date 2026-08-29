"use client";

import { Clock3, IndianRupee, MapPin } from "lucide-react";
import RouteImage from "@/components/routes/RouteImage";
import { RouteCardSidebar, RoutesSidebarSkeleton } from "@/components/routes/RouteCard";
import type { PopularRoute } from "@/lib/popular-routes";

type RoutesListProps = {
  routes: PopularRoute[];
  loaded: boolean;
  selectedId?: string | null;
  onSelect: (route: PopularRoute) => void;
};

export function RoutesMobileStrip({ routes, loaded, selectedId, onSelect }: RoutesListProps) {
  if (!loaded) return null;
  if (routes.length === 0) return null;

  return (
    <div className="lg:hidden">
      <p className="text-[11px] font-bold uppercase tracking-widest text-brand">Route list</p>
      <p className="mt-1 text-sm font-semibold text-navy">Pick a route</p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {routes.map((route) => {
          const active = selectedId === route.id;
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => onSelect(route)}
              className={`flex w-[220px] shrink-0 flex-col overflow-hidden rounded-xl border text-left transition-all ${
                active
                  ? "border-brand/35 bg-white shadow-md ring-1 ring-brand/20"
                  : "border-black/[0.06] bg-white shadow-sm"
              }`}
            >
              <div className="relative h-24 bg-surface">
                <RouteImage src={route.imageUrl} alt={`${route.fromCity} to ${route.toCity}`} />
              </div>
              <div className="p-3">
                <p className="flex items-center gap-1 text-sm font-bold text-navy">
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  {route.fromCity} → {route.toCity}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-[11px] text-navy/55">
                  <Clock3 className="h-3 w-3" />
                  {route.duration}
                  <IndianRupee className="ml-1 h-3 w-3 text-brand" />
                  {route.fromPrice}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function RoutesSidebar({ routes, loaded, selectedId, onSelect }: RoutesListProps) {
  if (!loaded) return <RoutesSidebarSkeleton className="hidden lg:block" />;

  if (routes.length === 0) {
    return (
      <aside className="hidden rounded-2xl border border-dashed border-brand/20 bg-white p-5 text-center lg:block">
        <p className="text-sm font-semibold text-navy">No routes yet</p>
        <p className="mt-2 text-[13px] text-navy/50">Add routes in admin Route list — they appear here.</p>
      </aside>
    );
  }

  return (
    <aside className="hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm lg:block lg:sticky lg:top-24">
      <div className="border-b border-black/[0.05] bg-gradient-to-br from-[#fafbfc] to-white px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand">Route list</p>
        <h2 className="mt-1 text-lg font-bold text-navy">Popular from Pune</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-navy/50">
          Same routes as admin Route list. Tap to fill the booking form.
        </p>
      </div>

      <div className="max-h-[min(72vh,680px)] overflow-y-auto p-4">
        <ul className="space-y-2.5">
          {routes.map((route) => (
            <li key={route.id}>
              <RouteCardSidebar
                route={route}
                active={selectedId === route.id}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
