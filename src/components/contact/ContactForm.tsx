"use client";

import Image from "next/image";
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
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const subjects = [
  { value: "", label: "Select topic" },
  { value: "Booking & rides", label: "Booking & rides" },
  { value: "Payments & refunds", label: "Payments & refunds" },
  { value: "Trust & safety", label: "Trust & safety" },
  { value: "Partnerships", label: "Partnerships" },
  { value: "Other", label: "Other" },
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
    <section id="write" className="scroll-mt-20 border-y border-black/[0.06] bg-white py-6 sm:py-8">
      <Container>
        <div className="page-grid page-grid-2 items-start gap-5 lg:items-center lg:gap-6">
          <Reveal direction="left" className="order-2 w-full lg:order-1 lg:max-w-sm">
            <div className="relative h-[160px] overflow-hidden rounded-xl sm:h-[180px] lg:h-[220px]">
              <Image
                src={images.film2}
                alt="Pune Cabz support"
                fill
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand-light">
                  Pune Cabz
                </p>
                <p className="mt-0.5 text-sm font-extrabold text-white sm:text-base">Need help fast?</p>
                <p className="mt-0.5 text-[11px] text-white/70">Call or WhatsApp us.</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="order-1 w-full lg:order-2">
            <div className="overflow-hidden rounded-xl border border-black/[0.08] bg-white">
              <div className="border-b border-black/[0.06] px-4 py-3 sm:px-5">
                <h2 className="text-lg font-extrabold text-navy">Send a message</h2>
                <p className="mt-0.5 text-xs text-navy/50">We reply within one business day.</p>
              </div>

              <div className="px-4 py-4 sm:px-5">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-2 rounded-lg bg-emerald-50 px-4 py-8 text-center ring-1 ring-emerald-100"
                    >
                      <CheckCircle2 className="h-9 w-9 text-emerald-500" />
                      <p className="text-base font-bold text-navy">Message received</p>
                      <p className="text-xs text-navy/55">We&apos;ll reply soon on email or phone.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setValues({ name: "", email: "", phone: "", subject: "", message: "" });
                          setSent(false);
                        }}
                        className="mt-1 text-xs font-semibold text-brand hover:underline"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Field
                          label="Name"
                          value={values.name}
                          onChange={(v) => update("name", v)}
                          placeholder="Your name"
                          icon={<UserRound className="h-3.5 w-3.5" />}
                          required
                        />
                        <Field
                          label="Email"
                          type="email"
                          value={values.email}
                          onChange={(v) => update("email", v)}
                          placeholder="you@example.com"
                          icon={<Mail className="h-3.5 w-3.5" />}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Field
                          label="Phone"
                          type="tel"
                          value={values.phone}
                          onChange={(v) => update("phone", v)}
                          placeholder={site.phone}
                          icon={<Phone className="h-3.5 w-3.5" />}
                        />
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-navy">
                            Topic <span className="text-brand">*</span>
                          </label>
                          <div className="relative">
                            <MessageSquareText className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy/35" />
                            <select
                              required
                              value={values.subject}
                              onChange={(e) => update("subject", e.target.value)}
                              className="w-full appearance-none rounded-lg border border-black/10 bg-white py-2.5 pl-9 pr-8 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                            >
                              {subjects.map((opt) => (
                                <option key={opt.value || "empty"} value={opt.value} disabled={!opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy/35" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold text-navy">
                          Message <span className="text-brand">*</span>
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={values.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder="Your route or question..."
                          className="w-full resize-none rounded-lg border border-black/10 px-3 py-2.5 text-sm leading-relaxed text-navy outline-none placeholder:text-navy/30 focus:border-brand focus:ring-2 focus:ring-brand/15"
                        />
                      </div>

                      {error ? (
                        <p className="rounded-md bg-brand/5 px-2.5 py-1.5 text-xs font-medium text-brand">
                          {error}
                        </p>
                      ) : null}

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={busy}
                        className="btn-shine flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
                      >
                        <Send className="h-3.5 w-3.5" />
                        {busy ? "Sending..." : "Submit"}
                      </motion.button>
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
      <label className="mb-1 block text-xs font-semibold text-navy">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy/35">
            {icon}
          </span>
        ) : null}
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-black/10 bg-white py-2.5 text-sm text-navy outline-none placeholder:text-navy/30 focus:border-brand focus:ring-2 focus:ring-brand/15 ${icon ? "pl-9 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}
