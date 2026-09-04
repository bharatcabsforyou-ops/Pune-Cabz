import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, Plane, Star, Users } from "lucide-react";
import Container from "@/components/Container";
import AnimatedStat from "@/components/AnimatedStat";
import FeatureIcon from "@/components/FeatureIcon";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hotels, Stay & Flights - Pune Cabz",
  description:
    "Hotel booking and flight reservations with Pune Cabz — cab, hotel and flight through one point of contact.",
};

const hotelOfferings = [
  "Domestic and international hotel reservations",
  "Access to 3-star and 5-star establishments",
  "Online booking with time and cost savings",
  "Budget-friendly options across Indian cities",
  "Specialised group rates and packages",
];

const stats = [
  { value: "500+", label: "Hotels partnered" },
  { value: "50+", label: "Cities covered" },
  { value: "24/7", label: "Support available" },
  { value: "5★", label: "To budget stays" },
];

export default function HotelsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative border-b border-black/[0.06]">
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=1800"
            alt="Luxury hotel lobby"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        {/* centered text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                Travel Extras
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                Hotels, Stay &amp; Flights
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                Cab, hotel and flight — coordinated through one point of contact.
                Convenient, affordable travel across India.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex px-6 py-2.5 btn-shine"
                >
                  Book via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                  Enquire now
                </Link>
              </div>
            </div>
          </Container>
        </div>

        {/* stats bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <Container>
            <div className="flex flex-wrap justify-center gap-6 border-t border-white/10 bg-black/30 py-3 backdrop-blur-sm sm:gap-10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-extrabold leading-none text-white">{s.value}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white page-section">
        <Container>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Hotel card */}
            <Reveal>
              <article className="pro-card no-hover h-full overflow-hidden text-left">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=900"
                    alt="Hotel room"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold text-white">Hotel Booking</span>
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-brand text-brand" />
                    ))}
                    <span className="text-xs text-navy/50 ml-1">3★ to 5★ properties</span>
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
                    Hotel Booking Services
                  </h2>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-navy/60">
                    <p>
                      We provide hotel booking services in various cities of India through
                      Pune Cabz. Leveraging established connections within the hospitality
                      sector, we deliver reservation services nationwide with extensive
                      partnerships across premium accommodations.
                    </p>
                    <p>
                      Our approach emphasises convenience and affordability — select from
                      numerous properties matching your budget and preferences.
                    </p>
                  </div>
                  <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                    Key offerings
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {hotelOfferings.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-navy/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>

            {/* Flight card */}
            <Reveal delay={0.08}>
              <article className="pro-card no-hover h-full overflow-hidden text-left">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=900"
                    alt="Airplane flying above clouds"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-1.5">
                    <Plane className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold text-white">Flight Booking</span>
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="flex flex-wrap gap-2">
                    {["Domestic", "International", "Lowest fares"].map((tag) => (
                      <span key={tag} className="rounded-full bg-brand/[0.07] px-2.5 py-1 text-[11px] font-semibold text-brand">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
                    Flight Booking Services
                  </h2>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-navy/60">
                    <p>
                      We extend travel arrangements beyond accommodations to include air
                      ticket reservations for domestic and international airlines. Our
                      integrated platform lets you coordinate cab, hotel and flight through
                      one point of contact.
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-black/[0.05] bg-soft p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <FeatureIcon icon={Users} size="md" className="shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-navy">Our Service Approach</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                          Staff expertise drives our positioning. Book cheap flight tickets
                          and online hotel reservations through a streamlined process
                          requiring minimal effort — all handled by our team.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link href="/contact" className="btn-primary mt-5 inline-flex px-5 py-2.5">
                    Enquire now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── DESTINATIONS STRIP ── */}
      <section className="border-t border-black/[0.04] bg-white page-section">
        <Container>
          <Reveal>
            <div className="cta-panel px-6 py-10 text-center sm:px-10 sm:py-12">
              <p className="section-eyebrow bg-white/15 text-white">One contact. Full trip.</p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Cab + Hotel + Flight — sorted together
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] text-white/75">
                Plan the full trip with Pune Cabz. Rides, stay and flights handled together so travel stays simple.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand shadow transition hover:bg-white/90"
                >
                  Book via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/book" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                  Book a cab
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
