export type TourismTrip = {
  id: string;
  title: string;
  /** Tagline / short caption on cards */
  caption: string;
  tripType: string;
  fromCity: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
  createdAt?: string;
  /** Built-in website destination — not yet a Supabase row */
  isSeed?: boolean;
  /** Links to tourist-places.ts id (e.g. lonavala) */
  placeSlug?: string;
  description?: string;
  whyCab?: string;
  fromPune?: string;
  fromMumbai?: string;
  stops?: string[];
};

export type TourismTripInput = {
  title: string;
  caption: string;
  tripType: string;
  fromCity: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
  placeSlug?: string;
  description?: string;
  whyCab?: string;
  fromPune?: string;
  fromMumbai?: string;
  stops?: string[];
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

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isPersistedTourismId(id: string) {
  return UUID_RE.test(id);
}

function tripMatchKey(trip: Pick<TourismTrip, "title" | "fromCity" | "placeSlug">) {
  if (trip.placeSlug?.trim()) {
    return `slug:${trip.placeSlug.toLowerCase().trim()}`;
  }
  return `title:${trip.fromCity}|${trip.title}`.toLowerCase().trim();
}

function enrichFromSeed(dbTrip: TourismTrip, seed?: TourismTrip): TourismTrip {
  if (!seed) return dbTrip;
  return {
    ...seed,
    ...dbTrip,
    caption: dbTrip.caption || seed.caption,
    description: dbTrip.description || seed.description,
    whyCab: dbTrip.whyCab || seed.whyCab,
    fromPune: dbTrip.fromPune || seed.fromPune,
    fromMumbai: dbTrip.fromMumbai || seed.fromMumbai,
    stops: dbTrip.stops?.length ? dbTrip.stops : seed.stops,
    placeSlug: dbTrip.placeSlug || seed.placeSlug,
    isSeed: false,
  };
}

/** DB rows win; seed destinations fill the rest. Missing DB fields filled from seeds. */
export function mergeTourismTrips(fromDb: TourismTrip[], seeds: TourismTrip[]) {
  const seedsByKey = new Map(seeds.map((s) => [tripMatchKey(s), s]));
  const seedsByTitle = new Map(
    seeds.map((s) => [`${s.fromCity}|${s.title}`.toLowerCase().trim(), s])
  );

  const mergedDb = fromDb.map((trip) => {
    const seed =
      seedsByKey.get(tripMatchKey(trip)) ||
      seedsByTitle.get(`${trip.fromCity}|${trip.title}`.toLowerCase().trim());
    return enrichFromSeed(trip, seed);
  });

  const seen = new Set(mergedDb.map(tripMatchKey));
  const titleSeen = new Set(
    mergedDb.map((t) => `${t.fromCity}|${t.title}`.toLowerCase().trim())
  );
  const extras = seeds.filter((seed) => {
    if (seen.has(tripMatchKey(seed))) return false;
    if (titleSeen.has(`${seed.fromCity}|${seed.title}`.toLowerCase().trim())) return false;
    return true;
  });
  return sortTourismTrips([...mergedDb, ...extras]);
}

function normalizeStops(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((s) => String(s).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function validateTourismInput(input: Partial<TourismTripInput>) {
  const title = String(input.title ?? "").trim();
  const caption = String(input.caption ?? "").trim();
  const tripType = String(input.tripType ?? "").trim();
  const fromCity = String(input.fromCity ?? "").trim();
  const imageUrl = String(input.imageUrl ?? "").trim();
  const sortOrder = Number(input.sortOrder ?? 0);
  const published = Boolean(input.published);
  const placeSlug = String(input.placeSlug ?? "").trim();
  const description = String(input.description ?? "").trim();
  const whyCab = String(input.whyCab ?? "").trim();
  const fromPune = String(input.fromPune ?? "").trim();
  const fromMumbai = String(input.fromMumbai ?? "").trim();
  const stops = normalizeStops(input.stops);

  if (title.length < 2 || title.length > 80) {
    return { error: "Title must be 2–80 characters." };
  }
  if (caption.length < 4 || caption.length > 300) {
    return { error: "Tagline must be 4–300 characters." };
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
  if (description.length > 4000) {
    return { error: "Description must be under 4000 characters." };
  }
  if (whyCab.length > 4000) {
    return { error: "Why cab text must be under 4000 characters." };
  }
  if (fromPune.length > 160) {
    return { error: "From Pune must be under 160 characters." };
  }
  if (fromMumbai.length > 160) {
    return { error: "From Mumbai must be under 160 characters." };
  }
  if (placeSlug.length > 80) {
    return { error: "Place slug must be under 80 characters." };
  }

  return {
    data: {
      title,
      caption,
      tripType,
      fromCity,
      imageUrl,
      sortOrder,
      published,
      placeSlug: placeSlug || undefined,
      description: description || undefined,
      whyCab: whyCab || undefined,
      fromPune: fromPune || undefined,
      fromMumbai: fromMumbai || undefined,
      stops,
    } satisfies TourismTripInput,
  };
}
