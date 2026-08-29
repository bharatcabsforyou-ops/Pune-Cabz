"use client";

import {
  ArrowUpRight,
  CalendarCheck,
  Inbox,
  MapPinned,
  MessageSquare,
  Route,
  Sparkles,
} from "lucide-react";
import type { AdminSection } from "@/components/admin/AdminShell";

type Stats = {
  pendingReviews: number;
  newBookings: number;
  newEnquiries: number;
  tourismLive: number;
  routesLive: number;
};

const statCards: {
  key: keyof Stats;
  label: string;
  hint: string;
  section: AdminSection;
  icon: typeof MessageSquare;
  accent: string;
  iconBg: string;
}[] = [
  {
    key: "newBookings",
    label: "New bookings",
    hint: "Ride requests",
    section: "bookings",
    icon: CalendarCheck,
    accent: "group-hover:border-blue-200",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    key: "newEnquiries",
    label: "New enquiries",
    hint: "Contact messages",
    section: "enquiries",
    icon: Inbox,
    accent: "group-hover:border-violet-200",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  {
    key: "pendingReviews",
    label: "Pending reviews",
    hint: "Needs approval",
    section: "reviews",
    icon: MessageSquare,
    accent: "group-hover:border-amber-200",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    key: "tourismLive",
    label: "Tourism live",
    hint: "Published trips",
    section: "tourism",
    icon: MapPinned,
    accent: "group-hover:border-emerald-200",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    key: "routesLive",
    label: "Routes live",
    hint: "Book your cars",
    section: "routes",
    icon: Route,
    accent: "group-hover:border-brand/30",
    iconBg: "bg-brand/10 text-brand",
  },
];

const quickActions: { section: AdminSection; label: string }[] = [
  { section: "bookings", label: "Bookings" },
  { section: "enquiries", label: "Enquiries" },
  { section: "reviews", label: "Reviews" },
  { section: "tourism", label: "Tourism list" },
  { section: "routes", label: "Route list" },
  { section: "routes-add", label: "Add route" },
];

export default function AdminDashboard({
  stats,
  onNavigate,
}: {
  stats: Stats;
  onNavigate: (section: AdminSection) => void;
}) {
  const totalPending = stats.newBookings + stats.newEnquiries + stats.pendingReviews;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-brand/10 bg-gradient-to-br from-white via-white to-brand/[0.04] p-5 shadow-sm sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
              <Sparkles className="h-3 w-3" />
              Today&apos;s overview
            </p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem]">
              {totalPending > 0 ? `${totalPending} items need attention` : "All caught up"}
            </p>
            <p className="mt-1 max-w-md text-[13px] leading-relaxed text-navy/50">
              Manage bookings, enquiries, reviews, and published content from one place.
            </p>
          </div>
          {totalPending > 0 ? (
            <button
              type="button"
              onClick={() =>
                onNavigate(
                  stats.newBookings > 0
                    ? "bookings"
                    : stats.newEnquiries > 0
                      ? "enquiries"
                      : "reviews"
                )
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-brand/25 transition-transform hover:scale-[1.02]"
            >
              Review now
              <ArrowUpRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map(({ key, label, hint, section, icon: Icon, accent, iconBg }) => (
          <button
            key={key}
            type="button"
            onClick={() => onNavigate(section)}
            className={`group rounded-2xl border border-black/[0.06] bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${accent}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <ArrowUpRight className="h-4 w-4 text-navy/20 transition-colors group-hover:text-brand" />
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight text-navy">{stats[key]}</p>
            <p className="mt-0.5 text-[14px] font-semibold text-navy/80">{label}</p>
            <p className="text-[12px] text-navy/40">{hint}</p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-[15px] font-bold text-navy">Quick access</h2>
        <p className="mt-1 text-[13px] text-navy/45">Jump straight to any section.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map(({ section, label }) => (
            <button
              key={section}
              type="button"
              onClick={() => onNavigate(section)}
              className="rounded-xl border border-black/[0.06] bg-[#f8f9fb] px-3 py-3 text-[13px] font-semibold text-navy transition-all hover:border-brand/20 hover:bg-brand/[0.04] hover:text-brand"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
