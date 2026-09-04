import type { Metadata } from "next";
import AboutSubHero from "@/components/about/AboutSubHero";
import FAQ from "@/components/contact/FAQ";

export const metadata: Metadata = {
  title: "FAQ - Pune Cabz",
  description: "Everything you need to know about booking, payment, safety, and support at Pune Cabz.",
};

export default function AboutFaqPage() {
  return (
    <>
      <AboutSubHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything people ask us before their first booking — answered plainly."
        image="/image2.jpeg"
        imageAlt="Pune Cabz cab on the road"
      />
      <FAQ />
    </>
  );
}
