import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sortTourismTrips,
  validateTourismInput,
  type TourismTrip,
  type TourismTripInput,
} from "@/lib/tourism";

type Row = {
  id: string;
  title: string;
  caption: string;
  trip_type: string;
  from_city: string;
  image_url: string;
  sort_order: number;
  published: boolean;
  created_at: string;
};

function mapRow(row: Row): TourismTrip {
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
  };
}

function dbPayload(input: TourismTripInput) {
  return {
    title: input.title,
    caption: input.caption,
    trip_type: input.tripType,
    from_city: input.fromCity,
    image_url: input.imageUrl,
    sort_order: input.sortOrder,
    published: input.published,
  };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("tourism_trips")
      .select(
        "id, title, caption, trip_type, from_city, image_url, sort_order, published, created_at"
      )
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      trips: sortTourismTrips((data as Row[] | null)?.map(mapRow) ?? []),
    });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing." },
      { status: 503 }
    );
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
    const { data, error } = await supabase
      .from("tourism_trips")
      .insert(dbPayload(validated.data))
      .select(
        "id, title, caption, trip_type, from_city, image_url, sort_order, published, created_at"
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ trip: mapRow(data as Row) });
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
    const { data, error } = await supabase
      .from("tourism_trips")
      .update(dbPayload(validated.data))
      .eq("id", id)
      .select(
        "id, title, caption, trip_type, from_city, image_url, sort_order, published, created_at"
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ trip: mapRow(data as Row) });
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
