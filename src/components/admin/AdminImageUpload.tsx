"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Upload } from "lucide-react";
import { adminInputClass } from "@/components/admin/AdminFormPanel";

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill className="object-cover" sizes="144px" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

export default function AdminImageUpload({
  value,
  onChange,
  folder,
  label = "Image",
  required = true,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: "tourism" | "routes";
  label?: string;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    setError("");
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = (await res.json()) as { url?: string; error?: string };
    setUploading(false);

    if (!res.ok || !data.url) {
      setError(data.error || "Upload failed.");
      return;
    }

    onChange(data.url);
  }

  return (
    <div className="rounded-xl border border-black/[0.06] bg-[#fafbfc] p-4">
      <span className="text-xs font-semibold text-navy/45">{label}</span>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-black/[0.08] bg-white sm:h-24 sm:w-36">
          {value ? (
            <ImagePreview src={value} alt="Preview" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-navy/25">
              <ImagePlus className="h-8 w-8" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Upload image"}
          </button>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL (/image1.jpg or https://...)"
            className={adminInputClass}
            required={required}
          />
          <p className="text-[11px] text-navy/40">JPG, PNG, WebP or GIF · max 5 MB</p>
          {error ? <p className="text-xs text-brand">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
