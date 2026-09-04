import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import AboutSubHero from "@/components/about/AboutSubHero";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Blog - Pune Cabz",
  description: "Travel tips, route guides, and updates from Pune Cabz.",
};

const featured = {
  title: "Pune to Mumbai by Cab: Complete Travel Guide 2025",
  date: "Jan 2025",
  readTime: "8 min read",
  category: "Travel Guide",
  excerpt:
    "Everything you need to know — best time to leave, route options, fares, expressway tips, and what to expect on the road from Pune to Mumbai.",
  href: "/about/blog/pune-to-mumbai",
  image: "/image2.jpeg",
};

const posts = [
  {
    title: "Weekend Getaways from Pune Under 5 Hours",
    date: "Jul 2025",
    readTime: "5 min read",
    category: "Travel Guide",
    excerpt: "Lonavala, Mahabaleshwar, and Konkan — quick escapes with an outstation cab.",
    href: "/about/blog",
    image: "/iamge5.png",
  },
  {
    title: "How Cab Fares Are Calculated at Pune Cabz",
    date: "Jun 2025",
    readTime: "4 min read",
    category: "Tips",
    excerpt: "Per-km rates, tolls, driver allowance — a plain-English breakdown of your bill.",
    href: "/about/blog",
    image: "/image3.png",
  },
  {
    title: "Pune to Shirdi: Best Route & Travel Tips",
    date: "May 2025",
    readTime: "6 min read",
    category: "Route Guide",
    excerpt: "Plan your Shirdi pilgrimage from Pune — distance, stops, cab options and timings.",
    href: "/about/blog",
    image: "/image7.png",
  },
  {
    title: "Monsoon Travel in Maharashtra: Stay Safe",
    date: "Apr 2025",
    readTime: "5 min read",
    category: "Safety",
    excerpt: "Ghat roads, expressway fog, and rain — how to travel safely during monsoon season.",
    href: "/about/blog",
    image: "/image6.png",
  },
];

export default function BlogPage() {
  return (
    <>
      <AboutSubHero
        eyebrow="Blog"
        title="Routes, tips & travel stories"
        description="Guides and updates for smarter travel across Pune and Maharashtra."
        image="/image1.jpeg"
        imageAlt="Pune Cabz travel blog"
      />

      <section className="bg-white page-section">
        <Container>

          {/* ── FEATURED ── */}
          <Reveal>
            <Link href={featured.href} className="group mb-10 block">
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-[#f7f7f8] lg:grid-cols-[1.1fr_1fr]">
                {/* image */}
                <div className="relative h-60 overflow-hidden lg:h-80">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width:1024px) 100vw, 55vw"
                    priority
                  />
                </div>
                {/* text */}
                <div className="flex flex-col justify-center px-7 py-8 sm:px-9">
                  <span className="w-fit rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand">
                    {featured.category}
                  </span>
                  <h2 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-navy sm:text-2xl">
                    {featured.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy/55">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-navy/35">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-dark">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* ── DIVIDER ── */}
          <Reveal>
            <div className="mb-7 flex items-center gap-4">
              <span className="text-sm font-bold text-navy">Latest posts</span>
              <div className="h-px flex-1 bg-black/[0.06]" />
            </div>
          </Reveal>

          {/* ── GRID ── */}
          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <StaggerItem key={post.title}>
                <Link href={post.href} className="group block">
                  {/* image */}
                  <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-soft-dark">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-navy backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  {/* text — no card box, clean typography */}
                  <div className="mt-3 px-1">
                    <div className="flex items-center gap-3 text-[11px] text-navy/35">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-sm font-bold leading-snug text-navy group-hover:text-brand transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-navy/50">{post.excerpt}</p>
                    <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                      Read more
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* ── BOTTOM CTA ── */}
          <Reveal>
            <div className="mt-12 flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-navy/45">Have a travel topic you'd like us to cover?</p>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                Suggest a topic
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>

        </Container>
      </section>
    </>
  );
}
