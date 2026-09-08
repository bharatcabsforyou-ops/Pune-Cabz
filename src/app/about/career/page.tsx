import type { Metadata } from "next";
import Container from "@/components/Container";
import CareerOpeningCard from "@/components/career/CareerOpeningCard";
import { loadCareerOpenings } from "@/lib/career-data";

export const metadata: Metadata = {
  title: "Career - Pune Cabz",
  description: "Join the Pune Cabz team in Pune — operations, support, and partnerships.",
};

export default async function CareerPage() {
  const openings = await loadCareerOpenings({ publishedOnly: true });

  return (
    <>
      <section className="border-b border-black/[0.06] bg-white">
        <Container className="py-8 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            Career
          </p>
          <h1 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Build mobility with us
          </h1>
          <p className="mt-2 max-w-lg text-[15px] leading-snug text-navy/55">
            Open roles at Pune Cabz. Read the JD and apply instantly on WhatsApp.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-8 sm:py-10">
          {openings.length === 0 ? (
            <p className="py-10 text-center text-sm text-navy/50">
              No open roles right now. Message us on WhatsApp — we keep good people in mind.
            </p>
          ) : (
            <div>
              {openings.map((role) => (
                <CareerOpeningCard key={role.id} opening={role} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
