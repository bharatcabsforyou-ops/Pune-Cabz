"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminFormPanel, {
  AdminField,
  adminInputClass,
} from "@/components/admin/AdminFormPanel";
import type { PopularRoute, PopularRouteInput } from "@/lib/popular-routes";

const emptyForm: PopularRouteInput = {
  fromCity: "Pune",
  toCity: "",
  duration: "3h 30m",
  fromPrice: "499",
  tag: "Popular",
  imageUrl: "/image2.jpeg",
  sortOrder: 0,
  published: true,
};

const tagSuggestions = ["Most booked", "Weekend", "Daily", "Hills", "Coastal", "Scenic", "Popular"];

function RouteThumb({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("/")) {
    return (
      <Image src={src} alt={alt} fill className="object-cover" sizes="48px" />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

function RouteFormFields({
  form,
  setForm,
  formError,
  formId,
  onSubmit,
}: {
  form: PopularRouteInput;
  setForm: React.Dispatch<React.SetStateAction<PopularRouteInput>>;
  formError: string;
  formId: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="From city">
          <input
            value={form.fromCity}
            onChange={(e) => setForm((f) => ({ ...f, fromCity: e.target.value }))}
            className={adminInputClass}
            required
          />
        </AdminField>
        <AdminField label="To city">
          <input
            value={form.toCity}
            onChange={(e) => setForm((f) => ({ ...f, toCity: e.target.value }))}
            className={adminInputClass}
            required
          />
        </AdminField>
      </div>
      <AdminImageUpload
        label="Route image"
        folder="routes"
        value={form.imageUrl}
        onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Duration">
          <input
            value={form.duration}
            onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            placeholder="3h 30m"
            className={adminInputClass}
            required
          />
        </AdminField>
        <AdminField label="From price (₹)">
          <input
            value={form.fromPrice}
            onChange={(e) => setForm((f) => ({ ...f, fromPrice: e.target.value }))}
            placeholder="499"
            inputMode="numeric"
            className={adminInputClass}
            required
          />
        </AdminField>
      </div>
      <AdminField label="Tag">
        <input
          value={form.tag}
          onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
          list="route-tags"
          className={adminInputClass}
          required
        />
        <datalist id="route-tags">
          {tagSuggestions.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
      </AdminField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Sort order">
          <input
            type="number"
            min={0}
            max={999}
            value={form.sortOrder}
            onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
            className={adminInputClass}
          />
        </AdminField>
        <label className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-[#fafbfc] px-3.5 py-3 sm:mt-6">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            className="h-4 w-4 rounded border-black/20 text-brand focus:ring-brand"
          />
          <span className="text-sm font-medium text-navy">Published on book page</span>
        </label>
      </div>
      {formError ? <p className="text-sm text-brand">{formError}</p> : null}
    </form>
  );
}

function RoutesTable({
  routes,
  busy,
  onToggle,
  onEdit,
  onRemove,
}: {
  routes: PopularRoute[];
  busy: string | null;
  onToggle: (route: PopularRoute) => void;
  onEdit: (route: PopularRoute) => void;
  onRemove: (id: string) => void;
}) {
  if (routes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-black/[0.12] bg-white px-5 py-12 text-center">
        <p className="text-sm font-semibold text-navy">No routes yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-navy/50">
          Click <strong>Add route</strong> to create your first popular route for the book page.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-black/[0.08] bg-white">
      <table className="w-full min-w-[720px] text-left text-[13px]">
        <thead className="border-b border-black/[0.06] bg-[#fafbfc] text-[11px] font-semibold uppercase tracking-wider text-navy/40">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Route</th>
            <th className="px-4 py-2.5 font-semibold">Duration</th>
            <th className="px-4 py-2.5 font-semibold">From price</th>
            <th className="px-4 py-2.5 font-semibold">Tag</th>
            <th className="px-4 py-2.5 font-semibold">Sort</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.05]">
          {routes.map((route) => (
            <tr key={route.id} className="hover:bg-[#fafbfc]">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-surface">
                    <RouteThumb
                      src={route.imageUrl ?? "/image2.jpeg"}
                      alt={`${route.fromCity} to ${route.toCity}`}
                    />
                  </div>
                  <span className="font-medium text-navy">
                    {route.fromCity} → {route.toCity}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-navy/65">{route.duration}</td>
              <td className="px-4 py-3 tabular-nums font-semibold text-navy">
                ₹{route.fromPrice}
              </td>
              <td className="px-4 py-3 text-navy/65">{route.tag}</td>
              <td className="px-4 py-3 tabular-nums text-navy/50">{route.sortOrder}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block text-[11px] font-semibold uppercase tracking-wide ${
                    route.published ? "text-emerald-700" : "text-navy/40"
                  }`}
                >
                  {route.published ? "Live" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <button
                    type="button"
                    disabled={busy === route.id}
                    onClick={() => onToggle(route)}
                    className="px-2 py-1 text-[12px] font-semibold text-navy/55 hover:text-navy disabled:opacity-60"
                  >
                    {route.published ? "Hide" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(route)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-brand hover:underline"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={busy === route.id}
                    onClick={() => onRemove(route.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-navy/40 hover:text-brand disabled:opacity-60"
                    aria-label={`Delete ${route.fromCity} to ${route.toCity}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPopularRoutes({
  onCountChange,
  active = true,
}: {
  /** Lightweight callback — only published count, not a full dashboard reload */
  onCountChange?: (publishedCount: number) => void;
  active?: boolean;
}) {
  const [routes, setRoutes] = useState<PopularRoute[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PopularRouteInput>(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  function notifyCount(next: PopularRoute[]) {
    onCountChange?.(next.filter((r) => r.published).length);
  }

  async function loadRoutes() {
    const res = await fetch("/api/admin/popular-routes");
    const data = (await res.json()) as { routes?: PopularRoute[]; error?: string };
    if (!res.ok) {
      setLoadError(data.error || "Could not load routes.");
      setLoaded(true);
      return;
    }
    const next = data.routes ?? [];
    setRoutes(next);
    notifyCount(next);
    setLoadError("");
    setLoaded(true);
  }

  useEffect(() => {
    if (!active) return;
    if (loaded) return;
    loadRoutes().catch(() => {
      setLoadError("Could not load routes.");
      setLoaded(true);
    });
  }, [active, loaded]);

  function closePanel() {
    setOpen(false);
    setEditingId(null);
    setFormError("");
  }

  function startCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: routes.length + 1 });
    setFormError("");
    setOpen(true);
  }

  function startEdit(route: PopularRoute) {
    setEditingId(route.id);
    setForm({
      fromCity: route.fromCity,
      toCity: route.toCity,
      duration: route.duration,
      fromPrice: route.fromPrice,
      tag: route.tag,
      imageUrl: route.imageUrl,
      sortOrder: route.sortOrder,
      published: route.published,
    });
    setFormError("");
    setOpen(true);
  }

  async function saveRoute(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setBusy("save");

    const res = await fetch("/api/admin/popular-routes", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });

    const data = (await res.json()) as { route?: PopularRoute; error?: string };
    setBusy(null);

    if (!res.ok || !data.route) {
      setFormError(data.error || "Could not save route.");
      return;
    }

    const saved = data.route;
    setRoutes((list) => {
      const next = editingId
        ? list.map((item) => (item.id === editingId ? saved : item))
        : [saved, ...list].sort((a, b) => a.sortOrder - b.sortOrder);
      notifyCount(next);
      return next;
    });

    const wasEdit = Boolean(editingId);
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: routes.length + 2 });
    setSuccessMsg(wasEdit ? "Route updated." : "Route added — live on the book page when published.");
    window.setTimeout(() => setSuccessMsg(""), 4000);
  }

  async function removeRoute(id: string) {
    if (!window.confirm("Delete this route?")) return;
    setBusy(id);
    const res = await fetch("/api/admin/popular-routes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBusy(null);
    if (res.ok) {
      setRoutes((list) => {
        const next = list.filter((item) => item.id !== id);
        notifyCount(next);
        return next;
      });
    }
  }

  async function togglePublished(route: PopularRoute) {
    setBusy(route.id);
    const res = await fetch("/api/admin/popular-routes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: route.id,
        fromCity: route.fromCity,
        toCity: route.toCity,
        duration: route.duration,
        fromPrice: route.fromPrice,
        tag: route.tag,
        imageUrl: route.imageUrl,
        sortOrder: route.sortOrder,
        published: !route.published,
      }),
    });
    const data = (await res.json()) as { route?: PopularRoute };
    setBusy(null);
    if (res.ok) {
      const updated = data.route ?? { ...route, published: !route.published };
      setRoutes((list) => {
        const next = list.map((item) => (item.id === route.id ? updated : item));
        notifyCount(next);
        return next;
      });
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-navy/55">
          Manage popular routes in one place. Published routes appear on the{" "}
          <strong className="font-semibold text-navy">book page</strong>.
        </p>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/25 transition-transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          Add route
        </button>
      </div>

      {loadError ? (
        <p className="mt-4 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm text-brand">
          {loadError}
        </p>
      ) : null}

      {successMsg ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {successMsg}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-navy">
          Routes <span className="text-brand">({routes.length})</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setLoaded(false);
            loadRoutes().finally(() => setLoaded(true));
          }}
          className="text-[12px] font-semibold text-navy/45 hover:text-brand"
        >
          Refresh
        </button>
      </div>

      <div className="mt-3">
        {!loaded && routes.length === 0 ? (
          <div className="rounded-2xl border border-black/[0.06] bg-white px-5 py-10 text-center text-sm text-navy/45">
            Loading routes…
          </div>
        ) : (
          <RoutesTable
            routes={routes}
            busy={busy}
            onToggle={togglePublished}
            onEdit={startEdit}
            onRemove={removeRoute}
          />
        )}
      </div>

      <AdminFormPanel
        open={open}
        onClose={closePanel}
        subtitle="Popular routes"
        title={editingId ? "Edit route" : "Add route"}
        footer={
          <button
            type="submit"
            form="routes-form"
            disabled={busy === "save"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm shadow-brand/20 disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {busy === "save" ? "Saving…" : editingId ? "Save changes" : "Save route"}
          </button>
        }
      >
        <RouteFormFields
          form={form}
          setForm={setForm}
          formError={formError}
          formId="routes-form"
          onSubmit={saveRoute}
        />
      </AdminFormPanel>
    </div>
  );
}
