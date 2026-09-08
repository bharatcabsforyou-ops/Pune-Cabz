import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTourismSeedTrips } from "@/lib/tourism-seed";
import {
  isMissingPlaceColumns,
  mapTourismRow,
  tourismDbPayload,
  TOURISM_SELECT_BASE,
  TOURISM_SELECT_FULL,
  type TourismRow,
} from "@/lib/tourism-db";
import {
  isPersistedTourismId,
  mergeTourismTrips,
  sortTourismTrips,
  validateTourismInput,
  type TourismTripInput,
} from "@/lib/tourism";

async function fetchAdminTrips(supabase: ReturnType<typeof createAdminClient>) {
  const full = await supabase
    .from("tourism_trips")
    .select(TOURISM_SELECT_FULL)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (full.error && isMissingPlaceColumns(full.error.message)) {
    return supabase
      .from("tourism_trips")
      .select(TOURISM_SELECT_BASE)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
  }

  return full;
}

async function writeTrip(
  supabase: ReturnType<typeof createAdminClient>,
  mode: "insert" | "update",
  input: TourismTripInput,
  id?: string
) {
  let includePlace = true;
  let payload = tourismDbPayload(input, true);

  let result =
    mode === "insert"
      ? await supabase.from("tourism_trips").insert(payload).select(TOURISM_SELECT_FULL).single()
      : await supabase
          .from("tourism_trips")
          .update(payload)
          .eq("id", id!)
          .select(TOURISM_SELECT_FULL)
          .single();

  if (result.error && isMissingPlaceColumns(result.error.message)) {
    includePlace = false;
    payload = tourismDbPayload(input, false);
    result =
      mode === "insert"
        ? await supabase.from("tourism_trips").insert(payload).select(TOURISM_SELECT_BASE).single()
        : await supabase
            .from("tourism_trips")
            .update(payload)
            .eq("id", id!)
            .select(TOURISM_SELECT_BASE)
            .single();
  }

  return { result, includePlace };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await fetchAdminTrips(supabase);

    if (error) {
      return NextResponse.json({
        trips: getTourismSeedTrips(),
        error: error.message,
        setupRequired: true,
      });
    }

    return NextResponse.json({
      trips: mergeTourismTrips(
        sortTourismTrips((data as TourismRow[] | null)?.map(mapTourismRow) ?? []),
        getTourismSeedTrips()
      ),
    });
  } catch {
    return NextResponse.json({
      trips: getTourismSeedTrips(),
      error: "Supabase service role key is missing — showing built-in destinations.",
    });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: Partial<TourismTripInput> = {};
  try {
    payload = (await request.json()) as Partial<TourismTripInput>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validated = validateTourismInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { result } = await writeTrip(supabase, "insert", validated.data);

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ trip: mapTourismRow(result.data as TourismRow) });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing." },
      { status: 503 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  let payload: Partial<TourismTripInput> = {};
  try {
    const body = (await request.json()) as { id?: string } & Partial<TourismTripInput>;
    id = String(body.id ?? "");
    payload = body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Trip id is required." }, { status: 400 });
  }

  const validated = validateTourismInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();

    if (!isPersistedTourismId(id)) {
      const { result } = await writeTrip(supabase, "insert", validated.data);
      if (result.error) {
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }
      return NextResponse.json({ trip: mapTourismRow(result.data as TourismRow) });
    }

    const { result } = await writeTrip(supabase, "update", validated.data, id);
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ trip: mapTourismRow(result.data as TourismRow) });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing." },
      { status: 503 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  try {
    const body = (await request.json()) as { id?: string };
    id = String(body.id ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Trip id is required." }, { status: 400 });
  }

  if (!isPersistedTourismId(id)) {
    return NextResponse.json(
      {
        error:
          "Built-in destinations can’t be deleted. Edit & save to store a copy, then manage that row.",
      },
      { status: 400 }
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("tourism_trips").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing." },
      { status: 503 }
    );
  }
}
