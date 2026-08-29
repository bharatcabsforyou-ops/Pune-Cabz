"use client";

import { CalendarCheck, MapPin, Phone, UserRound, UsersRound } from "lucide-react";
import {
  formatBookingDate,
  formatTravelDate,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";

type BookingTab = "new" | "confirmed" | "cancelled" | "completed";

export default function AdminBookings({
  bookings,
  tab,
  onTabChange,
  onSetStatus,
  busy,
  loadError,
  counts,
}: {
  bookings: Booking[];
  tab: BookingTab;
  onTabChange: (tab: BookingTab) => void;
  onSetStatus: (id: string, status: BookingStatus) => void;
  busy: string | null;
  loadError: string;
  counts: Record<BookingTab, number>;
}) {
  const filtered = bookings.filter((item) => item.status === tab);

  const tabs: { id: BookingTab; label: string; tone: string }[] = [
    { id: "new", label: "New", tone: "bg-violet-500" },
    { id: "confirmed", label: "Confirmed", tone: "bg-emerald-500" },
    { id: "cancelled", label: "Cancelled", tone: "bg-brand" },
    { id: "completed", label: "Completed", tone: "bg-navy/40" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
            <p className="text-[13px] font-medium text-navy/50">{label}</p>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4">
          <div>
            <h2 className="text-base font-bold capitalize text-navy">{tab} bookings</h2>
            <p className="text-[13px] text-navy/50">Ride requests from the Book your cars page.</p>
          </div>
        </div>

        {loadError ? (
          <p className="px-5 py-4 text-sm text-brand">{loadError}</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-14 text-center">
            <CalendarCheck className="h-8 w-8 text-navy/20" />
            <p className="mt-3 font-semibold text-navy">No {tab} bookings</p>
            <p className="mt-1 text-[13px] text-navy/50">
              {loadError
                ? loadError
                : "New booking requests from /book will appear here."}
            </p>
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
                    <p className="mt-1 flex flex-wrap items-center gap-3 text-[13px] text-navy/50">
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {item.phone}
                      </span>
                      {item.email ? <span>{item.email}</span> : null}
                      <span>{formatBookingDate(item.createdAt)}</span>
                    </p>
                  </div>
                  <p className="flex items-center gap-1.5 font-bold text-navy">
                    <MapPin className="h-4 w-4 text-brand" />
                    {item.fromCity} → {item.toCity}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-[13px] text-navy/60">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarCheck className="h-3.5 w-3.5" />
                    {formatTravelDate(item.travelDate)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <UsersRound className="h-3.5 w-3.5" />
                    {item.passengers} passenger{item.passengers > 1 ? "s" : ""}
                  </span>
                </div>
                {item.notes ? (
                  <p className="mt-2 text-[13px] leading-relaxed text-navy/65">{item.notes}</p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {tab !== "confirmed" ? (
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => onSetStatus(item.id, "confirmed")}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      Confirm
                    </button>
                  ) : null}
                  {tab !== "completed" ? (
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => onSetStatus(item.id, "completed")}
                      className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      Complete
                    </button>
                  ) : null}
                  {tab !== "cancelled" ? (
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => onSetStatus(item.id, "cancelled")}
                      className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  ) : null}
                  {tab !== "new" ? (
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => onSetStatus(item.id, "new")}
                      className="rounded-full bg-[#f0f2f5] px-4 py-2 text-xs font-semibold text-navy disabled:opacity-60"
                    >
                      Mark new
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
