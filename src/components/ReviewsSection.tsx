"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquarePlus, Star, X } from "lucide-react";
import Container from "./Container";
import seedReviews from "@/data/reviews.json";
import {
  formatReviewDate,
  initials,
  mergeHeroReviews,
  type Review,
} from "@/lib/reviews";

const emptyForm = {
  name: "",
  city: "",
  route: "",
  text: "",
  rating: 5,
};

export default function ReviewsSection() {
  const pathname = usePathname();
  const [reviews, setReviews] = useState<Review[]>(seedReviews as Review[]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let ignore = false;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data: { reviews?: Review[] }) => {
        if (ignore) return;
        setReviews(mergeHeroReviews(seedReviews as Review[], data.reviews ?? []));
      })
      .catch(() => {
        if (!ignore) setReviews(seedReviews as Review[]);
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not send your review.");
        return;
      }
      setDone(true);
      setForm(emptyForm);
    } catch {
      setError("Could not send your review. Try again.");
    } finally {
      setSending(false);
    }
  }

  function close() {
    setOpen(false);
    setError("");
    setDone(false);
  }

  return (
    <section className="bg-white page-section">
      <Container>
        <div className="section-head">
          <p className="section-eyebrow">Reviews</p>
          <h2 className="section-title">What riders say</h2>
          <p className="section-desc">
            Recent trips on Pune Cabz. Add yours - it goes live after our team checks it.
          </p>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setError("");
              setOpen(true);
            }}
            className="btn-primary btn-shine mt-6 inline-flex gap-2 px-6 py-2.5 text-sm"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Add review
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="pro-card flex h-full flex-col p-4 text-left sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white shadow-sm ring-2 ring-brand/15">
                    {initials(review.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-navy">{review.name}</p>
                    <p className="text-[12px] text-navy/50">
                      {review.city}
                      {review.route ? ` · ${review.route}` : ""}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 pt-0.5 text-[11px] text-navy/40">{formatReviewDate(review.date)}</p>
              </div>
              <div className="mt-3 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? "fill-current" : "text-navy/15"}`}
                  />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/65">{review.text}</p>
            </article>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/55 p-4 sm:items-center"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand">
                    Add review
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-navy">How was your ride?</h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full p-1 text-navy/40 hover:bg-soft hover:text-navy"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {done ? (
                <p className="mt-5 text-sm leading-relaxed text-navy/70">
                  Thanks. Your review is with our team. It will show on the site after
                  an admin approves it.
                </p>
              ) : (
                <form onSubmit={submit} className="mt-5 space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(name) => setForm((f) => ({ ...f, name }))}
                      placeholder="Riya Sharma"
                    />
                    <Field
                      label="City"
                      value={form.city}
                      onChange={(city) => setForm((f) => ({ ...f, city }))}
                      placeholder="Pune"
                    />
                  </div>
                  <Field
                    label="Route"
                    value={form.route}
                    onChange={(route) => setForm((f) => ({ ...f, route }))}
                    placeholder="Pune to Mumbai"
                    required={false}
                  />
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-navy/50">Rating</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const value = i + 1;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, rating: value }))}
                            className="p-0.5"
                            aria-label={`${value} stars`}
                          >
                            <Star
                              className={`h-6 w-6 ${
                                value <= form.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-navy/20"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-navy/50">
                      Your review
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.text}
                      onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                      placeholder="Tell others how the ride went."
                      className="w-full resize-none rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-navy outline-none placeholder:text-navy/30 focus:border-brand"
                    />
                  </div>
                  {error ? <p className="text-sm text-brand">{error}</p> : null}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Submit for approval"}
                  </button>
                  <p className="text-center text-[12px] text-navy/45">
                    Reviews go to the admin panel first. They appear here after approval.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-navy/50">{label}</label>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-navy outline-none placeholder:text-navy/30 focus:border-brand"
      />
    </div>
  );
}
