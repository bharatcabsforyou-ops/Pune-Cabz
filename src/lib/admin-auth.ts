import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { normalizeAdminEmail } from "@/lib/admin-otp";

const COOKIE_TOKEN = "pc_admin";
const COOKIE_EMAIL = "pc_admin_email";

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSWORD ||
    ""
  );
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  };
}

export function adminCookieName() {
  return COOKIE_TOKEN;
}

export function adminEmailCookieName() {
  return COOKIE_EMAIL;
}

export function makeAdminToken(email: string) {
  const secret = sessionSecret();
  const normalized = normalizeAdminEmail(email);
  if (!secret || !normalized) return null;
  return createHmac("sha256", secret).update(`pune-cabz-admin:${normalized}`).digest("hex");
}

export function adminConfigured() {
  return isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Email must be in admin_users or match ADMIN_EMAIL env allowlist. */
export async function isAllowedAdminEmail(email: string) {
  const normalized = normalizeAdminEmail(email);
  if (!normalized || !normalized.includes("@")) return false;

  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (envEmail && safeEqual(normalized, envEmail)) {
    return true;
  }

  if (isSupabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", normalized)
        .maybeSingle();

      if (error) {
        console.error("[admin otp] allowlist error:", error.message);
      }
      if (data?.email) return true;
    } catch (err) {
      console.error("[admin otp] allowlist client error:", err);
    }
  }

  return false;
}

export function isAdminRequest(request: NextRequest) {
  const email = request.cookies.get(COOKIE_EMAIL)?.value;
  const got = request.cookies.get(COOKIE_TOKEN)?.value;
  if (!email || !got) return false;

  const expected = makeAdminToken(email);
  if (!expected) return false;
  return safeEqual(got, expected);
}
