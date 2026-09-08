"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminFormPanel, {
  AdminField,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/AdminFormPanel";
import {
  estimateReadTime,
  slugifyBlogTitle,
  type BlogPost,
  type BlogPostInput,
} from "@/lib/blog";

const emptyForm: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverUrl: "/image2.jpeg",
  category: "Travel Guide",
  sortOrder: 0,
  published: true,
};

const categorySuggestions = [
  "Travel Guide",
  "Route Guide",
  "Tips",
  "Safety",
  "Updates",
];

function CoverThumb({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill className="object-cover" sizes="48px" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-black/[0.08] bg-white px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/40">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-navy">{value}</p>
    </div>
  );
}

function BlogFormFields({
  form,
  setForm,
  formError,
  formId,
  onSubmit,
  editingId,
}: {
  form: BlogPostInput;
  setForm: React.Dispatch<React.SetStateAction<BlogPostInput>>;
  formError: string;
  formId: string;
  onSubmit: (e: React.FormEvent) => void;
  editingId: string | null;
}) {
  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-4">
      <AdminField label="Title">
        <input
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((f) => ({
              ...f,
              title,
              slug: editingId ? f.slug : slugifyBlogTitle(title),
            }));
          }}
          className={adminInputClass}
          required
        />
      </AdminField>
      <AdminField label="URL slug">
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-[12px] text-navy/40">/about/blog/</span>
          <input
            value={form.slug}
            onChange={(e) =>
              setForm((f) => ({ ...f, slug: slugifyBlogTitle(e.target.value) }))
            }
            className={adminInputClass}
            required
          />
        </div>
      </AdminField>
      <AdminImageUpload
        label="Cover image"
        folder="blog"
        value={form.coverUrl}
        onChange={(coverUrl) => setForm((f) => ({ ...f, coverUrl }))}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Category">
          <input
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            list="blog-categories"
            className={adminInputClass}
            required
          />
          <datalist id="blog-categories">
            {categorySuggestions.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
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
      <AdminField label="Excerpt (list preview)">
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={3}
          className={adminTextareaClass}
          required
        />
      </AdminField>
      <AdminField label="Article body">
        <textarea
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          rows={16}
          className={`${adminTextareaClass} font-mono text-[13px] leading-relaxed`}
          placeholder={"## Section heading\nParagraph text…\n\n**Bold tip:** more text\n- Bullet point"}
          required
        />
        <p className="mt-1.5 text-[11px] text-navy/40">
          Use <code className="text-navy/55">## Heading</code> for sections,{" "}
          <code className="text-navy/55">**bold**</code>, and{" "}
          <code className="text-navy/55">-</code> bullets. Est. {estimateReadTime(form.body)}.
        </p>
      </AdminField>
      <label className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-[#fafbfc] px-3.5 py-3">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          className="h-4 w-4 rounded border-black/20 text-brand focus:ring-brand"
        />
        <span className="text-sm font-medium text-navy">Published on blog page</span>
      </label>
      {formError ? <p className="text-sm text-brand">{formError}</p> : null}
    </form>
  );
}

