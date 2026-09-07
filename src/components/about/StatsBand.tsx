"use client";

import Container from "../Container";
import Counter from "../motion/Counter";
import Reveal from "../motion/Reveal";
import { useT, type MessageKey } from "@/lib/i18n";

const stats: {
  value?: number;
  suffix?: string;
  labelKey: MessageKey;
  display?: string;
}[] = [
  { value: 30, suffix: "+", labelKey: "stats.cities" },
  { value: 6, suffix: "+", labelKey: "stats.years" },
  { value: 10, suffix: "", labelKey: "stats.fleet" },
  { display: "24×7", labelKey: "stats.support" },
];

export default function StatsBand() {
  const t = useT();

  return (
    <section className="bg-brand page-section">
      <Container>
        <Reveal className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map((s) => (
            <div
              key={s.labelKey}
              className="rounded-2xl bg-white/8 px-5 py-6 text-center ring-1 ring-white/10"
            >
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {s.display ? (
                  s.display
                ) : (
                  <Counter value={s.value ?? 0} suffix={s.suffix ?? ""} />
                )}
              </p>
              <p className="mt-2 text-xs font-medium text-white/60 sm:text-sm">
                {t(s.labelKey)}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
