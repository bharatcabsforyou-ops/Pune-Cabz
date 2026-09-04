import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin, Tag, User } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pune to Mumbai by Cab: Complete Travel Guide 2025 - Pune Cabz",
  description:
    "Everything you need to know about travelling from Pune to Mumbai by cab — best time to leave, route options, fares, tips and what to expect on the road.",
};

const sections = [
  {
    id: "overview",
    heading: "Route Overview",
    body: `The Pune–Mumbai corridor is one of the busiest intercity routes in Maharashtra, covering approximately 150 km via the Mumbai–Pune Expressway (NH48). By cab, the journey typically takes 2.5 to 3.5 hours depending on traffic, time of departure, and your exact pickup and drop locations within each city.

The expressway is a six-lane divided highway with well-maintained rest stops, fuel stations, and food courts. It passes through the scenic Western Ghats, offering views of the Sahyadri hills — especially beautiful during and just after the monsoon season.`,
  },
  {
    id: "best-time",
    heading: "Best Time to Leave Pune",
    body: `Traffic on the Pune–Mumbai Expressway follows predictable patterns. Here is what to expect at different departure times:

**Early morning (5 am – 7 am):** The best window. Roads are clear, you avoid both Pune and Mumbai peak-hour traffic, and you reach Mumbai before the city wakes up. Ideal for business travellers and early flights.

**Mid-morning (9 am – 11 am):** Decent option on weekdays once Pune's morning rush clears. Avoid this slot on Mondays when Mumbai-bound traffic is heavy.

**Afternoon (12 pm – 3 pm):** Generally smooth. Light traffic on the expressway. Good for leisure travellers.

**Evening (4 pm – 8 pm):** The worst window, especially on Fridays and Sundays. Expressway traffic can back up near Khopoli and the Mumbai entry points. Add 1–2 hours to your estimate.

**Night (10 pm – 5 am):** Fast and smooth, but factor in night charges on your cab fare (applicable after 10 pm).`,
  },
  {
    id: "route-options",
    heading: "Route Options",
    body: `There are two main routes between Pune and Mumbai:

**Mumbai–Pune Expressway (Recommended):** The fastest and most comfortable option. Toll charges apply — currently around ₹285 for a car (one way). The road is well-lit, patrolled, and has emergency services.

**Old Mumbai–Pune Highway (NH4 via Khandala):** Scenic but slower, especially through the ghats. Takes 4–5 hours. Worth considering if you want to stop at Lonavala or Khandala for a break. Not recommended during heavy rain.

**Via Katraj Bypass:** Some drivers use this to avoid Pune city traffic when starting from south Pune. Adds minimal distance but saves 20–30 minutes during peak hours.`,
  },
  {
    id: "fares",
    heading: "Cab Fares & What's Included",
    body: `Pune Cabz charges transparent per-km rates with no hidden markups. Here is a typical fare breakdown for Pune to Mumbai:

- **Sedan (Dzire / Etios):** ₹12/km × ~155 km = approx. ₹1,860 + toll (₹285) + driver allowance
- **SUV (Ertiga / Rumion):** ₹15/km × ~155 km = approx. ₹2,325 + toll + driver allowance
- **Innova Crysta (7+1):** ₹22/km × ~155 km = approx. ₹3,410 + toll + driver allowance

**What is included:** Fuel, driver, vehicle. **Charged separately:** Toll, parking, driver allowance (₹250–₹400 for outstation), night charges if applicable.

Always confirm the final quote on WhatsApp before your trip — our team sends a clear breakdown with no surprises.`,
  },
  {
    id: "tips",
    heading: "Travel Tips",
    body: `A few things that make the Pune–Mumbai cab ride smoother:

**Book at least a day ahead** for weekend travel. Friday evenings and Sunday afternoons see high demand — last-minute bookings may not be available.

**Share your live location** with a family member once you board. Our drivers are verified, but it is always a good habit.

**Carry cash for tolls** — while our drivers handle toll payments, having ₹300–₹400 handy avoids any confusion.

**Rest stops:** Expressway has good food courts near Khopoli (roughly halfway). Popular stops include McDonald's, Café Coffee Day, and local dhabas. Ask your driver to stop if needed.

**Monsoon travel:** The expressway is generally safe during rains, but the old highway through the ghats can get foggy and slippery. Stick to the expressway June–September.

**Airport pickups/drops:** If you are heading to Mumbai airport (CSIA, Terminal 1 or 2), factor in 45–60 minutes extra from the expressway exit to the terminal during peak hours.`,
  },
  {
    id: "why-cab",
    heading: "Why Choose a Cab Over Train or Bus",
    body: `Trains and buses are popular on this route, but a private cab offers advantages that are hard to match:

**Door-to-door convenience:** No auto-rickshaw to the station, no luggage struggle, no platform waiting. Your cab picks you up from home and drops you at your exact destination.

**Flexible timing:** Trains run on fixed schedules. A cab leaves when you are ready — whether that is 4 am or 11 pm.

**Group travel value:** Split a cab fare among 4 passengers and the per-person cost often beats a train ticket, especially for AC travel.

**Luggage freedom:** No weight limits, no overhead rack battles. Load as much as your vehicle allows.

**Privacy and comfort:** Your own space for the entire journey — ideal for families, business travellers, and anyone who values a quiet ride.`,
  },
];