function BlogTable({
  posts,
  busy,
  onToggle,
  onEdit,
  onRemove,
}: {
  posts: BlogPost[];
  busy: string | null;
  onToggle: (post: BlogPost) => void;
  onEdit: (post: BlogPost) => void;
  onRemove: (id: string) => void;
}) {
  if (posts.length === 0) {
    return (
      <div className="border border-dashed border-black/[0.12] bg-white px-5 py-12 text-center">
        <p className="text-sm font-semibold text-navy">No blog posts yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-navy/50">
          Click <strong>New blog</strong> to publish your first article.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-black/[0.08] bg-white">
      <table className="w-full min-w-[760px] text-left text-[13px]">
        <thead className="border-b border-black/[0.06] bg-[#fafbfc] text-[11px] font-semibold uppercase tracking-wider text-navy/40">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Post</th>
            <th className="px-4 py-2.5 font-semibold">Category</th>
            <th className="px-4 py-2.5 font-semibold">Slug</th>
            <th className="px-4 py-2.5 font-semibold">Sort</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.05]">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-[#fafbfc]">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden bg-surface">
                    <CoverThumb src={post.coverUrl} alt={post.title} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-navy">{post.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-navy/40">
                      {estimateReadTime(post.body)}
                      {post.isSeed ? " · Sample" : ""}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-navy/65">{post.category}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-navy/50">{post.slug}</td>
              <td className="px-4 py-3 tabular-nums text-navy/50">{post.sortOrder}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block text-[11px] font-semibold uppercase tracking-wide ${
                    post.published ? "text-emerald-700" : "text-navy/40"
                  }`}
                >
                  {post.published ? "Published" : "Unpublished"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <button
                    type="button"
                    disabled={busy === post.id}
                    onClick={() => onToggle(post)}
                    className="px-2 py-1 text-[12px] font-semibold text-navy/55 hover:text-navy disabled:opacity-60"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(post)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-brand hover:underline"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={busy === post.id}
                    onClick={() => onRemove(post.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-navy/40 hover:text-brand disabled:opacity-60"
                    aria-label={`Delete ${post.title}`}
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

export default function AdminBlog({
  onCountChange,
  active = true,
}: {
  onCountChange?: (publishedCount: number) => void;
  active?: boolean;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [setupNotice, setSetupNotice] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPostInput>(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.published).length;
    return { total, published, unpublished: total - published };
  }, [posts]);

  function notifyCount(next: BlogPost[]) {
    onCountChange?.(next.filter((p) => p.published).length);
  }

  async function loadPosts() {
    const res = await fetch("/api/admin/blog");
    const data = (await res.json()) as {
      posts?: BlogPost[];
      error?: string;
      setupRequired?: boolean;
    };
    if (!res.ok && !data.posts) {
      setLoadError(data.error || "Could not load blog posts.");
      setLoaded(true);
      return;
    }
    const next = data.posts ?? [];
    setPosts(next);
    notifyCount(next);
    setLoadError(data.setupRequired ? "" : data.error && !res.ok ? data.error : "");
    setSetupNotice(
      data.setupRequired
        ? "Run supabase/blog_career.sql in Supabase once so blog posts save to the database."
        : ""
    );
    setLoaded(true);
  }

  useEffect(() => {
    if (!active || loaded) return;
    loadPosts().catch(() => {
      setLoadError("Could not load blog posts.");
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
    setForm({ ...emptyForm, sortOrder: posts.length + 1 });
    setFormError("");
    setOpen(true);
  }

  function startEdit(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      coverUrl: post.coverUrl,
      category: post.category,
      sortOrder: post.sortOrder,
      published: post.published,
    });
    setFormError("");
    setOpen(true);
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setBusy("save");

    const res = await fetch("/api/admin/blog", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });

    const data = (await res.json()) as {
      post?: BlogPost;
      error?: string;
      setupRequired?: boolean;
    };
    setBusy(null);

    if (!res.ok || !data.post) {
      setFormError(data.error || "Could not save post.");
      if (data.setupRequired) {
        setSetupNotice("Run supabase/blog_career.sql in Supabase once, then save again.");
      }
      return;
    }

    const saved = data.post;
    setPosts((list) => {
      const withoutSeed =
        editingId && editingId.startsWith("seed-")
          ? list.filter((item) => item.id !== editingId)
          : list;
      const next = editingId && !editingId.startsWith("seed-")
        ? withoutSeed.map((item) => (item.id === editingId ? saved : item))
        : [saved, ...withoutSeed.filter((item) => item.slug !== saved.slug)].sort(
            (a, b) => a.sortOrder - b.sortOrder
          );
      notifyCount(next);
      return next;
    });

    const wasEdit = Boolean(editingId);
    setOpen(false);
    setEditingId(null);
    setSetupNotice("");
    setSuccessMsg(wasEdit ? "Blog post updated." : "Blog post added.");
    window.setTimeout(() => setSuccessMsg(""), 4000);
  }

  async function removePost(id: string) {
    if (!window.confirm("Delete this blog post?")) return;
    setBusy(id);
    const res = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = (await res.json()) as { error?: string };
    setBusy(null);
    if (!res.ok) {
      setLoadError(data.error || "Could not delete post.");
      return;
    }
    setPosts((list) => {
      const next = list.filter((item) => item.id !== id);
      notifyCount(next);
      return next;
    });
  }

  async function togglePublished(post: BlogPost) {
    setBusy(post.id);
    const res = await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        coverUrl: post.coverUrl,
        category: post.category,
        sortOrder: post.sortOrder,
        published: !post.published,
      }),
    });
    const data = (await res.json()) as { post?: BlogPost; error?: string };
    setBusy(null);
    if (!res.ok) {
      setLoadError(data.error || "Could not update status.");
      return;
    }
    const updated = data.post ?? { ...post, published: !post.published };
    setPosts((list) => {
      const withoutSeed = post.id.startsWith("seed-")
        ? list.filter((item) => item.id !== post.id)
        : list;
      const next = post.id.startsWith("seed-")
        ? [updated, ...withoutSeed.filter((i) => i.slug !== updated.slug)].sort(
            (a, b) => a.sortOrder - b.sortOrder
          )
        : withoutSeed.map((item) => (item.id === post.id ? updated : item));
      notifyCount(next);
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[13px] leading-relaxed text-navy/50">
          Publish travel guides and tips on <strong className="font-semibold text-navy">/about/blog</strong>.
          Use proper article sections in the body.
        </p>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand px-4 py-2.5 text-[13px] font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          New blog
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard label="Total blogs" value={stats.total} />
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
          Posts <span className="text-brand">({posts.length})</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setLoaded(false);
            loadPosts().finally(() => setLoaded(true));
          }}
          className="text-[12px] font-semibold text-navy/45 hover:text-brand"
        >
          Refresh
        </button>
      </div>

      <div className="mt-3">
        {!loaded && posts.length === 0 ? (
          <div className="border border-black/[0.06] bg-white px-5 py-10 text-center text-sm text-navy/45">
            Loading posts…
          </div>
        ) : (
          <BlogTable
            posts={posts}
            busy={busy}
            onToggle={togglePublished}
            onEdit={startEdit}
            onRemove={removePost}
          />
        )}
      </div>

      <AdminFormPanel
        open={open}
        onClose={closePanel}
        subtitle="Blog"
        title={editingId ? "Edit blog post" : "New blog post"}
        wide
        footer={
          <button
            type="submit"
            form="blog-form"
            disabled={busy === "save"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {busy === "save" ? "Saving…" : editingId ? "Save changes" : "Publish post"}
          </button>
        }
      >
        <BlogFormFields
          form={form}
          setForm={setForm}
          formError={formError}
          formId="blog-form"
          onSubmit={savePost}
          editingId={editingId}
        />
      </AdminFormPanel>
    </div>
  );
}
