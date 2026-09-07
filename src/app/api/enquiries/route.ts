import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { validateEnquiryInput } from "@/lib/enquiries";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

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

  const validated = validateEnquiryInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("enquiries").insert({
      name: validated.data.name,
      email: validated.data.email,
      subject: validated.data.subject,
      message: validated.data.message,
      status: "new",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Best-effort email to site inbox (does not block save success)
    const mail = await sendEnquiryEmail(validated.data);
    if (!mail.ok) {
      console.error("[enquiries] email notify failed:", mail.error);
    }

    return NextResponse.json({ ok: true, emailed: mail.ok });
  } catch {
    return NextResponse.json({ error: "Could not save enquiry." }, { status: 500 });
  }
}
