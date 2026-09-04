"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Car, CreditCard, Shield, Clock } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";

const categories = [
  { label: "Booking", icon: Car, color: "bg-brand/[0.07] text-brand" },
  { label: "Payment", icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
  { label: "Safety", icon: Shield, color: "bg-blue-50 text-blue-600" },
  { label: "Support", icon: Clock, color: "bg-amber-50 text-amber-600" },
];

const faqs: { q: string; a: string; cat: string }[] = [
  {
    q: "Can I book a one-way cab?",
    a: "Yes — one-way bookings are our most popular option. We offer competitive one-way fares on all Pune and Maharashtra routes. Note that for one-way hires the return leg cost is included in the fare, as the driver needs to bring the vehicle back.",
    cat: "Booking",
  },
  {
    q: "How do I book a cab?",
    a: "Use the booking form on our website — pick your route, date, time, and cab type, then tap 'Book via WhatsApp'. You'll be connected to our team instantly on WhatsApp to confirm the details and lock in your ride.",
    cat: "Booking",
  },
  {
    q: "How will I get notified about my booking confirmation?",
    a: "Once your booking is confirmed you'll receive a WhatsApp message with your driver's name, vehicle number, and estimated arrival time. You can also call or message us any time to check your booking status.",
    cat: "Booking",
  },
  {
    q: "Is it mandatory to register on your site to book a cab?",
    a: "No registration is required. Simply fill in the booking form and connect with us on WhatsApp. We keep the process friction-free so you can book in under two minutes.",
    cat: "Booking",
  },
  {
    q: "What if the cab doesn't show up?",
    a: "This is extremely rare, but if it happens call us immediately on our support number. We will either dispatch an alternate vehicle or arrange a full refund — whichever you prefer. Your journey will not be left stranded.",
    cat: "Support",
  },
  {
    q: "What if the cab shows up late?",
    a: "Our drivers are tracked and reminded before every pickup. If your driver is running late you'll be notified proactively. For significant delays we offer a partial fare discount as a goodwill gesture.",
    cat: "Support",
  },
  {
    q: "Can I change or cancel my booking?",
    a: "Yes. Contact us on WhatsApp or phone at least 2 hours before your scheduled pickup to modify or cancel at no charge. Cancellations within 2 hours of pickup may attract a small fee to cover the driver's time.",
    cat: "Booking",
  },
  {
    q: "Can I pay via Google Pay or Paytm?",
    a: "Absolutely. We accept Google Pay, Paytm, PhonePe, UPI, and cash. Just let us know your preferred payment method when confirming your booking and we'll make it seamless.",
    cat: "Payment",
  },
  {
    q: "Can I book an outstation cab for someone else using my card?",
    a: "Yes. You can book and pay for a ride on behalf of a family member, colleague, or friend. Simply provide the passenger's name and contact number during booking so the driver can coordinate with them directly.",
    cat: "Payment",
  },
  {
    q: "Is your website safe for online payments?",
    a: "We do not store any card or payment details on our servers. All transactions go through RBI-compliant payment gateways with 256-bit SSL encryption. Your financial data is fully protected.",
    cat: "Payment",
  },
  {
    q: "Is the driver trustworthy?",
    a: "Every driver on our platform is personally verified — we check government ID, driving licence, vehicle documents, and conduct a background check before onboarding. All drivers are experienced professionals with rated trip histories. Your safety is our top priority.",
    cat: "Safety",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory ? faqs.filter((f) => f.cat === activeCategory) : faqs;

  return (
    <section className="bg-white page-section">
      <Container>
        {/* Category filter pills */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => { setActiveCategory(null); setOpen(null); }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-700 transition-all duration-200 border ${
                activeCategory === null
                  ? "bg-brand text-white border-brand shadow-sm"
                  : "bg-white text-navy/60 border-black/[0.07] hover:border-brand/30 hover:text-navy"
              }`}
            >
              All Questions
            </button>
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => { setActiveCategory(activeCategory === label ? null : label); setOpen(null); }}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 border ${
                  activeCategory === label
                    ? "bg-brand text-white border-brand shadow-sm"
                    : "bg-white text-navy/60 border-black/[0.07] hover:border-brand/30 hover:text-navy"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* FAQ list */}
        <div className="mx-auto max-w-2xl space-y-2.5">
          {filtered.map((item, i) => {
            const isOpen = open === i;
            const cat = categories.find((c) => c.label === item.cat);
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="faq-item">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {cat && (
                        <span className={`mt-0.5 shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-lg ${cat.color}`}>
                          <cat.icon className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span className="text-sm font-semibold text-navy sm:text-[15px] leading-snug">
                        {item.q}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 mt-0.5 text-navy/35"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 pl-14">
                          <p className="text-sm leading-relaxed text-navy/60">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-black/[0.06] bg-gradient-to-br from-white to-soft-dark p-6 text-center shadow-[var(--card-shadow)]">
            <p className="text-sm font-semibold text-navy">Still have a question?</p>
            <p className="mt-1 text-sm text-navy/55">Our team is available 9 am – 9 pm IST on WhatsApp and phone.</p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-flex btn-shine"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
