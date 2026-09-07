import type { Metadata } from "next";
import FleetContent from "@/components/fleet/FleetContent";

export const metadata: Metadata = {
  title: "Fleet - Pune Cabz",
  description:
    "Pune Cabz vehicle fleet — hatchback, sedan, SUV, Innova, Tempo Traveller, Urbania and bus options.",
};

export default function FleetPage() {
  return <FleetContent />;
}
