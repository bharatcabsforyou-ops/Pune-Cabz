import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { BLOG_SELECT, mapBlogRow, type BlogRow } from "@/lib/blog-db";
import { getBlogSeedPosts } from "@/lib/blog-seed";
import { mergeBlogPosts, sortBlogPosts, type BlogPost } from "@/lib/blog";

export async function loadBlogPosts(opts?: { publishedOnly?: boolean }): Promise<BlogPost[]> {
  const seeds = getBlogSeedPosts();
  const filterPublished = (list: BlogPost[]) =>
    opts?.publishedOnly ? list.filter((p) => p.published) : list;

  if (!isSupabaseConfigured()) {
    return filterPublished(seeds);
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("blog_posts")
      .select(BLOG_SELECT)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (opts?.publishedOnly) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error) {
      return filterPublished(seeds);
    }

    const fromDb = sortBlogPosts((data as BlogRow[] | null)?.map(mapBlogRow) ?? []);
    return filterPublished(mergeBlogPosts(fromDb, seeds));
  } catch {
    return filterPublished(seeds);
  }
}

export async function loadBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogPosts({ publishedOnly: true });
  return posts.find((p) => p.slug === slug) ?? null;
}
