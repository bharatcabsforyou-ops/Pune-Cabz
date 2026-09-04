import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText, Scale, ShieldCheck } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions - Pune Cabz",
  description:
    "Pune Cabz booking requirements, terms, pricing, cancellation, refunds, vehicle policy and service area.",
};

const bookingTerms = [
  "Driver allowance will be charged extra.",
  "Cab running kilometres: daily 300 km only.",
  "Time starts at morning 6 am to 10 pm. The cab needs to be free at 10 pm. After 10 pm extra charges are applicable. Night charges apply between 12 am and 6 am.",
  "Time and kilometres are calculated from our office to office.",
  "Inter-state taxes, toll taxes, parking and service tax are charged as actual.",
];

const sections: {
  title: string;
  icon: React.ElementType;
  body?: string[];
  list?: string[];
}[] = [
  {
    title: "Booking Requirements",
    icon: FileText,
    body: [
      "To ensure smooth and comfortable journey, guests are requested to allow adequate travel time for their journey, and to book a vehicle as per requirement considering the guest count and luggage. Booking a smaller vehicle than required may cause discomfort on a long journey.",
    ],
  },
  {
    title: "Terms and Conditions",
    icon: Scale,
    list: bookingTerms,
  },
  {
    title: "Pricing",
    icon: ShieldCheck,
    body: [
      "Our pricing is designed to provide clear, competitive and transparent travel options without unnecessary surprises. Base fares quoted exclude taxes, parking charges, toll charges, permits, entrance fees, local guide charges and waiting charges. Additional charges such as toll, parking, permits, entry fees, interstate taxes and other applicable charges may be payable separately unless specifically included in the quoted fare. Rates are calculated on current fuel prices; in the event of a hike in fuel price, rates may vary.",
    ],
  },
  {
    title: "How Charges Are Calculated",
    icon: FileText,
    body: [
      "Charges are determined by the vehicle type, distance, duration and overall travel requirements and begins when driver departs for pickup. Distance is accounted for from the vehicle's designated base to the point of completion, ensuring transparent and fair calculation of the total journey cost.",
    ],
  },
  {
    title: "Cancellation and Refunds",
    icon: Scale,
    body: [
      "Cancellation and refund eligibility varies based on the booking type and the time of cancellation. Multi-day bookings may attract higher deductions when cancelled closer to the travel date, while single-day bookings are subject to a defined cancellation window. Date or trip changes are usually accepted without charge when requested at least 48 hours before departure. Approved refunds are credited within approximately 5–7 working days.",
    ],
  },
  {
    title: "Vehicle Policy",
    icon: ShieldCheck,
    body: [
      "Smoking or vaping and consumption of alcohol are strictly prohibited inside the vehicle. Please help us maintain a clean and comfortable space for everyone. Any damage or additional cleaning cost caused during the journey will be charged to the guest.",
    ],
  },
  {
    title: "Service Area",
    icon: FileText,
    body: [
      "PuneCabz operates from Pune and serves major tourist destinations across India. For a destination or place not listed on our website, please call us — we will ensure smooth ride for it.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-black/[0.06]">
        {/* background */}
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=85&w=1800"
            alt="Terms and conditions"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/30" />
          {/* dot grid */}
          <div className="absolute inset-0 bg-dot-grid text-white/[0.04]" />
        </div>

        {/* centered content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              {/* icon badge */}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm">
                <Scale className="h-7 w-7 text-brand" />
              </div>

              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                Legal
              </span>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                Terms &amp; Conditions
              </h1>

              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Please read these booking terms carefully before travelling with Pune Cabz.
              </p>

              {/* quick nav pills */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {["Booking", "Pricing", "Cancellation", "Vehicle Policy"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-[#fafafa] page-section">
        <Container>
          <div className="mx-auto max-w-3xl">

            {/* last updated bar */}
            <Reveal>
              <div className="mb-6 flex items-center justify-between rounded-xl border border-black/[0.06] bg-white px-4 py-3 shadow-[var(--shadow-xs)]">
                <p className="text-xs text-navy/50">
                  Last updated: <span className="font-semibold text-navy/70">January 2025</span>
                </p>
                <Link href="/contact" className="text-xs font-semibold text-brand hover:underline">
                  Questions? Contact us →
                </Link>
              </div>
            </Reveal>

            <div className="space-y-3">
              {sections.map(({ title, icon: Icon, body, list }, idx) => (
                <Reveal key={title} delay={idx * 0.04}>
                  <article className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[var(--card-shadow)]">
                    {/* card header */}
                    <div className="flex items-center gap-3 border-b border-black/[0.05] px-5 py-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/[0.08]">
                        <Icon className="h-4 w-4 text-brand" />
                      </span>
                      <h2 className="text-sm font-bold text-navy sm:text-base">{title}</h2>
                      <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-soft text-[11px] font-bold text-navy/40">
                        {idx + 1}
                      </span>
                    </div>

                    {/* card body */}
                    <div className="px-5 py-4">
                      {body?.map((p) => (
                        <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-navy/60">
                          {p}
                        </p>
                      ))}

                      {list && (
                        <ul className="space-y-3">
                          {list.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm leading-relaxed text-navy/65">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/[0.08] text-[10px] font-bold text-brand">
                                {i + 1}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* bottom CTA */}
            <Reveal>
              <div className="mt-6 rounded-2xl border border-brand/15 bg-brand/[0.04] px-5 py-5 text-center">
                <p className="text-sm font-semibold text-navy">Have a question about these terms?</p>
                <p className="mt-1 text-sm text-navy/55">
                  Reach us before you confirm your ride — we are happy to clarify.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="btn-primary inline-flex px-5 py-2">
                    Contact us
                  </Link>
                  <Link href="/about/faq" className="btn-secondary inline-flex px-5 py-2">
                    Read FAQ
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </Container>
      </section>
    </>
  );
}
