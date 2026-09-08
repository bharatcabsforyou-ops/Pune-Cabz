import type { TourismTrip, TourismTripInput } from "@/lib/tourism";

export const TOURISM_SELECT_FULL =
  "id, title, caption, trip_type, from_city, image_url, sort_order, published, created_at, place_slug, description, why_cab, from_pune, from_mumbai, stops";

export const TOURISM_SELECT_BASE =
  "id, title, caption, trip_type, from_city, image_url, sort_order, published, created_at";

export type TourismRow = {
  id: string;
  title: string;
  caption: string;
  trip_type: string;
  from_city: string;
  image_url: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  place_slug?: string | null;
  description?: string | null;
  why_cab?: string | null;
  from_pune?: string | null;
  from_mumbai?: string | null;
  stops?: string[] | string | null;
};

export function isMissingPlaceColumns(message: string) {
  return /place_slug|description|why_cab|from_pune|from_mumbai|stops/i.test(message);
}

function parseStops(raw: TourismRow["stops"]): string[] {
  if (Array.isArray(raw)) {
    return raw.map((s) => String(s).trim()).filter(Boolean);
  }
  if (typeof raw === "string" && raw.trim()) {
    return raw
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function mapTourismRow(row: TourismRow): TourismTrip {
  return {
    id: row.id,
    title: row.title,
    caption: row.caption,
    tripType: row.trip_type,
    fromCity: row.from_city,
    imageUrl: row.image_url,
    sortOrder: row.sort_order,
    published: row.published,
    createdAt: row.created_at,
    placeSlug: row.place_slug?.trim() || undefined,
    description: row.description?.trim() || undefined,
    whyCab: row.why_cab?.trim() || undefined,
    fromPune: row.from_pune?.trim() || undefined,
    fromMumbai: row.from_mumbai?.trim() || undefined,
    stops: parseStops(row.stops),
  };
}

export function tourismDbPayload(input: TourismTripInput, includePlaceFields: boolean) {
  const base = {
    title: input.title,
    caption: input.caption,
    trip_type: input.tripType,
    from_city: input.fromCity,
    image_url: input.imageUrl,
    sort_order: input.sortOrder,
    published: input.published,
  };

  if (!includePlaceFields) return base;

  return {
    ...base,
    place_slug: input.placeSlug?.trim() || null,
    description: input.description?.trim() || null,
    why_cab: input.whyCab?.trim() || null,
    from_pune: input.fromPune?.trim() || null,
    from_mumbai: input.fromMumbai?.trim() || null,
    stops: input.stops?.length ? input.stops : null,
  };
}
