"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Clock3, IndianRupee, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
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

function RouteImage({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />;
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
          <span className="text-sm font-medium text-navy">Show on Book your cars page</span>
        </label>
      </div>
      {formError ? <p className="text-sm text-brand">{formError}</p> : null}
    </form>
  );
}

function RoutesGrid({
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
      <div className="rounded-2xl border border-dashed border-brand/20 bg-white px-5 py-10 text-center">
        <p className="text-sm font-semibold text-navy">No routes yet</p>
        <p className="mt-2 text-sm text-navy/50">
          Add routes here — they will show on the Book your cars page sidebar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {routes.map((route) => (
        <article
          key={route.id}
          className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm"
        >
          <div className="relative aspect-[16/10] bg-surface">
            <RouteImage src={route.imageUrl ?? "/image2.jpeg"} alt={`${route.fromCity} to ${route.toCity}`} />
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                route.published ? "bg-emerald-500 text-white" : "bg-navy/70 text-white"
              }`}
            >
              {route.published ? "Live" : "Hidden"}
            </span>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="flex items-center gap-1.5 font-bold text-navy">
                <MapPin className="h-4 w-4 text-brand" />
                {route.fromCity} → {route.toCity}
              </h3>
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand">
                {route.tag}
              </span>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-navy/60">
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {route.duration}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-navy">
                <IndianRupee className="h-3.5 w-3.5 text-brand" />
                from {route.fromPrice}
              </span>
            </p>
            <p className="mt-1 text-xs text-navy/40">Sort {route.sortOrder}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy === route.id}
                onClick={() => onToggle(route)}
                className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-navy disabled:opacity-60"
              >
                {route.published ? "Hide" : "Publish"}
              </button>
              <button
                type="button"
                onClick={() => onEdit(route)}
                className="inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </button>
              <button
                type="button"
                disabled={busy === route.id}
                onClick={() => onRemove(route.id)}
                className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand disabled:opacity-60"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function AdminPopularRoutes({
  onChanged,
  onGoBack,
  active = true,
  mode = "list",
}: {
  onChanged?: () => void;
  onGoBack?: () => void;
  active?: boolean;
  mode?: "list" | "add";
}) {
  const [routes, setRoutes] = useState<PopularRoute[]>([]);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PopularRouteInput>(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  async function loadRoutes() {
    const res = await fetch("/api/admin/popular-routes");
    const data = (await res.json()) as { routes?: PopularRoute[]; error?: string };
    if (!res.ok) {
      setLoadError(data.error || "Could not load routes.");
      return;
    }
    setRoutes(data.routes ?? []);
    setLoadError("");
  }

  useEffect(() => {
    if (active) {
      loadRoutes().catch(() => setLoadError("Could not load routes."));
    }
  }, [active]);

  useEffect(() => {
    if (active && mode === "add") {
      setEditingId(null);
      setForm({ ...emptyForm, sortOrder: routes.length + 1 });
      setFormError("");
      setOpen(true);
    }
  }, [active, mode, routes.length]);

  function closePanel() {
    setOpen(false);
    if (mode === "add" && !editingId) onGoBack?.();
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

    if (!res.ok) {
      setFormError(data.error || "Could not save route.");
      return;
    }

    await loadRoutes();
    onChanged?.();
    const wasEdit = Boolean(editingId);
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: routes.length + 2 });
    setSuccessMsg(wasEdit ? "Route updated successfully." : "Route added — visible on Book your cars!");
    window.setTimeout(() => setSuccessMsg(""), 5000);
    if (mode === "add" && !wasEdit) onGoBack?.();
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
      setRoutes((list) => list.filter((item) => item.id !== id));
      onChanged?.();
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
    setBusy(null);
    if (res.ok) {
      setRoutes((list) =>
        list.map((item) => (item.id === route.id ? { ...item, published: !item.published } : item))
      );
      onChanged?.();
    }
  }

  return (
    <div>
      {mode === "list" ? (
        <div className="rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-navy/55">
            All saved routes. Published routes show on <strong>Book your cars</strong> only — not on
            the home page.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-navy/55">
            Fill route details in the panel on the right. Saved routes appear on the Book your cars
            page only.
          </p>
          {!open ? (
            <button
              type="button"
              onClick={startCreate}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Open add form
            </button>
          ) : null}
        </div>
      )}

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
          Saved routes <span className="text-brand">({routes.length})</span>
        </p>
        <button
          type="button"
          onClick={() => loadRoutes()}
          className="text-[12px] font-semibold text-navy/45 hover:text-brand"
        >
          Refresh
        </button>
      </div>

      <div className="mt-3">
        <RoutesGrid
          routes={routes}
          busy={busy}
          onToggle={togglePublished}
          onEdit={startEdit}
          onRemove={removeRoute}
        />
      </div>

      <AdminFormPanel
        open={open}
        onClose={closePanel}
        subtitle="Book your cars"
        title={editingId ? "Edit route" : "Add route"}
        footer={
          <button
            type="submit"
            form="routes-form"
            disabled={busy === "save"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm shadow-brand/20 disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {busy === "save" ? "Saving..." : editingId ? "Save changes" : "Save route"}
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
