import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Booking, BookingStatus } from "@/lib/bookings";

type Row = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  from_city: string;
  to_city: string;
  travel_date: string;
  passengers: number;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
};

function mapRow(row: Row): Booking {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? "",
    fromCity: row.from_city,
    toCity: row.to_city,
    travelDate: row.travel_date,
    passengers: row.passengers,
    notes: row.notes ?? "",
    status: row.status,
    createdAt: row.created_at,
  };
}

import { isMissingTable } from "@/lib/supabase-errors";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "id, name, phone, email, from_city, to_city, travel_date, passengers, notes, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      if (isMissingTable(error.message)) {
        return NextResponse.json({ bookings: [], setupRequired: true });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ bookings: (data as Row[] | null)?.map(mapRow) ?? [] });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  let status: BookingStatus | undefined;
  try {
    const body = (await request.json()) as { id?: string; status?: BookingStatus };
    id = String(body.id ?? "");
    status = body.status;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id || !status || !["new", "confirmed", "cancelled", "completed"].includes(status)) {
    return NextResponse.json({ error: "Valid id and status required." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}
