"use client";

import { Inbox, Mail, UserRound } from "lucide-react";
import { formatEnquiryDate, type Enquiry, type EnquiryStatus } from "@/lib/enquiries";

type EnquiryTab = "new" | "read" | "closed";

export default function AdminEnquiries({
  enquiries,
  tab,
  onTabChange,
  onSetStatus,
  busy,
  loadError,
  counts,
}: {
  enquiries: Enquiry[];
  tab: EnquiryTab;
  onTabChange: (tab: EnquiryTab) => void;
  onSetStatus: (id: string, status: EnquiryStatus) => void;
  busy: string | null;
  loadError: string;
  counts: Record<EnquiryTab, number>;
}) {
  const filtered = enquiries.filter((item) => item.status === tab);

  const tabs: { id: EnquiryTab; label: string; tone: string }[] = [
    { id: "new", label: "New", tone: "bg-violet-500" },
    { id: "read", label: "Read", tone: "bg-blue-500" },
    { id: "closed", label: "Closed", tone: "bg-navy/40" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tabs.map(({ id, label, tone }) => (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={`rounded-xl border bg-white p-4 text-left shadow-sm transition-all ${
              tab === id ? "border-brand/30 ring-2 ring-brand/10" : "border-black/[0.06] hover:border-brand/15"
            }`}
          >
            <span className={`inline-block h-2 w-2 rounded-full ${tone}`} />
            <p className="mt-3 text-2xl font-bold text-navy">{counts[id]}</p>
            <p className="text-[13px] font-medium text-navy/50">{label} enquiries</p>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4">
          <div>
            <h2 className="text-base font-bold capitalize text-navy">{tab} enquiries</h2>
            <p className="text-[13px] text-navy/50">Messages from the Contact us page.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                  tab === id ? "bg-brand text-white" : "bg-[#f0f2f5] text-navy"
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
            <Inbox className="h-8 w-8 text-navy/20" />
            <p className="mt-3 font-semibold text-navy">No {tab} enquiries</p>
            <p className="mt-1 text-[13px] text-navy/50">Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {filtered.map((item) => (
              <article key={item.id} className="px-5 py-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 font-bold text-navy">
                      <UserRound className="h-4 w-4 text-brand" />
                      {item.name}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-[13px] text-navy/50">
                      <Mail className="h-3.5 w-3.5" />
                      {item.email}
                      {" · "}
                      {formatEnquiryDate(item.createdAt)}
                    </p>
                  </div>
                  <p className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {item.subject}
                  </p>
                </div>
                <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-navy/70">{item.message}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tab !== "read" ? (
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => onSetStatus(item.id, "read")}
                      className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      Mark read
                    </button>
                  ) : null}
                  {tab !== "closed" ? (
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => onSetStatus(item.id, "closed")}
                      className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      Close
                    </button>
                  ) : null}
                  {tab !== "new" ? (
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => onSetStatus(item.id, "new")}
                      className="rounded-full bg-[#f0f2f5] px-4 py-2 text-xs font-semibold text-navy disabled:opacity-60"
                    >
                      Reopen
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
