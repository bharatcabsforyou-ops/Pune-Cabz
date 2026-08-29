import Container from "../Container";
import Counter from "../motion/Counter";
import Reveal from "../motion/Reveal";

const stats: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: 5000, suffix: "+", label: "Registered members" },
  { value: 20, suffix: "+", label: "Cities connected" },
  { value: 100, suffix: "%", label: "ID-checked members" },
  { value: 4.8, suffix: "★", label: "Average rating", decimals: 1 },
];

export default function StatsBand() {
  return (
    <section className="bg-brand page-section">
      <Container>
        <Reveal className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/8 px-5 py-6 text-center ring-1 ring-white/10"
            >
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-2 text-xs font-medium text-white/60 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
