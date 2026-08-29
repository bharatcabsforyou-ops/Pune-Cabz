import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  isMissingImageColumn,
  mapPopularRouteRow,
  ROUTE_SELECT_BASE,
  ROUTE_SELECT_WITH_IMAGE,
} from "@/lib/popular-routes-db";
import { sortPopularRoutes } from "@/lib/popular-routes";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ routes: [] });
  }

  try {
    const supabase = await createClient();
    const withImage = await supabase
      .from("popular_routes")
      .select(ROUTE_SELECT_WITH_IMAGE)
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const result =
      withImage.error && isMissingImageColumn(withImage.error.message)
        ? await supabase
            .from("popular_routes")
            .select(ROUTE_SELECT_BASE)
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false })
        : withImage;

    if (result.error) {
      return NextResponse.json({ routes: [] });
    }

    return NextResponse.json({
      routes: sortPopularRoutes(result.data?.map(mapPopularRouteRow) ?? []),
    });
  } catch {
    return NextResponse.json({ routes: [] });
  }
}
