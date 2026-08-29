"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
} from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import WhatsAppIcon from "../WhatsAppIcon";
import { site } from "@/lib/site";

const subjects = [
  { value: "", label: "Select a topic" },
  { value: "Booking & rides", label: "Booking & rides" },
  { value: "Payments & refunds", label: "Payments & refunds" },
  { value: "Trust & safety", label: "Trust & safety" },
  { value: "Partnerships", label: "Partnerships & fleet" },
  { value: "Other", label: "Something else" },
];

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
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

    const payload = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.phone.trim()
        ? `Phone: ${values.phone.trim()}\n\n${values.message}`
        : values.message,
    };

    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
    <section id="write" className="scroll-mt-20 border-y border-black/[0.06] bg-white py-8 sm:py-10">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Contact form</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Send us a message
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-navy/55">
              Share your booking query or feedback. Our Pune team replies within one business day.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="mt-6">
            <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_18px_50px_-32px_rgba(26,10,12,0.35)]">
              <div className="border-b border-black/[0.06] bg-surface/80 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={site.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-2 text-xs font-semibold text-navy transition-colors hover:border-brand/25 hover:text-brand"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {site.phone}
                    </a>
                    <a
                      href={site.emailHref}
                      className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-2 text-xs font-semibold text-navy transition-colors hover:border-brand/25 hover:text-brand"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {site.email}
                    </a>
                  </div>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    WhatsApp — fastest
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center gap-3 rounded-xl bg-emerald-50 px-6 py-12 text-center ring-1 ring-emerald-100"
                    >
                      <CheckCircle2 className="h-11 w-11 text-emerald-500" />
                      <p className="text-lg font-bold text-navy">Message received</p>
                      <p className="max-w-sm text-sm leading-relaxed text-navy/60">
                        Thank you — we&apos;ll get back to you within one business day on email or
                        phone.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setValues({ name: "", email: "", phone: "", subject: "", message: "" });
                          setSent(false);
                        }}
                        className="mt-1 text-sm font-semibold text-brand hover:underline"
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
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label="Full name"
                          value={values.name}
                          onChange={(v) => update("name", v)}
                          placeholder="Your name"
                          icon={<UserRound className="h-4 w-4" />}
                          required
                        />
                        <Field
                          label="Email address"
                          type="email"
                          value={values.email}
                          onChange={(v) => update("email", v)}
                          placeholder="you@example.com"
                          icon={<Mail className="h-4 w-4" />}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label="Phone (optional)"
                          type="tel"
                          value={values.phone}
                          onChange={(v) => update("phone", v)}
                          placeholder="+91 98765 43210"
                          icon={<Phone className="h-4 w-4" />}
                        />
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-navy">
                            Topic <span className="text-brand">*</span>
                          </label>
                          <div className="relative">
                            <MessageSquareText className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" />
                            <select
                              required
                              value={values.subject}
                              onChange={(e) => update("subject", e.target.value)}
                              className="w-full appearance-none rounded-xl border border-black/10 bg-white py-3 pl-10 pr-10 text-[15px] text-navy outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-2 focus:ring-brand/15"
                            >
                              {subjects.map((opt) => (
                                <option key={opt.value || "empty"} value={opt.value} disabled={!opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-navy">
                          Your message <span className="text-brand">*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={values.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder="Tell us about your route, booking, or question..."
                          className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] leading-relaxed text-navy outline-none transition-[border-color,box-shadow] placeholder:text-navy/30 focus:border-brand focus:ring-2 focus:ring-brand/15"
                        />
                      </div>

                      {error ? (
                        <p className="rounded-lg bg-brand/5 px-3 py-2 text-sm font-medium text-brand">
                          {error}
                        </p>
                      ) : null}

                      <div className="flex flex-col gap-3 border-t border-black/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-navy/45">
                          Mon–Sat 9am–9pm IST · Typical reply within 24 hours
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit"
                          disabled={busy}
                          className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto sm:min-w-[180px]"
                        >
                          <Send className="h-4 w-4" />
                          {busy ? "Sending..." : "Submit message"}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
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
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/35">
            {icon}
          </span>
        ) : null}
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-black/10 bg-white py-3 text-[15px] text-navy outline-none transition-[border-color,box-shadow] placeholder:text-navy/30 focus:border-brand focus:ring-2 focus:ring-brand/15 ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
