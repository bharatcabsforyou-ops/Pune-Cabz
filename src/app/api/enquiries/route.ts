import { NextResponse } from "next/server";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { validateEnquiryInput } from "@/lib/enquiries";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

async function getWriteClient() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient();
  }
  return createClient();
}

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
    const supabase = await getWriteClient();
    const { error } = await supabase.from("enquiries").insert({
      name: validated.data.name,
      email: validated.data.email,
      subject: validated.data.subject,
      message: validated.data.message,
      status: "new",
    });

    if (error) {
      console.error("[enquiries] insert failed:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mail = await sendEnquiryEmail(validated.data);
    if (!mail.ok) {
      console.error("[enquiries] email notify failed:", mail.error);
    }

    return NextResponse.json({ ok: true, emailed: mail.ok });
  } catch (err) {
    console.error("[enquiries] save error:", err);
    return NextResponse.json({ error: "Could not save enquiry." }, { status: 500 });
  }
}
