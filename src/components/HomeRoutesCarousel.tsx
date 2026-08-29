"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Clock3,
  IndianRupee,
  MapPin,
  Sparkles,
} from "lucide-react";
import Container from "./Container";
import PhotoCard from "./PhotoCard";
import Reveal from "./motion/Reveal";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
import { films } from "@/lib/images";
import { logRouteInquiry, routeWhatsAppHref } from "@/lib/open-route-whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";
import type { PopularRoute } from "@/lib/popular-routes";
import clsx from "clsx";

const AUTO_PLAY_MS = 5000;

const captionsByTo: Record<string, string> = {
  "Pune City": films[0].caption,
  Mumbai: films[1].caption,
  Nashik: films[2].caption,
  Konkan: films[3].caption,
  Mahabaleshwar: films[4].caption,
};

function routeTitle(route: PopularRoute) {
  if (route.toCity.toLowerCase() === "pune city") return "Pune city";
  return `${route.fromCity} to ${route.toCity}`;
}

function routeCaption(route: PopularRoute) {
  return (
    captionsByTo[route.toCity] ??
    `Book a verified cab from ${route.fromCity} to ${route.toCity}.`
  );
}

export default function HomeRoutesCarousel({
  variant = "default",
  autoPlay = false,
}: {
  variant?: "default" | "hero";
  autoPlay?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const { routes: fromApi, loaded } = usePopularRoutes();
  const routes = useMemo(() => {
    if (fromApi.length > 0) return fromApi;
    return (defaultRoutes as Omit<PopularRoute, "id">[]).map((route, i) => ({
      ...route,
      id: `default-${i}`,
    }));
  }, [fromApi]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = routes.length;
  const active = routes[index];
  const isHero = variant === "hero";
  const shouldAutoPlay = autoPlay && !reduceMotion && total > 1;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (total === 0) return;
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (!shouldAutoPlay || paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_PLAY_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [shouldAutoPlay, paused, total]);

  if (!loaded && fromApi.length === 0) {
    if (isHero) {
      return (
        <div className="w-full min-w-0">
          <div className="hero-route-skeleton h-[420px] animate-pulse rounded-[1.75rem] sm:h-[380px]" />
        </div>
      );
    }
    return (
      <section className="bg-white py-10">
        <Container>
          <div className="h-64 animate-pulse rounded-3xl bg-surface" />
        </Container>
      </section>
    );
  }

  if (!active) return null;

  const label = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  if (isHero) {
    return (
      <HeroRoutesPanel
        active={active}
        index={index}
        label={label}
        totalLabel={totalLabel}
        shouldAutoPlay={shouldAutoPlay}
        onPause={setPaused}
      />
    );
  }

  const carousel = (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Popular routes</p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">
            Book your cars from Pune
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <NavButton dir="prev" onClick={() => go(-1)} />
          <span className="min-w-[4.5rem] text-center text-sm font-semibold text-navy/50">
            {label} / {totalLabel}
          </span>
          <NavButton dir="next" onClick={() => go(1)} />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id ?? `${active.fromCity}-${active.toCity}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <PhotoCard
                src={active.imageUrl}
                alt={`${active.fromCity} to ${active.toCity} - Pune Cabz`}
                variant="banner"
              />
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 flex max-w-[260px] items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-lg ring-1 ring-black/5"
          >
            <div className="animate-pulse-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10">
              <Bell className="h-4 w-4 text-brand" />
            </div>
            <p className="text-[12px] font-medium leading-snug text-navy">
              New ride to {active.toCity} is available!
              <span className="ml-1 text-navy/40">now</span>
            </p>
          </motion.div>

          <OverlayNav dir="prev" onClick={() => go(-1)} />
          <OverlayNav dir="next" onClick={() => go(1)} />
        </div>

        <Reveal direction="right">
          <RouteDetails active={active} label={label} totalLabel={totalLabel} />
          <RouteDots routes={routes} index={index} onSelect={setIndex} />
        </Reveal>
      </div>
    </div>
  );

  return (
    <section className="bg-white page-section">
      <Container>{carousel}</Container>
    </section>
  );
}

function HeroRoutesPanel({
  active,
  index,
  label,
  totalLabel,
  shouldAutoPlay,
  onPause,
}: {
  active: PopularRoute;
  index: number;
  label: string;
  totalLabel: string;
  shouldAutoPlay: boolean;
  onPause: (v: boolean) => void;
}) {
  return (
    <div
      className="hero-route-card group/card w-full min-w-0"
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      onFocusCapture={() => onPause(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onPause(false);
        }
      }}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] p-[1px] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.55)]">
        <div className="hero-route-card-inner relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-white">
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-black/[0.03] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-black/[0.02] blur-3xl" />

          <div className="relative flex items-center justify-between gap-3 border-b border-black/[0.04] px-4 py-3.5 sm:px-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand/12 to-brand/6 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand ring-1 ring-brand/10">
              <Sparkles className="h-3 w-3" />
              Popular routes
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 ring-1 ring-black/[0.04]">
              <span className="text-xs font-extrabold tabular-nums text-navy">{label}</span>
              <span className="text-[10px] font-medium text-navy/25">/</span>
              <span className="text-xs font-semibold tabular-nums text-navy/40">{totalLabel}</span>
            </div>
          </div>

          {shouldAutoPlay && (
            <div className="relative h-1 overflow-hidden bg-navy/[0.04]">
              <motion.div
                key={`progress-${index}`}
                className="hero-route-progress h-full origin-left bg-gradient-to-r from-brand via-brand-light to-brand"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: AUTO_PLAY_MS / 1000,
                  ease: "linear",
                }}
              />
            </div>
          )}

          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden p-4 pb-5 sm:p-5 sm:pr-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id ?? `${active.fromCity}-${active.toCity}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative aspect-[5/4] overflow-hidden rounded-2xl ring-1 ring-black/[0.06] sm:aspect-[4/3]"
                >
                  <Image
                    src={active.imageUrl}
                    alt={`${active.fromCity} to ${active.toCity} - Pune Cabz`}
                    fill
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand shadow-md backdrop-blur-sm ring-1 ring-white/80">
                    {active.tag}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-surface px-3 py-2.5">
                <div className="animate-pulse-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <Bell className="h-3.5 w-3.5 text-brand" />
                </div>
                <p className="min-w-0 text-[11px] font-semibold leading-snug text-navy sm:text-xs">
                  New ride to {active.toCity}
                  <span className="font-medium text-navy/45"> · available now</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between px-4 pb-4 pt-1 sm:px-5 sm:py-5 sm:pl-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-text-${active.id ?? active.toCity}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand/80">
                    Route {label}
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-2xl">
                    <span className="text-navy/55">{active.fromCity}</span>
                    <ArrowRight className="mx-1.5 inline h-4 w-4 -translate-y-px text-brand sm:h-5 sm:w-5" />
                    <span className="text-gradient-brand">{active.toCity}</span>
                  </h3>

                  <p className="mt-3 text-[13px] leading-relaxed text-navy/55 sm:text-sm">
                    {routeCaption(active)} Shared highway seats, verified drivers.
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <MetaChip icon={MapPin} label="Route" value={active.toCity} compact />
                    <MetaChip icon={Clock3} label="Time" value={active.duration} compact />
                    <MetaChip icon={IndianRupee} label="From" value={`₹${active.fromPrice}`} compact highlight />
                  </div>

                  <a
                    href={routeWhatsAppHref(active)}
                    onClick={() => logRouteInquiry(active)}
                    className="btn-shine mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:bg-[#1ebe57] sm:mt-auto sm:w-auto sm:rounded-full sm:px-6"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Book on WhatsApp
                    <ArrowUpRight className="h-4 w-4 opacity-80" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteDetails({
  active,
  label,
  totalLabel,
}: {
  active: PopularRoute;
  label: string;
  totalLabel: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`text-${active.id ?? active.toCity}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
          Route {label} / {totalLabel}
        </p>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight text-navy sm:text-3xl lg:text-4xl">
          {routeTitle(active)}
        </h3>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-navy/60">
          {routeCaption(active)} Book a verified seat — same highway, shared cost.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-navy/55">
          <span className="inline-flex items-center gap-1.5 font-medium text-navy">
            <MapPin className="h-4 w-4 text-brand" />
            {active.fromCity} → {active.toCity}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4 text-brand" />
            {active.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-navy">
            <IndianRupee className="h-4 w-4 text-brand" />
            from {active.fromPrice}
          </span>
        </div>
        <a
          href={routeWhatsAppHref(active)}
          onClick={() => logRouteInquiry(active)}
          className="btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#25D366]/25 transition-colors hover:bg-[#1ebe57]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Book on WhatsApp
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

function RouteDots({
  routes,
  index,
  onSelect,
}: {
  routes: PopularRoute[];
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="mt-6 flex gap-2">
      {routes.map((route, i) => (
        <button
          key={route.id ?? `${route.fromCity}-${route.toCity}`}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show route ${i + 1}`}
          aria-current={i === index ? "true" : undefined}
          className={`h-2 rounded-full transition-all ${
            i === index ? "w-8 bg-brand" : "w-2 bg-navy/15 hover:bg-navy/30"
          }`}
        />
      ))}
    </div>
  );
}

