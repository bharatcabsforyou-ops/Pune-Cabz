import type { Metadata } from "next";
import PackagesContent from "@/components/packages/PackagesContent";

export const metadata: Metadata = {
  title: "Packages - Pune Cabz",
  description:
    "Pune Cabz cab packages — hatchback, sedan, SUV, Innova, Tempo Traveller, Urbania and bus. Book now on WhatsApp.",
};

export default function PackagesPage() {
  return <PackagesContent />;
}
