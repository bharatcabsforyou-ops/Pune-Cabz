import type { PopularRoute, PopularRouteInput } from "@/lib/popular-routes";
import defaultRoutes from "@/data/default-routes.json";

const defaultImageByRoute = Object.fromEntries(
  defaultRoutes.map((route) => [
    `${route.fromCity.toLowerCase()}|${route.toCity.toLowerCase()}`,
    route.imageUrl,
  ])
);

function resolveRouteImage(row: RowWithImage) {
  const key = `${row.from_city.toLowerCase()}|${row.to_city.toLowerCase()}`;
  const mapped = defaultImageByRoute[key];
  if (mapped) return mapped;

  if (row.image_url) return row.image_url;

  if (row.sort_order >= 1 && row.sort_order <= 5) {
    return `/image${row.sort_order}.jpg`;
  }

  return "/image2.jpg";
}

export const ROUTE_SELECT_WITH_IMAGE =
  "id, from_city, to_city, duration, from_price, tag, image_url, sort_order, published, created_at";

export const ROUTE_SELECT_BASE =
  "id, from_city, to_city, duration, from_price, tag, sort_order, published, created_at";

type RowBase = {
  id: string;
  from_city: string;
  to_city: string;
  duration: string;
  from_price: string;
  tag: string;
  sort_order: number;
  published: boolean;
  created_at: string;
};

type RowWithImage = RowBase & { image_url?: string };

export function isMissingImageColumn(message: string) {
  return message.includes("image_url");
}

export function mapPopularRouteRow(row: RowWithImage): PopularRoute {
  return {
    id: row.id,
    fromCity: row.from_city,
    toCity: row.to_city,
    duration: row.duration,
    fromPrice: row.from_price,
    tag: row.tag,
    imageUrl: resolveRouteImage(row),
    sortOrder: row.sort_order,
    published: row.published,
    createdAt: row.created_at,
  };
}

export function popularRouteDbPayload(input: PopularRouteInput, includeImage: boolean) {
  const base = {
    from_city: input.fromCity,
    to_city: input.toCity,
    duration: input.duration,
    from_price: input.fromPrice,
    tag: input.tag,
    sort_order: input.sortOrder,
    published: input.published,
  };
  return includeImage ? { ...base, image_url: input.imageUrl } : base;
}
