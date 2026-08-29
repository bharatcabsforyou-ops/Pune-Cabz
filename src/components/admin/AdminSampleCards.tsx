"use client";

import Image from "next/image";

type SampleCard = {
  id?: string;
  title?: string;
  caption?: string;
  fromCity?: string;
  toCity?: string;
  imageUrl?: string;
  tag?: string;
  duration?: string;
  fromPrice?: string;
};

export default function AdminSampleCards({
  title,
  samples,
}: {
  title: string;
  samples: SampleCard[];
}) {
  if (samples.length === 0) return null;

  return (
    <div className="mt-6">
      <p className="text-[13px] font-semibold text-navy">
        {title} <span className="text-navy/40">({samples.length} templates)</span>
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {samples.map((item, index) => {
          const key = item.id ?? `${item.title ?? item.fromCity}-${index}`;
          const label = item.title ?? `${item.fromCity} → ${item.toCity}`;
          const image = item.imageUrl ?? "/image2.jpg";

          return (
            <article
              key={key}
              className="flex gap-3 rounded-xl border border-dashed border-violet-200 bg-violet-50/40 p-3"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                {image.startsWith("/") ? (
                  <Image src={image} alt={label} fill className="object-cover" sizes="80px" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={label} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-violet-700">
                  JSON sample
                </span>
                <p className="mt-1 truncate text-sm font-bold text-navy">{label}</p>
                <p className="truncate text-[12px] text-navy/50">
                  {item.caption ?? item.tag ?? item.duration ?? "Template only — import to save"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
