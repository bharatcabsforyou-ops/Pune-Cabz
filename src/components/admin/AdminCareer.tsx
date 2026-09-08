"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminFormPanel, {
  AdminField,
  adminInputClass,
  adminSelectClass,
  adminTextareaClass,
} from "@/components/admin/AdminFormPanel";
import { careerTypeLabel, type CareerOpening, type CareerOpeningInput } from "@/lib/career";

const emptyForm: CareerOpeningInput = {
  title: "",
  type: "Full-time",
  location: "Pune",
  department: "Operations",
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  experience: "",
  salary: "",
  imageUrl: "/image1.jpeg",
  sortOrder: 0,
  published: true,
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-black/[0.08] bg-white px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/40">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-navy">{value}</p>
    </div>
  );
}

function CareerFormFields({
  form,
  setForm,
  formError,
  formId,
  onSubmit,
}: {
  form: CareerOpeningInput;
  setForm: React.Dispatch<React.SetStateAction<CareerOpeningInput>>;
  formError: string;
  formId: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-4">
      <AdminField label="Role title">
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className={adminInputClass}
          placeholder="e.g. Operations associate"
          required
        />
      </AdminField>

      <AdminImageUpload
        label="Role image"
        folder="career"
        value={form.imageUrl}
        onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Employment type">
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className={adminSelectClass}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </AdminField>
        <AdminField label="Location">
          <input
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            className={adminInputClass}
            placeholder="Pune / Remote"
            required
          />
        </AdminField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Department">
          <input
            value={form.department}
            onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
            className={adminInputClass}
            required
          />
        </AdminField>
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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Experience">
          <input
            value={form.experience}
            onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
            className={adminInputClass}
            placeholder="e.g. 1–3 years"
          />
        </AdminField>
        <AdminField label="Salary (display)">
          <input
            value={form.salary}
            onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))}
            className={adminInputClass}
            placeholder="e.g. ₹22,000 – ₹32,000 / month"
          />
        </AdminField>
      </div>

      <AdminField label="About the role">
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={4}
          className={adminTextareaClass}
          placeholder="Short overview of the job…"
          required
        />
      </AdminField>

      <AdminField label="Responsibilities (one per line)">
        <textarea
          value={form.responsibilities}
          onChange={(e) => setForm((f) => ({ ...f, responsibilities: e.target.value }))}
          rows={5}
          className={adminTextareaClass}
          placeholder={"Handle WhatsApp bookings\nCoordinate drivers\n..."}
        />
      </AdminField>

      <AdminField label="Requirements (one per line)">
        <textarea
          value={form.requirements}
          onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
          rows={4}
          className={adminTextareaClass}
          placeholder={"Clear communication\nWhatsApp / phone comfort\n..."}
        />
      </AdminField>

      <AdminField label="What we offer (one per line)">
        <textarea
          value={form.benefits}
          onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))}
          rows={4}
          className={adminTextareaClass}
          placeholder={"Fixed salary + incentives\nWeekly offs\n..."}
        />
      </AdminField>

      <label className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-[#fafbfc] px-3.5 py-3">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          className="h-4 w-4 rounded border-black/20 text-brand focus:ring-brand"
        />
        <span className="text-sm font-medium text-navy">Published on career page</span>
      </label>
      {formError ? <p className="text-sm text-brand">{formError}</p> : null}
    </form>
  );
}

