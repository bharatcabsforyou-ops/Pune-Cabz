"use client";

import { BadgeCheck, CarFront, Phone } from "lucide-react";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import WhatsAppIcon from "./WhatsAppIcon";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/en";

function StepIcons({ kind }: { kind: "contact" | "fare" | "cab" }) {
  if (kind === "contact") {
    return (
      <span className="flex items-center gap-1.5">
        <Phone className="h-5 w-5 text-brand" strokeWidth={2.25} />
        <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
      </span>
    );
  }
  if (kind === "fare") {
    return <BadgeCheck className="h-6 w-6 text-brand" strokeWidth={2.25} />;
  }
  return <CarFront className="h-6 w-6 text-brand" strokeWidth={2.25} />;
}

export default function BookingProcess() {
  const t = useT();

  const steps: {
    titleKey: MessageKey;
    textKey: MessageKey;
    icons: "contact" | "fare" | "cab";
    whatsappTitle?: boolean;
  }[] = [
    {
      titleKey: "bookingProcess.step1.title",
      textKey: "bookingProcess.step1.text",
      icons: "contact",
      whatsappTitle: true,
    },
    {
      titleKey: "bookingProcess.step2.title",
      textKey: "bookingProcess.step2.text",
      icons: "fare",
    },
    {
      titleKey: "bookingProcess.step3.title",
      textKey: "bookingProcess.step3.text",
      icons: "cab",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden border-t border-black/[0.04] bg-white page-section"
    >
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">{t("bookingProcess.eyebrow")}</p>
          <h2 className="section-title">{t("bookingProcess.title")}</h2>
          <p className="section-desc">{t("bookingProcess.desc")}</p>
        </Reveal>

        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px border-t-2 border-dashed border-brand/25 lg:block"
            aria-hidden
          />

          <StaggerGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={step.titleKey} className="relative text-center">
                {i < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-[4.75rem] h-8 w-px -translate-x-1/2 border-l-2 border-dashed border-brand/25 sm:hidden"
                    aria-hidden
                  />
                )}

                <div className="relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full border border-dashed border-brand/30"
                    aria-hidden
                  />
                  <span
                    className="absolute inset-1.5 rounded-full border border-brand/20"
                    aria-hidden
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-10px_rgba(220,31,38,0.35)] ring-1 ring-brand/15">
                    <StepIcons kind={step.icons} />
                  </span>
                </div>

                <h3 className="mt-5 text-base font-extrabold tracking-tight text-navy sm:text-lg">
                  {step.whatsappTitle ? (
                    <>
                      {t("common.call")} {" / "}
                      <span className="text-whatsapp">{t("common.whatsapp")}</span>
                    </>
                  ) : (
                    t(step.titleKey)
                  )}
                </h3>
                <p className="mx-auto mt-2.5 max-w-[17rem] text-sm leading-relaxed text-navy/55">
                  {t(step.textKey)}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
