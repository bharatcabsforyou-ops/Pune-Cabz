"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";

const features = [
  "Approve customer reviews",
  "Manage tourism destinations",
  "Update popular book routes",
];

export default function AdminLogin({
  onLogin,
  error,
}: {
  onLogin: (email: string, password: string) => Promise<void>;
  error: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await onLogin(email.trim().toLowerCase(), password.trim());
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative min-h-svh overflow-hidden bg-soft">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-light/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-svh max-w-6xl grid-cols-1 items-stretch px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden flex-col justify-center lg:flex"
        >
          <Logo />
          <p className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin portal
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-navy">
            Pune Cabz
            <br />
            <span className="text-gradient-brand">Dashboard</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy/60">
            Secure access to manage reviews, tourism trips, and popular routes. Sign in with your
            admin email and password.
          </p>
          <ul className="mt-8 space-y-3">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium text-navy/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <div className="mb-6 flex justify-center lg:hidden">
              <Logo />
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-xl shadow-navy/5 ring-1 ring-black/5"
            >
              <div className="bg-gradient-to-r from-brand to-brand-light px-6 py-5 sm:px-8">
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                  Welcome back
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">Sign in</h2>
              </div>

              <div className="space-y-4 px-6 py-6 sm:px-8 sm:py-7">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-navy/45">
                    Email address
                  </span>
                  <span className="relative mt-2 flex">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-black/10 bg-surface/50 py-3 pl-10 pr-3.5 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
                      autoComplete="email"
                      required
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-navy/45">
                    Password
                  </span>
                  <span className="relative mt-2 flex">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand/70" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-black/10 bg-surface/50 py-3 pl-10 pr-11 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-navy/40 hover:bg-soft hover:text-navy"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                {error ? (
                  <p className="rounded-xl bg-brand/10 px-3.5 py-2.5 text-sm font-medium text-brand">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark disabled:opacity-70"
                >
                  {busy ? "Signing in..." : "Sign in to dashboard"}
                  {!busy ? <ArrowRight className="h-4 w-4" /> : null}
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-navy/45">
              <Link href="/" className="font-semibold text-brand hover:underline">
                ← Back to Pune Cabz website
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
