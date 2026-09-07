"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Languages } from "lucide-react";
import clsx from "clsx";
import { LOCALES, localeLabels, type Locale } from "@/lib/i18n/config";
import { useLocale, useT } from "@/lib/i18n";

export default function LanguageSwitcher({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const { locale, setLocale } = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function pick(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div ref={ref} className={clsx("relative", className)}>
      <button
        type="button"
        aria-label={t("nav.language")}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white font-semibold text-navy transition-colors hover:border-brand/30 hover:text-brand",
          compact ? "h-9 px-2.5 text-xs" : "h-9 px-3 text-sm sm:h-10"
        )}
      >
        <Languages className="h-3.5 w-3.5 text-brand" strokeWidth={2.25} />
        <span className={compact ? "" : "hidden sm:inline"}>{localeLabels[locale]}</span>
        <span className={compact ? "hidden" : "sm:hidden"}>{locale.toUpperCase()}</span>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("nav.language")}
          className="absolute right-0 top-[calc(100%+0.35rem)] z-50 min-w-[9.5rem] overflow-hidden rounded-xl border border-black/[0.08] bg-white p-1 shadow-lg shadow-navy/10"
        >
          {LOCALES.map((code) => {
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => pick(code)}
                  className={clsx(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors",
                    active
                      ? "bg-brand/[0.08] text-brand"
                      : "text-navy/75 hover:bg-soft hover:text-navy"
                  )}
                >
                  {localeLabels[code]}
                  {active ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
