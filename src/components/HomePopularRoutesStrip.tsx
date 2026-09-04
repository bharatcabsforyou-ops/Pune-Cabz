"use client";

import Link from "next/link";
import Container from "./Container";
import RouteBannerImage from "./RouteBannerImage";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
import type { PopularRoute } from "@/lib/popular-routes";

function SmallRouteCard({ route }: { route: PopularRoute }) {
  const href = `/book?from=${encodeURIComponent(route.fromCity)}&to=${encodeURIComponent(route.toCity)}`;

  return (
    <Link
      href={href}
      className="pro-card-interactive group w-[158px] shrink-0 overflow-hidden sm:w-[172px]"
    >
      <div className="relative h-[4.25rem] overflow-hidden bg-[#1a1214] sm:h-[4.5rem]">
        <RouteBannerImage
          src={route.imageUrl}
          alt={`${route.fromCity} to ${route.toCity}`}
          rounded="none"
          className="h-full [&_img]:h-full [&_img]:object-contain"
        />
        <span className="absolute left-1.5 top-1.5 rounded-full bg-white/95 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-brand shadow-sm">
          {route.tag}
        </span>
      </div>
      <div className="border-t border-black/[0.04] bg-white px-2.5 py-2">
        <p className="truncate text-[11px] font-bold text-navy">
          {route.fromCity} <span className="text-brand">&rarr;</span> {route.toCity}
        </p>
      </div>
    </Link>
  );
}

export default function HomePopularRoutesStrip() {
  const { routes: fromApi, loaded } = usePopularRoutes();
  const routes =
    fromApi.length > 0
      ? fromApi
      : (defaultRoutes as Omit<PopularRoute, "id">[]).map((route, i) => ({
          ...route,
          id: `default-${i}`,
        }));

  if (!loaded && fromApi.length === 0) {
    return (
      <section className="border-b border-black/[0.04] bg-white py-4">
        <Container>
          <div className="h-28 animate-pulse rounded-2xl bg-soft" />
        </Container>
      </section>
    );
  }

  if (routes.length === 0) return null;

  const loop = [...routes, ...routes];

  return (
    <section className="border-b border-black/[0.04] bg-white py-4 sm:py-5">
      <Container>
        <p className="text-center text-lg font-extrabold tracking-tight text-navy sm:text-xl">
          Popular routes
        </p>
      </Container>

      <div className="rides-marquee relative mt-3">
        <div className="rides-marquee-track routes-strip-track gap-2.5 py-0.5">
          {loop.map((route, i) => (
            <SmallRouteCard
              key={`${route.id ?? route.toCity}-${i}`}
              route={route}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent sm:w-14" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:w-14" />
      </div>
    </section>
  );
}
