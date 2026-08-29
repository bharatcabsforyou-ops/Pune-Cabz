import { site } from "@/lib/site";
import { formatTravelDate } from "@/lib/bookings";

export type RouteSearchMessage = {
  fromCity: string;
  toCity: string;
  travelDate?: string;
  passengers?: number;
};

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
