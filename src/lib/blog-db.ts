import type { BlogPost, BlogPostInput } from "@/lib/blog";

export const BLOG_SELECT =
  "id, title, slug, excerpt, body, cover_url, category, published, sort_order, created_at";

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  category: string;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export function mapBlogRow(row: BlogRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body,
    coverUrl: row.cover_url?.trim() || "/image2.jpeg",
    category: row.category,
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    isSeed: false,
  };
}

export function blogDbPayload(input: BlogPostInput) {
  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    body: input.body,
    cover_url: input.coverUrl,
    category: input.category,
    published: input.published,
    sort_order: input.sortOrder,
  };
}

export function isMissingBlogTable(message: string) {
  const lower = message.toLowerCase();
  return (
    lower.includes("blog_posts") ||
    lower.includes("does not exist") ||
    lower.includes("schema cache")
  );
}
