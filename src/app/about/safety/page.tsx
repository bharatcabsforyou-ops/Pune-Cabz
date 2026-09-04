import type { Metadata } from "next";
import SafetyPageContent from "@/components/safety/SafetyPageContent";

export const metadata: Metadata = {
  title: "Safety - Pune Cabz",
  description:
    "ID verification, ratings, live trip sharing, SOS, and 24/7 support. See how Pune Cabz keeps every shared ride safer.",
};

export default function AboutSafetyPage() {
  return <SafetyPageContent />;
}
