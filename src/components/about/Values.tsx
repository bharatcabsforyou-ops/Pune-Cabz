"use client";

import { Eye, Target } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { useT } from "@/lib/i18n";

export default function Values() {
  const t = useT();

  return (
    <section className="border-t border-black/[0.04] bg-soft page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">{t("values.eyebrow")}</p>
          <h2 className="section-title">{t("values.title")}</h2>
          <p className="section-desc">{t("values.desc")}</p>
        </Reveal>

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <StaggerItem>
            <article className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.09] text-brand ring-1 ring-brand/12">
                  <Target className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                    {t("values.goal.label")}
                  </p>
                  <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-navy sm:text-xl">
                    {t("values.goal.title")}
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-navy/60">
                <p>{t("values.goal.p1")}</p>
                <p>{t("values.goal.p2")}</p>
              </div>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.09] text-brand ring-1 ring-brand/12">
                  <Eye className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                    {t("values.vision.label")}
                  </p>
                  <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-navy sm:text-xl">
                    {t("values.vision.title")}
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-navy/60">
                <p>{t("values.vision.p1")}</p>
                <p>{t("values.vision.p2")}</p>
              </div>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </section>
  );
}
