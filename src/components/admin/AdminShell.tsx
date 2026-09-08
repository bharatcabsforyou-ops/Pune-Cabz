"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Bus,
  CalendarCheck,
  Car,
  ChevronDown,
  Compass,
  ExternalLink,
  FileText,
  HelpCircle,
  Home,
  Hotel,
  Inbox,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  MessageSquare,
  Package,
  Phone,
  Settings2,
  Shield,
  Users,
  X,
} from "lucide-react";
import {
  CONTENT_PAGES,
  contentSectionId,
  type ContentPageId,
} from "@/lib/admin-content-pages";

export type AdminSection =
  | "dashboard"
  | "bookings"
  | "enquiries"
  | "reviews"
  | "routes"
  | "tourism"
  | "blog"
  | "career"
  | "settings"
  | `page-${ContentPageId}`;

type NavItem = {
  id: AdminSection;
  label: string;
  previewHref?: string;
  previewLabel?: string;
  icon: typeof LayoutDashboard;
  badgeKey?: "bookings" | "enquiries" | "reviews";
};

type NavGroup =
  | { label: string; kind: "items"; items: NavItem[] }
  | { label: string; kind: "about"; items: NavItem[] };

const pageIcons: Record<ContentPageId, typeof LayoutDashboard> = {
  home: Home,
  about: Building2,
  services: Briefcase,
  packages: Package,
  fleet: Bus,
  hotels: Hotel,
  tourism: MapPinned,
  safety: Shield,
  faq: HelpCircle,
  contact: Phone,
  book: CalendarCheck,
  site: Settings2,
};

function pageNavItem(pageId: ContentPageId, label?: string): NavItem {
  const page = CONTENT_PAGES.find((p) => p.id === pageId)!;
  return {
    id: contentSectionId(pageId),
    label: label ?? page.label.replace(/ page$/i, ""),
    previewHref: page.previewHref,
    previewLabel: page.previewLabel,
    icon: pageIcons[pageId],
  };
}

/** About menu on the public site → admin subsections */
const aboutSubItems: NavItem[] = [
  pageNavItem("about", "About Pune Cabz"),
  pageNavItem("fleet", "Fleet"),
  pageNavItem("hotels", "Hotels & Flights"),
  pageNavItem("faq", "FAQ"),
  pageNavItem("safety", "Safety"),
  {
    id: "blog",
    label: "Blog",
    previewHref: "/about/blog",
    previewLabel: "Blog page",
    icon: FileText,
  },
  {
    id: "career",
    label: "Career",
    previewHref: "/about/career",
    previewLabel: "Career page",
    icon: Users,
  },
];

const aboutSectionIds = new Set<AdminSection>(aboutSubItems.map((i) => i.id));

const mainWebsitePageIds: ContentPageId[] = [
  "home",
  "services",
  "packages",
  "tourism",
  "contact",
  "book",
  "site",
];

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    kind: "items",
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    kind: "items",
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
    label: "Website pages",
    kind: "items",
    items: mainWebsitePageIds.map((id) =>
      pageNavItem(id, id === "tourism" ? "Tourism copy" : undefined)
    ),
  },
  {
    label: "About",
    kind: "about",
    items: aboutSubItems,
  },
  {
    label: "Lists & data",
    kind: "items",
    items: [
      {
        id: "routes",
        label: "Popular routes",
        previewHref: "/book",
        previewLabel: "Book page",
        icon: Car,
      },
      {
        id: "tourism",
        label: "Tourism trips",
        previewHref: "/tourism",
        previewLabel: "Tourism page",
        icon: Compass,
      },
    ],
  },
  {
    label: "Settings",
    kind: "items",
    items: [
      {
        id: "settings",
        label: "Site settings",
        previewHref: "/contact",
        previewLabel: "Contact page",
        icon: Settings2,
      },
    ],
  },
];

const allNavItems = navGroups.flatMap((group) => group.items);

function groupForSection(section: AdminSection) {
  if (aboutSectionIds.has(section)) return "About";
  return navGroups.find((g) => g.items.some((i) => i.id === section))?.label ?? "Admin";
}

