import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  buildSiteSettings,
  defaultSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings";

type Row = {
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  address: string;
  address_line: string;
  city: string;
};

function rowToSettings(row: Row): SiteSettings {
  return buildSiteSettings({
    phone: row.phone,
    email: row.email,
    whatsapp: row.whatsapp,
    instagram: row.instagram,
    address: row.address,
    addressLine: row.address_line,
    city: row.city,
  });
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", "main").maybeSingle();

    if (error) {
      const missing = error.message.toLowerCase().includes("site_settings");
      return NextResponse.json({
        settings: defaultSiteSettings(),
        setupRequired: missing,
        error: missing ? undefined : error.message,
      });
    }

    if (!data) {
      return NextResponse.json({ settings: defaultSiteSettings(), setupRequired: true });
    }

    return NextResponse.json({ settings: rowToSettings(data as Row) });
  } catch {
    return NextResponse.json(
      { settings: defaultSiteSettings(), setupRequired: true, error: "Supabase not configured." },
      { status: 503 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: Partial<SiteSettings> = {};
  try {
    body = (await request.json()) as Partial<SiteSettings>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const settings = buildSiteSettings(body);

  try {
    const supabase = createAdminClient();
    const payload = {
      id: "main",
      phone: settings.phone,
      email: settings.email,
      whatsapp: settings.whatsapp,
      instagram: settings.instagram,
      address: settings.address,
      address_line: settings.addressLine,
      city: settings.city,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("site_settings")
      .upsert(payload, { onConflict: "id" })
      .select("*")
      .single();

    if (error) {
      const missing = error.message.toLowerCase().includes("site_settings");
      return NextResponse.json(
        {
          error: missing
            ? "Run supabase/site_settings.sql in Supabase, then save again."
            : error.message,
          setupRequired: missing,
        },
        { status: missing ? 503 : 500 }
      );
    }

    return NextResponse.json({ settings: rowToSettings(data as Row) });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}
