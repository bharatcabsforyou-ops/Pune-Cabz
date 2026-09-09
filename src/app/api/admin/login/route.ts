import { NextResponse } from "next/server";

/** Password login removed — use email OTP. */
export async function POST() {
  return NextResponse.json(
    {
      error: "Password login is disabled. Use email OTP: /api/admin/login/request-otp then verify-otp.",
    },
    { status: 410 }
  );
}
