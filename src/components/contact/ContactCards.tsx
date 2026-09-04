"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Container from "../Container";
import FeatureIcon from "../FeatureIcon";
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
];

export default function ContactCards() {
  return (
    <section className="bg-white page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">Reach us</p>
          <h2 className="section-title">Three ways in</h2>
          <p className="section-desc">
            Same Pune team. Pick whatever is easiest - every card is a tap away.
          </p>
        </Reveal>

        <StaggerGroup className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, detail, hint, href, brand, external }, i) => (
            <StaggerItem key={title} className="h-full">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="pro-card-interactive group flex h-full flex-col p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <FeatureIcon
                    icon={Icon}
                    size="lg"
                    variant={brand ? "brand" : "whatsapp"}
                  />
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
