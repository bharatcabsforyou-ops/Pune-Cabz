import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", "main").maybeSingle();
    if (error || !data) {
      return NextResponse.json({ settings: defaultSiteSettings() });
    }
    return NextResponse.json({ settings: rowToSettings(data as Row) });
  } catch {
    return NextResponse.json({ settings: defaultSiteSettings() });
  }
}
