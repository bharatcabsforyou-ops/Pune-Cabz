export type TourismTrip = {
  id: string;
  title: string;
  caption: string;
  tripType: string;
  fromCity: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
  createdAt?: string;
};

export type TourismTripInput = {
  title: string;
  caption: string;
  tripType: string;
  fromCity: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
};

export function sortTourismTrips(trips: TourismTrip[]) {
  return [...trips].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  });
}

export function publicTripsFromDb(fromDb: TourismTrip[]) {
  return sortTourismTrips(fromDb.filter((trip) => trip.published));
}

export function validateTourismInput(input: Partial<TourismTripInput>) {
  const title = String(input.title ?? "").trim();
  const caption = String(input.caption ?? "").trim();
  const tripType = String(input.tripType ?? "").trim();
  const fromCity = String(input.fromCity ?? "").trim();
  const imageUrl = String(input.imageUrl ?? "").trim();
  const sortOrder = Number(input.sortOrder ?? 0);
  const published = Boolean(input.published);

  if (title.length < 2 || title.length > 80) {
    return { error: "Title must be 2–80 characters." };
  }
  if (caption.length < 4 || caption.length > 200) {
    return { error: "Caption must be 4–200 characters." };
  }
  if (tripType.length < 2 || tripType.length > 40) {
    return { error: "Trip type must be 2–40 characters." };
  }
  if (fromCity.length < 2 || fromCity.length > 40) {
    return { error: "From city must be 2–40 characters." };
  }
  if (imageUrl.length < 4 || imageUrl.length > 500) {
    return { error: "Image URL is required." };
  }
  if (!Number.isFinite(sortOrder) || sortOrder < 0 || sortOrder > 999) {
    return { error: "Sort order must be between 0 and 999." };
  }

  return {
    data: { title, caption, tripType, fromCity, imageUrl, sortOrder, published },
  };
}
