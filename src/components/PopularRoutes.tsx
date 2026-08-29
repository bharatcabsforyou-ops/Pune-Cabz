"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import { RouteCardGrid, RoutesGridSkeleton } from "@/components/routes/RouteCard";

export default function PopularRoutes() {
  const { routes, loaded } = usePopularRoutes();

  if (loaded && routes.length === 0) return null;

  return (
    <section className="border-t border-black/[0.04] bg-gradient-to-b from-white to-[#f8f9fb] py-14 sm:py-16">
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Route list</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Popular routes from Pune
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
              Book your cars — same routes on the home page and on the book page. Tap any route to
              start booking.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-brand/20 bg-white px-4 py-2.5 text-sm font-semibold text-brand shadow-sm transition-colors hover:bg-brand hover:text-white sm:self-auto"
          >
            Book your cars
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {!loaded ? (
          <div className="mt-8">
            <RoutesGridSkeleton />
          </div>
        ) : (
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <StaggerItem key={route.id}>
                <RouteCardGrid route={route} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </Container>
    </section>
  );
}
