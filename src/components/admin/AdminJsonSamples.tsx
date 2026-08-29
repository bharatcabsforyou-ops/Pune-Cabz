"use client";

import { useState } from "react";
import { ChevronDown, FileJson, Upload } from "lucide-react";

export default function AdminJsonSamples<T>({
  title,
  fileLabel,
  samples,
  onImport,
  importing,
}: {
  title: string;
  fileLabel: string;
  samples: T[];
  onImport: () => void;
  importing?: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
            <FileJson className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-[14px] font-bold text-navy">{title}</span>
            <span className="block text-[12px] text-navy/45">
              {samples.length} samples · {fileLabel}
            </span>
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-navy/35 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="border-t border-black/[0.06] px-5 pb-5">
          <pre className="mt-4 max-h-64 overflow-auto rounded-xl border border-black/[0.06] bg-[#0f1117] p-4 text-[11px] leading-relaxed text-emerald-300">
            {JSON.stringify(samples, null, 2)}
          </pre>
          <button
            type="button"
            disabled={importing}
            onClick={onImport}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            <Upload className="h-4 w-4" />
            {importing ? "Importing..." : "Import all to database"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
