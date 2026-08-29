import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  adminEmailCookieName,
  makeAdminToken,
  verifyAdminLogin,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = String(body.email ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const authedEmail = await verifyAdminLogin(email, password);
  if (!authedEmail) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = makeAdminToken(authedEmail);
  if (!token) {
    return NextResponse.json({ error: "Admin session is not configured." }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), token, adminCookieOptions());
  res.cookies.set(adminEmailCookieName(), authedEmail, adminCookieOptions());
  return res;
}
