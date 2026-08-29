"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  Car,
  ChevronRight,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";

export type AdminSection =
  | "dashboard"
  | "bookings"
  | "enquiries"
  | "reviews"
  | "tourism"
  | "routes"
  | "routes-add";

type NavItem = {
  id: AdminSection;
  label: string;
  previewHref?: string;
  previewLabel?: string;
  icon: typeof LayoutDashboard;
  badgeKey?: "bookings" | "enquiries" | "reviews";
};

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      {
        id: "bookings",
        label: "Bookings",
        previewHref: "/book",
        previewLabel: "Book page",
        icon: CalendarCheck,
        badgeKey: "bookings",
      },
      {
        id: "enquiries",
        label: "Enquiries",
        previewHref: "/contact",
        previewLabel: "Contact page",
        icon: Inbox,
        badgeKey: "enquiries",
      },
      {
        id: "reviews",
        label: "Reviews",
        previewHref: "/",
        previewLabel: "Homepage",
        icon: MessageSquare,
        badgeKey: "reviews",
      },
    ],
  },
  {
    label: "Tourism",
    items: [
      {
        id: "tourism",
        label: "Tourism list",
        previewHref: "/tourism",
        previewLabel: "Tourism page",
        icon: MapPinned,
      },
    ],
  },
  {
    label: "Book your cars",
    items: [
      {
        id: "routes",
        label: "Route list",
        previewHref: "/book",
        previewLabel: "Book page",
        icon: Car,
      },
      {
        id: "routes-add",
        label: "Add route",
        previewHref: "/book",
        previewLabel: "Book page",
        icon: Plus,
      },
    ],
  },
];

const allNavItems = navGroups.flatMap((group) => group.items);

function SidebarBrand() {
  return (
    <div className="border-b border-white/[0.07] px-5 py-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-extrabold text-white">
          PC
        </span>
        <div>
          <p className="text-[15px] font-bold tracking-tight text-white">Pune Cabz</p>
          <p className="text-[11px] font-medium text-white/40">Admin panel</p>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({
  section,
  badges,
  onSectionChange,
  onNavigate,
}: {
  section: AdminSection;
  badges: { bookings: number; enquiries: number; reviews: number };
  onSectionChange: (section: AdminSection) => void;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/28">
            {group.label}
          </p>
          <ul className="space-y-1">
            {group.items.map(({ id, label, icon: Icon, badgeKey }) => {
              const active = section === id;
              const badge = badgeKey ? badges[badgeKey] : 0;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSectionChange(id);
                      onNavigate?.();
                    }}
                    className={clsx(
                      "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all duration-150",
                      active
                        ? "bg-brand/15 text-white shadow-[inset_0_0_0_1px_rgba(220,31,38,0.25)]"
                        : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                        active
                          ? "bg-brand text-white shadow-sm shadow-brand/30"
                          : "bg-white/[0.06] text-white/45 group-hover:bg-white/[0.1] group-hover:text-white/75"
                      )}
                    >
                      <Icon className="h-[15px] w-[15px]" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{label}</span>
                    {badge > 0 ? (
                      <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                        {badge}
                      </span>
                    ) : active ? (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-brand" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter({
  active,
  onLogout,
}: {
  active: NavItem | undefined;
  onLogout: () => void;
}) {
  return (
    <div className="shrink-0 space-y-1 border-t border-white/[0.07] p-3">
      {active?.previewHref ? (
        <Link
          href={active.previewHref}
          target="_blank"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white/85"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          Open {active.previewLabel ?? "page"}
        </Link>
      ) : null}
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white/85"
      >
        <ExternalLink className="h-4 w-4 shrink-0" />
        View website
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white/85"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Log out
      </button>
    </div>
  );
}

export default function AdminShell({
  section,
  onSectionChange,
  onLogout,
  badges,
  children,
}: {
  section: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  onLogout: () => void;
  badges: { bookings: number; enquiries: number; reviews: number };
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = allNavItems.find((item) => item.id === section);

  return (
    <div className="flex min-h-svh bg-[#f4f6f9]">
      <aside className="relative hidden w-[15.5rem] shrink-0 flex-col bg-[#111218] lg:sticky lg:top-0 lg:flex lg:h-svh">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand/[0.08] to-transparent" />
        <SidebarBrand />
        <SidebarNav section={section} badges={badges} onSectionChange={onSectionChange} />
        <SidebarFooter active={active} onLogout={onLogout} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-black/[0.05] bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] text-navy"
            aria-label="Open menu"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
          <div className="text-center">
            <p className="text-[13px] font-semibold text-navy">{active?.label ?? "Dashboard"}</p>
            <p className="text-[11px] text-navy/40">Pune Cabz Admin</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-navy/40"
            aria-label="Log out"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </header>

        <AnimatePresence>
          {mobileOpen ? (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: "-105%" }}
                animate={{ x: 0 }}
                exit={{ x: "-105%" }}
                transition={{ type: "spring", damping: 30, stiffness: 340 }}
                className="relative flex h-full w-[15.5rem] flex-col bg-[#111218] shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-xs font-extrabold text-white">
                      PC
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-white">Pune Cabz</p>
                      <p className="text-[11px] text-white/40">Admin panel</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/[0.08]"
                  >
                    <X className="h-[18px] w-[18px]" />
                  </button>
                </div>
                <SidebarNav
                  section={section}
                  badges={badges}
                  onSectionChange={onSectionChange}
                  onNavigate={() => setMobileOpen(false)}
                />
                <SidebarFooter
                  active={active}
                  onLogout={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                />
              </motion.aside>
            </div>
          ) : null}
        </AnimatePresence>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:max-w-6xl lg:p-8">{children}</main>
      </div>
    </div>
  );
}
