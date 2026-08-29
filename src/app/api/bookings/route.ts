import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { validateBookingInput } from "@/lib/bookings";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  let payload = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validated = validateBookingInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("bookings").insert({
      name: validated.data.name,
      phone: validated.data.phone,
      email: validated.data.email || null,
      from_city: validated.data.fromCity,
      to_city: validated.data.toCity,
      travel_date: validated.data.travelDate,
      passengers: validated.data.passengers,
      notes: validated.data.notes || null,
      status: "new",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
  }
}
