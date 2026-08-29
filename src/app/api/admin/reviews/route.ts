import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Review, ReviewStatus } from "@/lib/reviews";

type Row = {
  id: string;
  name: string;
  city: string;
  rating: number;
  route: string | null;
  body: string;
  status: ReviewStatus;
  created_at: string;
};

function mapRow(row: Row): Review {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    rating: row.rating,
    route: row.route ?? "",
    text: row.body,
    date: row.created_at.slice(0, 10),
    status: row.status,
  };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, city, rating, route, body, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reviews: (data as Row[] | null)?.map(mapRow) ?? [] });
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
  let status: ReviewStatus | "" = "";
  try {
    const body = (await request.json()) as { id?: string; status?: ReviewStatus };
    id = String(body.id ?? "");
    status = body.status ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id || !["approved", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "Invalid review update." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);

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
