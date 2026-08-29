#!/usr/bin/env node
/**
 * Seeds the 5 default Book your cars routes into Supabase.
 * Skips routes that already exist (same from + to cities).
 *
 * Usage: npm run seed:routes
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_PATH = resolve(ROOT, ".env.local");
const ROUTES_PATH = resolve(ROOT, "src/data/default-routes.json");

function loadEnv() {
  if (!existsSync(ENV_PATH)) {
    console.error("Missing .env.local — add Supabase URL and service role key first.");
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
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required in .env.local");
    process.exit(1);
  }

  const routes = JSON.parse(readFileSync(ROUTES_PATH, "utf8"));
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: existing, error: listError } = await supabase
    .from("popular_routes")
    .select("from_city, to_city");

  if (listError) {
    console.error("Failed to read routes:", listError.message);
    console.error("\nRun supabase/popular_routes.sql in the Supabase SQL editor first.");
    process.exit(1);
  }

  const existingKeys = new Set(
    (existing ?? []).map((r) => `${r.from_city.toLowerCase()}|${r.to_city.toLowerCase()}`)
  );

  let added = 0;
  let skipped = 0;

  for (const route of routes) {
    const key = `${route.fromCity.toLowerCase()}|${route.toCity.toLowerCase()}`;
    if (existingKeys.has(key)) {
      skipped += 1;
      continue;
    }

    const payload = {
      from_city: route.fromCity,
      to_city: route.toCity,
      duration: route.duration,
      from_price: route.fromPrice,
      tag: route.tag,
      image_url: route.imageUrl,
      sort_order: route.sortOrder,
      published: route.published,
    };

    let { error } = await supabase.from("popular_routes").insert(payload);

    if (error?.message?.includes("image_url")) {
      const { image_url: _removed, ...base } = payload;
      ({ error } = await supabase.from("popular_routes").insert(base));
    }

    if (error) {
      console.error(`Failed to add ${route.fromCity} → ${route.toCity}:`, error.message);
      continue;
    }

    existingKeys.add(key);
    added += 1;
    console.log(`Added: ${route.fromCity} → ${route.toCity}`);
  }

  console.log(`\nDone. Added ${added}, skipped ${skipped} (already in database).`);
  console.log("Routes show on /book when published.");
}

main();
