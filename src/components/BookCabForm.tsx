"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import clsx from "clsx";
import { Mail } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
import { routeCityOptions, mergeRoutesWithDefaults, type PopularRoute } from "@/lib/popular-routes";
import {
  cabBookingMailtoHref,
  cabBookingNotes,
  cabBookingWhatsAppHref,
} from "@/lib/whatsapp-booking";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/en";

const TRIP_TAB_IDS = ["outstation", "oneway", "local", "airport"] as const;

type TripTabId = (typeof TRIP_TAB_IDS)[number];

const TRIP_TAB_KEYS: Record<TripTabId, MessageKey> = {
  outstation: "bookForm.tab.outstation",
  oneway: "bookForm.tab.oneWay",
  local: "bookForm.tab.local",
  airport: "bookForm.tab.airport",
};

const VEHICLE_KEYS = [
  "bookForm.vehicle.choose",
  "bookForm.vehicle.hatchback",
  "bookForm.vehicle.sedan",
  "bookForm.vehicle.suv",
  "bookForm.vehicle.innova",
  "bookForm.vehicle.tempo",
  "bookForm.vehicle.urbania",
] as const;

export default function BookCabForm({
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
  variant?: "default" | "compact";
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

  const [tripTab, setTripTab] = useState<TripTabId>("outstation");
  const [internalFrom, setInternalFrom] = useState("");
  const [internalTo, setInternalTo] = useState("");
  const from = controlledFrom ?? internalFrom;
  const to = controlledTo ?? internalTo;
  const setFrom = onFromChange ?? setInternalFrom;
  const setTo = onToChange ?? setInternalTo;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicleKey, setVehicleKey] = useState<(typeof VEHICLE_KEYS)[number]>(
    "bookForm.vehicle.choose"
  );
  const [passengers, setPassengers] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const filteredToOptions = useMemo(() => {
    const exactFrom = fromCities.find((c) => c.toLowerCase() === from.trim().toLowerCase());
    if (exactFrom) return toByFrom.get(exactFrom) ?? allToCities;
    return allToCities;
  }, [from, fromCities, toByFrom, allToCities]);

  const tripLabel = t(TRIP_TAB_KEYS[tripTab]);

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

  function buildPayload() {
    const passengerCount = Number(passengers) || 1;
    const payload = {
      tripType: tripLabel,
      name: name.trim(),
      phone: phone.trim().replace(/\s+/g, ""),
      fromCity: from.trim(),
      toCity: to.trim(),
      travelDate: date || undefined,
      pickupTime: time || undefined,
      vehicle:
        vehicleKey !== "bookForm.vehicle.choose" ? t(vehicleKey) : undefined,
      passengers: passengerCount,
      notes: notes.trim() || undefined,
    };
    return payload;
  }

  function validate() {
    if (name.trim().length < 2) return t("bookForm.error.name");
    if (!/^[6-9]\d{9}$/.test(phone.trim().replace(/\s+/g, ""))) {
      return t("bookForm.error.phone");
    }
    if (from.trim().length < 2) return t("bookForm.error.pickup");
    if (to.trim().length < 2) return t("bookForm.error.drop");
    if (!date) return t("bookForm.error.date");
    const passengerCount = Number(passengers);
    if (passengers && (!Number.isFinite(passengerCount) || passengerCount < 1 || passengerCount > 12)) {
      return t("bookForm.error.passengers");
    }
    return "";
  }

  function persistBooking(payload: ReturnType<typeof buildPayload>) {
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        fromCity: payload.fromCity,
        toCity: payload.toCity,
        travelDate: payload.travelDate,
        passengers: payload.passengers,
        notes: cabBookingNotes(payload),
      }),
    }).catch(() => {});

    fetch("/api/route-inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromCity: payload.fromCity,
        toCity: payload.toCity,
        travelDate: payload.travelDate,
        passengers: payload.passengers,
      }),
    }).catch(() => {});
  }

  function handleWhatsApp(e: FormEvent) {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    const payload = buildPayload();
    persistBooking(payload);
    window.location.href = cabBookingWhatsAppHref(payload);
  }

  function handleEmail(e: FormEvent) {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    const payload = buildPayload();
    persistBooking(payload);
    window.location.href = cabBookingMailtoHref(payload);
  }

  const defaultFrom = fromCities[0] ?? "Pune";
  const defaultTo = filteredToOptions[0] ?? "Mumbai";
  const compact = variant === "compact";

  return (
    <form
      id="search"
      onSubmit={handleWhatsApp}
      className={clsx("book-cab-form scroll-mt-28", compact && "book-cab-form--compact")}
    >
      <div className="book-cab-card">
        <div className="book-cab-tabs" role="tablist" aria-label="Trip type">
          {TRIP_TAB_IDS.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tripTab === id}
              onClick={() => setTripTab(id)}
              className={clsx("book-cab-tab", tripTab === id && "book-cab-tab-active")}
            >
              {t(TRIP_TAB_KEYS[id])}
            </button>
          ))}
        </div>

        <span className="book-cab-badge book-cab-badge-float">24×7</span>

        <div className="book-cab-grid">
          <FormField label={t("bookForm.name")}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("bookForm.namePlaceholder")}
              className="book-cab-input"
              autoComplete="name"
            />
          </FormField>

          <FormField label={t("bookForm.mobile")}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("bookForm.mobilePlaceholder")}
              className="book-cab-input"
              autoComplete="tel"
            />
          </FormField>

          <FormField label={t("bookForm.pickup")}>
            <input
              type="text"
              value={from}
              onChange={(e) => handleFromChange(e.target.value)}
              placeholder={`e.g. ${defaultFrom}`}
              list="book-from-cities"
              disabled={!loaded && fromApi.length === 0}
              className="book-cab-input"
            />
            {fromCities.length > 0 && (
              <datalist id="book-from-cities">
                {fromCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            )}
          </FormField>

          <FormField label={t("bookForm.drop")}>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder={`e.g. ${defaultTo}`}
              list="book-to-cities"
              disabled={!loaded && fromApi.length === 0}
              className="book-cab-input"
            />
            {filteredToOptions.length > 0 && (
              <datalist id="book-to-cities">
                {filteredToOptions.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            )}
          </FormField>

          <FormField label={t("bookForm.date")}>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) => {
                const el = e.currentTarget;
                try {
                  el.showPicker?.();
                } catch {
                  /* unsupported browsers still open on focus */
                }
              }}
              className="book-cab-input book-cab-input-date"
            />
          </FormField>

          <FormField label={t("bookForm.time")}>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onClick={(e) => {
                const el = e.currentTarget;
                try {
                  el.showPicker?.();
                } catch {
                  /* unsupported browsers still open on focus */
                }
              }}
              className="book-cab-input book-cab-input-time"
            />
          </FormField>

          <FormField label={t("bookForm.vehicle")}>
            <select
              value={vehicleKey}
              onChange={(e) =>
                setVehicleKey(e.target.value as (typeof VEHICLE_KEYS)[number])
              }
              className="book-cab-input book-cab-select"
            >
              {VEHICLE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(key)}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label={t("bookForm.passengers")}>
            <input
              type="number"
              min={1}
              max={12}
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              placeholder={t("bookForm.passengersPlaceholder")}
              className="book-cab-input"
            />
          </FormField>
        </div>

        <FormField label={t("bookForm.notes")} className={compact ? "mt-3" : "mt-4"}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("bookForm.notesPlaceholder")}
            rows={compact ? 2 : 3}
            className="book-cab-input book-cab-textarea"
          />
        </FormField>

        {error ? (
          <p className="mt-3 text-sm font-medium text-brand" role="alert">
            {error}
          </p>
        ) : null}

        <div className="book-cab-actions">
          <button type="submit" className="book-cab-btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" />
            {compact ? (
              <span className="text-white">{t("bookForm.submitWhatsAppCompact")}</span>
            ) : (
              <span className="text-white">{t("bookForm.submitWhatsApp")}</span>
            )}
          </button>
          <button type="button" onClick={handleEmail} className="book-cab-btn-email">
            <Mail className="h-5 w-5" />
            {compact ? t("bookForm.submitEmailCompact") : t("bookForm.submitEmail")}
          </button>
        </div>
      </div>
    </form>
  );
}

function FormField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={clsx("book-cab-field", className)}>
      <span className="book-cab-label">{label}</span>
      {children}
    </label>
  );
}
