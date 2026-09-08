import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { isContentPageId } from "@/lib/admin-content-pages";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createAdminClient } from "@/lib/supabase/admin";

type Row = {
  page_id: string;
  locale: string;
  fields: Record<string, string>;
  updated_at?: string;
};

function isMissingTable(message: string) {
  const lower = message.toLowerCase();
  return lower.includes("site_content") || lower.includes("does not exist") || lower.includes("schema cache");
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const page = request.nextUrl.searchParams.get("page")?.trim() ?? "";
  if (!isContentPageId(page)) {
    return NextResponse.json({ error: "Invalid page." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("page_id, locale, fields, updated_at")
      .eq("page_id", page);

    if (error) {
      const missing = isMissingTable(error.message);
      return NextResponse.json({
        page,
        rows: [] as Row[],
        setupRequired: missing,
        error: missing ? undefined : error.message,
      });
    }

    return NextResponse.json({ page, rows: (data ?? []) as Row[] });
  } catch {
    return NextResponse.json(
      { page, rows: [], setupRequired: true, error: "Supabase not configured." },
      { status: 503 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const page = request.nextUrl.searchParams.get("page")?.trim() ?? "";
  if (!isContentPageId(page)) {
    return NextResponse.json({ error: "Invalid page." }, { status: 400 });
  }

  let body: { locale?: string; fields?: Record<string, string> } = {};
  try {
    body = (await request.json()) as { locale?: string; fields?: Record<string, string> };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const locale = body.locale?.trim() ?? "";
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale." }, { status: 400 });
  }

  const fieldsIn = body.fields && typeof body.fields === "object" ? body.fields : {};
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(fieldsIn)) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    fields[key] = value;
  }

  try {
    const supabase = createAdminClient();
    const payload = {
      page_id: page,
      locale: locale as Locale,
      fields,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("site_content")
      .upsert(payload, { onConflict: "page_id,locale" })
      .select("page_id, locale, fields, updated_at")
      .single();

    if (error) {
      const missing = isMissingTable(error.message);
      return NextResponse.json(
        {
          error: missing
            ? "Run supabase/site_content.sql in Supabase, then save again."
            : error.message,
          setupRequired: missing,
        },
        { status: missing ? 503 : 500 }
      );
    }

    return NextResponse.json({ row: data as Row });
  } catch {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 503 });
  }
}