function CareerTable({
  openings,
  busy,
  onToggle,
  onEdit,
  onRemove,
}: {
  openings: CareerOpening[];
  busy: string | null;
  onToggle: (opening: CareerOpening) => void;
  onEdit: (opening: CareerOpening) => void;
  onRemove: (id: string) => void;
}) {
  if (openings.length === 0) {
    return (
      <div className="border border-dashed border-black/[0.12] bg-white px-5 py-12 text-center">
        <p className="text-sm font-semibold text-navy">No openings yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-navy/50">
          Click <strong>New career</strong> to list your first role.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-black/[0.08] bg-white">
      <table className="w-full min-w-[760px] text-left text-[13px]">
        <thead className="border-b border-black/[0.06] bg-[#fafbfc] text-[11px] font-semibold uppercase tracking-wider text-navy/40">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Role</th>
            <th className="px-4 py-2.5 font-semibold">Type / location</th>
            <th className="px-4 py-2.5 font-semibold">Department</th>
            <th className="px-4 py-2.5 font-semibold">Sort</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.05]">
          {openings.map((opening) => (
            <tr key={opening.id} className="hover:bg-[#fafbfc]">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden bg-surface">
                    {opening.imageUrl?.startsWith("/") ? (
                      <Image
                        src={opening.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={opening.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-navy">{opening.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-navy/40">
                      {opening.experience || opening.salary || opening.description}
                      {opening.isSeed ? " · Sample" : ""}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-navy/65">{careerTypeLabel(opening)}</td>
              <td className="px-4 py-3 text-navy/65">{opening.department}</td>
              <td className="px-4 py-3 tabular-nums text-navy/50">{opening.sortOrder}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block text-[11px] font-semibold uppercase tracking-wide ${
                    opening.published ? "text-emerald-700" : "text-navy/40"
                  }`}
                >
                  {opening.published ? "Published" : "Unpublished"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <button
                    type="button"
                    disabled={busy === opening.id}
                    onClick={() => onToggle(opening)}
                    className="px-2 py-1 text-[12px] font-semibold text-navy/55 hover:text-navy disabled:opacity-60"
                  >
                    {opening.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(opening)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-brand hover:underline"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={busy === opening.id}
                    onClick={() => onRemove(opening.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-navy/40 hover:text-brand disabled:opacity-60"
                    aria-label={`Delete ${opening.title}`}
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

export default function AdminCareer({
  onCountChange,
  active = true,
}: {
  onCountChange?: (publishedCount: number) => void;
  active?: boolean;
}) {
  const [openings, setOpenings] = useState<CareerOpening[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [setupNotice, setSetupNotice] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CareerOpeningInput>(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  const stats = useMemo(() => {
    const total = openings.length;
    const published = openings.filter((o) => o.published).length;
    return { total, published, unpublished: total - published };
  }, [openings]);

  function notifyCount(next: CareerOpening[]) {
    onCountChange?.(next.filter((o) => o.published).length);
  }

  async function loadOpenings() {
    const res = await fetch("/api/admin/career");
    const data = (await res.json()) as {
      openings?: CareerOpening[];
      error?: string;
      setupRequired?: boolean;
    };
    if (!res.ok && !data.openings) {
      setLoadError(data.error || "Could not load careers.");
      setLoaded(true);
      return;
    }
    const next = data.openings ?? [];
    setOpenings(next);
    notifyCount(next);
    setLoadError(data.setupRequired ? "" : data.error && !res.ok ? data.error : "");
    setSetupNotice(
      data.setupRequired
        ? "Run supabase/blog_career.sql in Supabase once so careers save to the database."
        : ""
    );
    setLoaded(true);
  }

  useEffect(() => {
    if (!active || loaded) return;
    loadOpenings().catch(() => {
      setLoadError("Could not load careers.");
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
    setForm({ ...emptyForm, sortOrder: openings.length + 1 });
    setFormError("");
    setOpen(true);
  }

  function startEdit(opening: CareerOpening) {
    setEditingId(opening.id);
    setForm({
      title: opening.title,
      type: opening.type,
      location: opening.location,
      department: opening.department,
      description: opening.description,
      responsibilities: opening.responsibilities,
      requirements: opening.requirements,
      benefits: opening.benefits,
      experience: opening.experience,
      salary: opening.salary,
      imageUrl: opening.imageUrl,
      sortOrder: opening.sortOrder,
      published: opening.published,
    });
    setFormError("");
    setOpen(true);
  }

  async function saveOpening(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setBusy("save");

    const res = await fetch("/api/admin/career", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });

    const data = (await res.json()) as {
      opening?: CareerOpening;
      error?: string;
      setupRequired?: boolean;
    };
    setBusy(null);

    if (!res.ok || !data.opening) {
      setFormError(data.error || "Could not save opening.");
      if (data.setupRequired) {
        setSetupNotice("Run supabase/blog_career.sql in Supabase once, then save again.");
      }
      return;
    }

    const saved = data.opening;
    setOpenings((list) => {
      const withoutSeed =
        editingId && editingId.startsWith("seed-")
          ? list.filter((item) => item.id !== editingId)
          : list;
      const next =
        editingId && !editingId.startsWith("seed-")
          ? withoutSeed.map((item) => (item.id === editingId ? saved : item))
          : [
              saved,
              ...withoutSeed.filter(
                (item) => item.title.toLowerCase() !== saved.title.toLowerCase()
              ),
            ].sort((a, b) => a.sortOrder - b.sortOrder);
      notifyCount(next);
      return next;
    });

    const wasEdit = Boolean(editingId);
    setOpen(false);
    setEditingId(null);
    setSetupNotice("");
    setSuccessMsg(wasEdit ? "Career updated." : "Career opening added.");
    window.setTimeout(() => setSuccessMsg(""), 4000);
  }

  async function removeOpening(id: string) {
    if (!window.confirm("Delete this career opening?")) return;
    setBusy(id);
    const res = await fetch("/api/admin/career", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = (await res.json()) as { error?: string };
    setBusy(null);
    if (!res.ok) {
      setLoadError(data.error || "Could not delete opening.");
      return;
    }
    setOpenings((list) => {
      const next = list.filter((item) => item.id !== id);
      notifyCount(next);
      return next;
    });
  }

  async function togglePublished(opening: CareerOpening) {
    setBusy(opening.id);
    const res = await fetch("/api/admin/career", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: opening.id,
        title: opening.title,
        type: opening.type,
        location: opening.location,
        department: opening.department,
        description: opening.description,
        responsibilities: opening.responsibilities,
        requirements: opening.requirements,
        benefits: opening.benefits,
        experience: opening.experience,
        salary: opening.salary,
        imageUrl: opening.imageUrl,
        sortOrder: opening.sortOrder,
        published: !opening.published,
      }),
    });
    const data = (await res.json()) as { opening?: CareerOpening; error?: string };
    setBusy(null);
    if (!res.ok) {
      setLoadError(data.error || "Could not update status.");
      return;
    }
    const updated = data.opening ?? { ...opening, published: !opening.published };
    setOpenings((list) => {
      const withoutSeed = opening.id.startsWith("seed-")
        ? list.filter((item) => item.id !== opening.id)
        : list;
      const next = opening.id.startsWith("seed-")
        ? [
            updated,
            ...withoutSeed.filter(
              (i) => i.title.toLowerCase() !== updated.title.toLowerCase()
            ),
          ].sort((a, b) => a.sortOrder - b.sortOrder)
        : withoutSeed.map((item) => (item.id === opening.id ? updated : item));
      notifyCount(next);
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[13px] leading-relaxed text-navy/50">
          Full JDs with image, responsibilities, and benefits. Each role gets an automatic{" "}
          <strong className="font-semibold text-navy">Apply on WhatsApp</strong> button.
        </p>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand px-4 py-2.5 text-[13px] font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          New career
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard label="Total careers" value={stats.total} />
        <StatCard label="Published" value={stats.published} />
        <StatCard label="Unpublished" value={stats.unpublished} />
      </div>

      {setupNotice ? (
        <p className="mt-4 border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
          {setupNotice}
        </p>
      ) : null}
      {loadError ? (
        <p className="mt-4 border border-brand/20 bg-brand/5 px-4 py-3 text-sm text-brand">
          {loadError}
        </p>
      ) : null}
      {successMsg ? (
        <p className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {successMsg}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-navy">
          Openings <span className="text-brand">({openings.length})</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setLoaded(false);
            loadOpenings().finally(() => setLoaded(true));
          }}
          className="text-[12px] font-semibold text-navy/45 hover:text-brand"
        >
          Refresh
        </button>
      </div>

      <div className="mt-3">
        {!loaded && openings.length === 0 ? (
          <div className="border border-black/[0.06] bg-white px-5 py-10 text-center text-sm text-navy/45">
            Loading careers…
          </div>
        ) : (
          <CareerTable
            openings={openings}
            busy={busy}
            onToggle={togglePublished}
            onEdit={startEdit}
            onRemove={removeOpening}
          />
        )}
      </div>

      <AdminFormPanel
        open={open}
        onClose={closePanel}
        subtitle="Career"
        title={editingId ? "Edit career" : "New career"}
        wide
        footer={
          <button
            type="submit"
            form="career-form"
            disabled={busy === "save"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {busy === "save" ? "Saving…" : editingId ? "Save changes" : "Save opening"}
          </button>
        }
      >
        <CareerFormFields
          form={form}
          setForm={setForm}
          formError={formError}
          formId="career-form"
          onSubmit={saveOpening}
        />
      </AdminFormPanel>
    </div>
  );
}
