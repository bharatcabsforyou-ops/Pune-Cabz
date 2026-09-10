"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronDown, MapPin } from "lucide-react";
import clsx from "clsx";

export default function CityCombobox({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  variant = "form",
  className,
  inputClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  variant?: "form" | "inline";
  className?: string;
  inputClassName?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return options;
    const starts = options.filter((city) => city.toLowerCase().startsWith(q));
    const contains = options.filter(
      (city) =>
        !city.toLowerCase().startsWith(q) && city.toLowerCase().includes(q)
    );
    return [...starts, ...contains];
  }, [options, value]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [value, open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-index="${highlight}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  function pick(city: string) {
    onChange(city);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setHighlight((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter" && open && filtered[highlight]) {
      e.preventDefault();
      pick(filtered[highlight]);
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const isForm = variant === "form";

  return (
    <div
      ref={rootRef}
      className={clsx("city-combobox", isForm ? "city-combobox--form" : "city-combobox--inline", className)}
    >
      <div className="city-combobox-control">
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={clsx(
            isForm ? "book-cab-input city-combobox-input" : "city-combobox-input-inline",
            inputClassName
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="Toggle city list"
          disabled={disabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setOpen((v) => !v)}
          className={clsx("city-combobox-chevron", open && "city-combobox-chevron-open")}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>

      {open && filtered.length > 0 ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="city-combobox-menu"
        >
          {filtered.map((city, index) => {
            const active = city.toLowerCase() === value.trim().toLowerCase();
            const focused = index === highlight;
            return (
              <li key={city} role="option" aria-selected={active} data-index={index}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setHighlight(index)}
                  onClick={() => pick(city)}
                  className={clsx(
                    "city-combobox-option",
                    (active || focused) && "city-combobox-option-active"
                  )}
                >
                  <MapPin className="city-combobox-option-icon" strokeWidth={2.2} />
                  <span>{city}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {open && filtered.length === 0 && value.trim() ? (
        <div className="city-combobox-menu city-combobox-empty" role="status">
          No matching city — you can still type a custom place.
        </div>
      ) : null}
    </div>
  );
}
