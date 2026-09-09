import { createHash, randomInt, timingSafeEqual } from "crypto";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

const OTP_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 45 * 1000;
const MAX_ATTEMPTS = 5;

type MemoryOtp = {
  codeHash: string;
  expiresAt: number;
  sentAt: number;
  attempts: number;
};

const memoryOtps = new Map<string, MemoryOtp>();

function otpSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "pune-cabz-otp-dev"
  );
}

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashOtp(email: string, code: string) {
  return createHash("sha256")
    .update(`${otpSecret()}:${normalizeAdminEmail(email)}:${code}`)
    .digest("hex");
}

function safeHashEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function generateOtpCode() {
  return String(randomInt(100000, 1000000));
}

function isMissingOtpTable(message: string) {
  const lower = message.toLowerCase();
  return (
    lower.includes("admin_otps") ||
    lower.includes("does not exist") ||
    lower.includes("schema cache")
  );
}

export async function storeAdminOtp(email: string, code: string) {
  const normalized = normalizeAdminEmail(email);
  const codeHash = hashOtp(normalized, code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();
  const sentAt = new Date().toISOString();

  if (isSupabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("admin_otps").upsert(
        {
          email: normalized,
          code_hash: codeHash,
          expires_at: expiresAt,
          sent_at: sentAt,
          attempts: 0,
        },
        { onConflict: "email" }
      );
      if (!error) return { ok: true as const };
      if (!isMissingOtpTable(error.message)) {
        return { ok: false as const, error: error.message };
      }
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Could not store OTP.",
      };
    }
  }

  memoryOtps.set(normalized, {
    codeHash,
    expiresAt: Date.now() + OTP_TTL_MS,
    sentAt: Date.now(),
    attempts: 0,
  });
  return { ok: true as const, memory: true as const };
}

export async function getOtpResendWaitMs(email: string): Promise<number> {
  const normalized = normalizeAdminEmail(email);

  if (isSupabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("admin_otps")
        .select("sent_at")
        .eq("email", normalized)
        .maybeSingle();
      if (!error && data?.sent_at) {
        const elapsed = Date.now() - new Date(data.sent_at).getTime();
        return Math.max(0, RESEND_COOLDOWN_MS - elapsed);
      }
    } catch {
      /* fall through to memory */
    }
  }

  const mem = memoryOtps.get(normalized);
  if (!mem) return 0;
  return Math.max(0, RESEND_COOLDOWN_MS - (Date.now() - mem.sentAt));
}

export async function verifyStoredOtp(email: string, code: string) {
  const normalized = normalizeAdminEmail(email);
  const clean = code.replace(/\s/g, "").trim();
  if (!/^\d{6}$/.test(clean)) {
    return { ok: false as const, error: "Enter the 6-digit code from your email." };
  }

  const expectedHash = hashOtp(normalized, clean);

  if (isSupabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("admin_otps")
        .select("code_hash, expires_at, attempts")
        .eq("email", normalized)
        .maybeSingle();

      if (!error && data) {
        if (new Date(data.expires_at).getTime() < Date.now()) {
          await supabase.from("admin_otps").delete().eq("email", normalized);
          return { ok: false as const, error: "Code expired. Request a new one." };
        }
        if ((data.attempts ?? 0) >= MAX_ATTEMPTS) {
          await supabase.from("admin_otps").delete().eq("email", normalized);
          return { ok: false as const, error: "Too many attempts. Request a new code." };
        }
        if (!safeHashEqual(data.code_hash, expectedHash)) {
          await supabase
            .from("admin_otps")
            .update({ attempts: (data.attempts ?? 0) + 1 })
            .eq("email", normalized);
          return { ok: false as const, error: "Invalid code. Check your email and try again." };
        }
        await supabase.from("admin_otps").delete().eq("email", normalized);
        return { ok: true as const, email: normalized };
      }

      if (error && !isMissingOtpTable(error.message)) {
        return { ok: false as const, error: error.message };
      }
    } catch {
      /* memory fallback */
    }
  }

  const mem = memoryOtps.get(normalized);
  if (!mem) {
    return { ok: false as const, error: "No code found. Request a new one." };
  }
  if (mem.expiresAt < Date.now()) {
    memoryOtps.delete(normalized);
    return { ok: false as const, error: "Code expired. Request a new one." };
  }
  if (mem.attempts >= MAX_ATTEMPTS) {
    memoryOtps.delete(normalized);
    return { ok: false as const, error: "Too many attempts. Request a new code." };
  }
  if (!safeHashEqual(mem.codeHash, expectedHash)) {
    mem.attempts += 1;
    memoryOtps.set(normalized, mem);
    return { ok: false as const, error: "Invalid code. Check your email and try again." };
  }
  memoryOtps.delete(normalized);
  return { ok: true as const, email: normalized };
}
