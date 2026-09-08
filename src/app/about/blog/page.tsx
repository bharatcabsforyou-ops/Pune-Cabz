import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { estimateReadTime, formatBlogDate } from "@/lib/blog";
import { loadBlogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog - Pune Cabz",
  description: "Travel tips, route guides, and updates from Pune Cabz.",
};

export default async function BlogPage() {
  const posts = await loadBlogPosts({ publishedOnly: true });
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="border-b border-black/[0.06] bg-white">
        <Container className="py-8 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Blog</p>
          <h1 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Routes, tips & travel stories
          </h1>
          <p className="mt-2 max-w-lg text-[15px] leading-snug text-navy/55">
            Guides and updates for smarter travel across Pune and Maharashtra.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-8 sm:py-10">
          {!featured ? (
            <p className="py-10 text-center text-sm text-navy/50">
              New articles coming soon. Check back shortly.
            </p>
          ) : (
            <div className="space-y-10">
              <Reveal>
                <Link href={`/about/blog/${featured.slug}`} className="group block">
                  <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-8">
                    <div className="relative aspect-[16/10] overflow-hidden bg-soft-dark">
                      <Image
                        src={featured.coverUrl}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width:1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center lg:py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                        {featured.category}
                      </p>
                      <h2 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-navy sm:text-2xl group-hover:text-brand">
                        {featured.title}
                      </h2>
                      <p className="mt-2 text-[15px] leading-relaxed text-navy/55">
                        {featured.excerpt}
                      </p>
                      <p className="mt-3 text-[12px] text-navy/40">
                        {formatBlogDate(featured.createdAt)}
                        <span className="mx-2 text-navy/20">·</span>
                        {estimateReadTime(featured.body)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>

              {rest.length > 0 ? (
                <div>
                  <p className="border-b border-black/[0.08] pb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy/40">
                    More posts
                  </p>
                  <ul className="divide-y divide-black/[0.06]">
                    {rest.map((post) => (
                      <li key={post.id}>
                        <Link
                          href={`/about/blog/${post.slug}`}
                          className="group grid grid-cols-[88px_1fr] items-start gap-4 py-4 sm:grid-cols-[120px_1fr] sm:gap-5"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-soft-dark">
                            <Image
                              src={post.coverUrl}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                              sizes="120px"
                            />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                              {post.category}
                            </p>
                            <h3 className="mt-1 text-[15px] font-bold leading-snug text-navy group-hover:text-brand sm:text-base">
                              {post.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-navy/50">
                              {post.excerpt}
                            </p>
                            <p className="mt-1.5 text-[11px] text-navy/35">
                              {formatBlogDate(post.createdAt)}
                              <span className="mx-1.5 text-navy/20">·</span>
                              {estimateReadTime(post.body)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="border-t border-black/[0.06] pt-5 text-center text-[13px] text-navy/45">
                Have a travel topic to cover?{" "}
                <Link href="/contact" className="font-semibold text-brand hover:underline">
                  Suggest a topic
                </Link>
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
