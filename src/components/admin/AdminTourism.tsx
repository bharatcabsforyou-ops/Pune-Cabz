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
  tripType: "Hill station",
  fromCity: "Pune",
  imageUrl: "/image1.jpeg",
  sortOrder: 0,
  published: true,
  placeSlug: "",
  description: "",
  whyCab: "",
  fromPune: "",
  fromMumbai: "",
  stops: [],
};

const tripTypes = [
  "Day trip",
  "City to city",
  "Weekend",
  "Coastal",
  "Hill station",
  "Pilgrimage",
  "Monsoon",
  "Heritage",
];

function tripToForm(trip: TourismTrip): TourismTripInput {
  return {
    title: trip.title,
    caption: trip.caption,
    tripType: trip.tripType,
    fromCity: trip.fromCity,
    imageUrl: trip.imageUrl,
    sortOrder: trip.sortOrder,
    published: trip.published,
    placeSlug: trip.placeSlug ?? "",
    description: trip.description ?? "",
    whyCab: trip.whyCab ?? "",
    fromPune: trip.fromPune ?? "",
    fromMumbai: trip.fromMumbai ?? "",
    stops: trip.stops ?? [],
  };
}

function TripThumb({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill className="object-cover" sizes="48px" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
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
  const stopsText = (form.stops ?? []).join("\n");

  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-4">
      <AdminImageUpload
        label="Destination image"
        folder="tourism"
        value={form.imageUrl}
        onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))}
      />
      <AdminField label="Title / place name">
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Lonavala"
          className={adminInputClass}
          required
        />
      </AdminField>
      <AdminField label="Tagline">
        <textarea
          value={form.caption}
          onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
          rows={2}
          placeholder="Short line on the card image"
          className={adminTextareaClass}
          required
        />
      </AdminField>
      <AdminField label="Full description">
        <textarea
          value={form.description ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={5}
          placeholder="Full destination description shown on the tourism card"
          className={adminTextareaClass}
        />
      </AdminField>
      <AdminField label="Why book a cab (optional)">
        <textarea
          value={form.whyCab ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, whyCab: e.target.value }))}
          rows={4}
          placeholder="Why travelers should book a cab for this place"
          className={adminTextareaClass}
        />
      </AdminField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="From Pune">
          <input
            value={form.fromPune ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, fromPune: e.target.value }))}
            placeholder="~65 km (Approx. 1.5 hours)"
            className={adminInputClass}
          />
        </AdminField>
        <AdminField label="From Mumbai">
          <input
            value={form.fromMumbai ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, fromMumbai: e.target.value }))}
            placeholder="~83 km (Approx. 2 hours)"
            className={adminInputClass}
          />
        </AdminField>
      </div>
      <AdminField label="Stops / highlights (one per line)">
        <textarea
          value={stopsText}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              stops: e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            }))
          }
          rows={4}
          placeholder={"Tiger Point\nBhushi Dam\nLohagad Fort"}
          className={adminTextareaClass}
        />
      </AdminField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Category / trip type">
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
        <AdminField label="From city (booking)">
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
        <AdminField label="Place slug (optional)">
          <input
            value={form.placeSlug ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, placeSlug: e.target.value }))}
            placeholder="lonavala"
            className={adminInputClass}
          />
        </AdminField>
      </div>
      <label className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-[#fafbfc] px-3.5 py-3">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          className="h-4 w-4 rounded border-black/20 text-brand focus:ring-brand"
        />
        <span className="text-sm font-medium text-navy">Publish on Tourism page</span>
      </label>
      {formError ? <p className="text-sm text-brand">{formError}</p> : null}
    </form>
  );
}

