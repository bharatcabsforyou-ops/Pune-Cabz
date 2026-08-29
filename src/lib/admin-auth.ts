import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { verifyPassword } from "@/lib/admin-password";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

const COOKIE_TOKEN = "pc_admin";
const COOKIE_EMAIL = "pc_admin_email";

function sessionSecret() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_SESSION_SECRET ||
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

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
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
  const normalized = normalizeEmail(email);
  if (!secret || !normalized) return null;
  return createHmac("sha256", secret).update(`pune-cabz-admin:${normalized}`).digest("hex");
}

export function adminConfigured() {
  return isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function envCredentialsMatch(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedEmail || !expectedPassword) return false;
  return (
    safeEqual(normalizeEmail(email), expectedEmail) &&
    safeEqual(password.trim(), expectedPassword)
  );
}

export async function verifyAdminLogin(email: string, password: string) {
  const normalized = normalizeEmail(email);
  const cleanPassword = password.trim();
  if (!normalized || !cleanPassword) return null;

  if (isSupabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("admin_users")
        .select("email, password_hash")
        .eq("email", normalized)
        .maybeSingle();

      if (error) {
        console.error("[admin login] Supabase error:", error.message);
      }

      if (data && verifyPassword(cleanPassword, data.password_hash)) {
        return normalized;
      }
    } catch (err) {
      console.error("[admin login] Supabase client error:", err);
    }
  }

  if (envCredentialsMatch(normalized, cleanPassword)) {
    return normalized;
  }

  return null;
}

export function isAdminRequest(request: NextRequest) {
  const email = request.cookies.get(COOKIE_EMAIL)?.value;
  const got = request.cookies.get(COOKIE_TOKEN)?.value;
  if (!email || !got) return false;

  const expected = makeAdminToken(email);
  if (!expected) return false;
  return safeEqual(got, expected);
}
