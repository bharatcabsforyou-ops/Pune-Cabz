#!/usr/bin/env node
/**
 * Creates/updates the default admin in Supabase.
 * Run after supabase/admin_users.sql (table must exist).
 *
 * Usage: node scripts/seed-admin.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { scryptSync, randomBytes } from "crypto";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_PATH = resolve(ROOT, ".env.local");

const ADMIN_EMAIL = "yesr01164@gmail.com";
const ADMIN_PASSWORD = "Gafru@786";

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

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const env = loadEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required in .env.local");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const passwordHash = hashPassword(ADMIN_PASSWORD);
  const { data, error } = await supabase
    .from("admin_users")
    .upsert({ email: ADMIN_EMAIL.toLowerCase(), password_hash: passwordHash }, { onConflict: "email" })
    .select("email")
    .single();

  if (error) {
    console.error("Failed:", error.message);
    console.error("\nRun supabase/admin_users.sql in the Supabase SQL editor first.");
    process.exit(1);
  }

  console.log("Admin ready:", data.email);
  console.log("Login at /admin with your email and password.");
}

main();
