import type { Metadata } from "next";
import TourismPage from "@/components/tourism/TourismPage";

export const metadata: Metadata = {
  title: "Tourism - Pune Cabz",
  description:
    "Plan tourism rides from Pune to Lonavala, Mahabaleshwar, Konkan, Nashik and more.",
};

export default function TourismRoute() {
  return <TourismPage />;
}
