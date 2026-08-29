import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Enquiry, EnquiryStatus } from "@/lib/enquiries";

type Row = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
};

function mapRow(row: Row): Enquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
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
      .from("enquiries")
      .select("id, name, email, subject, message, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      if (isMissingTable(error.message)) {
        return NextResponse.json({ enquiries: [], setupRequired: true });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ enquiries: (data as Row[] | null)?.map(mapRow) ?? [] });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  let status: EnquiryStatus | undefined;
  try {
    const body = (await request.json()) as { id?: string; status?: EnquiryStatus };
    id = String(body.id ?? "");
    status = body.status;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id || !status || !["new", "read", "closed"].includes(status)) {
    return NextResponse.json({ error: "Valid id and status required." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}
