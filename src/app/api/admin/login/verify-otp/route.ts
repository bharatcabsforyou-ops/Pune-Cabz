import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  adminEmailCookieName,
  isAllowedAdminEmail,
  makeAdminToken,
} from "@/lib/admin-auth";
import { normalizeAdminEmail, verifyStoredOtp } from "@/lib/admin-otp";

export async function POST(request: NextRequest) {
  let email = "";
  let otp = "";
  try {
    const body = (await request.json()) as { email?: string; otp?: string; code?: string };
    email = normalizeAdminEmail(String(body.email ?? ""));
    otp = String(body.otp ?? body.code ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!(await isAllowedAdminEmail(email))) {
    return NextResponse.json({ error: "Invalid email or code." }, { status: 401 });
  }

  const verified = await verifyStoredOtp(email, otp);
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: 401 });
  }

  const token = makeAdminToken(verified.email);
  if (!token) {
    return NextResponse.json({ error: "Admin session is not configured." }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), token, adminCookieOptions());
  res.cookies.set(adminEmailCookieName(), verified.email, adminCookieOptions());
  return res;
}
