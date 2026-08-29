"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandIcon from "./BrandIcon";
import clsx from "clsx";
import Container from "./Container";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/safety", label: "Safety" },
  { href: "/tourism", label: "Tourism" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={clsx(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300",
        scrolled
          ? "border-black/[0.08] shadow-[0_8px_30px_-18px_rgba(26,10,12,0.35)]"
          : "border-transparent"
      )}
    >
      <Container className="grid h-16 min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
        <Link
          href="/"
          className="relative z-10 min-w-0 shrink-0 justify-self-start"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center justify-center gap-1 justify-self-center xl:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
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
            className="btn-shine inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand px-3.5 text-[13px] font-semibold text-white transition-all hover:bg-brand-dark sm:h-11 sm:px-5"
          >
            <BrandIcon size={16} className="h-4 w-4" />
            <span className="hidden sm:inline">Book your cars</span>
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-navy transition-colors hover:border-brand/25 hover:text-brand xl:hidden"
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
            className="overflow-hidden border-t border-black/[0.06] bg-white xl:hidden"
          >
            <nav className="flex flex-col gap-0.5 px-4 py-3 sm:px-6">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                      active
                        ? "bg-brand/[0.08] text-brand"
                        : "text-navy/70 hover:bg-surface hover:text-navy"
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
