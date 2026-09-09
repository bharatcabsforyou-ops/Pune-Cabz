#!/usr/bin/env node
/**
 * Creates/updates the default admin email allowlist in Supabase.
 * Run after supabase/admin_users.sql (and optionally supabase/admin_otps.sql).
 *
 * Usage: node scripts/seed-admin.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_PATH = resolve(ROOT, ".env.local");

const ADMIN_EMAIL = "yesr01164@gmail.com";

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

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("admin_users")
    .upsert({ email: ADMIN_EMAIL.toLowerCase(), password_hash: null }, { onConflict: "email" })
    .select("email")
    .single();

  if (error) {
    // Older schema may still require password_hash — insert with placeholder hash
    const { data: retry, error: retryError } = await supabase
      .from("admin_users")
      .upsert(
        {
          email: ADMIN_EMAIL.toLowerCase(),
          password_hash: "otp-only",
        },
        { onConflict: "email" }
      )
      .select("email")
      .single();

    if (retryError) {
      console.error("Failed:", error.message, "/", retryError.message);
      console.error("\nRun supabase/admin_users.sql then supabase/admin_otps.sql first.");
      process.exit(1);
    }
    console.log("Admin ready:", retry.email);
  } else {
    console.log("Admin ready:", data.email);
  }

  console.log("Login at /admin with email + OTP (no password).");
  console.log("Set RESEND_API_KEY to receive codes by email.");
}

main();
