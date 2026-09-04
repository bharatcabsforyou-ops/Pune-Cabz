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
    <section className="bg-soft page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">The people</p>
          <h2 className="section-title">Meet the team</h2>
          <p className="section-desc">
            A small Pune team obsessed with making shared travel simple and safe.
          </p>
        </Reveal>

        <StaggerGroup className="page-section-head grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <article className="pro-card-interactive overflow-hidden p-0">
                <div className="relative aspect-square w-full">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="card-body p-4">
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
