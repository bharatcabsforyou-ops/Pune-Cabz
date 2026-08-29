import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Safety - Pune Cabz",
  description:
    "ID verification, ratings, live trip sharing, SOS, and 24/7 support. See how Pune Cabz keeps every shared ride safer.",
};

export default function SafetyLayout({ children }: { children: ReactNode }) {
  return children;
}
