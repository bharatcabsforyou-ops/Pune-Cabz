import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";
import { routeSearchAdminMessage } from "@/lib/whatsapp-booking";
import { validateRouteInquiryInput } from "@/lib/route-inquiries";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, logged: false });
  }

  let payload = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validated = validateRouteInquiryInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const { fromCity, toCity, travelDate, passengers } = validated.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("enquiries").insert({
      name: "Route Search",
      email: site.email,
      subject: `Route: ${fromCity} → ${toCity}`,
      message: routeSearchAdminMessage({ fromCity, toCity, travelDate, passengers }),
      status: "new",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, logged: true });
  } catch {
    return NextResponse.json({ error: "Could not log route search." }, { status: 500 });
  }
}