function TourismTable({
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
      <div className="rounded-lg border border-dashed border-black/[0.12] bg-white px-5 py-12 text-center">
        <p className="text-sm font-semibold text-navy">No tourism trips yet</p>
        <p className="mt-2 text-sm text-navy/50">
          Use <strong>Add Tourism</strong> to add destinations with image and details.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-black/[0.08] bg-white">
      <table className="w-full min-w-[760px] text-left text-[13px]">
        <thead className="border-b border-black/[0.06] bg-[#fafbfc] text-[11px] font-semibold uppercase tracking-wider text-navy/40">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Destination</th>
            <th className="px-4 py-2.5 font-semibold">Type</th>
            <th className="px-4 py-2.5 font-semibold">From</th>
            <th className="px-4 py-2.5 font-semibold">Sort</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.05]">
          {trips.map((trip) => (
            <tr key={trip.id} className="hover:bg-[#fafbfc]">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-surface">
                    <TripThumb src={trip.imageUrl} alt={trip.title} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-navy">{trip.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[12px] text-navy/40">{trip.caption}</p>
                    {trip.isSeed ? (
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy/35">
                        Built-in
                      </p>
                    ) : null}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-navy/65">{trip.tripType}</td>
              <td className="px-4 py-3 text-navy/65">{trip.fromCity}</td>
              <td className="px-4 py-3 tabular-nums text-navy/50">{trip.sortOrder}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block text-[11px] font-semibold uppercase tracking-wide ${
                    trip.published ? "text-emerald-700" : "text-navy/40"
                  }`}
                >
                  {trip.published ? "Live" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <button
                    type="button"
                    disabled={busy === trip.id}
                    onClick={() => onToggle(trip)}
                    className="px-2 py-1 text-[12px] font-semibold text-navy/55 hover:text-navy disabled:opacity-60"
                  >
                    {trip.published ? "Hide" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(trip)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-brand hover:underline"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  {!trip.isSeed ? (
                    <button
                      type="button"
                      disabled={busy === trip.id}
                      onClick={() => onRemove(trip.id)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-navy/40 hover:text-brand disabled:opacity-60"
                      aria-label={`Delete ${trip.title}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function AdminTourism({
  onCountChange,
  active = true,
}: {
  onCountChange?: (publishedCount: number) => void;
  active?: boolean;
}) {
  const [trips, setTrips] = useState<TourismTrip[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TourismTripInput>(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  function notifyCount(next: TourismTrip[]) {
    onCountChange?.(next.filter((t) => t.published).length);
  }

  async function loadTrips() {
    const res = await fetch("/api/admin/tourism");
    const data = (await res.json()) as {
      trips?: TourismTrip[];
      error?: string;
      setupRequired?: boolean;
    };
    const next = data.trips ?? [];
    setTrips(next);
    notifyCount(next);

    if (!res.ok && next.length === 0) {
      setLoadError(data.error || "Could not load tourism trips.");
    } else if (data.setupRequired && data.error) {
      setLoadError(`Database note: ${data.error}. Built-in destinations are still listed below.`);
    } else if (data.error && next.length > 0) {
      setLoadError(data.error);
    } else {
      setLoadError("");
    }
    setLoaded(true);
  }

  useEffect(() => {
    if (!active || loaded) return;
    loadTrips().catch(() => {
      setLoadError("Could not load tourism trips.");
      setLoaded(true);
    });
  }, [active, loaded]);

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
    setForm(tripToForm(trip));
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

    if (!res.ok || !data.trip) {
      setFormError(data.error || "Could not save trip.");
      return;
    }

    const saved = data.trip;
    const prevId = editingId;
    setTrips((list) => {
      const next = [
        saved,
        ...list.filter((item) => {
          if (prevId && item.id === prevId) return false;
          if (item.id === saved.id) return false;
          if (
            item.isSeed &&
            item.title.toLowerCase() === saved.title.toLowerCase()
          ) {
            return false;
          }
          return true;
        }),
      ];
      notifyCount(next);
      return next;
    });
    const wasEdit = Boolean(editingId);
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: trips.length + 2 });
    setSuccessMsg(wasEdit ? "Trip updated successfully." : "Tourism trip added and saved!");
    window.setTimeout(() => setSuccessMsg(""), 4000);
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
      setTrips((list) => {
        const next = list.filter((item) => item.id !== id);
        notifyCount(next);
        return next;
      });
    }
  }

  async function togglePublished(trip: TourismTrip) {
    setBusy(trip.id);
    const res = await fetch("/api/admin/tourism", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...tripToForm(trip),
        id: trip.id,
        published: !trip.published,
      }),
    });
    const data = (await res.json()) as { trip?: TourismTrip };
    setBusy(null);
    if (res.ok) {
      const updated = data.trip ?? { ...trip, published: !trip.published };
      setTrips((list) => {
        const next = [
          updated,
          ...list.filter((item) => {
            if (item.id === trip.id) return false;
            if (item.id === updated.id) return false;
            if (
              item.isSeed &&
              item.title.toLowerCase() === updated.title.toLowerCase()
            ) {
              return false;
            }
            return true;
          }),
        ];
        notifyCount(next);
        return next;
      });
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-sm">
        <p className="text-sm text-navy/55">
          Built-in destinations open with full website copy (tagline, description, distances,
          stops). Run <code className="text-[12px]">supabase/tourism_place_fields.sql</code> once
          so Save stores every field.
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
        <TourismTable
          trips={trips}
          busy={busy}
          onToggle={togglePublished}
          onEdit={startEdit}
          onRemove={removeTrip}
        />      </div>

      <AdminFormPanel
        open={open}
        onClose={closePanel}
        subtitle="Tourism"
        title={editingId ? "Edit destination" : "Add Tourism trip"}
        wide
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
