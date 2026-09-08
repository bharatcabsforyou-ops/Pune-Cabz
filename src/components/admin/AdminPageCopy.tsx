"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, Pencil } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminFormPanel, {
  AdminField,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/AdminFormPanel";
import {
  contentImageKey,
  getContentPage,
  type ContentField,
  type ContentImageField,
  type ContentPageId,
} from "@/lib/admin-content-pages";
import { LOCALES, localeLabels, type Locale } from "@/lib/i18n/config";
import { en, type MessageKey } from "@/lib/i18n/en";
import { hi } from "@/lib/i18n/hi";
import { mr } from "@/lib/i18n/mr";

const dictionaries: Record<Locale, Record<MessageKey, string>> = {
  en,
  hi,
  mr,
};

type ContentRow = {
  page_id: string;
  locale: string;
  fields: Record<string, string>;
};

function emptyForm(pageId: ContentPageId): Record<string, string> {
  const page = getContentPage(pageId);
  const form: Record<string, string> = {};
  for (const field of page?.fields ?? []) {
    form[field.key] = "";
  }
  for (const image of page?.images ?? []) {
    form[contentImageKey(image.id)] = image.defaultUrl;
  }
  return form;
}

function pickImageValue(rows: ContentRow[] | undefined, image: ContentImageField) {
  const key = contentImageKey(image.id);
  for (const loc of LOCALES) {
    const override = rows?.find((r) => r.locale === loc)?.fields?.[key];
    if (typeof override === "string" && override.trim()) return override;
  }
  return image.defaultUrl;
}