function SidebarBrand() {
  return (
    <div className="border-b border-white/[0.06] px-4 py-4">
      <div className="flex items-center gap-3">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center bg-brand text-[12px] font-bold tracking-wide text-white">
          PC
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-emerald-400 ring-2 ring-[#12151c]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold tracking-tight text-white">Pune Cabz</p>
          <p className="text-[11px] text-white/35">Admin console</p>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  item,
  active,
  badge,
  nested = false,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  badge?: number;
  nested?: boolean;
  onSelect: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "group relative flex w-full items-center gap-2.5 text-left transition-colors",
        nested ? "px-2.5 py-1.5 pl-9" : "px-2.5 py-2",
        active
          ? "bg-white/[0.08] text-white"
          : "text-white/50 hover:bg-white/[0.04] hover:text-white/85"
      )}
    >
      {active ? <span className="absolute inset-y-1 left-0 w-[2px] bg-brand" /> : null}
      <Icon
        className={clsx(
          "shrink-0",
          nested ? "h-3.5 w-3.5" : "h-4 w-4",
          active ? "text-brand" : "text-white/35 group-hover:text-white/55"
        )}
        strokeWidth={1.75}
      />
      <span
        className={clsx(
          "min-w-0 flex-1 truncate font-medium",
          nested ? "text-[12px]" : "text-[13px]"
        )}
      >
        {item.label}
      </span>
      {badge && badge > 0 ? (
        <span className="min-w-[1.25rem] shrink-0 bg-brand px-1.5 py-0.5 text-center text-[10px] font-bold tabular-nums text-white">
          {badge}
        </span>
      ) : null}
    </button>
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
  const aboutActive = aboutSectionIds.has(section);
  const [aboutOpen, setAboutOpen] = useState(aboutActive);

  useEffect(() => {
    if (aboutActive) setAboutOpen(true);
  }, [aboutActive]);

  return (
    <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-2.5 py-4">
      {navGroups.map((group) => {
        if (group.kind === "about") {
          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => setAboutOpen((v) => !v)}
                aria-expanded={aboutOpen}
                className={clsx(
                  "mb-1.5 flex w-full items-center justify-between px-2.5 py-1 text-left transition-colors",
                  aboutActive ? "text-white/55" : "text-white/25 hover:text-white/45"
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                  About
                </span>
                <ChevronDown
                  className={clsx(
                    "h-3.5 w-3.5 transition-transform",
                    aboutOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {aboutOpen ? (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <NavButton
                            item={item}
                            active={section === item.id}
                            onSelect={() => {
                              onSectionChange(item.id);
                              onNavigate?.();
                            }}
                          />
                        </li>
                      ))}
                    </div>
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <div key={group.label}>
            <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const badge = item.badgeKey ? badges[item.badgeKey] : 0;
                return (
                  <li key={item.id}>
                    <NavButton
                      item={item}
                      active={section === item.id}
                      badge={badge}
                      onSelect={() => {
                        onSectionChange(item.id);
                        onNavigate?.();
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="shrink-0 border-t border-white/[0.06] p-2.5">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2.5 px-2.5 py-2 text-[12px] font-medium text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white/80"
      >
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        Open website
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-2.5 px-2.5 py-2 text-[12px] font-medium text-white/40 transition-colors hover:bg-brand/10 hover:text-brand-light"
      >
        <LogOut className="h-3.5 w-3.5 shrink-0" />
        Log out
      </button>
    </div>
  );
}

function TopNavbar({
  active,
  groupLabel,
  badges,
  onMenuOpen,
  onLogout,
}: {
  active: NavItem | undefined;
  groupLabel: string;
  badges: { bookings: number; enquiries: number; reviews: number };
  onMenuOpen: () => void;
  onLogout: () => void;
}) {
  const pending = badges.bookings + badges.enquiries + badges.reviews;

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuOpen}
          className="flex h-9 w-9 items-center justify-center border border-black/[0.08] text-navy lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-[17px] w-[17px]" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-navy/35">
            <span className="hidden sm:inline">Admin</span>
            <span className="hidden sm:inline text-navy/20">/</span>
            <span className="hidden truncate sm:inline">{groupLabel}</span>
            <span className="hidden sm:inline text-navy/20">/</span>
            <span className="truncate font-semibold text-navy/70">
              {active?.label ?? "Dashboard"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {pending > 0 ? (
            <span className="hidden items-center gap-1.5 border border-brand/20 bg-brand/[0.06] px-2.5 py-1.5 text-[11px] font-semibold text-brand sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {pending} pending
            </span>
          ) : (
            <span className="hidden items-center gap-1.5 border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Clear
            </span>
          )}

          {active?.previewHref ? (
            <Link
              href={active.previewHref}
              target="_blank"
              className="hidden items-center gap-1.5 border border-black/[0.08] bg-white px-3 py-1.5 text-[12px] font-semibold text-navy/65 transition-colors hover:border-brand/30 hover:text-brand sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview
            </Link>
          ) : null}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 border border-black/[0.08] bg-white px-3 py-1.5 text-[12px] font-semibold text-navy/65 transition-colors hover:border-brand/30 hover:text-brand"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Website</span>
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex h-9 items-center gap-1.5 border border-black/[0.08] bg-[#fafbfc] px-3 text-[12px] font-semibold text-navy/55 transition-colors hover:border-brand/25 hover:text-brand"
            aria-label="Log out"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
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
  const groupLabel = groupForSection(section);

  return (
    <div className="flex min-h-svh bg-[#f3f5f8]">
      <aside className="relative hidden w-[15.5rem] shrink-0 flex-col bg-[#12151c] lg:sticky lg:top-0 lg:flex lg:h-svh">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand/[0.1] to-transparent" />
        <SidebarBrand />
        <SidebarNav section={section} badges={badges} onSectionChange={onSectionChange} />
        <SidebarFooter onLogout={onLogout} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar
          active={active}
          groupLabel={groupLabel}
          badges={badges}
          onMenuOpen={() => setMobileOpen(true)}
          onLogout={onLogout}
        />

        <AnimatePresence>
          {mobileOpen ? (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: "-105%" }}
                animate={{ x: 0 }}
                exit={{ x: "-105%" }}
                transition={{ type: "spring", damping: 32, stiffness: 360 }}
                className="relative flex h-full w-[15.5rem] flex-col bg-[#12151c] shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center bg-brand text-[11px] font-bold text-white">
                      PC
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-white">Pune Cabz</p>
                      <p className="text-[11px] text-white/35">Admin</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-8 w-8 items-center justify-center text-white/45 hover:bg-white/[0.06] hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <SidebarNav
                  section={section}
                  badges={badges}
                  onSectionChange={onSectionChange}
                  onNavigate={() => setMobileOpen(false)}
                />
                <SidebarFooter
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
