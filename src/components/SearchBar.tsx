"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  CircleDot,
  MapPin,
  CalendarDays,
  UsersRound,
  ArrowRightLeft,
  Minus,
  Plus,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import CityCombobox from "./CityCombobox";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
import { routeCityOptions, mergeRoutesWithDefaults, type PopularRoute } from "@/lib/popular-routes";
import { routeSearchWhatsAppHref } from "@/lib/whatsapp-booking";
import { useT } from "@/lib/i18n";

export default function SearchBar({
  from: controlledFrom,
  to: controlledTo,
  onFromChange,
  onToChange,
  variant = "default",
}: {
  from?: string;
  to?: string;
  onFromChange?: (value: string) => void;
  onToChange?: (value: string) => void;
  variant?: "default" | "hero";
} = {}) {
  const t = useT();
  const { routes: fromApi, loaded } = usePopularRoutes();
  const routes = useMemo(
    () => mergeRoutesWithDefaults(fromApi, defaultRoutes as Omit<PopularRoute, "id">[]),
    [fromApi]
  );

  const { fromCities, toByFrom, allToCities } = useMemo(
    () => routeCityOptions(routes),
    [routes]
  );

  const [internalFrom, setInternalFrom] = useState("");
  const [internalTo, setInternalTo] = useState("");

  const from = controlledFrom ?? internalFrom;
  const to = controlledTo ?? internalTo;
  const setFrom = onFromChange ?? setInternalFrom;
  const setTo = onToChange ?? setInternalTo;
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [swapped, setSwapped] = useState(false);
  const isHero = variant === "hero";

  const filteredToOptions = useMemo(() => {
    const exactFrom = fromCities.find((c) => c.toLowerCase() === from.trim().toLowerCase());
    if (exactFrom) return toByFrom.get(exactFrom) ?? allToCities;
    return allToCities;
  }, [from, fromCities, toByFrom, allToCities]);

  function handleFromChange(value: string) {
    setFrom(value);
    const exactFrom = fromCities.find((c) => c.toLowerCase() === value.trim().toLowerCase());
    if (exactFrom && to.trim()) {
      const allowed = toByFrom.get(exactFrom) ?? [];
      if (!allowed.some((city) => city.toLowerCase() === to.trim().toLowerCase())) {
        setTo("");
      }
    }
  }

  function swap() {
    setFrom(to);
    setTo(from);
    setSwapped((s) => !s);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;

    const payload = {
      fromCity: from.trim(),
      toCity: to.trim(),
      travelDate: date || undefined,
      passengers,
    };

    fetch("/api/route-inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    window.location.href = routeSearchWhatsAppHref(payload);
  }

  const defaultFrom = fromCities[0] ?? "Pune";
  const defaultTo = filteredToOptions[0] ?? "Mumbai";

  return (
    <form id="search" onSubmit={handleSearch} className="search-bar w-full min-w-0 scroll-mt-28">
      <div
        className={clsx(
          "flex w-full min-w-0 flex-col lg:flex-row lg:items-stretch",
          isHero ? "search-panel sm:rounded-[1.35rem]" : "search-panel search-panel-default rounded-2xl"
        )}
      >
        <Field
          icon={<CircleDot className="h-5 w-5 text-brand" />}
          label={t("search.from")}
          placeholder={defaultFrom}
          value={from}
          onChange={handleFromChange}
          options={fromCities}
          listId="search-from-cities"
          isHero={isHero}
          disabled={!loaded && fromApi.length === 0}
          elevate
        />

        <div className="relative z-[5] flex items-center justify-center lg:w-0 lg:shrink-0">
          <motion.button
            type="button"
            onClick={swap}
            animate={{ rotate: swapped ? 180 : 0 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            aria-label={t("search.swap")}
            className="relative z-10 -my-3 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-navy/60 shadow-sm hover:border-brand/30 hover:text-brand lg:my-auto lg:-mx-3 lg:h-9 lg:w-9"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </motion.button>
        </div>

        <Field
          icon={<MapPin className="h-5 w-5 text-brand" />}
          label={t("search.to")}
          placeholder={defaultTo}
          value={to}
          onChange={setTo}
          options={filteredToOptions}
          listId="search-to-cities"
          isHero={isHero}
          disabled={!loaded && fromApi.length === 0}
          elevate
        />
        <Divider />
        <Field
          icon={<CalendarDays className="h-5 w-5 text-brand" />}
          label={t("search.departure")}
          placeholder={t("search.today")}
          value={date}
          onChange={setDate}
          type="date"
          isHero={isHero}
        />
        <Divider />
        <div
          className={clsx(
            "flex min-w-0 items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4",
            isHero ? "lg:min-w-[200px] lg:flex-[1.05]" : "flex-1"
          )}
        >
          <UsersRound className="h-5 w-5 shrink-0 text-brand" />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col">
              <span className="text-xs font-medium text-navy/50">{t("search.passengers")}</span>
              <span className="whitespace-nowrap text-[15px] font-semibold text-navy">
                {passengers}{" "}
                {passengers === 1 ? t("search.passengerOne") : t("search.passengerMany")}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Decrease passengers"
                disabled={passengers <= 1}
                onClick={() => setPassengers((n) => Math.max(1, n - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-navy transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Minus className="h-4 w-4" strokeWidth={2.4} />
              </button>
              <button
                type="button"
                aria-label="Increase passengers"
                disabled={passengers >= 12}
                onClick={() => setPassengers((n) => Math.min(12, n + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-navy transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Plus className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-stretch overflow-hidden rounded-b-[1.25rem] border-t border-black/8 lg:rounded-b-none lg:rounded-r-[1.25rem] lg:border-t-0 lg:border-l lg:border-black/10">
          <button
            type="submit"
            className={clsx(
              "btn-shine flex w-full items-center justify-center gap-2 bg-brand font-semibold text-white transition-colors hover:bg-brand-dark",
              isHero
                ? "px-6 py-4 text-sm lg:min-w-[168px] lg:px-8 lg:py-0"
                : "px-6 py-4 text-sm lg:min-w-[168px] lg:px-6 lg:py-0"
            )}
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t("search.whatsapp")}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  options = [],
  listId,
  isHero = false,
  disabled = false,
  elevate = false,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  options?: string[];
  listId?: string;
  isHero?: boolean;
  disabled?: boolean;
  elevate?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex min-w-0 items-center gap-3 px-4 py-3.5 transition-colors focus-within:bg-brand/[0.02] sm:px-5 sm:py-4",
        isHero ? "flex-1 lg:min-w-[140px]" : "flex-1",
        type === "date" && isHero && "lg:min-w-[170px] lg:max-w-[200px]",
        elevate && "relative z-30 focus-within:z-40"
      )}
    >
      {icon}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-medium text-navy/50">{label}</span>
        {type === "text" && listId ? (
          <CityCombobox
            variant="inline"
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full min-w-0 bg-transparent text-[16px] font-semibold text-navy placeholder:text-navy/30 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none disabled:opacity-50"
          />
        )}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-4 h-px shrink-0 bg-black/8 lg:mx-0 lg:h-auto lg:w-px lg:self-stretch lg:bg-black/10" />
  );
}
