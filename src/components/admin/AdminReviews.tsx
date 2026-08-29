"use client";

import { Check, Clock3, Star, X } from "lucide-react";
import { formatReviewDate, type Review, type ReviewStatus } from "@/lib/reviews";

type ReviewTab = "pending" | "approved" | "rejected";

export default function AdminReviews({
  reviews,
  tab,
  onTabChange,
  onSetStatus,
  busy,
  loadError,
  counts,
}: {
  reviews: Review[];
  tab: ReviewTab;
  onTabChange: (tab: ReviewTab) => void;
  onSetStatus: (id: string, status: ReviewStatus) => void;
  busy: string | null;
  loadError: string;
  counts: Record<ReviewTab, number>;
}) {
  const filtered = reviews.filter((item) => (item.status ?? "pending") === tab);

  const tabs: { id: ReviewTab; label: string; tone: string }[] = [
    { id: "pending", label: "Pending", tone: "bg-amber-500" },
    { id: "approved", label: "Approved", tone: "bg-emerald-500" },
    { id: "rejected", label: "Rejected", tone: "bg-navy/40" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tabs.map(({ id, label, tone }) => (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition-all ${
              tab === id
                ? "border-brand/30 ring-2 ring-brand/15"
                : "border-black/5 hover:border-brand/15"
            }`}
          >
            <span className={`inline-block h-2 w-2 rounded-full ${tone}`} />
            <p className="mt-3 text-2xl font-extrabold text-navy">{counts[id]}</p>
            <p className="text-sm font-medium text-navy/50">{label} reviews</p>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-5 py-4">
          <div>
            <h2 className="text-lg font-extrabold capitalize text-navy">{tab} reviews</h2>
            <p className="text-sm text-navy/50">Approve or reject before they show on the site.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize ${
                  tab === id ? "bg-brand text-white" : "bg-surface text-navy"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loadError ? (
          <p className="px-5 py-4 text-sm text-brand">{loadError}</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-14 text-center">
            <Clock3 className="h-8 w-8 text-navy/20" />
            <p className="mt-3 font-semibold text-navy">No {tab} reviews</p>
            <p className="mt-1 text-sm text-navy/50">New submissions will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/5">
            {filtered.map((review) => (
              <article key={review.id} className="px-5 py-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-navy">{review.name}</p>
                    <p className="mt-0.5 text-sm text-navy/50">
                      {review.city}
                      {review.route ? ` · ${review.route}` : ""}
                      {" · "}
                      {formatReviewDate(review.date)}
                    </p>
                  </div>
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-navy/15"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/70">{review.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tab !== "approved" ? (
                    <button
                      type="button"
                      disabled={busy === review.id}
                      onClick={() => onSetStatus(review.id, "approved")}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                  ) : null}
                  {tab !== "rejected" ? (
                    <button
                      type="button"
                      disabled={busy === review.id}
                      onClick={() => onSetStatus(review.id, "rejected")}
                      className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
