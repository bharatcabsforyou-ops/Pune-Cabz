import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Story from "@/components/about/Story";
import StatsBand from "@/components/about/StatsBand";
import Values from "@/components/about/Values";
import AboutCta from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About us - Pune Cabz",
  description:
    "Pune Cabz connects verified drivers and passengers across Pune and Maharashtra. Learn about our story and what we stand for.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <StatsBand />
      <Values />
      <AboutCta />
    </>
  );
}
