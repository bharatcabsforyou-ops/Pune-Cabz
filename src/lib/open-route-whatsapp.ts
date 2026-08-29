import type { PopularRoute } from "@/lib/popular-routes";
import { routeSearchWhatsAppHref } from "@/lib/whatsapp-booking";

export function logRouteInquiry(route: Pick<PopularRoute, "fromCity" | "toCity">, passengers = 1) {
  fetch("/api/route-inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fromCity: route.fromCity,
      toCity: route.toCity,
      passengers,
    }),
  }).catch(() => {});
}

export function openRouteWhatsApp(route: Pick<PopularRoute, "fromCity" | "toCity">, passengers = 1) {
  logRouteInquiry(route, passengers);
  window.location.href = routeSearchWhatsAppHref({
    fromCity: route.fromCity,
    toCity: route.toCity,
    passengers,
  });
}

export function routeWhatsAppHref(route: Pick<PopularRoute, "fromCity" | "toCity">, passengers = 1) {
  return routeSearchWhatsAppHref({
    fromCity: route.fromCity,
    toCity: route.toCity,
    passengers,
  });
}
