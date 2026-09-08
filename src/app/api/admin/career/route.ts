import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  CAREER_SELECT_BASE,
  CAREER_SELECT_FULL,
  careerDbPayload,
  isMissingCareerExtraColumns,
  isMissingCareerTable,
  mapCareerRow,
  type CareerRow,
} from "@/lib/career-db";
import { getCareerSeedOpenings } from "@/lib/career-seed";
import {
  isPersistedCareerId,
  mergeCareerOpenings,
  sortCareerOpenings,
  validateCareerOpeningInput,
  type CareerOpeningInput,
} from "@/lib/career";

async function fetchAdminOpenings(supabase: ReturnType<typeof createAdminClient>) {
  const full = await supabase
    .from("career_openings")
    .select(CAREER_SELECT_FULL)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (full.error && isMissingCareerExtraColumns(full.error.message)) {
    return supabase
      .from("career_openings")
      .select(CAREER_SELECT_BASE)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
  }

  return full;
}

async function writeOpening(
  supabase: ReturnType<typeof createAdminClient>,
  mode: "insert" | "update",
  input: CareerOpeningInput,
  id?: string
) {
  let includeExtras = true;
  let payload = careerDbPayload(input, true);
  let select = CAREER_SELECT_FULL;

  let result =
    mode === "insert"
      ? await supabase.from("career_openings").insert(payload).select(select).single()
      : await supabase
          .from("career_openings")
          .update(payload)
          .eq("id", id!)
          .select(select)
          .single();

  if (result.error && isMissingCareerExtraColumns(result.error.message)) {
    includeExtras = false;
    payload = careerDbPayload(input, false);
    select = CAREER_SELECT_BASE;
    result =
      mode === "insert"
        ? await supabase.from("career_openings").insert(payload).select(select).single()
        : await supabase
            .from("career_openings")
            .update(payload)
            .eq("id", id!)
            .select(select)
            .single();
  }

  return { result, includeExtras };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await fetchAdminOpenings(supabase);

    if (error) {
      return NextResponse.json({
        openings: getCareerSeedOpenings(),
        error: error.message,
        setupRequired: isMissingCareerTable(error.message),
      });
    }

    return NextResponse.json({
      openings: mergeCareerOpenings(
        sortCareerOpenings((data as CareerRow[] | null)?.map(mapCareerRow) ?? []),
        getCareerSeedOpenings()
      ),
    });
  } catch {
    return NextResponse.json({
      openings: getCareerSeedOpenings(),
      error: "Supabase service role key is missing — showing sample careers.",
      setupRequired: true,
    });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: Partial<CareerOpeningInput> = {};
  try {
    payload = (await request.json()) as Partial<CareerOpeningInput>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validated = validateCareerOpeningInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { result } = await writeOpening(supabase, "insert", validated.data);

    if (result.error) {
      return NextResponse.json(
        {
          error: result.error.message,
          setupRequired: isMissingCareerTable(result.error.message),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ opening: mapCareerRow(result.data as unknown as CareerRow) });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing.", setupRequired: true },
      { status: 503 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  let payload: Partial<CareerOpeningInput> = {};
  try {
    const body = (await request.json()) as { id?: string } & Partial<CareerOpeningInput>;
    id = String(body.id ?? "");
    payload = body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Opening id is required." }, { status: 400 });
  }

  const validated = validateCareerOpeningInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();

    if (!isPersistedCareerId(id)) {
      const { result } = await writeOpening(supabase, "insert", validated.data);
      if (result.error) {
        return NextResponse.json(
          {
            error: result.error.message,
            setupRequired: isMissingCareerTable(result.error.message),
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ opening: mapCareerRow(result.data as unknown as CareerRow) });
    }

    const { result } = await writeOpening(supabase, "update", validated.data, id);
    if (result.error) {
      return NextResponse.json(
        {
          error: result.error.message,
          setupRequired: isMissingCareerTable(result.error.message),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ opening: mapCareerRow(result.data as unknown as CareerRow) });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing.", setupRequired: true },
      { status: 503 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  try {
    const body = (await request.json()) as { id?: string };
    id = String(body.id ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Opening id is required." }, { status: 400 });
  }

  if (!isPersistedCareerId(id)) {
    return NextResponse.json(
      {
        error:
          "Built-in sample roles can’t be deleted. Edit & save to store a copy, then manage that row.",
      },
      { status: 400 }
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("career_openings").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing.", setupRequired: true },
      { status: 503 }
    );
  }
}
