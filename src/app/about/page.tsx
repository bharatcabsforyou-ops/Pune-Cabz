import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Story from "@/components/about/Story";
import StatsBand from "@/components/about/StatsBand";
import Values from "@/components/about/Values";
import AboutCta from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About Pune Cabz",
  description:
    "Welcome to PuneCabz — trusted cab service in Pune for daily travel, airport transfers, outstation journeys, and more.",
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