function MetaChip({
  icon: Icon,
  label,
  value,
  compact = false,
  highlight = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  compact?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col rounded-xl ring-1 ring-black/[0.05]",
        compact ? "gap-0.5 px-2 py-2 sm:px-2.5" : "gap-1 px-3 py-2.5",
        highlight ? "bg-brand/[0.06] ring-brand/15" : "bg-surface"
      )}
    >
      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-navy/40 sm:text-[10px]">
        <Icon className="h-3 w-3 text-brand" />
        {label}
      </span>
      <span
        className={clsx(
          "truncate font-bold text-navy",
          compact ? "text-[11px] sm:text-xs" : "text-sm",
          highlight && "text-brand"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function NavButton({
  dir,
  onClick,
  compact = false,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  compact?: boolean;
}) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous route" : "Next route"}
      className={clsx(
        "flex items-center justify-center rounded-full border border-black/10 bg-white text-navy shadow-sm transition-colors hover:border-brand/30 hover:text-brand",
        compact ? "h-8 w-8" : "h-10 w-10"
      )}
    >
      <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </button>
  );
}

function OverlayNav({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous route" : "Next route"}
      className={clsx(
        "absolute top-1/2 hidden -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-navy shadow-lg ring-1 ring-black/5 transition hover:text-brand sm:flex",
        dir === "prev" ? "left-3" : "right-3"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
