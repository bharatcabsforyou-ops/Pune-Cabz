import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  isMissingImageColumn,
  mapPopularRouteRow,
  popularRouteDbPayload,
  ROUTE_SELECT_BASE,
  ROUTE_SELECT_WITH_IMAGE,
} from "@/lib/popular-routes-db";
import {
  sortPopularRoutes,
  validatePopularRouteInput,
  type PopularRouteInput,
} from "@/lib/popular-routes";

async function fetchAdminRoutes(supabase: ReturnType<typeof createAdminClient>) {
  const withImage = await supabase
    .from("popular_routes")
    .select(ROUTE_SELECT_WITH_IMAGE)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (withImage.error && isMissingImageColumn(withImage.error.message)) {
    return supabase
      .from("popular_routes")
      .select(ROUTE_SELECT_BASE)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
  }

  return withImage;
}

async function writeRoute(
  supabase: ReturnType<typeof createAdminClient>,
  mode: "insert" | "update",
  input: PopularRouteInput,
  id?: string
) {
  let includeImage = true;
  let payload = popularRouteDbPayload(input, true);

  let result =
    mode === "insert"
      ? await supabase.from("popular_routes").insert(payload).select(ROUTE_SELECT_WITH_IMAGE).single()
      : await supabase
          .from("popular_routes")
          .update(payload)
          .eq("id", id!)
          .select(ROUTE_SELECT_WITH_IMAGE)
          .single();

  if (result.error && isMissingImageColumn(result.error.message)) {
    includeImage = false;
    payload = popularRouteDbPayload(input, false);
    result =
      mode === "insert"
        ? await supabase.from("popular_routes").insert(payload).select(ROUTE_SELECT_BASE).single()
        : await supabase
            .from("popular_routes")
            .update(payload)
            .eq("id", id!)
            .select(ROUTE_SELECT_BASE)
            .single();
  }

  return { result, includeImage };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await fetchAdminRoutes(supabase);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      routes: sortPopularRoutes(data?.map(mapPopularRouteRow) ?? []),
    });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: Partial<PopularRouteInput> = {};
  try {
    payload = (await request.json()) as Partial<PopularRouteInput>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validated = validatePopularRouteInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { result } = await writeRoute(supabase, "insert", validated.data);

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ route: mapPopularRouteRow(result.data) });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  let payload: Partial<PopularRouteInput> = {};
  try {
    const body = (await request.json()) as { id?: string } & Partial<PopularRouteInput>;
    id = String(body.id ?? "");
    payload = body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Route id is required." }, { status: 400 });
  }

  const validated = validatePopularRouteInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { result } = await writeRoute(supabase, "update", validated.data, id);

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ route: mapPopularRouteRow(result.data) });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
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
    return NextResponse.json({ error: "Route id is required." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("popular_routes").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}
