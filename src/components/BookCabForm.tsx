"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import clsx from "clsx";
import { Mail } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { usePopularRoutes } from "@/hooks/usePopularRoutes";
import defaultRoutes from "@/data/default-routes.json";
import { routeCityOptions, type PopularRoute } from "@/lib/popular-routes";
import {
  cabBookingMailtoHref,
  cabBookingNotes,
  cabBookingWhatsAppHref,
} from "@/lib/whatsapp-booking";
import { site } from "@/lib/site";

const TRIP_TABS = [
  { id: "outstation", label: "Outstation" },
  { id: "oneway", label: "One Way" },
  { id: "local", label: "Local / City" },
  { id: "airport", label: "Airport" },
] as const;

type TripTabId = (typeof TRIP_TABS)[number]["id"];

const VEHICLE_OPTIONS = [
  "Any / Suggest me",
  "Sedan",
  "SUV",
  "Innova",
  "Tempo Traveller",
];

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
  const { routes: fromApi, loaded } = usePopularRoutes();
  const routes = useMemo(() => {
    if (fromApi.length > 0) return fromApi;
    return (defaultRoutes as Omit<PopularRoute, "id">[]).map((route, i) => ({
      ...route,
      id: `default-${i}`,
    }));
  }, [fromApi]);

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
  const [vehicle, setVehicle] = useState(VEHICLE_OPTIONS[0]);
  const [passengers, setPassengers] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const filteredToOptions = useMemo(() => {
    const exactFrom = fromCities.find((c) => c.toLowerCase() === from.trim().toLowerCase());
    if (exactFrom) return toByFrom.get(exactFrom) ?? allToCities;
    return allToCities;
  }, [from, fromCities, toByFrom, allToCities]);

  const tripLabel = TRIP_TABS.find((tab) => tab.id === tripTab)?.label ?? "Outstation";

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
      vehicle: vehicle !== VEHICLE_OPTIONS[0] ? vehicle : undefined,
      passengers: passengerCount,
      notes: notes.trim() || undefined,
    };
    return payload;
  }

  function validate() {
    if (name.trim().length < 2) return "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(phone.trim().replace(/\s+/g, ""))) {
      return "Enter a valid 10-digit mobile number.";
    }
    if (from.trim().length < 2) return "Enter pickup location.";
    if (to.trim().length < 2) return "Enter drop location.";
    if (!date) return "Pick a travel date.";
    const passengerCount = Number(passengers);
    if (passengers && (!Number.isFinite(passengerCount) || passengerCount < 1 || passengerCount > 12)) {
      return "Passengers must be between 1 and 12.";
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
        <div className="book-cab-header">
          <h2 className="book-cab-title">Book Your Cab</h2>
          <span className="book-cab-badge">24×7</span>
        </div>

        <div className="book-cab-tabs" role="tablist" aria-label="Trip type">
          {TRIP_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tripTab === tab.id}
              onClick={() => setTripTab(tab.id)}
              className={clsx("book-cab-tab", tripTab === tab.id && "book-cab-tab-active")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="book-cab-grid">
          <FormField label="Full name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="book-cab-input"
              autoComplete="name"
            />
          </FormField>

          <FormField label="Mobile number">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 00000 00000"
              className="book-cab-input"
              autoComplete="tel"
            />
          </FormField>

          <FormField label="Pickup from">
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

          <FormField label="Drop to">
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

          <FormField label="Travel date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="book-cab-input book-cab-input-date"
            />
          </FormField>

          <FormField label="Pickup time">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="book-cab-input book-cab-input-time"
            />
          </FormField>

          <FormField label="Vehicle">
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="book-cab-input book-cab-select"
            >
              {VEHICLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Passengers">
            <input
              type="number"
              min={1}
              max={12}
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              placeholder="e.g. 4"
              className="book-cab-input"
            />
          </FormField>
        </div>

        <FormField label="Anything else?" className={compact ? "mt-3" : "mt-4"}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Stops, luggage, return date..."
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
            {compact ? "WhatsApp" : "Send on WhatsApp"}
          </button>
          <button type="button" onClick={handleEmail} className="book-cab-btn-email">
            <Mail className="h-5 w-5" />
            {compact ? "Email" : "Send by Email"}
          </button>
        </div>

        <p className="book-cab-footer">
          {compact ? (
            <>
              Call{" "}
              <a href={site.phoneHref} className="font-bold text-navy hover:text-brand">
                {site.phone}
              </a>
            </>
          ) : (
            <>
              No registration needed. Or simply call{" "}
              <a href={site.phoneHref} className="font-bold text-navy hover:text-brand">
                {site.phone}
              </a>
            </>
          )}
        </p>
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
