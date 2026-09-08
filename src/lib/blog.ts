export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverUrl: string;
  category: string;
  published: boolean;
  sortOrder: number;
  createdAt?: string;
  isSeed?: boolean;
};

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverUrl: string;
  category: string;
  published: boolean;
  sortOrder: number;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isPersistedBlogId(id: string) {
  return UUID_RE.test(id);
}

export function slugifyBlogTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function estimateReadTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function formatBlogDate(iso?: string) {
  if (!iso) return "Recent";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Recent";
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export function sortBlogPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  });
}

export function mergeBlogPosts(fromDb: BlogPost[], seeds: BlogPost[]) {
  const bySlug = new Set(fromDb.map((p) => p.slug.toLowerCase()));
  const extras = seeds.filter((s) => !bySlug.has(s.slug.toLowerCase()));
  return sortBlogPosts([...fromDb, ...extras]);
}

export function validateBlogPostInput(input: Partial<BlogPostInput>) {
  const title = String(input.title ?? "").trim();
  const slugRaw = String(input.slug ?? "").trim() || slugifyBlogTitle(title);
  const slug = slugifyBlogTitle(slugRaw.replace(/_/g, "-"));
  const excerpt = String(input.excerpt ?? "").trim();
  const body = String(input.body ?? "").trim();
  const coverUrl = String(input.coverUrl ?? "").trim() || "/image2.jpeg";
  const category = String(input.category ?? "").trim() || "Travel Tips";
  const sortOrder = Number(input.sortOrder ?? 0);
  const published = Boolean(input.published);

  if (title.length < 4 || title.length > 140) {
    return { error: "Title must be 4–140 characters." };
  }
  if (slug.length < 3 || slug.length > 80) {
    return { error: "Slug must be 3–80 characters (e.g. pune-to-mumbai)." };
  }
  if (excerpt.length < 20 || excerpt.length > 400) {
    return { error: "Excerpt must be 20–400 characters." };
  }
  if (body.length < 80 || body.length > 50000) {
    return { error: "Body must be at least 80 characters." };
  }
  if (category.length < 2 || category.length > 40) {
    return { error: "Category must be 2–40 characters." };
  }
  if (coverUrl.length < 4 || coverUrl.length > 500) {
    return { error: "Cover image is required." };
  }
  if (!Number.isFinite(sortOrder) || sortOrder < 0 || sortOrder > 999) {
    return { error: "Sort order must be between 0 and 999." };
  }

  return {
    data: { title, slug, excerpt, body, coverUrl, category, sortOrder, published },
  };
}

/** Split markdown-ish body into ## sections for article layout. */
export function parseBlogSections(body: string) {
  const text = body.replace(/\r\n/g, "\n").trim();
  if (!text) return [] as { id: string; heading: string; body: string }[];

  const parts = text.split(/^##\s+/m).filter(Boolean);
  if (parts.length === 1 && !text.startsWith("##")) {
    return [{ id: "article", heading: "", body: text }];
  }

  return parts.map((part, index) => {
    const nl = part.indexOf("\n");
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const sectionBody = (nl === -1 ? "" : part.slice(nl + 1)).trim();
    const id =
      slugifyBlogTitle(heading) || `section-${index + 1}`;
    return { id, heading, body: sectionBody };
  });
}
