"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminFormPanel, {
  AdminField,
  adminInputClass,
  adminSelectClass,
  adminTextareaClass,
} from "@/components/admin/AdminFormPanel";
import type { TourismTrip, TourismTripInput } from "@/lib/tourism";

const emptyForm: TourismTripInput = {
  title: "",
  caption: "",
  tripType: "Day trip",
  fromCity: "Pune",
  imageUrl: "/image1.jpeg",
  sortOrder: 0,
  published: true,
};

const tripTypes = ["Day trip", "City to city", "Weekend", "Coastal", "Hill station"];

function TripImage({ src, alt, className = "object-cover" }: { src: string; alt: string; className?: string }) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill className={className} sizes="(max-width:768px) 100vw, 33vw" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`h-full w-full ${className}`} />;
}

function TourismFormFields({
  form,
  setForm,
  formError,
  formId,
  onSubmit,
}: {
  form: TourismTripInput;
  setForm: React.Dispatch<React.SetStateAction<TourismTripInput>>;
  formError: string;
  formId: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-4">
      <AdminImageUpload
        label="Destination image"
        folder="tourism"
        value={form.imageUrl}
        onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))}
      />
      <AdminField label="Title">
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Pune to Mumbai"
          className={adminInputClass}
          required
        />
      </AdminField>
      <AdminField label="Caption / details">
        <textarea
          value={form.caption}
          onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
          rows={3}
          placeholder="Short description shown on Tourism page"
          className={adminTextareaClass}
          required
        />
      </AdminField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Trip type">
          <select
            value={form.tripType}
            onChange={(e) => setForm((f) => ({ ...f, tripType: e.target.value }))}
            className={adminSelectClass}
          >
            {tripTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="From city">
          <input
            value={form.fromCity}
            onChange={(e) => setForm((f) => ({ ...f, fromCity: e.target.value }))}
            className={adminInputClass}
            required
          />
        </AdminField>
      </div>
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
          <span className="text-sm font-medium text-navy">Publish on Tourism page</span>
        </label>
      </div>
      {formError ? <p className="text-sm text-brand">{formError}</p> : null}
    </form>
  );
}

