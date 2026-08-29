"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Send,
  UserRound,
  Mail,
  MessageSquareText,
  Clock3,
  Headphones,
  Briefcase,
  ShieldAlert,
} from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import WhatsAppIcon from "../WhatsAppIcon";
import { site } from "@/lib/site";

const desks = [
  { icon: Headphones, title: "Ride support", text: "Bookings, cancellations, payments" },
  { icon: ShieldAlert, title: "Trust & safety", text: "Reports, SOS follow-up, ID checks" },
  { icon: Briefcase, title: "Partnerships", text: "Fleet, campus, and corporate rides" },
];

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await res.json()) as { error?: string };
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Could not send message. Try again.");
      return;
    }
    setSent(true);
  }

  return (
    <section id="write" className="scroll-mt-24 bg-soft py-14 sm:py-16">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Write to us</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Send a message
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
            Tell us what you need. We read every note - usually the same day.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5 lg:gap-8">
          <Reveal direction="left" className="h-full lg:col-span-3">
            <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-emerald-50 px-6 py-16 text-center"
                  >
                    <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                    <p className="text-lg font-bold text-navy">Message sent!</p>
                    <p className="max-w-xs text-sm text-navy/60">
                      Thanks for reaching out - we&apos;ll reply within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setValues({ name: "", email: "", subject: "", message: "" });
                        setSent(false);
                      }}
                      className="mt-2 text-sm font-semibold text-brand hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        value={values.name}
                        onChange={(v) => update("name", v)}
                        placeholder="Riya Sharma"
                        icon={<UserRound className="h-4 w-4 text-navy/40" />}
                        required
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={(v) => update("email", v)}
                        placeholder="riya@example.com"
                        icon={<Mail className="h-4 w-4 text-navy/40" />}
                        required
                      />
                    </div>
                    <Field
                      label="Subject"
                      value={values.subject}
                      onChange={(v) => update("subject", v)}
                      placeholder="Booking question"
                      icon={<MessageSquareText className="h-4 w-4 text-navy/40" />}
                      required
                    />
                    <div className="flex flex-1 flex-col">
                      <label className="mb-1.5 block text-xs font-medium text-navy/50">
                        Message
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={values.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="How can we help?"
                        className="min-h-[140px] w-full flex-1 resize-none rounded-xl border border-black/10 px-4 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-brand"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={busy}
                      className="btn-shine flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                      {busy ? "Sending..." : "Send message"}
                    </motion.button>
                    {error ? <p className="text-sm text-brand">{error}</p> : null}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal direction="right" className="h-full lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">Support hours</p>
                    <p className="text-xs text-navy/50">India Standard Time</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm">
                  <li className="flex items-center justify-between gap-4 border-b border-black/5 pb-3">
                    <span className="text-navy/60">Mon – Sat</span>
                    <span className="font-semibold text-navy">9:00am – 9:00pm</span>
                  </li>
                  <li className="flex items-center justify-between gap-4">
                    <span className="text-navy/60">Sunday</span>
                    <span className="font-semibold text-navy">10:00am – 6:00pm</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-1 flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-navy">Which desk?</p>
                <ul className="mt-4 flex flex-1 flex-col gap-3">
                  {desks.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex gap-3 rounded-2xl bg-soft px-3.5 py-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">{title}</p>
                        <p className="text-xs leading-relaxed text-navy/55">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 transition-transform hover:scale-[1.01]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  icon?: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-navy/50">{label}</label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">{icon}</span>
        )}
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-black/10 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-brand ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
