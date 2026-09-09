/**
 * Send admin login OTP via Resend.
 * In development without RESEND_API_KEY, OTP is logged server-side (not emailed).
 */
export async function sendAdminOtpEmail(
  email: string,
  code: string
): Promise<{ ok: boolean; error?: string; delivered: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const to = email.trim().toLowerCase();

  if (!resendKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[admin-otp] DEV code for ${to}: ${code}`);
      return { ok: true, delivered: false };
    }
    return {
      ok: false,
      delivered: false,
      error: "Email is not configured. Set RESEND_API_KEY to send OTP codes.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL?.trim() || "Pune Cabz <onboarding@resend.dev>",
        to: [to],
        subject: `${code} is your Pune Cabz admin login code`,
        text: [
          "Your Pune Cabz admin login code:",
          "",
          code,
          "",
          "This code expires in 10 minutes.",
          "If you did not request this, you can ignore this email.",
        ].join("\n"),
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:420px;margin:0 auto;padding:24px;color:#1a0a0c">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#dc1f26;font-weight:700">Pune Cabz Admin</p>
            <h1 style="margin:0 0 16px;font-size:22px">Your login code</h1>
            <p style="margin:0 0 20px;font-size:48px;font-weight:800;letter-spacing:0.2em;color:#1a0a0c">${code}</p>
            <p style="margin:0;font-size:14px;color:#666">Expires in 10 minutes. If you did not request this, ignore this email.</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, delivered: false, error: body || "Resend failed" };
    }
    return { ok: true, delivered: true };
  } catch (err) {
    return {
      ok: false,
      delivered: false,
      error: err instanceof Error ? err.message : "Email error",
    };
  }
}
