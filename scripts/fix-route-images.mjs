#!/usr/bin/env node
/**
 * Sets a different image for each default route (image1–image5).
 * Requires image_url column — run supabase/popular_routes_migration.sql first if needed.
 *
 * Usage: npm run fix:route-images
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_PATH = resolve(ROOT, ".env.local");
const ROUTES_PATH = resolve(ROOT, "src/data/default-routes.json");

function loadEnv() {
  if (!existsSync(ENV_PATH)) {
    console.error("Missing .env.local");
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(ENV_PATH, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    env[trimmed.slice(0, i)] = trimmed.slice(i + 1);
  }
  return env;
}

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const defaults = JSON.parse(readFileSync(ROUTES_PATH, "utf8"));

  const probe = await supabase.from("popular_routes").select("image_url").limit(1);
  if (probe.error?.message?.includes("image_url")) {
    console.error("Column image_url is missing.");
    console.error("Run supabase/popular_routes_migration.sql in Supabase SQL editor, then run this again.");
    process.exit(1);
  }

  const { data: rows, error: listError } = await supabase
    .from("popular_routes")
    .select("id, from_city, to_city");

  if (listError) {
    console.error("Failed to list routes:", listError.message);
    process.exit(1);
  }

  let updated = 0;
  for (const row of rows ?? []) {
    const match = defaults.find(
      (d) =>
        d.fromCity.toLowerCase() === row.from_city.toLowerCase() &&
        d.toCity.toLowerCase() === row.to_city.toLowerCase()
    );
    if (!match) continue;

    const { error } = await supabase
      .from("popular_routes")
      .update({ image_url: match.imageUrl })
      .eq("id", row.id);

    if (error) {
      console.error(`Failed ${row.from_city} → ${row.to_city}:`, error.message);
      continue;
    }

    updated += 1;
    console.log(`${row.from_city} → ${row.to_city} → ${match.imageUrl}`);
  }

  console.log(`\nUpdated ${updated} route image(s).`);
}

main();
