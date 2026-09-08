import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  isMissingPlaceColumns,
  mapTourismRow,
  TOURISM_SELECT_BASE,
  TOURISM_SELECT_FULL,
  type TourismRow,
} from "@/lib/tourism-db";
import { getTourismSeedTrips } from "@/lib/tourism-seed";
import { mergeTourismTrips, publicTripsFromDb, sortTourismTrips } from "@/lib/tourism";

export async function GET() {
  const seeds = getTourismSeedTrips().filter((t) => t.published);

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ trips: seeds });
  }

  try {
    const supabase = await createClient();
    const full = await supabase
      .from("tourism_trips")
      .select(TOURISM_SELECT_FULL)
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const query =
      full.error && isMissingPlaceColumns(full.error.message)
        ? await supabase
            .from("tourism_trips")
            .select(TOURISM_SELECT_BASE)
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false })
        : full;

    if (query.error) {
      return NextResponse.json({ trips: seeds });
    }

    const fromDb = publicTripsFromDb(
      sortTourismTrips((query.data as TourismRow[] | null)?.map(mapTourismRow) ?? [])
    );

    return NextResponse.json({
      trips: mergeTourismTrips(fromDb, seeds),
    });
  } catch {
    return NextResponse.json({ trips: seeds });
  }
}
