"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function AdminFormPanel({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex justify-end">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="absolute inset-0 bg-[#0a0c12]/60 backdrop-blur-[4px]"
            aria-label="Close panel"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.85 }}
            className="relative flex h-full w-[min(100%,30rem)] flex-col border-l border-black/[0.08] bg-white shadow-[-12px_0_40px_rgba(15,17,23,0.12)] sm:w-[34rem]"
          >
            <div className="relative shrink-0 overflow-hidden border-b border-black/[0.06] bg-gradient-to-br from-[#fafbfc] via-white to-brand/[0.03] px-5 py-5 sm:px-6">
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand/[0.06] blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  {subtitle ? (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                      {subtitle}
                    </p>
                  ) : null}
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-navy sm:text-xl">{title}</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white text-navy/45 shadow-sm transition-colors hover:border-black/10 hover:text-navy"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">{children}</div>

            {footer ? (
              <div className="shrink-0 border-t border-black/[0.06] bg-white/95 px-5 py-4 shadow-[0_-8px_24px_rgba(15,17,23,0.04)] backdrop-blur-sm sm:px-6">
                {footer}
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function AdminField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold text-navy/45">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const adminInputClass =
  "w-full rounded-xl border border-black/[0.08] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10";

export const adminSelectClass = adminInputClass;

export const adminTextareaClass =
  "w-full resize-none rounded-xl border border-black/[0.08] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10";
