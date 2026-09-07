import { site } from "@/lib/site";

type EnquiryMail = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * Notify site inbox about a new enquiry.
 * Prefers Resend when RESEND_API_KEY is set; otherwise uses FormSubmit.co (no key).
 */
export async function sendEnquiryEmail(data: EnquiryMail): Promise<{ ok: boolean; error?: string }> {
  const to = site.email;
  const resendKey = process.env.RESEND_API_KEY?.trim();

  if (resendKey) {
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
          reply_to: data.email,
          subject: `[Pune Cabz Enquiry] ${data.subject}`,
          text: [
            `New enquiry from ${data.name}`,
            `Email: ${data.email}`,
            `Subject: ${data.subject}`,
            "",
            data.message,
          ].join("\n"),
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        return { ok: false, error: body || "Resend failed" };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Resend error" };
    }
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: `[Pune Cabz Enquiry] ${data.subject}`,
        message: data.message,
        _replyto: data.email,
        _template: "table",
        _captcha: "false",
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: body || "FormSubmit failed" };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Email error" };
  }
}
