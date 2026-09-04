import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import AboutSubHero from "@/components/about/AboutSubHero";
import Container from "@/components/Container";
import FeatureIcon from "@/components/FeatureIcon";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Career - Pune Cabz",
  description: "Join the Pune Cabz team in Pune — operations, support, and partnerships.",
};

const roles = [
  {
    title: "Customer support executive",
    type: "Full-time · Pune",
    text: "Help riders and drivers on WhatsApp, phone, and email during active trips.",
  },
  {
    title: "Operations associate",
    type: "Full-time · Pune",
    text: "Coordinate routes, verify drivers, and keep bookings running smoothly.",
  },
  {
    title: "Partnerships manager",
    type: "Full-time · Remote/Hybrid",
    text: "Work with hotels, corporates, and travel partners across Maharashtra.",
  },
];

export default function CareerPage() {
  return (
    <>
      <AboutSubHero
        eyebrow="Career"
        title="Build mobility with us"
        description="We are a small Pune team making shared travel simple and safe. If that excites you, say hello."
      />
      <section className="bg-white page-section">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {roles.map(({ title, type, text }) => (
              <StaggerItem key={title}>
                <article className="pro-card flex h-full flex-col p-5 sm:p-6">
                  <FeatureIcon icon={Briefcase} size="lg" />
                  <h2 className="mt-4 text-base font-bold text-navy">{title}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand">{type}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/55">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-8 text-center">
            <Link href="/contact" className="btn-primary inline-flex px-6 py-3">
              Apply via contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
