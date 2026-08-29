export type PopularRoute = {
  id: string;
  fromCity: string;
  toCity: string;
  duration: string;
  fromPrice: string;
  tag: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
  createdAt?: string;
};

export type PopularRouteInput = {
  fromCity: string;
  toCity: string;
  duration: string;
  fromPrice: string;
  tag: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
};

export function sortPopularRoutes(routes: PopularRoute[]) {
  return [...routes].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  });
}

export function publicRoutesFromDb(fromDb: PopularRoute[]) {
  return sortPopularRoutes(fromDb.filter((route) => route.published));
}

export function routeCityOptions(routes: PopularRoute[]) {
  const fromCities = [...new Set(routes.map((route) => route.fromCity))].sort((a, b) =>
    a.localeCompare(b)
  );

  const toByFrom = new Map<string, string[]>();
  for (const route of routes) {
    const existing = toByFrom.get(route.fromCity) ?? [];
    if (!existing.includes(route.toCity)) {
      existing.push(route.toCity);
      toByFrom.set(route.fromCity, existing);
    }
  }

  for (const cities of toByFrom.values()) {
    cities.sort((a, b) => a.localeCompare(b));
  }

  const allToCities = [...new Set(routes.map((route) => route.toCity))].sort((a, b) =>
    a.localeCompare(b)
  );

  return { fromCities, toByFrom, allToCities };
}

export function validatePopularRouteInput(input: Partial<PopularRouteInput>) {
  const fromCity = String(input.fromCity ?? "").trim();
  const toCity = String(input.toCity ?? "").trim();
  const duration = String(input.duration ?? "").trim();
  const fromPrice = String(input.fromPrice ?? "").trim();
  const tag = String(input.tag ?? "").trim();
  const imageUrl = String(input.imageUrl ?? "").trim();
  const sortOrder = Number(input.sortOrder ?? 0);
  const published = Boolean(input.published);

  if (fromCity.length < 2 || fromCity.length > 40) {
    return { error: "From city must be 2–40 characters." };
  }
  if (toCity.length < 2 || toCity.length > 40) {
    return { error: "To city must be 2–40 characters." };
  }
  if (duration.length < 2 || duration.length > 20) {
    return { error: "Duration must be 2–20 characters (e.g. 3h 30m)." };
  }
  if (fromPrice.length < 1 || fromPrice.length > 10 || !/^\d+$/.test(fromPrice)) {
    return { error: "Price must be a number (e.g. 499)." };
  }
  if (tag.length < 2 || tag.length > 30) {
    return { error: "Tag must be 2–30 characters." };
  }
  if (imageUrl.length < 4 || imageUrl.length > 500) {
    return { error: "Image is required." };
  }
  if (!Number.isFinite(sortOrder) || sortOrder < 0 || sortOrder > 999) {
    return { error: "Sort order must be between 0 and 999." };
  }

  return {
    data: { fromCity, toCity, duration, fromPrice, tag, imageUrl, sortOrder, published },
  };
}
