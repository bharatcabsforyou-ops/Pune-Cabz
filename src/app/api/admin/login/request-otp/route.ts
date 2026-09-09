import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAllowedAdminEmail } from "@/lib/admin-auth";
import {
  generateOtpCode,
  getOtpResendWaitMs,
  normalizeAdminEmail,
  storeAdminOtp,
} from "@/lib/admin-otp";
import { sendAdminOtpEmail } from "@/lib/send-admin-otp-email";

export async function POST(request: NextRequest) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = normalizeAdminEmail(String(body.email ?? ""));
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const allowed = await isAllowedAdminEmail(email);
  // Same response whether allowed or not — avoid email enumeration
  if (!allowed) {
    return NextResponse.json({
      ok: true,
      message: "If this email is registered, a login code was sent.",
    });
  }

  const waitMs = await getOtpResendWaitMs(email);
  if (waitMs > 0) {
    return NextResponse.json(
      {
        error: `Please wait ${Math.ceil(waitMs / 1000)}s before requesting another code.`,
        waitSeconds: Math.ceil(waitMs / 1000),
      },
      { status: 429 }
    );
  }

  const code = generateOtpCode();
  const stored = await storeAdminOtp(email, code);
  if (!stored.ok) {
    return NextResponse.json(
      { error: stored.error || "Could not create login code." },
      { status: 500 }
    );
  }

  const mailed = await sendAdminOtpEmail(email, code);
  if (!mailed.ok) {
    return NextResponse.json(
      { error: mailed.error || "Could not send login code." },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: mailed.delivered
      ? "Login code sent to your email."
      : "Login code ready (check server console in development).",
    // Only expose code in local/dev when email was not delivered
    ...(process.env.NODE_ENV !== "production" && !mailed.delivered ? { debugOtp: code } : {}),
  });
}