export default function AdminPageCopy({
  pageId,
  active = true,
}: {
  pageId: ContentPageId;
  active?: boolean;
}) {
  const page = getContentPage(pageId);
  const [locale, setLocale] = useState<Locale>("en");
  const [forms, setForms] = useState<Record<Locale, Record<string, string>>>(() => ({
    en: emptyForm(pageId),
    hi: emptyForm(pageId),
    mr: emptyForm(pageId),
  }));
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [setupNotice, setSetupNotice] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setForms({
      en: emptyForm(pageId),
      hi: emptyForm(pageId),
      mr: emptyForm(pageId),
    });
    setLocale("en");
    setError("");
    setSuccess("");
    setSetupNotice("");
    setOpen(false);
  }, [pageId]);

  useEffect(() => {
    if (!active || loaded || !page) return;

    fetch(`/api/admin/site-content?page=${encodeURIComponent(pageId)}`)
      .then(async (res) => {
        const data = (await res.json()) as {
          rows?: ContentRow[];
          setupRequired?: boolean;
          error?: string;
        };

        const next: Record<Locale, Record<string, string>> = {
          en: emptyForm(pageId),
          hi: emptyForm(pageId),
          mr: emptyForm(pageId),
        };

        for (const loc of LOCALES) {
          for (const field of page.fields) {
            const override = data.rows?.find((r) => r.locale === loc)?.fields?.[field.key];
            if (typeof override === "string" && override.trim()) {
              next[loc][field.key] = override;
            } else {
              next[loc][field.key] = dictionaries[loc][field.key] ?? en[field.key] ?? "";
            }
          }
          for (const image of page.images ?? []) {
            next[loc][contentImageKey(image.id)] = pickImageValue(data.rows, image);
          }
        }

        setForms(next);
        if (data.setupRequired) {
          setSetupNotice("Run supabase/site_content.sql in Supabase once, then save page copy here.");
        }
        if (data.error && !data.setupRequired) setError(data.error);
      })
      .catch(() => setError("Could not load page content."))
      .finally(() => setLoaded(true));
  }, [active, loaded, page, pageId]);

  const form = forms[locale];

  const placeholders = useMemo(() => {
    const map: Record<string, string> = {};
    for (const field of page?.fields ?? []) {
      map[field.key] = dictionaries[locale][field.key] ?? en[field.key] ?? "";
    }
    return map;
  }, [locale, page]);

  const fieldSections = useMemo(() => {
    if (!page) return [] as { section: string; fields: ContentField[]; images: ContentImageField[] }[];
    const order: string[] = [];
    const fieldMap = new Map<string, ContentField[]>();
    const imageMap = new Map<string, ContentImageField[]>();

    for (const field of page.fields) {
      const section = field.section || "Content";
      if (!fieldMap.has(section)) {
        fieldMap.set(section, []);
        order.push(section);
      }
      fieldMap.get(section)!.push(field);
    }

    for (const image of page.images ?? []) {
      const section = image.section || "Images";
      if (!imageMap.has(section)) {
        imageMap.set(section, []);
        if (!fieldMap.has(section)) order.push(section);
      }
      imageMap.get(section)!.push(image);
    }

    return order.map((section) => ({
      section,
      fields: fieldMap.get(section) ?? [],
      images: imageMap.get(section) ?? [],
    }));
  }, [page]);

  function setField(key: string, value: string) {
    setForms((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [key]: value },
    }));
  }

  /** Images are shared across languages — keep all locale forms in sync. */
  function setImage(key: string, value: string) {
    setForms((prev) => {
      const next = { ...prev };
      for (const loc of LOCALES) {
        next[loc] = { ...next[loc], [key]: value };
      }
      return next;
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!page) return;
    setBusy(true);
    setError("");
    setSuccess("");

    const fields: Record<string, string> = {};
    for (const field of page.fields) {
      const value = form[field.key]?.trim() ?? "";
      const fallback = dictionaries[locale][field.key] ?? en[field.key] ?? "";
      if (value && value !== fallback) {
        fields[field.key] = form[field.key];
      }
    }
    for (const image of page.images ?? []) {
      const key = contentImageKey(image.id);
      const value = form[key]?.trim() ?? "";
      if (value && value !== image.defaultUrl) {
        fields[key] = value;
      }
    }

    const res = await fetch(`/api/admin/site-content?page=${encodeURIComponent(pageId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, fields }),
    });
    const data = (await res.json()) as {
      error?: string;
      setupRequired?: boolean;
    };
    setBusy(false);

    if (!res.ok) {
      setError(data.error || "Could not save content.");
      if (data.setupRequired) {
        setSetupNotice("Run supabase/site_content.sql in Supabase once, then save page copy here.");
      }
      return;
    }

    setSetupNotice("");
    setSuccess(`${localeLabels[locale]} copy & images saved.`);
    window.setTimeout(() => setSuccess(""), 3500);
    setOpen(false);
  }

  if (!page) {
    return (
      <p className="border border-brand/20 bg-brand/5 px-4 py-3 text-sm text-brand">Unknown page.</p>
    );
  }

  const imageCount = page.images?.length ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
        <div>
          <p className="text-[13px] leading-relaxed text-navy/50">{page.description}</p>
          <p className="mt-1 text-[12px] text-navy/40">
            {page.fields.length} text fields
            {imageCount ? ` · ${imageCount} images` : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={page.previewHref}
            target="_blank"
            className="inline-flex items-center gap-1.5 border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-semibold text-navy/65 hover:text-brand"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Preview
          </Link>
        </div>
      </div>

      {setupNotice ? (
        <p className="mt-4 border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
          {setupNotice}
        </p>
      ) : null}
      {success ? (
        <p className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {success}
        </p>
      ) : null}
      {error && !open ? (
        <p className="mt-4 border border-brand/20 bg-brand/5 px-4 py-3 text-sm text-brand">{error}</p>
      ) : null}

      <div className="mt-10 flex flex-col items-center justify-center gap-3 py-12 text-center">
        <p className="max-w-sm text-[13px] text-navy/45">
          Text and images open in the side panel. Click Edit to change this page.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 bg-brand px-4 py-2.5 text-[13px] font-semibold text-white"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit content
        </button>
      </div>

      <AdminFormPanel
        open={open}
        onClose={() => setOpen(false)}
        subtitle="Website pages"
        title={`Edit ${page.label.replace(/ page$/i, "")}`}
        wide
        footer={
          <button
            type="submit"
            form="page-copy-form"
            disabled={busy || !loaded}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {busy ? "Saving…" : `Save ${localeLabels[locale]}`}
          </button>
        }
      >
        <div className="mb-4 flex gap-0 border-b border-black/[0.08]">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setLocale(loc)}
              className={`border-b-2 px-3 py-2 text-[13px] font-semibold transition-colors ${
                locale === loc
                  ? "border-brand text-brand"
                  : "border-transparent text-navy/45 hover:text-navy"
              }`}
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>

        {error ? <p className="mb-3 text-sm text-brand">{error}</p> : null}

        <form id="page-copy-form" onSubmit={save} className="space-y-6">
          {!loaded ? (
            <p className="py-8 text-center text-sm text-navy/40">Loading content…</p>
          ) : (
            fieldSections.map(({ section, fields, images }) => (
              <div key={section} className="space-y-4">
                <h3 className="border-b border-black/[0.06] pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/35">
                  {section}
                </h3>
                {images.map((image) => {
                  const key = contentImageKey(image.id);
                  return (
                    <AdminImageUpload
                      key={image.id}
                      label={image.label}
                      folder="pages"
                      value={form[key] ?? image.defaultUrl}
                      onChange={(url) => setImage(key, url)}
                      required={false}
                    />
                  );
                })}
                {fields.map((field) => (
                  <AdminField key={field.key} label={field.label}>
                    {field.multiline ? (
                      <textarea
                        value={form[field.key] ?? ""}
                        onChange={(e) => setField(field.key, e.target.value)}
                        rows={field.key.includes(".p") || field.key.includes("desc") ? 4 : 3}
                        placeholder={placeholders[field.key]}
                        className={adminTextareaClass}
                      />
                    ) : (
                      <input
                        value={form[field.key] ?? ""}
                        onChange={(e) => setField(field.key, e.target.value)}
                        placeholder={placeholders[field.key]}
                        className={adminInputClass}
                      />
                    )}
                  </AdminField>
                ))}
              </div>
            ))
          )}
        </form>
      </AdminFormPanel>
    </div>
  );
}
