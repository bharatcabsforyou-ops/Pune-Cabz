import { NextResponse } from "next/server";
import { adminCookieName, adminCookieOptions, adminEmailCookieName } from "@/lib/admin-auth";

const clear = { ...adminCookieOptions(), maxAge: 0 };

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), "", clear);
  res.cookies.set(adminEmailCookieName(), "", clear);
  return res;
}
