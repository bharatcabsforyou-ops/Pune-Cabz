"use client";

import Image from "next/image";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { images } from "@/lib/images";

const team = [
  { name: "Ananya Rao", role: "Co-founder and CEO", photo: images.portraitAnjali },
  { name: "Arjun Mehta", role: "Co-founder and CTO", photo: images.portraitArjun },
  { name: "Priya Nair", role: "Head of Trust and Safety", photo: images.portraitPriya },
  { name: "Rohan Kapoor", role: "Head of Product", photo: images.portraitRohan },
];

export default function Team() {
  return (
    <section className="bg-soft py-14 sm:py-16">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">The people</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Meet the team
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-navy/60">
            A small Pune team obsessed with making shared travel simple and safe.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <article className="overflow-hidden rounded-2xl border border-black/5 bg-white text-left shadow-sm">
                <div className="relative aspect-square w-full">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold tracking-tight text-navy">{member.name}</p>
                  <p className="mt-0.5 text-xs font-medium text-navy/50">{member.role}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
