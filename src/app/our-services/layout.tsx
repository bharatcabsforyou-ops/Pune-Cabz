import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Services - Pune Cabz",
  description:
    "Local, outstation, airport and group travel with Pune Cabz — on-time pickups, transparent fares, and 24×7 support.",
};

export default function OurServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
