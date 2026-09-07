"use client";

import Container from "./Container";
import Counter from "./motion/Counter";
import Reveal from "./motion/Reveal";
import { useT } from "@/lib/i18n";

export default function TrustBar() {
  const t = useT();

  const stats: {
    value?: number;
    suffix?: string;
    label: string;
    display?: string;
  }[] = [
    { value: 30, suffix: "+", label: t("trustBar.citiesCovered") },
    { value: 6, suffix: "+", label: t("trustBar.yearsExperience") },
    { value: 10, suffix: "", label: t("trustBar.vehicleFleet") },
    { display: "24×7", label: t("trustBar.bookingSupport") },
  ];

  return (
    <section className="relative z-10 -mt-1 border-b border-black/[0.04] bg-soft py-4 sm:py-5">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_14px_40px_-28px_rgba(26,10,12,0.45)]">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`relative flex flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-6 ${
                    i % 2 === 1 ? "border-l border-black/[0.06]" : ""
                  } ${i >= 2 ? "border-t border-black/[0.06] lg:border-t-0" : ""} ${
                    i >= 2 ? "lg:border-l lg:border-black/[0.06]" : ""
                  }`}
                >
                  <p className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-[2.1rem]">
                    {s.display ? (
                      s.display
                    ) : (
                      <Counter
                        value={s.value ?? 0}
                        suffix={s.suffix ?? ""}
                        className="tabular-nums"
                      />
                    )}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/45 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
