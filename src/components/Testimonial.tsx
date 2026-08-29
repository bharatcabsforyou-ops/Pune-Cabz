"use client";

import { Quote, Star } from "lucide-react";
import Container from "./Container";
import PhotoCard from "./PhotoCard";
import Reveal from "./motion/Reveal";
import { images } from "@/lib/images";

export default function Testimonial() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <Quote className="h-9 w-9 text-brand/25" fill="currentColor" strokeWidth={0} />
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              Only on Pune Cabz&hellip;
            </h2>
            <blockquote className="mt-6 max-w-lg text-lg leading-relaxed text-navy/70">
              &ldquo;Carpooling&apos;s great: I pay a little money to get where
              I&apos;m going on time, in comfort, and in AC! And I know it&apos;s
              nice for the driver to get a little financial help when they&apos;re
              travelling alone.&rdquo;
            </blockquote>
            <div className="mt-5 flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm font-bold text-navy">Kabir Malhotra</p>
            <p className="text-sm text-navy/50">Rider since 2023 · Pune</p>
          </Reveal>

          <Reveal direction="right">
            <PhotoCard src={images.portraitKabir} alt="Happy Pune Cabz rider" variant="banner" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
