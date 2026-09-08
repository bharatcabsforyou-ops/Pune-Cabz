"use client";

import type { AdminSection } from "@/components/admin/AdminShell";
import { getContentPage, parseContentSection } from "@/lib/admin-content-pages";

const baseTitles: Partial<
  Record<AdminSection, { title: string; subtitle: string; tag: string }>
> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Inbox status, live content counts, and shortcuts to common work.",
    tag: "Overview",
  },
  bookings: {
    title: "Bookings",
    subtitle: "Ride requests from the book page.",
    tag: "Operations",
  },
  enquiries: {
    title: "Enquiries",
    subtitle: "Messages from the contact form.",
    tag: "Operations",
  },
  reviews: {
    title: "Reviews",
    subtitle: "Approve feedback before it appears on the site.",
    tag: "Operations",
  },
  tourism: {
    title: "Tourism trips",
    subtitle: "Destination cards published on /tourism.",
    tag: "Lists & data",
  },
  routes: {
    title: "Popular routes",
    subtitle: "Routes shown on the book page.",
    tag: "Lists & data",
  },
  blog: {
    title: "Blog",
    subtitle: "Articles published on /about/blog — add, edit, publish, or delete.",
    tag: "About",
  },
  career: {
    title: "Career",
    subtitle: "Job openings published on /about/career — add, edit, publish, or delete.",
    tag: "About",
  },
  settings: {
    title: "Site settings",
    subtitle: "Phone, WhatsApp, email, and address.",
    tag: "Settings",
  },
};

export default function AdminHeader({
  section,
  badge,
}: {
  section: AdminSection;
  badge?: number;
}) {
  const pageId = parseContentSection(section);
  const page = pageId ? getContentPage(pageId) : undefined;
  const aboutPageIds = new Set(["about", "fleet", "hotels", "faq", "safety"]);
  const meta = page
    ? {
        title: page.label,
        subtitle: page.description,
        tag: aboutPageIds.has(page.id) ? "About" : "Website pages",
      }
    : baseTitles[section] ?? baseTitles.dashboard!;

  return (
    <header className="mb-6 border-b border-black/[0.06] pb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/35">
            {meta.tag}
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-navy sm:text-2xl">
            {meta.title}
          </h1>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-navy/50">
            {meta.subtitle}
          </p>
        </div>

        {badge !== undefined && badge > 0 ? (
          <p className="shrink-0 text-[13px] font-semibold text-amber-700">{badge} pending</p>
        ) : null}
      </div>
    </header>
  );
}
