"use client";

import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Inbox,
  MapPinned,
  MessageSquare,
  Route,
} from "lucide-react";
import type { AdminSection } from "@/components/admin/AdminShell";

type Stats = {
  pendingReviews: number;
  newBookings: number;
  newEnquiries: number;
  tourismLive: number;
  routesLive: number;
};

const attentionRows: {
  key: keyof Stats;
  label: string;
  section: AdminSection;
  icon: typeof CalendarCheck;
}[] = [
  { key: "newBookings", label: "New bookings", section: "bookings", icon: CalendarCheck },
  { key: "newEnquiries", label: "New enquiries", section: "enquiries", icon: Inbox },
  { key: "pendingReviews", label: "Pending reviews", section: "reviews", icon: MessageSquare },
];

const publishRows: {
  key: keyof Stats;
  label: string;
  section: AdminSection;
  icon: typeof Route;
}[] = [
  { key: "routesLive", label: "Popular routes", section: "routes", icon: Route },
  { key: "tourismLive", label: "Tourism trips", section: "tourism", icon: MapPinned },
];

const shortcuts: { label: string; section: AdminSection }[] = [
  { label: "Edit Home", section: "page-home" },
  { label: "Add route", section: "routes" },
  { label: "New blog", section: "blog" },
  { label: "New career", section: "career" },
  { label: "Site settings", section: "settings" },
];

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden border border-black/[0.08] bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] bg-[#fafbfc] px-3 py-2">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/40">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function AdminDashboard({
  stats,
  onNavigate,
}: {
  stats: Stats;
  onNavigate: (section: AdminSection) => void;
}) {
  const totalPending = stats.newBookings + stats.newEnquiries + stats.pendingReviews;
  const totalLive = stats.routesLive + stats.tourismLive;
  const inboxSection: AdminSection =
    stats.newBookings > 0 ? "bookings" : stats.newEnquiries > 0 ? "enquiries" : "reviews";

  const metrics: {
    label: string;
    value: number;
    accent?: boolean;
    onClick?: () => void;
  }[] = [
    {
      label: "Needs action",
      value: totalPending,
      accent: totalPending > 0,
      onClick: () => onNavigate(inboxSection),
    },
    {
      label: "Bookings",
      value: stats.newBookings,
      onClick: () => onNavigate("bookings"),
    },
    {
      label: "Enquiries",
      value: stats.newEnquiries,
      onClick: () => onNavigate("enquiries"),
    },
    {
      label: "Live content",
      value: totalLive,
      onClick: () => onNavigate("routes"),
    },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-black/[0.06] pb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/35">
            Overview
          </p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-navy">Dashboard</h2>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold ${
            totalPending > 0
              ? "bg-brand/[0.08] text-brand"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {totalPending > 0 ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {totalPending} pending
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
              Inbox clear
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 overflow-hidden border border-black/[0.08] sm:grid-cols-4">
        {metrics.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={`relative bg-white px-3 py-3 text-left transition-colors hover:bg-[#fafbfc] sm:px-3.5 ${
              i > 0 ? "border-l border-black/[0.06]" : ""
            } ${i > 1 ? "border-t border-black/[0.06] sm:border-t-0" : ""}`}
          >
            {i === 0 ? (
              <span
                className={`absolute inset-y-0 left-0 w-[2px] ${
                  item.accent ? "bg-brand" : "bg-navy/15"
                }`}
              />
            ) : null}
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/35">
              {item.label}
            </p>
            <p
              className={`mt-1 text-[1.35rem] font-semibold leading-none tabular-nums tracking-tight ${
                item.accent ? "text-brand" : "text-navy"
              }`}
            >
              {item.value}
            </p>
          </button>
        ))}
      </div>

      {totalPending > 0 ? (
        <div className="flex items-center justify-between gap-3 border border-brand/20 bg-brand/[0.04] px-3 py-2">
          <p className="text-[12px] font-medium text-navy/80">
            {totalPending} item{totalPending === 1 ? "" : "s"} waiting in operations
          </p>
          <button
            type="button"
            onClick={() => onNavigate(inboxSection)}
            className="inline-flex shrink-0 items-center gap-1 bg-brand px-2.5 py-1.5 text-[11px] font-semibold text-white"
          >
            Review
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Panel title="Operations">
            <ul className="divide-y divide-black/[0.05]">
              {attentionRows.map(({ key, label, section, icon: Icon }) => {
                const count = stats[key];
                const active = count > 0;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => onNavigate(section)}
                      className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left hover:bg-[#fafbfc]"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center ${
                          active ? "bg-brand/10 text-brand" : "bg-[#f4f5f7] text-navy/40"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-navy">
                        {label}
                      </span>
                      <span
                        className={`min-w-[1.5rem] text-right tabular-nums text-[13px] font-semibold ${
                          active ? "text-brand" : "text-navy/35"
                        }`}
                      >
                        {count}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-navy/20" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>

        <div className="space-y-3.5 lg:col-span-2">
          <Panel title="Published">
            <ul className="divide-y divide-black/[0.05]">
              {publishRows.map(({ key, label, section, icon: Icon }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => onNavigate(section)}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left hover:bg-[#fafbfc]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#f4f5f7] text-navy/40">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-navy">
                      {label}
                    </span>
                    <span className="tabular-nums text-[13px] font-semibold text-navy">
                      {stats[key]}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-navy/20" />
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Quick open">
            <ul className="divide-y divide-black/[0.05]">
              {shortcuts.map((item) => (
                <li key={item.section}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.section)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left hover:bg-[#fafbfc]"
                  >
                    <span className="text-[13px] font-medium text-navy">{item.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-navy/20" />
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