function TourismTripGrid({
  trips,
  busy,
  onToggle,
  onEdit,
  onRemove,
}: {
  trips: TourismTrip[];
  busy: string | null;
  onToggle: (trip: TourismTrip) => void;
  onEdit: (trip: TourismTrip) => void;
  onRemove: (id: string) => void;
}) {
  if (trips.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-brand/20 bg-white px-5 py-10 text-center">
        <p className="text-sm font-semibold text-navy">No tourism trips yet</p>
        <p className="mt-2 text-sm text-navy/50">
          List is empty. Use <strong>Add Tourism</strong> to add destinations with image and details.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {trips.map((trip) => (
        <article
          key={trip.id}
          className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm"
        >
          <div className="relative aspect-[16/10] bg-surface">
            <TripImage src={trip.imageUrl} alt={trip.title} />
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                trip.published ? "bg-emerald-500 text-white" : "bg-navy/70 text-white"
              }`}
            >
              {trip.published ? "Live" : "Hidden"}
            </span>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-navy">{trip.title}</h3>
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand">
                {trip.tripType}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-navy/60">{trip.caption}</p>
            <p className="mt-2 text-xs text-navy/40">
              From {trip.fromCity} · Sort {trip.sortOrder}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy === trip.id}
                onClick={() => onToggle(trip)}
                className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-navy disabled:opacity-60"
              >
                {trip.published ? "Hide" : "Publish"}
              </button>
              <button
                type="button"
                onClick={() => onEdit(trip)}
                className="inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </button>
              <button
                type="button"
                disabled={busy === trip.id}
                onClick={() => onRemove(trip.id)}
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

export default function AdminTourism({
  onChanged,
  active = true,
}: {
  onChanged?: () => void;
  active?: boolean;
}) {
  const [trips, setTrips] = useState<TourismTrip[]>([]);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TourismTripInput>(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  async function loadTrips() {
    const res = await fetch("/api/admin/tourism");
    const data = (await res.json()) as { trips?: TourismTrip[]; error?: string };
    if (!res.ok) {
      setLoadError(data.error || "Could not load tourism trips.");
      return;
    }
    setTrips(data.trips ?? []);
    setLoadError("");
  }

  useEffect(() => {
    if (active) {
      loadTrips().catch(() => setLoadError("Could not load tourism trips."));
    }
  }, [active]);

  function closePanel() {
    setOpen(false);
  }

  function startCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: trips.length + 1 });
    setFormError("");
    setOpen(true);
  }

  function startEdit(trip: TourismTrip) {
    setEditingId(trip.id);
    setForm({
      title: trip.title,
      caption: trip.caption,
      tripType: trip.tripType,
      fromCity: trip.fromCity,
      imageUrl: trip.imageUrl,
      sortOrder: trip.sortOrder,
      published: trip.published,
    });
    setFormError("");
    setOpen(true);
  }

  async function saveTrip(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setBusy("save");

    const res = await fetch("/api/admin/tourism", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });

    const data = (await res.json()) as { trip?: TourismTrip; error?: string };
    setBusy(null);

    if (!res.ok) {
      setFormError(data.error || "Could not save trip.");
      return;
    }

    await loadTrips();
    onChanged?.();
    const wasEdit = Boolean(editingId);
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: trips.length + 2 });
    setSuccessMsg(wasEdit ? "Trip updated successfully." : "Tourism trip added and saved!");
    window.setTimeout(() => setSuccessMsg(""), 5000);
  }

  async function removeTrip(id: string) {
    if (!window.confirm("Delete this tourism trip?")) return;
    setBusy(id);
    const res = await fetch("/api/admin/tourism", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBusy(null);
    if (res.ok) {
      setTrips((list) => list.filter((item) => item.id !== id));
      onChanged?.();
    }
  }

  async function togglePublished(trip: TourismTrip) {
    setBusy(trip.id);
    const res = await fetch("/api/admin/tourism", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: trip.id,
        title: trip.title,
        caption: trip.caption,
        tripType: trip.tripType,
        fromCity: trip.fromCity,
        imageUrl: trip.imageUrl,
        sortOrder: trip.sortOrder,
        published: !trip.published,
      }),
    });
    setBusy(null);
    if (res.ok) {
      setTrips((list) =>
        list.map((item) => (item.id === trip.id ? { ...item, published: !item.published } : item))
      );
      onChanged?.();
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-sm">
        <p className="text-sm text-navy/55">
          Add and manage tourism destinations here. Published trips show on <strong>/tourism</strong>.
        </p>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Add Tourism
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
          Saved destinations <span className="text-brand">({trips.length})</span>
        </p>
        <button
          type="button"
          onClick={() => loadTrips()}
          className="text-[12px] font-semibold text-navy/45 hover:text-brand"
        >
          Refresh
        </button>
      </div>

      <div className="mt-3">
        <TourismTripGrid
          trips={trips}
          busy={busy}
          onToggle={togglePublished}
          onEdit={startEdit}
          onRemove={removeTrip}
        />
      </div>

      <AdminFormPanel
        open={open}
        onClose={closePanel}
        subtitle="Tourism"
        title={editingId ? "Edit trip" : "Add Tourism trip"}
        footer={
          <button
            type="submit"
            form="tourism-form"
            disabled={busy === "save"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm shadow-brand/20 disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {busy === "save" ? "Saving..." : editingId ? "Save changes" : "Save Tourism trip"}
          </button>
        }
      >
        <TourismFormFields
          form={form}
          setForm={setForm}
          formError={formError}
          formId="tourism-form"
          onSubmit={saveTrip}
        />
      </AdminFormPanel>
    </div>
  );
}
