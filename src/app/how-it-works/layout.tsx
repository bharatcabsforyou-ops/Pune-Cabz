import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How it works - Pune Cabz",
  description:
    "Search a route, pick a verified ride, travel together, and rate each other. Here's how Pune Cabz works for passengers and drivers.",
};

export default function HowItWorksLayout({ children }: { children: ReactNode }) {
  return children;
}
