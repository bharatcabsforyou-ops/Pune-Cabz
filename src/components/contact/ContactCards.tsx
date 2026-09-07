"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Container from "../Container";
import FeatureIcon from "../FeatureIcon";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import WhatsAppIcon from "../WhatsAppIcon";
import { site } from "@/lib/site";
import { useT } from "@/lib/i18n";

export default function ContactCards() {
  const t = useT();

  const cards = [
    {
      icon: Phone,
      title: t("contact.cards.call"),
      detail: site.phone,
      hint: "",
      href: site.phoneHref,
      whatsapp: false,
    },
    {
      icon: Mail,
      title: t("contact.cards.email"),
      detail: site.email,
      hint: "",
      href: site.emailHref,
      whatsapp: false,
    },
    {
      icon: WhatsAppIcon,
      title: t("contact.cards.whatsapp"),
      detail: t("contact.cards.whatsappDetail"),
      hint: t("contact.cards.whatsappHint"),
      href: site.whatsappHref,
      external: true,
      whatsapp: true,
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-9">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">{t("contact.cards.eyebrow")}</p>
          <h2 className="section-title text-2xl sm:text-3xl">{t("contact.cards.title")}</h2>
        </Reveal>

        <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, detail, hint, href, external, whatsapp }, i) => (
            <StaggerItem key={title} className="h-full">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="pro-card-interactive group flex h-full flex-col p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <FeatureIcon
                    icon={Icon}
                    size="md"
                    variant={whatsapp ? "whatsapp" : "brand"}
                  />
                  <span className="flex items-center gap-2">
                    <span className="text-xl font-extrabold tabular-nums text-brand/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-navy/20 transition-colors group-hover:text-brand" />
                  </span>
                </div>
                <h3
                  className={`mt-3.5 text-base font-bold tracking-tight ${
                    whatsapp ? "text-whatsapp" : "text-navy"
                  }`}
                >
                  {title}
                </h3>
                <p className="mt-1 flex-1 text-sm font-medium leading-relaxed text-navy/70">{detail}</p>
                {hint ? (
                  <p className="mt-2 text-xs font-medium text-navy/45">{hint}</p>
                ) : null}
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
