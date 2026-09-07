"use client";

import Container from "../Container";
import PhotoCard from "../PhotoCard";
import Reveal from "../motion/Reveal";
import { unsplash } from "@/lib/images";
import { useT } from "@/lib/i18n";

/** Comfortable sedan on an open highway — fits Pune Cabz about story */
const aboutStoryImage = unsplash("1485291571150-772bcfc10da5");

export default function Story() {
  const t = useT();

  return (
    <section className="bg-white page-section">
      <Container>
        <div className="grid grid-cols-1 items-center page-grid page-grid-2">
          <Reveal direction="left">
            <p className="section-eyebrow">{t("about.eyebrow")}</p>
            <h2 className="section-title mt-2 text-left">{t("about.title")}</h2>
            <div className="mt-4 max-w-xl space-y-4 text-[15px] leading-relaxed text-navy/60">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
              <p>{t("about.p4")}</p>
            </div>
          </Reveal>

          <Reveal direction="right">
            <PhotoCard
              src={aboutStoryImage}
              alt="Comfortable cab ride with Pune Cabz"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