const relatedPosts = [
  {
    title: "Weekend Getaways from Pune Under 5 Hours",
    excerpt: "Lonavala, Mahabaleshwar, and Konkan — quick escapes with an outstation cab.",
    date: "Jul 2025",
    category: "Travel Guide",
    href: "/about/blog",
    image: "/iamge5.png",
  },
  {
    title: "How Cab Fares Are Calculated at Pune Cabz",
    excerpt: "Per-km rates, tolls, driver allowance — a plain-English breakdown of your bill.",
    date: "Jun 2025",
    category: "Tips",
    href: "/about/blog",
    image: "/image3.png",
  },
];

export default function PuneToMumbaiBlogPost() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative border-b border-black/[0.06]">
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src="/image2.jpeg"
            alt="Pune to Mumbai expressway cab journey"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <Container className="pb-8 sm:pb-12">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  <Tag className="h-3 w-3" />
                  Travel Guide
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  8 min read
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                Pune to Mumbai by Cab: Complete Travel Guide 2025
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-white/60">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Pune Cabz Team
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  January 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Pune → Mumbai
                </span>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-[#fafafa] py-8 sm:py-12">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">

            {/* main article */}
            <article>
              {/* back link */}
              <Link
                href="/about/blog"
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/50 hover:text-brand"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              {/* table of contents */}
              <Reveal>
                <div className="mb-8 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[var(--card-shadow)]">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand">In this guide</p>
                  <ul className="mt-3 space-y-2">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="flex items-center gap-2 text-sm text-navy/65 hover:text-brand"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-brand/40" />
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* sections */}
              <div className="space-y-6">
                {sections.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.04}>
                    <div
                      id={s.id}
                      className="scroll-mt-24 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[var(--card-shadow)] sm:p-7"
                    >
                      <h2 className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-navy">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/[0.08] text-xs font-bold text-brand">
                          {i + 1}
                        </span>
                        {s.heading}
                      </h2>
                      <div className="mt-4 space-y-3">
                        {s.body.split("\n\n").map((para, j) => {
                          if (para.startsWith("**") && para.includes(":**")) {
                            const [boldPart, ...rest] = para.split(":**");
                            return (
                              <p key={j} className="text-[15px] leading-relaxed text-navy/65">
                                <strong className="font-bold text-navy">
                                  {boldPart.replace(/\*\*/g, "")}:
                                </strong>
                                {rest.join(":**")}
                              </p>
                            );
                          }
                          return (
                            <p key={j} className="text-[15px] leading-relaxed text-navy/65">
                              {para}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* CTA */}
              <Reveal>
                <div className="mt-6 rounded-2xl border border-brand/15 bg-brand/[0.04] p-6 text-center">
                  <p className="text-base font-bold text-navy">Ready to book your Pune → Mumbai cab?</p>
                  <p className="mt-1 text-sm text-navy/55">
                    Get a confirmed cab in minutes — no registration needed.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex px-6 py-2.5 btn-shine"
                    >
                      Book on WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link href="/book" className="btn-secondary inline-flex px-6 py-2.5">
                      View all routes
                    </Link>
                  </div>
                </div>
              </Reveal>
            </article>

            {/* sidebar */}
            <aside className="space-y-5">
              {/* quick facts */}
              <Reveal>
                <div className="sticky top-24 space-y-5">
                  <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[var(--card-shadow)]">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">Quick Facts</p>
                    <ul className="mt-4 space-y-3">
                      {[
                        { label: "Distance", value: "~150 km" },
                        { label: "Duration", value: "2.5 – 3.5 hrs" },
                        { label: "Best time", value: "5 am – 7 am" },
                        { label: "Sedan fare", value: "From ₹1,860" },
                        { label: "Toll (one way)", value: "~₹285" },
                        { label: "Route", value: "NH48 Expressway" },
                      ].map((f) => (
                        <li key={f.label} className="flex items-center justify-between gap-2 text-sm">
                          <span className="text-navy/50">{f.label}</span>
                          <span className="font-semibold text-navy">{f.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* book CTA */}
                  <div className="rounded-2xl bg-navy p-5 text-center">
                    <p className="text-sm font-bold text-white">Book this route</p>
                    <p className="mt-1 text-xs text-white/55">Confirmed in minutes on WhatsApp</p>
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-bold text-white"
                    >
                      Book Now
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={site.phoneHref}
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-2.5 text-sm font-medium text-white/70 hover:text-white"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            </aside>

          </div>
        </Container>
      </section>

      {/* ── RELATED POSTS ── */}
      <section className="border-t border-black/[0.04] bg-white py-8 sm:py-10">
        <Container>
          <Reveal>
            <p className="section-eyebrow">More from the blog</p>
            <h2 className="section-title mt-2 text-left">Related articles</h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <Reveal key={post.title}>
                <Link href={post.href} className="pro-card-interactive group block overflow-hidden rounded-2xl">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-navy/40">{post.date}</p>
                    <h3 className="mt-1 text-sm font-bold text-navy">{post.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-navy/55">{post.excerpt}</p>
                    <span className="card-cta mt-3 inline-flex">Read more</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
