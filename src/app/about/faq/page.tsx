import type { Metadata } from "next";
import FaqPageHero from "@/components/about/FaqPageHero";
import FAQ from "@/components/contact/FAQ";

export const metadata: Metadata = {
  title: "FAQ - Pune Cabz",
  description: "Everything you need to know about booking, payment, safety, and support at Pune Cabz.",
};

export default function AboutFaqPage() {
  return (
    <>
      <FaqPageHero />
      <FAQ />
    </>
  );
}
