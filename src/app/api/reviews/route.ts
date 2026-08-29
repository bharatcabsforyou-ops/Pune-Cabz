import { NextResponse } from "next/server";
import type { Review } from "@/lib/reviews";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type Row = {
  id: string;
  name: string;
  city: string;
  rating: number;
  route: string | null;
  body: string;
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
    status: "approved",
  };
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ reviews: [] });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, city, rating, route, body, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(12);

    if (error) {
      return NextResponse.json({ reviews: [] });
    }

    return NextResponse.json({ reviews: (data as Row[] | null)?.map(mapRow) ?? [] });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Reviews are not connected yet. Try WhatsApp instead." },
      { status: 503 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const city = String(body.city ?? "").trim();
  const route = String(body.route ?? "").trim();
  const text = String(body.text ?? "").trim();
  const rating = Number(body.rating);

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (city.length < 2 || city.length > 60) {
    return NextResponse.json({ error: "Please enter your city." }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Please choose a rating." }, { status: 400 });
  }
  if (text.length < 24 || text.length > 500) {
    return NextResponse.json(
      { error: "Write a short review (at least 24 characters)." },
      { status: 400 }
    );
  }
  if (route.length > 80) {
    return NextResponse.json({ error: "Route is too long." }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("reviews").insert({
      name,
      city,
      rating,
      route: route || null,
      body: text,
      status: "pending",
    });

    if (error) {
      return NextResponse.json(
        { error: "Could not send your review. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send your review. Try again." },
      { status: 500 }
    );
  }
}
