import type { Metadata } from "next";
import Image from "next/image";
import { MessageSquareQuote, Star } from "lucide-react";
import Container from "@/components/Container";
import AnimatedStat from "@/components/AnimatedStat";
import Testimonial from "@/components/Testimonial";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Testimonials - Pune Cabz",
  description: "Real reviews from Pune Cabz riders across Maharashtra routes.",
};

const floatingReviews = [
  { name: "Priya S.", route: "Pune → Mumbai", text: "Smooth ride, on time!", rating: 5 },
  { name: "Rahul M.", route: "Pune → Goa", text: "Best cab service ever.", rating: 5 },
  { name: "Anjali K.", route: "Pune → Shirdi", text: "Very comfortable journey.", rating: 5 },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-navy">
        {/* background image */}
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1800"
          alt="Happy travellers"
          fill
          className="object-cover object-center opacity-20"
          priority
          sizes="100vw"
        />

        {/* gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-brand/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

        {/* dot grid texture */}
        <div className="absolute inset-0 bg-dot-grid text-white/[0.03]" />

        <Container className="relative py-16 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

            {/* left — text */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                <MessageSquareQuote className="h-3.5 w-3.5 text-brand" />
                Testimonials
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Trusted by riders
                <span className="block text-brand">across Maharashtra</span>
              </h1>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
                Thousands of happy passengers. Real reviews from real trips — honest ratings on every route we serve.
              </p>

              {/* animated stats row */}
              <div className="mt-8 flex flex-wrap gap-6">
                <AnimatedStat value={4.9} decimals={1} label="Average rating" />
                <AnimatedStat value={2000} suffix="+" label="Happy riders" />
                <AnimatedStat value={98} suffix="%" label="On-time trips" />
              </div>

              {/* 5 stars */}
              <div className="mt-6 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm font-semibold text-white/60">5.0 on WhatsApp</span>
              </div>
            </div>

            {/* right — floating review cards */}
            <div className="relative hidden lg:flex lg:flex-col lg:gap-3">
              {floatingReviews.map((r, i) => (
                <div
                  key={r.name}
                  className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md"
                  style={{ transform: `translateX(${i % 2 === 0 ? "0" : "2rem"})` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                      {r.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{r.name}</p>
                      <p className="text-[11px] text-white/50">{r.route}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">{r.text}</p>
                </div>
              ))}

              {/* glow blob */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
            </div>

          </div>
        </Container>
      </section>

      <Testimonial />
      <ReviewsSection />
    </>
  );
}
