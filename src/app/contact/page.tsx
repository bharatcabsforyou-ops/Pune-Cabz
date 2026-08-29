import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import ContactHubs from "@/components/contact/ContactHubs";
import FAQ from "@/components/contact/FAQ";

export const metadata: Metadata = {
  title: "Contact us - Pune Cabz",
  description:
    "Call, email, WhatsApp, or visit Pune Cabz in Koregaon Park, Pune. Ride support, safety, and partnerships - we reply within a business day.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactCards />
      <ContactForm />
      <ContactMap />
      <ContactHubs />
      <FAQ />
    </>
  );
}
