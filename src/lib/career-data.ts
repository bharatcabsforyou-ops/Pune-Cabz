import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  CAREER_SELECT_BASE,
  CAREER_SELECT_FULL,
  isMissingCareerExtraColumns,
  mapCareerRow,
  type CareerRow,
} from "@/lib/career-db";
import { getCareerSeedOpenings } from "@/lib/career-seed";
import { mergeCareerOpenings, sortCareerOpenings, type CareerOpening } from "@/lib/career";

export async function loadCareerOpenings(opts?: {
  publishedOnly?: boolean;
}): Promise<CareerOpening[]> {
  const seeds = getCareerSeedOpenings();
  const filterPublished = (list: CareerOpening[]) =>
    opts?.publishedOnly ? list.filter((o) => o.published) : list;

  if (!isSupabaseConfigured()) {
    return filterPublished(seeds);
  }

  try {
    const supabase = await createClient();
    const full = await supabase
      .from("career_openings")
      .select(CAREER_SELECT_FULL)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const result =
      full.error && isMissingCareerExtraColumns(full.error.message)
        ? await supabase
            .from("career_openings")
            .select(CAREER_SELECT_BASE)
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false })
        : full;

    if (result.error) {
      return filterPublished(seeds);
    }

    let rows = (result.data as CareerRow[] | null) ?? [];
    if (opts?.publishedOnly) {
      rows = rows.filter((r) => r.published);
    }

    const fromDb = sortCareerOpenings(rows.map(mapCareerRow));
    return filterPublished(mergeCareerOpenings(fromDb, seeds));
  } catch {
    return filterPublished(seeds);
  }
}
