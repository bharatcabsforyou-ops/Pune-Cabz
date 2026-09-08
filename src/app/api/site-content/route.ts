import { NextResponse } from "next/server";
import type { ContentOverrides } from "@/lib/admin-content-pages";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n/config";
import { createAdminClient } from "@/lib/supabase/admin";

type Row = {
  page_id: string;
  locale: string;
  fields: Record<string, unknown> | null;
};

function emptyOverrides(): ContentOverrides {
  return { en: {}, hi: {}, mr: {} };
}

function mergeNonEmpty(
  overrides: ContentOverrides,
  locale: Locale,
  fields: Record<string, unknown> | null
) {
  if (!fields || typeof fields !== "object") return;
  const bucket = (overrides[locale] ??= {});
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== "string") continue;
    if (!value.trim()) continue;
    bucket[key] = value;
  }
}

export async function GET() {
  const overrides = emptyOverrides();

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("site_content").select("page_id, locale, fields");

    if (error || !data) {
      return NextResponse.json({ overrides });
    }

    for (const row of data as Row[]) {
      if (!isLocale(row.locale)) continue;
      mergeNonEmpty(overrides, row.locale, row.fields);
    }

    for (const locale of LOCALES) {
      overrides[locale] ??= {};
    }

    return NextResponse.json({ overrides });
  } catch {
    return NextResponse.json({ overrides });
  }
}
