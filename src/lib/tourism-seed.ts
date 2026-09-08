import seedJson from "@/data/tourism.json";
import { touristPlaces } from "@/data/tourist-places";
import type { TourismTrip } from "@/lib/tourism";

/** Destinations already shown on /tourism (full Tourist places guide cards). */
function placesAsTrips(): TourismTrip[] {
  return touristPlaces.map((place, index) => ({
    id: `place-${place.id}`,
    placeSlug: place.id,
    title: place.name,
    caption: place.tagline,
    tripType: place.category,
    fromCity: "Pune",
    imageUrl: place.image,
    sortOrder: index + 1,
    published: true,
    isSeed: true,
    description: place.description,
    whyCab: place.whyCab ?? "",
    fromPune: place.fromPune,
    fromMumbai: place.fromMumbai,
    stops: [...place.stops],
  }));
}

/** Legacy seed cards from tourism.json (shorter trip strips). */
function jsonAsTrips(): TourismTrip[] {
  return (seedJson as TourismTrip[]).map((trip) => ({
    ...trip,
    isSeed: true,
    description: trip.description ?? "",
    whyCab: trip.whyCab ?? "",
    fromPune: trip.fromPune ?? "",
    fromMumbai: trip.fromMumbai ?? "",
    stops: trip.stops ?? [],
  }));
}

function dedupeByTitle(trips: TourismTrip[]) {
  const seen = new Set<string>();
  const out: TourismTrip[] = [];
  for (const trip of trips) {
    const key = trip.title.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trip);
  }
  return out;
}

export function getTourismSeedTrips(): TourismTrip[] {
  // Prefer full tourist-place cards first, then any extra JSON seeds.
  return dedupeByTitle([...placesAsTrips(), ...jsonAsTrips()]);
}

export function tripToTouristPlaceFields(trip: TourismTrip) {
  return {
    id: trip.placeSlug || trip.id.replace(/^place-/, ""),
    name: trip.title,
    tagline: trip.caption,
    description: trip.description ?? "",
    whyCab: trip.whyCab,
    fromPune: trip.fromPune ?? "",
    fromMumbai: trip.fromMumbai ?? "",
    stops: trip.stops ?? [],
    category: trip.tripType,
    image: trip.imageUrl,
  };
}
