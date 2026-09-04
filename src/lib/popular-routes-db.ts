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

  const extMap: Record<number, string> = {
    1: "/image1.jpeg", 2: "/image2.jpeg", 3: "/image3.png",
    4: "/image4.jpeg", 5: "/iamge5.png",  6: "/image6.png",
    7: "/image7.png",  8: "/image8.png",  9: "/image9.png",
    10: "/image10.png", 11: "/image11.png",
  };
  if (row.sort_order >= 1 && row.sort_order <= 11) {
    return extMap[row.sort_order];
  }

  return "/image2.jpeg";
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
