import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import BlogRichText from "@/components/blog/BlogRichText";
import { site } from "@/lib/site";
import {
  estimateReadTime,
  formatBlogDate,
  parseBlogSections,
} from "@/lib/blog";
import { getBlogSeedPosts } from "@/lib/blog-seed";
import { loadBlogPostBySlug, loadBlogPosts } from "@/lib/blog-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadBlogPostBySlug(slug);
  if (!post) {
    return { title: "Blog post - Pune Cabz" };
  }
  return {
    title: `${post.title} - Pune Cabz`,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return getBlogSeedPosts()
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadBlogPostBySlug(slug);
  if (!post) notFound();

  const sections = parseBlogSections(post.body);
  const related = (await loadBlogPosts({ publishedOnly: true }))
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const readTime = estimateReadTime(post.body);
  const dateLabel = formatBlogDate(post.createdAt);
  const toc = sections.filter((s) => s.heading);

  return (
    <>
      <article className="bg-white">
        <Container className="py-6 sm:py-8">
          <div className="mx-auto max-w-3xl">
          <Link
            href="/about/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-navy/45 hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Blog
          </Link>

          <header className="mt-4 border-b border-black/[0.08] pb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              {post.category}
            </p>
            <h1 className="mt-2 text-2xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-3xl">
              {post.title}
            </h1>
            <p className="mt-2.5 text-[15px] leading-relaxed text-navy/55">{post.excerpt}</p>
            <p className="mt-3 text-[12px] text-navy/40">
              Pune Cabz Team
              <span className="mx-2 text-navy/20">·</span>
              {dateLabel}
              <span className="mx-2 text-navy/20">·</span>
              {readTime}
            </p>
          </header>

          <div className="relative mt-5 aspect-[2/1] overflow-hidden bg-soft-dark">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width:768px) 100vw, 768px"
            />
          </div>

          {toc.length > 1 ? (
            <nav className="mt-6 border-b border-black/[0.08] pb-4" aria-label="Article sections">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/35">
                In this article
              </p>
              <ol className="mt-2 columns-1 gap-x-8 sm:columns-2">
                {toc.map((s, i) => (
                  <li key={s.id} className="mb-1 break-inside-avoid">
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] leading-snug text-navy/60 hover:text-brand"
                    >
                      <span className="tabular-nums text-navy/30">{i + 1}.</span> {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="mt-6 space-y-7">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                {s.heading ? (
                  <h2 className="text-lg font-extrabold tracking-tight text-navy sm:text-xl">
                    {s.heading}
                  </h2>
                ) : null}
                <div className={s.heading ? "mt-2.5" : undefined}>
                  <BlogRichText text={s.body || s.heading} />
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.08] pt-5">
            <div>
              <p className="text-sm font-semibold text-navy">Ready to book a cab?</p>
              <p className="text-[13px] text-navy/50">Confirmed in minutes on WhatsApp.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-brand px-4 py-2 text-[13px] font-semibold text-white"
              >
                Book on WhatsApp
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/book"
                className="inline-flex items-center gap-1.5 border border-black/[0.12] px-4 py-2 text-[13px] font-semibold text-navy"
              >
                All routes
              </Link>
            </div>
          </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-black/[0.06] bg-white">
          <Container className="py-7 sm:py-8">
            <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/35">
              More from the blog
            </p>
            <ul className="mt-3 divide-y divide-black/[0.06]">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/about/blog/${item.slug}`}
                    className="group flex items-start gap-4 py-3.5"
                  >
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-soft-dark sm:h-16 sm:w-24">
                      <Image
                        src={item.coverUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                        {item.category}
                      </p>
                      <h3 className="mt-0.5 text-[14px] font-bold leading-snug text-navy group-hover:text-brand sm:text-[15px]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-navy/40">
                        {formatBlogDate(item.createdAt)} · {estimateReadTime(item.body)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
