"use client";

import Container from "../Container";
import PhotoCard from "../PhotoCard";
import Reveal from "../motion/Reveal";
import { images } from "@/lib/images";

const milestones = [
  {
    year: "2019",
    title: "A college WhatsApp group",
    text: "Classmates in Pune needed a ride home for the holidays. Empty seats met rising fuel prices.",
  },
  {
    year: "Then",
    title: "The platform we wished existed",
    text: "Identity checks, in-app ratings, and search that understands Maharashtra routes.",
  },
  {
    year: "Now",
    title: "Pune and 20+ cities",
    text: "The same idea - verified people sharing a car and splitting the cost - every day.",
  },
];

export default function Story() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal direction="left">
            <PhotoCard src={images.teamCabin} alt="The Pune Cabz team at work" />
          </Reveal>

          <Reveal direction="right">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Our story</p>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-navy sm:text-3xl">
              From a Pune carpool group to a city-wide platform
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-navy/60">
              We built Pune Cabz so sharing a seat feels as easy as booking a
              ticket - with checks in place, and without surge games.
            </p>

            <ol className="mt-8 space-y-5">
              {milestones.map((item) => (
                <li key={item.year} className="flex gap-4 text-left">
                  <span className="mt-0.5 w-12 shrink-0 text-sm font-extrabold tabular-nums text-brand">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy/60">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
