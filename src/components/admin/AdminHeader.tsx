"use client";

import {
  CalendarCheck,
  Car,
  Inbox,
  LayoutDashboard,
  MapPinned,
  MessageSquare,
  Plus,
} from "lucide-react";
import type { AdminSection } from "@/components/admin/AdminShell";

const titles: Record<
  AdminSection,
  { title: string; subtitle: string; tag: string; icon: typeof LayoutDashboard }
> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of bookings, enquiries, reviews, and published content.",
    tag: "Overview",
    icon: LayoutDashboard,
  },
  bookings: {
    title: "Bookings",
    subtitle: "Customer ride requests from the Book your cars page.",
    tag: "Operations",
    icon: CalendarCheck,
  },
  enquiries: {
    title: "Enquiries",
    subtitle: "Contact form messages from the Contact us page.",
    tag: "Operations",
    icon: Inbox,
  },
  reviews: {
    title: "Reviews",
    subtitle: "Approve or reject customer feedback before it appears on the homepage.",
    tag: "Operations",
    icon: MessageSquare,
  },
  tourism: {
    title: "Tourism list",
    subtitle: "Add and manage destinations here. Published trips show on /tourism only.",
    tag: "Tourism",
    icon: MapPinned,
  },
  routes: {
    title: "Route list",
    subtitle: "All saved routes. Published routes show on the Book your cars page only.",
    tag: "Book your cars",
    icon: Car,
  },
  "routes-add": {
    title: "Add route",
    subtitle: "Add image, cities, price and duration. Form opens from the right panel.",
    tag: "Book your cars",
    icon: Plus,
  },
};

export default function AdminHeader({
  section,
  badge,
}: {
  section: AdminSection;
  badge?: number;
}) {
  const meta = titles[section];
  const Icon = meta.icon;

  return (
    <header className="mb-6 rounded-2xl border border-black/[0.06] bg-white px-5 py-5 shadow-sm sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/35">
              {meta.tag}
            </p>
            <h1 className="mt-0.5 text-xl font-bold tracking-tight text-navy sm:text-2xl">
              {meta.title}
            </h1>
            <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-navy/50">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {badge !== undefined && badge > 0 ? (
          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-amber-200/80 bg-amber-50 px-3.5 py-1.5 text-[13px] font-semibold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {badge} pending
          </div>
        ) : null}
      </div>
    </header>
  );
}
