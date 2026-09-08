"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, Settings2 } from "lucide-react";
import AdminFormPanel, {
  AdminField,
  adminInputClass,
} from "@/components/admin/AdminFormPanel";
import {
  buildSiteSettings,
  defaultSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings";

export default function AdminSiteSettings({ active = true }: { active?: boolean }) {
  const [form, setForm] = useState<SiteSettings>(defaultSiteSettings());
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [setupNotice, setSetupNotice] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!active || loaded) return;
    fetch("/api/admin/site-settings")
      .then(async (res) => {
        const data = (await res.json()) as {
          settings?: SiteSettings;
          setupRequired?: boolean;
          error?: string;
        };
        if (data.settings) setForm(data.settings);
        if (data.setupRequired) {
          setSetupNotice("Run supabase/site_settings.sql in Supabase once, then save settings here.");
        }
        if (data.error && !data.setupRequired) setError(data.error);
      })
      .catch(() => setError("Could not load settings."))
      .finally(() => setLoaded(true));
  }, [active, loaded]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    const payload = buildSiteSettings(form);
    const res = await fetch("/api/admin/site-settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as {
      settings?: SiteSettings;
      error?: string;
      setupRequired?: boolean;
    };
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Could not save settings.");
      if (data.setupRequired) {
        setSetupNotice("Run supabase/site_settings.sql in Supabase once, then save settings here.");
      }
      return;
    }
    if (data.settings) setForm(data.settings);
    setSetupNotice("");
    setSuccess("Settings saved. Contact details update across the site.");
    window.setTimeout(() => setSuccess(""), 4000);
    setOpen(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-black/[0.06] pb-4">
        <div>
          <p className="text-[13px] leading-relaxed text-navy/50">
            Phone, WhatsApp, email, and address used across the website.
          </p>
          <p className="mt-1 text-[12px] text-navy/40">Opens in the side panel — same as routes &amp; page edit.</p>
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

      <div className="mt-8 overflow-hidden border border-black/[0.08] bg-white">
        <div className="border-b border-black/[0.06] bg-[#fafbfc] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-navy/40">
          Current contact
        </div>
        <dl className="divide-y divide-black/[0.05] text-[13px]">
          {[
            ["Phone", form.phone],
            ["WhatsApp", form.whatsapp],
            ["Email", form.email],
            ["Address", form.address],
            ["City", form.city],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4 px-4 py-2.5">
              <dt className="shrink-0 text-navy/40">{label}</dt>
              <dd className="min-w-0 text-right font-medium text-navy">{value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 flex justify-center sm:justify-start">
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={!loaded}
          className="inline-flex items-center gap-1.5 bg-brand px-4 py-2.5 text-[13px] font-semibold text-white disabled:opacity-60"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit settings
        </button>
      </div>

      <AdminFormPanel
        open={open}
        onClose={() => setOpen(false)}
        subtitle="Settings"
        title="Site settings"
        footer={
          <button
            type="submit"
            form="site-settings-form"
            disabled={busy || !loaded}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {busy ? "Saving…" : "Save settings"}
          </button>
        }
      >
        <div className="mb-4 flex items-center gap-2 border-b border-black/[0.06] pb-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand/10 text-brand">
            <Settings2 className="h-4 w-4" />
          </span>
          <p className="text-[12px] leading-snug text-navy/50">
            These details power WhatsApp, call buttons, footer, and contact page.
          </p>
        </div>

        {error ? <p className="mb-3 text-sm text-brand">{error}</p> : null}

        <form id="site-settings-form" onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Phone (display)">
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={adminInputClass}
                required
              />
            </AdminField>
            <AdminField label="WhatsApp number (digits)">
              <input
                value={form.whatsapp}
                onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                placeholder="919595933899"
                className={adminInputClass}
                required
              />
            </AdminField>
          </div>
          <AdminField label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={adminInputClass}
              required
            />
          </AdminField>
          <AdminField label="Instagram URL">
            <input
              value={form.instagram}
              onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Address short">
            <input
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Address line">
            <input
              value={form.addressLine}
              onChange={(e) => setForm((f) => ({ ...f, addressLine: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="City / pincode">
            <input
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
        </form>
      </AdminFormPanel>
    </div>
  );
}
