import type { Metadata } from "next";
import ContactCards from "@/components/contact/ContactCards";
import ContactHubs from "@/components/contact/ContactHubs";
import FAQ from "@/components/contact/FAQ";
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact us - Pune Cabz",
  description:
    "Call, email, or WhatsApp Pune Cabz. Ride support, safety, and partnerships - we reply within a business day.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <ContactCards />
      <ContactHubs />
      <FAQ />
    </>
  );
}
