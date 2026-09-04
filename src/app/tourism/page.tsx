import type { Metadata } from "next";
import TourismPage from "@/components/tourism/TourismPage";

export const metadata: Metadata = {
  title: "Tour Places - Pune Cabz",
  description:
    "Tourist places from Pune — Lonavala, Tamhini Ghat, Mahabaleshwar, Alibag, Jejuri, Prati Shirdi and more with cab booking.",
};

export default function TourismRoute() {
  return <TourismPage />;
}
