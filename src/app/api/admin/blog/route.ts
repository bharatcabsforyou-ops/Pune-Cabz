import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { BLOG_SELECT, blogDbPayload, isMissingBlogTable, mapBlogRow, type BlogRow } from "@/lib/blog-db";
import { getBlogSeedPosts } from "@/lib/blog-seed";
import {
  isPersistedBlogId,
  mergeBlogPosts,
  sortBlogPosts,
  validateBlogPostInput,
  type BlogPostInput,
} from "@/lib/blog";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_SELECT)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({
        posts: getBlogSeedPosts(),
        error: error.message,
        setupRequired: isMissingBlogTable(error.message),
      });
    }

    return NextResponse.json({
      posts: mergeBlogPosts(
        sortBlogPosts((data as BlogRow[] | null)?.map(mapBlogRow) ?? []),
        getBlogSeedPosts()
      ),
    });
  } catch {
    return NextResponse.json({
      posts: getBlogSeedPosts(),
      error: "Supabase service role key is missing — showing sample blog.",
      setupRequired: true,
    });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: Partial<BlogPostInput> = {};
  try {
    payload = (await request.json()) as Partial<BlogPostInput>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validated = validateBlogPostInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(blogDbPayload(validated.data))
      .select(BLOG_SELECT)
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          setupRequired: isMissingBlogTable(error.message),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: mapBlogRow(data as BlogRow) });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing.", setupRequired: true },
      { status: 503 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  let payload: Partial<BlogPostInput> = {};
  try {
    const body = (await request.json()) as { id?: string } & Partial<BlogPostInput>;
    id = String(body.id ?? "");
    payload = body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Post id is required." }, { status: 400 });
  }

  const validated = validateBlogPostInput(payload);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const dbPayload = blogDbPayload(validated.data);

    if (!isPersistedBlogId(id)) {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(dbPayload)
        .select(BLOG_SELECT)
        .single();
      if (error) {
        return NextResponse.json(
          {
            error: error.message,
            setupRequired: isMissingBlogTable(error.message),
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ post: mapBlogRow(data as BlogRow) });
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(dbPayload)
      .eq("id", id)
      .select(BLOG_SELECT)
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          setupRequired: isMissingBlogTable(error.message),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: mapBlogRow(data as BlogRow) });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing.", setupRequired: true },
      { status: 503 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id = "";
  try {
    const body = (await request.json()) as { id?: string };
    id = String(body.id ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Post id is required." }, { status: 400 });
  }

  if (!isPersistedBlogId(id)) {
    return NextResponse.json(
      {
        error:
          "Built-in sample posts can’t be deleted. Edit & save to store a copy, then manage that row.",
      },
      { status: 400 }
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Supabase service role key is missing.", setupRequired: true },
      { status: 503 }
    );
  }
}
