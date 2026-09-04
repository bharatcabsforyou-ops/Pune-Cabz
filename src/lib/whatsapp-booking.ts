import { site } from "@/lib/site";
import { formatTravelDate } from "@/lib/bookings";

export type RouteSearchMessage = {
  fromCity: string;
  toCity: string;
  travelDate?: string;
  passengers?: number;
};

export type CabBookingMessage = {
  tripType: string;
  name: string;
  phone: string;
  fromCity: string;
  toCity: string;
  travelDate?: string;
  pickupTime?: string;
  vehicle?: string;
  passengers?: number;
  notes?: string;
};

function cabBookingLines({
  tripType,
  name,
  phone,
  fromCity,
  toCity,
  travelDate,
  pickupTime,
  vehicle,
  passengers = 1,
  notes,
}: CabBookingMessage) {
  const dateLabel = travelDate ? formatTravelDate(travelDate) : "Flexible / not set";
  const lines = [
    "Hi Pune Cabz, I want to book a cab.",
    "",
    `Trip type: ${tripType}`,
    `Name: ${name}`,
    `Mobile: ${phone}`,
    `Route: ${fromCity} → ${toCity}`,
    `Travel date: ${dateLabel}`,
    pickupTime ? `Pickup time: ${pickupTime}` : null,
    vehicle ? `Vehicle: ${vehicle}` : null,
    `Passengers: ${passengers}`,
    notes ? `Notes: ${notes}` : null,
    "",
    "Please share fare and availability.",
  ];
  return lines.filter(Boolean) as string[];
}

export function cabBookingWhatsAppHref(payload: CabBookingMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(cabBookingLines(payload).join("\n"))}`;
}

export function cabBookingMailtoHref(payload: CabBookingMessage) {
  const subject = `Cab booking — ${payload.fromCity} to ${payload.toCity}`;
  const body = cabBookingLines(payload).join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function cabBookingNotes(payload: CabBookingMessage) {
  const parts = [
    payload.notes?.trim(),
    `Trip type: ${payload.tripType}`,
    payload.pickupTime ? `Pickup time: ${payload.pickupTime}` : "",
    payload.vehicle ? `Vehicle: ${payload.vehicle}` : "",
  ].filter(Boolean);
  return parts.join("\n");
}

export function routeSearchWhatsAppHref({
  fromCity,
  toCity,
  travelDate,
  passengers = 1,
}: RouteSearchMessage) {
  const dateLabel = travelDate ? formatTravelDate(travelDate) : "Flexible / not set";
  const lines = [
    "Hi Pune Cabz, I want to book a cab.",
    "",
    `Route: ${fromCity} → ${toCity}`,
    `Date: ${dateLabel}`,
    `Passengers: ${passengers}`,
    "",
    "Please share fare and availability.",
  ];
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function routeSearchAdminMessage({
  fromCity,
  toCity,
  travelDate,
  passengers = 1,
}: RouteSearchMessage) {
  const dateLabel = travelDate ? formatTravelDate(travelDate) : "Not set";
  return [
    `Route search from website`,
    `From: ${fromCity}`,
    `To: ${toCity}`,
    `Travel date: ${dateLabel}`,
    `Passengers: ${passengers}`,
    `Source: Hero search / WhatsApp redirect`,
  ].join("\n");
}
