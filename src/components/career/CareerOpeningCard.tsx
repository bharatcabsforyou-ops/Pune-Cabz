"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import {
  careerApplyWhatsAppHref,
  careerTypeLabel,
  splitCareerLines,
  type CareerOpening,
} from "@/lib/career";
import { useSite } from "@/lib/site-context";

function JdList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/40">
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[13px] leading-snug text-navy/60">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand/55" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CareerOpeningCard({ opening }: { opening: CareerOpening }) {
  const site = useSite();
  const applyHref = careerApplyWhatsAppHref(site.whatsapp, opening);
  const responsibilities = splitCareerLines(opening.responsibilities);
  const requirements = splitCareerLines(opening.requirements);
  const benefits = splitCareerLines(opening.benefits);

  return (
    <article className="border-b border-black/[0.08] py-7 first:pt-0 last:border-b-0 last:pb-0 sm:py-8">
      <div className="grid items-start gap-5 sm:grid-cols-[200px_1fr] sm:gap-7 lg:grid-cols-[240px_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden bg-soft-dark sm:aspect-[5/4]">
          <Image
            src={opening.imageUrl || "/image1.jpeg"}
            alt={opening.title}
            fill
            className="object-cover"
            sizes="(max-width:640px) 100vw, 240px"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                {opening.department}
              </p>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
                {opening.title}
              </h2>
              <p className="mt-1.5 text-[13px] text-navy/50">{careerTypeLabel(opening)}</p>
            </div>
            <a
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 bg-[#25d366] px-3.5 py-2 text-[13px] font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Apply on WhatsApp
            </a>
          </div>

          {(opening.experience || opening.salary) && (
            <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
              {opening.experience ? (
                <div>
                  <dt className="inline text-navy/40">Experience: </dt>
                  <dd className="inline font-medium text-navy">{opening.experience}</dd>
                </div>
              ) : null}
              {opening.salary ? (
                <div>
                  <dt className="inline text-navy/40">Salary: </dt>
                  <dd className="inline font-medium text-navy">{opening.salary}</dd>
                </div>
              ) : null}
            </dl>
          )}

          <p className="mt-3 text-[15px] leading-relaxed text-navy/60">{opening.description}</p>

          <JdList title="Responsibilities" items={responsibilities} />
          <JdList title="Requirements" items={requirements} />
          <JdList title="What we offer" items={benefits} />

          <a
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#128c7e] hover:underline"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Apply for {opening.title} on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
