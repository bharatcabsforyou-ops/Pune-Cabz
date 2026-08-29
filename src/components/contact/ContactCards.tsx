"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import WhatsAppIcon from "../WhatsAppIcon";
import { site } from "@/lib/site";

const cards = [
  {
    icon: Phone,
    title: "Call us",
    detail: site.phone,
    hint: "Mon-Sat, 9am-9pm IST",
    href: site.phoneHref,
    brand: true,
  },
  {
    icon: Mail,
    title: "Email us",
    detail: site.email,
    hint: "We reply within 1 day",
    href: site.emailHref,
    brand: true,
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    detail: "Chat with support",
    hint: "Fastest way to reach us",
    href: site.whatsappHref,
    brand: false,
    external: true,
  },
  {
    icon: MapPin,
    title: "Visit us",
    detail: site.address,
    hint: "HQ · Koregaon Park",
    href: "#office-map",
    brand: true,
  },
];

export default function ContactCards() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Reach us</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Four ways in
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
            Same Pune team. Pick whatever is easiest - every card is a tap away.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, detail, hint, href, brand, external }, i) => (
            <StaggerItem key={title} className="h-full">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col rounded-2xl border border-black/5 bg-soft p-6 text-left transition-colors hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md ${
                      brand ? "bg-brand shadow-brand/25" : "bg-[#25D366] shadow-[#25D366]/25"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tabular-nums text-brand/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-navy/20 transition-colors group-hover:text-brand" />
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold tracking-tight text-navy">{title}</h3>
                <p className="mt-1 flex-1 text-sm font-medium leading-relaxed text-navy/70">{detail}</p>
                <p className="mt-3 text-xs font-medium text-navy/45">{hint}</p>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
