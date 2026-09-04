"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import BrandIcon from "./BrandIcon";
import clsx from "clsx";
import Container from "./Container";
import Logo from "./Logo";
import {
  aboutNavLinks,
  isAboutPath,
  isNavActive,
  mainNavLinks,
} from "@/lib/site-nav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutDesktopOpen, setAboutDesktopOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const aboutActive = isAboutPath(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
    setAboutDesktopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!aboutRef.current?.contains(e.target as Node)) {
        setAboutDesktopOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={clsx(
        "sticky top-0 z-50 overflow-visible border-b bg-white/95 backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300",
        scrolled
          ? "border-black/[0.05] shadow-[0_4px_20px_-12px_rgba(26,10,12,0.12)]"
          : "border-transparent"
      )}
    >
      <Container className="grid h-[4.25rem] min-w-0 grid-cols-[auto_1fr_auto] items-center gap-2.5 sm:h-[4.75rem] sm:gap-3">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center justify-self-start"
          onClick={() => setOpen(false)}
        >
          <Logo size="nav" />
        </Link>

        <nav className="hidden items-center justify-center gap-0.5 justify-self-center lg:flex">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={clsx("nav-link", pathname === "/" && "nav-link-active")}
          >
            Home
          </Link>

          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => setAboutDesktopOpen(true)}
            onMouseLeave={() => setAboutDesktopOpen(false)}
          >
            <button
              type="button"
              aria-expanded={aboutDesktopOpen}
              aria-haspopup="true"
              onClick={() => setAboutDesktopOpen((v) => !v)}
              className={clsx(
                "nav-link inline-flex items-center gap-1",
                aboutActive && "nav-link-active"
              )}
            >
              About
              <ChevronDown
                className={clsx(
                  "h-3.5 w-3.5 transition-transform",
                  aboutDesktopOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {aboutDesktopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-[calc(100%+0.35rem)] z-50 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-1.5 shadow-lg shadow-navy/10"
                >
                  {aboutNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        pathname === link.href
                          ? "bg-brand/[0.08] text-brand"
                          : "text-navy/70 hover:bg-soft hover:text-navy"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mainNavLinks.slice(1).map((link) => {
            const active = isNavActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={clsx("nav-link", active && "nav-link-active")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center justify-self-end gap-2">
          <Link
            href="/book"
            aria-label="Book your cars"
            className="btn-primary btn-shine inline-flex h-9 items-center gap-2 px-3 sm:h-10 sm:px-4"
          >
            <BrandIcon size={16} className="h-4 w-4" />
            <span className="hidden sm:inline">Book your cars</span>
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-navy transition-colors hover:border-brand/25 hover:text-brand lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-0.5 px-4 py-3 sm:px-6">
              <Link
                href="/"
                className={clsx(
                  "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                  pathname === "/"
                    ? "bg-brand/[0.08] text-brand"
                    : "text-navy/70 hover:bg-soft hover:text-navy"
                )}
              >
                Home
              </Link>

              <button
                type="button"
                onClick={() => setAboutOpen((v) => !v)}
                className={clsx(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                  aboutActive
                    ? "bg-brand/[0.08] text-brand"
                    : "text-navy/70 hover:bg-soft hover:text-navy"
                )}
              >
                About
                <ChevronDown className={clsx("h-4 w-4 transition-transform", aboutOpen && "rotate-180")} />
              </button>

              {aboutOpen && (
                <div className="ml-2 flex flex-col gap-0.5 border-l-2 border-brand/15 pl-3">
                  {aboutNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-brand/[0.08] text-brand"
                          : "text-navy/65 hover:bg-soft hover:text-navy"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {mainNavLinks.slice(1).map((link) => {
                const active = isNavActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                      active
                        ? "bg-brand/[0.08] text-brand"
                        : "text-navy/70 hover:bg-soft hover:text-navy"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/book"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 text-sm font-semibold text-white"
              >
                <BrandIcon size={16} className="h-4 w-4" />
                Book your cars
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
