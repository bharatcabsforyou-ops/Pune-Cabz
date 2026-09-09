"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, KeyRound, Mail, Shield } from "lucide-react";
import Container from "@/components/Container";

export default function AdminLogin({
  onRequestOtp,
  onVerifyOtp,
  error,
}: {
  onRequestOtp: (email: string) => Promise<{ ok: boolean; debugOtp?: string; message?: string }>;
  onVerifyOtp: (email: string, otp: string) => Promise<void>;
  error: string;
}) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState("");
  const [debugOtp, setDebugOtp] = useState("");

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setInfo("");
    setDebugOtp("");
    try {
      const result = await onRequestOtp(email.trim().toLowerCase());
      if (result.ok) {
        setStep("otp");
        setInfo(result.message || "Check your email for the 6-digit code.");
        if (result.debugOtp) setDebugOtp(result.debugOtp);
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await onVerifyOtp(email.trim().toLowerCase(), otp.trim());
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-b border-black/[0.06] bg-white">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-md"
          >
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <Shield className="h-3.5 w-3.5" />
              Admin access
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Sign in to Pune Cabz
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-navy/55">
              Enter your admin email and we&apos;ll send a one-time login code. No password needed.
            </p>
            <ul className="mt-6 space-y-2 border-t border-black/[0.06] pt-5 text-[13px] text-navy/55">
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Manage bookings, enquiries, and reviews
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Update routes, tourism, blog, and careers
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Code expires in 10 minutes
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
          >
            <form
              onSubmit={step === "email" ? handleRequestOtp : handleVerifyOtp}
              className="border border-black/[0.08] bg-white"
            >
              <div className="border-b border-black/[0.06] px-5 py-4 sm:px-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/40">
                  {step === "email" ? "Step 1 of 2" : "Step 2 of 2"}
                </p>
                <h2 className="mt-1 text-lg font-bold text-navy">
                  {step === "email" ? "Your admin email" : "Enter login code"}
                </h2>
              </div>

              <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                {step === "email" ? (
                  <label className="block">
                    <span className="text-[12px] font-semibold text-navy/50">Email address</span>
                    <span className="relative mt-1.5 flex">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-black/[0.1] bg-[#fafbfc] py-3 pl-10 pr-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10"
                        autoComplete="email"
                        required
                      />
                    </span>
                  </label>
                ) : (
                  <>
                    <p className="text-[13px] leading-snug text-navy/55">
                      Code sent to <span className="font-semibold text-navy">{email}</span>
                    </p>
                    <label className="block">
                      <span className="text-[12px] font-semibold text-navy/50">6-digit code</span>
                      <span className="relative mt-1.5 flex">
                        <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="000000"
                          className="w-full border border-black/[0.1] bg-[#fafbfc] py-3 pl-10 pr-3 text-center text-lg font-bold tracking-[0.4em] text-navy outline-none transition-colors placeholder:tracking-[0.4em] placeholder:text-navy/25 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10"
                          autoComplete="one-time-code"
                          required
                        />
                      </span>
                    </label>
                    {debugOtp ? (
                      <p className="border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-900">
                        Dev mode — code:{" "}
                        <strong className="tracking-widest">{debugOtp}</strong>
                      </p>
                    ) : null}
                  </>
                )}

                {info && !error ? (
                  <p className="border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] font-medium text-emerald-800">
                    {info}
                  </p>
                ) : null}

                {error ? (
                  <p className="border border-brand/20 bg-brand/5 px-3 py-2 text-[13px] font-medium text-brand">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={busy || (step === "otp" && otp.length !== 6)}
                  className="flex w-full items-center justify-center gap-2 bg-brand py-3 text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
                >
                  {busy
                    ? step === "email"
                      ? "Sending…"
                      : "Verifying…"
                    : step === "email"
                      ? "Send login code"
                      : "Verify & continue"}
                  {!busy ? <ArrowRight className="h-4 w-4" /> : null}
                </button>

                {step === "otp" ? (
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.06] pt-3 text-[12px]">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("email");
                        setOtp("");
                        setInfo("");
                        setDebugOtp("");
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-navy/45 hover:text-brand"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Change email
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={async () => {
                        setBusy(true);
                        try {
                          const result = await onRequestOtp(email.trim().toLowerCase());
                          if (result.ok) {
                            setInfo(result.message || "New code sent.");
                            if (result.debugOtp) setDebugOtp(result.debugOtp);
                          }
                        } finally {
                          setBusy(false);
                        }
                      }}
                      className="font-semibold text-brand hover:underline disabled:opacity-60"
                    >
                      Resend code
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
