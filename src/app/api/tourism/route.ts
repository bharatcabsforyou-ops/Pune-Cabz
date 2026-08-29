import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { sortTourismTrips, type TourismTrip } from "@/lib/tourism";

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

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ trips: [] });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tourism_trips")
      .select(
        "id, title, caption, trip_type, from_city, image_url, sort_order, published, created_at"
      )
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ trips: [] });
    }

    return NextResponse.json({
      trips: sortTourismTrips((data as Row[] | null)?.map(mapRow) ?? []),
    });
  } catch {
    return NextResponse.json({ trips: [] });
  }
}
